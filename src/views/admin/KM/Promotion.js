import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Form, Col, FormGroup, Input, Button, Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";

import Header from "components/Headers/Header.js";
import Promo from "views/admin/KM/Promo.js"
import Voucher from "views/admin/KM/Voucher.js"

class Promotion extends React.Component {
    state = {
        iconTabs: 1,
        plainTabs: 1,
    };
    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index,
        });
    };
    render() {
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        <Col>
                            {/* Tabs with icons */}
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="bg-transparent">
                                        <h3 className="mb-0">Khuyến mại</h3>
                                    </CardHeader>
                                    <CardBody>
                                    <div className="nav-wrapper">
                                <Nav
                                    className="nav-fill flex-column flex-md-row"
                                    id="tabs-icons-text"
                                    pills
                                    role="tablist"
                                >
                                    <NavItem>
                                        <NavLink
                                            aria-selected={this.state.iconTabs === 1}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: this.state.iconTabs === 1,
                                            })}
                                            onClick={(e) => this.toggleNavs(e, "iconTabs", 1)}
                                            href="#"
                                            role="tab"
                                        >
                                            <i className="ni ni-cloud-upload-96 mr-2" />
                                            Theo hóa đơn
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            aria-selected={this.state.iconTabs === 2}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: this.state.iconTabs === 2,
                                            })}
                                            onClick={(e) => this.toggleNavs(e, "iconTabs", 2)}
                                            href="#"
                                            role="tab"
                                        >
                                            <i className="ni ni-bell-55 mr-2" />
                                            Theo sản phẩm
                                        </NavLink>
                                    </NavItem>

                                </Nav>
                            </div>
                            <Card className="shadow">
                                <CardBody>
                                    <TabContent activeTab={"iconTabs" + this.state.iconTabs}>
                                        <TabPane tabId="iconTabs1">
                                           <Voucher />
                                        </TabPane>
                                        <TabPane tabId="iconTabs2">
                                            <Promo />
                                        </TabPane>

                                    </TabContent>
                                </CardBody>
                            </Card>
                                    </CardBody>
                                </Card>
                            </div>
                            
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

}
export default Promotion;
