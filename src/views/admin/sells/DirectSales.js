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
  const [activeTab, setActiveTab] = useState("1");
  const [orders, setOrders] = useState(["Hóa đơn 1"]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleCreateOrder = () => {
    handleCloneOrder();
  };

  const handleCloneOrder = () => {
    if (orders.length >= 5) {
      toast.warning("Đã đạt tối đa!");
      return;
    }
    const newOrderNumber = orders.length + 1;
    const newOrderTitle = `Hóa đơn ${newOrderNumber}`;
    setOrders([...orders, newOrderTitle]);
  };

  const handleDeleteOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);

    if (activeTab === `${index + 1}`) {
      const newActiveTab = updatedOrders.length > 0 ? "1" : null;
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
                  <Button size="sm" color="primary" outline onClick={handleCreateOrder}>
                    + Tạo mới hóa đơn
                  </Button>
                </Col>
              </CardHeader>
              <CardBody>
                <div className="col">
                  <Row className="align-items-center">
                    <Col>
                      <Nav tabs className="my-0">
                        {orders.map((order, index) => (
                          <NavItem key={index} style={{ fontSize: 13 }}>
                            <NavLink
                              className={classnames({ active: activeTab === `${index + 1}` })}
                              onClick={() => {
                                toggle(`${index + 1}`);
                              }}
                            >
                              {order}{" "}
                              <VscClose className="mb-2" onClick={() => handleDeleteOrder(index)} />
                            </NavLink>
                          </NavItem>
                        ))}
                      </Nav>

                      <TabContent activeTab={activeTab}>
                        {orders.map((order, index) => (
                          <TabPane tabId={`${index + 1}`} key={index}>
                            <Order />
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
