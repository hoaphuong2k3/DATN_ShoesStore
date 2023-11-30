import React from 'react';
import { Link } from 'react-router-dom'
import classnames from "classnames";
import { Card, CardBody, Container, TabContent, TabPane, Nav, NavItem, NavLink, Row } from "reactstrap";
import { connect } from 'react-redux';
import { updateData } from './actions';
// core components
import Confirm from "views/user/hoadon/Confirm.js";
import Waitting from "views/user/hoadon/Waitting.js";
import Shipping from "views/user/hoadon/Shipping.js";
import Success from "views/user/hoadon/Success.js";
import Received from "views/user/hoadon/Received.js";
import Cancel from "views/user/hoadon/Cancel.js";


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

  updateData = (tabId, newData) => {
    this.props.updateData(tabId, newData);
  };

  render() {

    const navItemStyle = {
      flex: 1,
      textAlign: 'center',
      fontSize: '14px',
    };

    return (
      <>
        <div >
          <Nav tabs style={{ display: 'flex', justifyContent: 'space-around' }}>
            <NavItem style={navItemStyle}>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
                style={{ fontWeight: this.state.activeTab === '1' ? 'bold' : 'normal' }}
              >
                Chờ xác nhận
              </NavLink>
            </NavItem>
            <NavItem style={navItemStyle}>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
                style={{ fontWeight: this.state.activeTab === '2' ? 'bold' : 'normal' }}
              >
                Chờ vận chuyển
              </NavLink>
            </NavItem>
            <NavItem style={navItemStyle}>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
                style={{ fontWeight: this.state.activeTab === '3' ? 'bold' : 'normal' }}
              >
                Đang vận chuyển
              </NavLink>
            </NavItem>
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
            <TabPane tabId="1" updateData={this.updateData}>
              <Confirm activeTab={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="2" updateData={this.updateData}>
              <Waitting activeTab={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="3" updateData={this.updateData}>
              <Shipping activeTab={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="4" updateData={this.updateData}>
              <Success activeTab={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="5" updateData={this.updateData}>
              <Received activeTab={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="6" updateData={this.updateData}>
              <Cancel activeTab={this.state.activeTab} />
            </TabPane>
          </TabContent>
        </div>

      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateData: (tabId, newData) => dispatch(updateData(tabId, newData)),
});

export default connect(null, mapDispatchToProps)(Bills);
