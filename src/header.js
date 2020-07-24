import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {withRouter} from 'react-router-dom';

import {logout} from "./actions/auth";
import {inviteURL} from "./config";

import {Menu} from 'semantic-ui-react';


class TopHeaderO extends Component {
  render() {
    return (
      <Menu className="header secondary">
        <Menu.Menu position='left'>
          <Menu.Item
            active={false}
            onClick={() => {
              this.props.history.push("/");
            }}
            className="unisans nqn_header"
          >
            NQN
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item as="a" href={inviteURL} target="_blank" rel="noopener">
            Invite Me
          </Menu.Item>
          { this.props.loggedIn &&
            <Menu.Item
              onClick={() => {
                this.props.logout();
              }}
            >
              Logout
            </Menu.Item>
          }
          {!this.props.loggedIn &&
            <Menu.Item
              onClick={() => {
                this.props.history.push("/login");
              }}
            >
              Login
            </Menu.Item>
          }
        </Menu.Menu>
      </Menu>
    )
  }
}


class HeaderO extends Component {
  render() {
    const activeElement = this.props.location.pathname.split("/", 2)[1];
    return (
        <Menu className="header">
          <Menu.Menu position='right'>
            <Menu.Item
              active={activeElement === "guilds"}
              onClick={() => {
                this.props.history.push("/guilds");
              }}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              active={activeElement === "emote_manager"}
              onClick={() => {
                this.props.history.push("/emote_manager/overview");
              }}
            >
              My Emotes
            </Menu.Item>
          </Menu.Menu>
        </Menu>
    );
  }
}


class BottomFooterO extends Component {
  render() {
    const activeElement = this.props.location.pathname.split("/", 2)[1];
    return (
      <Menu className="header secondary footer" stackable>
        <Menu.Menu position='left'>
          <Menu.Item
            header
          >
            NQN is not affiliated with Discord
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item
            active={activeElement === "licenses"}
            onClick={() => {
              this.props.history.push("/licenses");
            }}
          >
            Licenses
          </Menu.Item>
          <Menu.Item
            active={activeElement === "privacy"}
            onClick={() => {
              this.props.history.push("/privacy");
            }}
          >
            Privacy
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
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

export let Header = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderO));

export let TopHeader = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TopHeaderO));

export let BottomFooter = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomFooterO));