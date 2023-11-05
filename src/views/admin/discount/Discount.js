import React from 'react';
import classnames from "classnames";
// reactstrap components
import { Card, CardBody, Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from "reactstrap";

import SaleProduct from "views/admin/discount/SaleProduct.js";
import SaleBills from "views/admin/discount/SaleBills.js";
class Discount extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        const navItemStyle = {
            flex: 1,
            textAlign: 'center',
            fontSize: '14px',
        };
        return (
            <>
                
                <Container className="pt-5 pt-md-7" fluid>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardBody>
                                    <div>
                                        <Nav tabs>
                                            <NavItem >
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '1' })}
                                                    onClick={() => { this.toggle('1'); }}
                                                >
                                                    Hóa đơn
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '2' })}
                                                    onClick={() => { this.toggle('2'); }}
                                                >
                                                    Sản phẩm
                                                </NavLink>
                                            </NavItem>

                                        </Nav>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1">
                                                <Row>
                                                    <Col sm="12">
                                                        <SaleBills />
                                                    </Col>

                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <Row>
                                                    <Col sm="12">
                                                        <SaleProduct />
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>

                </Container>
            </>
        );
    }
}
export default Discount;
