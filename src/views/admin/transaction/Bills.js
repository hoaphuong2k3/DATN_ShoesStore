import React from 'react';
import classnames from "classnames";
import { Card, CardBody, Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from "reactstrap";

// core components
import Confirm from "views/admin/transaction/Confirm.js";
import Waitting from "views/admin/transaction/Waitting.js";
import Shipping from "views/admin/transaction/Shipping.js";
import Success from "views/admin/transaction/Success.js";
import Received from "views/admin/transaction/Received.js";
import Cancel from "views/admin/transaction/Cancel.js";


class Bills extends React.Component {
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
                    <Nav tabs style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <NavItem style={navItemStyle}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggle('1'); }}
                        >
                          Chờ xác nhận
                        </NavLink>
                      </NavItem>
                      <NavItem style={navItemStyle}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' })}
                          onClick={() => { this.toggle('2'); }}
                        >
                          Chờ vận chuyển
                        </NavLink>
                      </NavItem>
                      <NavItem style={navItemStyle}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '3' })}
                          onClick={() => { this.toggle('3'); }}
                        >
                          Đang vận chuyển
                        </NavLink>
                      </NavItem>
                      <NavItem style={navItemStyle}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '4' })}
                          onClick={() => { this.toggle('4'); }}
                        >
                          Hoàn thành
                        </NavLink>
                      </NavItem>
                      <NavItem style={navItemStyle}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '5' })}
                          onClick={() => { this.toggle('5'); }}
                        >
                          Đã nhận
                        </NavLink>
                      </NavItem>
                      <NavItem style={navItemStyle}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '6' })}
                          onClick={() => { this.toggle('6'); }}
                        >
                          Hủy
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <Confirm />
                      </TabPane>
                      <TabPane tabId="2">
                        <Waitting />
                      </TabPane>
                      <TabPane tabId="3">
                        <Shipping />
                      </TabPane>
                      <TabPane tabId="4">
                        <Success />
                      </TabPane>
                      <TabPane tabId="5">
                        <Received />
                      </TabPane>
                      <TabPane tabId="6">
                        <Cancel />
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

export default Bills;
