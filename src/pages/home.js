import React, {Component} from 'react';

import { Header, Container, Divider } from 'semantic-ui-react'
import {HelpText} from "../components/helpText";
import connect from "react-redux/es/connect/connect";
import {TopHeader} from "../header";


class HomePage extends Component {
  render() {
    return (
      <div>
        {!this.props.loggedIn &&
          <TopHeader/>
        }
        <Container>
          <Header as='h2' icon textAlign='center'>
            <Header.Content>
              Welcome to Not Quite Nitro
            </Header.Content>
          </Header>
          <HelpText isBotList={false}/>
          <Divider/>
        </Container>
      </div>
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
