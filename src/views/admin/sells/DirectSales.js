import React, { useState } from "react";
import {
  Row, Col, Button, Nav, NavItem, NavLink, TabPane, TabContent,
  Container, Card, CardHeader, CardBody
} from "reactstrap";
import classnames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import Order from "views/admin/sells/Order.js";
import { VscClose } from "react-icons/vsc";

const CreateOrderPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [orders, setOrders] = useState([{ id: 1, title: "Hóa đơn 1", data: {} }]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleCreateOrder = () => {
    const newOrderId = orders.length + 1;
    handleCloneOrder(newOrderId);
  };
  
  const handleCloneOrder = (newOrderId) => {
    if (orders.length >= 5) {
      toast.warning("Đã đạt tối đa!");
      return;
    }
    while (orders.some(order => order.id === newOrderId)) {
      newOrderId++;
    }

    const newOrder = { id: newOrderId, title: `Hóa đơn ${newOrderId}`, data: {} };
    setOrders([...orders, newOrder]);
  
    setActiveTab(`${newOrderId}`);
  };
  
  const handleDeleteOrder = (deletedOrderId) => {
    const updatedOrders = orders.filter((order) => order.id !== deletedOrderId);
    const wasActiveTabRemoved = activeTab === deletedOrderId;
  
    setOrders(updatedOrders);
  
    if (wasActiveTabRemoved && updatedOrders.length > 0) {
      const newActiveTab = updatedOrders[0].id;
      setActiveTab(newActiveTab);
    }
  };

  return (
    <>
      <Container className="pt-5 pt-md-7" fluid>
        <Row>
          {/* Tabs with icons */}
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Col>
                  <Button className="bg-gradient-info" size="sm" style={{ color: "#fff" }} onClick={handleCreateOrder}>
                    + Tạo mới hóa đơn
                  </Button>
                </Col>
              </CardHeader>
              <CardBody>
                <div className="col">
                  <Row className="align-items-center">
                    <Col>
                      <Nav tabs className="my-0">
                        {orders.map((order) => (
                          <NavItem key={order.id} style={{ fontSize: 13 }}>
                            <NavLink
                              className={classnames({ active: activeTab === order.id })}
                              onClick={() => {
                                toggle(order.id);
                              }}
                            >
                              {order.title}{" "}
                              <VscClose className="mb-2" onClick={() => handleDeleteOrder(order.id)} />
                            </NavLink>
                          </NavItem>
                        ))}
                      </Nav>

                      <TabContent activeTab={activeTab}>
                        {orders.map((order) => (
                          <TabPane tabId={order.id} key={order.id}>
                            <Order data={order.data} />
                          </TabPane>
                        ))}
                      </TabContent>
                    </Col>
                    <ToastContainer />
                  </Row>
                </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CreateOrderPage;
