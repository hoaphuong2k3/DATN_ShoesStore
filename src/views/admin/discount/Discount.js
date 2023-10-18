import React from 'react';

import classnames from "classnames";
// reactstrap components
import {
    Card,
    CardBody,
    CardHeader,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Row,
    Col,
    Container
} from "reactstrap";

import Header from "components/Headers/Header.js";
import SalePromo from "views/admin/discount/SalePromo.js";
import SaleProduct from "views/admin/discount/SaleProduct.js";
import SaleBills from "views/admin/discount/SaleBills.js";
class Discount extends React.Component {
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

                                        <Row className="align-items-center">
                                            <div className="col">
                                                <h3 className="mb-0">Khuyến mại</h3>
                                            </div>
                                        </Row>
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
                                                        role="tab"
                                                    >
                                                        <i className="ni ni-cloud-upload-96 mr-2" />
                                                        Hóa đơn
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        aria-selected={this.state.iconTabs === 2}
                                                        className={classnames("mb-sm-3 mb-md-0", {
                                                            active: this.state.iconTabs === 2,
                                                        })}
                                                        onClick={(e) => this.toggleNavs(e, "iconTabs", 2)}
                                                        role="tab"
                                                    >
                                                        <i className="ni ni-bell-55 mr-2" />
                                                        Sản phẩm
                                                    </NavLink>
                                                </NavItem>
                                                

                                            </Nav>
                                        </div>
                                        <Card className="shadow">
                                            <CardBody>
                                                <TabContent activeTab={"iconTabs" + this.state.iconTabs}>
                                                    <TabPane tabId="iconTabs1">
                                                    <SaleBills />
                                                    </TabPane>
                                                    <TabPane tabId="iconTabs2">
                                                        <SaleProduct />
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
export default Discount;
