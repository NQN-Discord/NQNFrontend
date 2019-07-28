import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import {Menu, Grid, Button, Icon} from 'semantic-ui-react';

import "./channel_list.css";

class ChannelSelector extends Component {
  render() {
    const guild = this.props.guilds[this.props.guildID];
    const guildName = this.props.name_map[this.props.guildID];
    const channels = guild.channels;
    const showGear = guild.permissions.includes("manage_guild") || guild.permissions.includes("manage_emojis");

    return (
      <Grid.Column className="channel_list">
        <Menu pointing vertical secondary>
          {guildName &&
            <Menu.Item header>
              {showGear &&
                <Button icon labelPosition='right'>
                  {guildName}
                  <Icon name='setting'/>
                </Button>
              }
              {!showGear && guildName}
            </Menu.Item>
          }
          {channels.map(channelID => {
            return (
              <Menu.Item
                key={channelID}
                active={this.props.selected === channelID}
                onClick={() => this.props.onSelect(this.props.selected === channelID ? null : channelID)}
              >
                {this.props.name_map[channelID]}
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
    guilds: state.user.guilds,
    name_map: state.user.name_map,
  }
};

export default connect(
  mapStateToProps,
  null
)(ChannelSelector);