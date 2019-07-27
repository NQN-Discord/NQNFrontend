import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import {Menu, Image, Grid} from 'semantic-ui-react';

import "./server_list.css";

class GuildSelector extends Component {
  render() {
    return (
      <Grid.Column className="server_list">
        <Menu pointing secondary compact vertical>
          {Object.keys(this.props.guilds).map(guildID => {
            return (
              <Menu.Item
                key={guildID}
                active={this.props.selected === guildID}
                onClick={() => this.props.onSelect(this.props.selected === guildID ? null : guildID)}
                fitted
              >
                <Image
                  src={this.props.icons[guildID]}
                  alt={this.props.name_map[guildID]}
                  size="tiny"
                />
              </Menu.Item>
            );
          })}
        </Menu>
      </Grid.Column>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    icons: state.user.guild_icons,
    guilds: state.user.guilds,
    name_map: state.user.name_map,
  }
};
export default connect(
  mapStateToProps,
  null
)(GuildSelector);