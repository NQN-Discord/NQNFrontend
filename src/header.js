import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';

import {logout} from "./actions/auth";

import {Menu} from 'semantic-ui-react';
import './semantic/src/definitions/collections/menu.less';


class HeaderO extends Component {
  componentDidMount() {
    this.sendAnalytics();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.sendAnalytics();
    }
  }

  sendAnalytics() {
    const pagePath = this.props.location.pathname.replace(/\/\d+(\/?)/g, "/_ID_$1");
    const fullPath = window.location.origin + pagePath + window.location.search;
    window.plausible('pageview', { u: fullPath});
  }

  render() {
    const activeElement = this.props.location.pathname.split("/", 2)[1];
    return (
      <div>
      <Menu className="header secondary">
        <Menu.Menu position='left'>
          <Menu.Item
            active={false}
            as={Link}
            to={"/"}
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
              as={Link}
              to={"/guilds"}
            >
              Dashboard
            </Menu.Item>
          }
          {this.props.loggedIn &&
            <Menu.Item
              className="hidden_on_small"
              active={activeElement === "emote_manager"}
              as={Link}
              to={"/emote_manager/overview"}
            >
              My Emotes
            </Menu.Item>
          }

          <Menu.Item
            className="hidden_on_tiny"
            as={Link}
            to={"/packs"}
            rel="noopener"
          >
            Packs
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={"/invite"}
            target="_blank"
            rel="noopener"
          >
            Get NQN
          </Menu.Item>
          { this.props.loggedIn &&
            <Menu.Item
              onClick={() => this.props.logout()}
            >
              Logout
            </Menu.Item>
          }
          {!this.props.loggedIn &&
            <Menu.Item
              as={Link}
              to={"/login"}
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
              as={Link}
              to={"/packs"}
              rel="noopener"
            >
              Packs
            </Menu.Item>
            {this.props.loggedIn && <>
              <Menu.Item
                active={activeElement === "guilds"}
                as={Link}
                to={"/guilds"}
              >
                Dashboard
              </Menu.Item>
              <Menu.Item
                active={activeElement === "emote_manager"}
                as={Link}
                to={"/emote_manager/overview"}
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
            as={Link}
            to={"/licenses"}
          >
            Licenses
          </Menu.Item>
          <Menu.Item
            active={activeElement === "terms"}
            as={Link}
            to={"/terms"}
          >
            Terms
          </Menu.Item>
          <Menu.Item
            active={activeElement === "privacy"}
            as={Link}
            to={"/privacy"}
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
