import React, {Component} from 'react';

import { Grid, Header } from 'semantic-ui-react'


class HomePage extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <Grid textAlign='center'>
        <Grid.Column style={{ maxWidth: '16cm' }} centered>
          <Header as='h2' icon textAlign='center'>
            <Header.Content>
              Welcome to Not Quite Nitro
            </Header.Content>
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default HomePage;