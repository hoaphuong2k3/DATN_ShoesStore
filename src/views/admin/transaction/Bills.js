import React from 'react';
import classnames from "classnames";
import { Card, CardBody, Container, TabContent, TabPane, Nav, NavItem, NavLink, Row } from "reactstrap";
import { Badge } from 'antd';
import axios from 'axios';
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
      activeTab: '0',
      counts: {
        '0': 0,
        '1': 0,
        '2': 0,
      },
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const [response0, response1, response2] = await Promise.all([
        axios.get('http://localhost:33321/api/order/admin/countStatus?status=0'),
        axios.get('http://localhost:33321/api/order/admin/countStatus?status=1'),
        axios.get('http://localhost:33321/api/order/admin/countStatus?status=2'),

      ]);

      const counts = {
        '0': response0.data.data || 0,
        '1': response1.data.data || 0,
        '2': response2.data.data || 0,

      };

      this.setState({
        counts,
      });
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  }

  toggle(tab, status) {
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

    const renderNavItem = (status, label) => (
      <NavItem key={status} style={navItemStyle}>
        <Badge count={this.state.counts[status] || 0}>
          <NavLink
            className={classnames({ active: this.state.activeTab === status.toString() })}
            onClick={() => { this.toggle(status.toString()); }}
            style={{ fontWeight: this.state.activeTab === status.toString() ? 'bold' : 'normal' }}
          >
            {label}
          </NavLink>
        </Badge>
      </NavItem>
    );

    return (
      <>
        <Container className="pt-5 pt-md-7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardBody>
                  <div>
                    <Nav tabs style={{ display: 'flex', justifyContent: 'space-around' }}>
                      {renderNavItem('0', 'Chờ xác nhận')}
                      {renderNavItem('1', 'Chờ vận chuyển')}
                      {renderNavItem('2', 'Đang vận chuyển')}
                      <NavItem style={navItemStyle}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '4' })}
                          onClick={() => { this.toggle('4'); }}
                          style={{ fontWeight: this.state.activeTab === '4' ? 'bold' : 'normal' }}
                        >
                          Hoàn thành
                        </NavLink>
                      </NavItem>
                      <NavItem style={navItemStyle}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '5' })}
                          onClick={() => { this.toggle('5'); }}
                          style={{ fontWeight: this.state.activeTab === '5' ? 'bold' : 'normal' }}
                        >
                          Đã nhận
                        </NavLink>
                      </NavItem>
                      <NavItem style={navItemStyle}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '6' })}
                          onClick={() => { this.toggle('6'); }}
                          style={{ fontWeight: this.state.activeTab === '6' ? 'bold' : 'normal' }}
                        >
                          Hủy
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="0">
                        <Confirm />
                      </TabPane>
                      <TabPane tabId="1">
                        <Waitting />
                      </TabPane>
                      <TabPane tabId="2">
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
