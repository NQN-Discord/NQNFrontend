import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import {Container} from 'semantic-ui-react';

import "./channel_list.css";

class GuildSettings extends Component {
  render() {
    const guild = this.props.guilds[this.props.guildID];
    const guildName = this.props.name_map[this.props.guildID];

    return (
      <Container>
        Settings for {guildName}
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