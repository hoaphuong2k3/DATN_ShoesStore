import React from 'react';
import classnames from "classnames";
import { Card, CardBody, Container, TabContent, TabPane, Nav, NavItem, NavLink, Row } from "reactstrap";

// core components
import CreateOrder from "views/admin/sells/CreateOrder.js";
import OrderHistory from "views/admin/sells/OrderHistory.js";

class Sales extends React.Component {
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
                      <NavItem style={navItemStyle}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggle('1'); }}
                        >
                          Tạo mới
                        </NavLink>
                      </NavItem>
                      <NavItem style={navItemStyle}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' })}
                          onClick={() => { this.toggle('2'); }}
                        >
                          Lịch sử đơn hàng
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <CreateOrder />
                      </TabPane>
                      <TabPane tabId="2">
                        <OrderHistory />
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

export default Sales;
