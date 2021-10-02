import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {withRouter} from 'react-router-dom';

import {logout} from "./actions/auth";

import {Menu} from 'semantic-ui-react';
import './semantic/src/definitions/collections/menu.less';


class HeaderO extends Component {
  componentDidMount() {
    this.sendGoogleAnalytics();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.sendGoogleAnalytics();
    }
  }

  sendGoogleAnalytics() {
    const pagePath = this.props.location.pathname.replace(/\d+/ig, "...");
    window.gtag('config', 'UA-143037513-1', {'page_path': pagePath});
  }

  render() {
    const activeElement = this.props.location.pathname.split("/", 2)[1];
    return (
      <div>
      <Menu className="header secondary">
        <Menu.Menu position='left'>
          <Menu.Item
            active={false}
            onClick={() => {
              this.props.history.push("/");
            }}
            className="bot_font nqn_header"
          >
            NQN
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position='right'>
          {this.props.loggedIn &&
            <Menu.Item
              className="hidden_on_small"
              active={activeElement === "guilds"}
              onClick={() => {
                this.props.history.push("/guilds");
              }}
            >
              Dashboard
            </Menu.Item>
          }
          {this.props.loggedIn &&
            <Menu.Item
              className="hidden_on_small"
              active={activeElement === "emote_manager"}
              onClick={() => {
                this.props.history.push("/emote_manager/overview");
              }}
            >
              My Emotes
            </Menu.Item>
          }

          <Menu.Item
            className="hidden_on_tiny"
            as="a"
            onClick={() => {
              this.props.history.push("/packs")
            }}
            target="_blank"
            rel="noopener"
          >
            Packs
          </Menu.Item>
          <Menu.Item
            as="a"
            onClick={() => {
              this.props.history.push("/invite")
            }}
            target="_blank"
            rel="noopener"
          >
            Get NQN
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
        <Menu className="header only_on_small">
          <Menu.Menu position='right'>
            <Menu.Item
              className="only_on_tiny"
              as="a"
              onClick={() => {
                this.props.history.push("/packs")
              }}
              target="_blank"
              rel="noopener"
            >
              Packs
            </Menu.Item>
            {this.props.loggedIn && <>
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
            </>}
          </Menu.Menu>
        </Menu>
      </div>
    )
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
          { window["nitroAds"] &&
            <Menu.Item
              data-ccpa-link="1"
              as="a"
              className="ccpa-style"
              style={{marginRight: "48px"}}
            />
          }
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

export let BottomFooter = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomFooterO));
