import React, {Component} from 'react';

import { Header } from 'semantic-ui-react'
import {HelpText} from "../components/helpText";


class HomePage extends Component {
  render() {
    return (
      <div>
        <Header as='h2' icon textAlign='center'>
          <Header.Content>
            Welcome to Not Quite Nitro
          </Header.Content>
        </Header>
        <HelpText dbl={false}/>
      </div>
    )}
  }

  export default HomePage;