import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {withRouter} from 'react-router-dom';

import {logout} from "./actions/auth";
import {inviteURL} from "./config";

import {Menu} from 'semantic-ui-react';


class Header extends Component {
  render() {
    const activeElement = this.props.location.pathname;
    return (
        <Menu>
          <Menu.Menu className="header" position='right'>
            <Menu.Item as="a" href={inviteURL} target="_blank" rel="noopener">
              Invite Me
            </Menu.Item>
            <Menu.Item
              active={activeElement === "/channels"}
              onClick={() => {
                this.props.history.push("/channels");
              }}
            >
              Post
            </Menu.Item>
            <Menu.Item
              active={activeElement === "/search"}
              onClick={() => {
                this.props.history.push("/search");
              }}
            >
              Find Emotes
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                this.props.logout();
              }}
            >
              Logout
            </Menu.Item>
          </Menu.Menu>
        </Menu>
    );
  }
}


const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    results: state.search
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header));