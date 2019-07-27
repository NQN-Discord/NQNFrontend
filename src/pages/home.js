import React, {Component} from 'react';

import { Header, Container } from 'semantic-ui-react'
import {HelpText} from "../components/helpText";


class HomePage extends Component {
  render() {
    return (
      <Container>
        <Header as='h2' icon textAlign='center'>
          <Header.Content>
            Welcome to Not Quite Nitro
          </Header.Content>
        </Header>
        <HelpText/>
      </Container>
    )}
  }

  export default HomePage;