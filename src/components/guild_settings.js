import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import {Container, Header, Form, Label, Input, Button} from 'semantic-ui-react';

import "./channel_list.css";

class GuildSettings extends Component {
  render() {
    const guild = this.props.guilds[this.props.guildID];
    const guildName = this.props.name_map[this.props.guildID];

    return (
      <Container>
        <Header as="h3">
          Settings for {guildName}
        </Header>
        <Form>
          <Form.Field inline>
            <Form.Input label="Prefix"/>
          </Form.Field>
          <Form.Field inline>
            <Form.Input label="Boost Channel"/>
          </Form.Field>
          <Form.Field inline>
            <Form.Input label="Announcement Channel"/>
          </Form.Field>
          <Button type='submit'>Save</Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guilds: state.user.guilds,
    name_map: state.user.name_map,
  }
};

export default connect(
  mapStateToProps,
  null
)(GuildSettings);