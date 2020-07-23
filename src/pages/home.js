import React, {Component} from 'react';

import { Header, Menu, Container, Divider } from 'semantic-ui-react'
import {HelpText} from "../components/helpText";
import connect from "react-redux/es/connect/connect";
import {inviteURL} from "../config";


class HomePage extends Component {
  render() {
    const rtn = (
      <div>
        {!this.props.loggedIn &&
          <Menu className="header">>
            <Menu.Menu className="header" position='right'>
              <Menu.Item as="a" href={inviteURL} target="_blank" rel="noopener">
                Invite Me
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Login
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        }
        <Header as='h2' icon textAlign='center'>
          <Header.Content>
            Welcome to Not Quite Nitro
          </Header.Content>
        </Header>
        <HelpText isBotList={false}/>
        <Divider/>
      </div>
    );
    return (
      <Container>
        {rtn}
      </Container>
    )}
  }


const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  }
};

const mapDispatchToProps = () => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
