import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import {Menu, Button, Icon, Loader, Message} from 'semantic-ui-react';

import '../semantic/src/definitions/collections/menu.less';
import '../semantic/src/definitions/elements/button.less';
import '../semantic/src/definitions/elements/icon.less';
import '../semantic/src/definitions/elements/loader.less';
import '../semantic/src/definitions/collections/message.less';


import "./channel_list.css";
import {fetchChannels} from "../actions/guild";

class ChannelSelector extends Component {
  render() {
    const guild = this.props.guilds[this.props.guildID];
    if (!guild) {
      return <div/>
    }
    const enableDashboardPosting = guild.dashboard_posting;
    const channelsLoaded = guild.loaded_channels;
    if (enableDashboardPosting && !channelsLoaded) {
      this.props.fetchChannels(this.props.guildID);
    }
    const channels = guild.channels;
    const perms = ["manage_guild", "manage_emojis", "view_audit_log"];
    const showGear = perms.some(perm => guild.user_permissions.includes(perm));
    const showChannels = this.props.showChannels;

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
          {enableDashboardPosting &&
            <div>
              <Loader active={!channelsLoaded} inline="centered"/>
              {showChannels && Object.entries(channels).filter(([id, {hidden}]) => !hidden).map(([id, {name}]) => {
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
            </div>
          }
          {!enableDashboardPosting &&
            <Message warning>
              <Message.Header>
                Posting disabled
              </Message.Header>
            </Message>
          }
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