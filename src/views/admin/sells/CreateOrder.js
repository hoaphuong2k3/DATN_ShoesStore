import React, { useState } from "react";
import { Row, Col, Button, Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";
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
        <Row className="align-items-center my-4">
            <Col>
                <Button size="sm" color="primary" onClick={handleCreateOrder}>
                   + Danh sách
                </Button>

                <Nav tabs className="my-4">
                    {orders.map((order, index) => (
                        <NavItem key={index} style={{fontSize:13}}>
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
    );
};

export default CreateOrderPage;
