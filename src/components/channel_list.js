import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import {Menu, Button, Icon, Loader} from 'semantic-ui-react';

import "./channel_list.css";
import {fetchChannels} from "../actions/guild";

class ChannelSelector extends Component {
  render() {
    const guild = this.props.guilds[this.props.guildID];
    if (!guild) {
      return <div/>
    }
    const channelsLoaded = guild.loaded_channels;
    if (!channelsLoaded) {
      this.props.fetchChannels(this.props.guildID);
    }
    const channels = guild.channels;
    const perms = ["manage_guild", "manage_emojis", "view_audit_log"];
    const showGear = perms.some(perm => guild.user_permissions.includes(perm));

    return (
      <div className="channel_list">
        <Menu pointing vertical secondary>
          <Menu.Item header>
            <Button
              icon
              labelPosition='right'
              onClick={() => this.props.showSettings(showGear)}
            >
              {guild.name}
              {showGear && <Icon name='setting'/>}
            </Button>
          </Menu.Item>
          <Loader active={!channelsLoaded} inline="centered"/>
          {Object.entries(channels).map(([id, {name}]) => {
            return (
              <Menu.Item
                key={id}
                active={this.props.selected === id}
                onClick={() => this.props.onSelect(this.props.selected === id ? null : id)}
              >
                {name}
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guilds: state.user.guilds
  }
};


const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: (guild) => dispatch(fetchChannels(guild))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSelector);