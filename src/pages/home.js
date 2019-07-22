import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

import { Grid, Header, Icon } from 'semantic-ui-react'


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

const mapStateToProps = () => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);