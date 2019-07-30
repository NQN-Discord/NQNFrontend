import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import {Menu, Grid, Button, Icon} from 'semantic-ui-react';

import "./channel_list.css";

class ChannelSelector extends Component {
  render() {
    const guild = this.props.guilds[this.props.guildID];
    const channels = guild.channels;
    const showGear = guild.permissions.includes("manage_guild") || guild.permissions.includes("manage_emojis");

    return (
      <Grid.Column className="channel_list">
        <Menu pointing vertical secondary>
          {guild.name &&
            <Menu.Item header>
              {showGear &&
                <Button
                  icon
                  labelPosition='right'
                  onClick={() => this.props.showSettings()}
                >
                  {guild.name}
                  <Icon name='setting'/>
                </Button>
              }
              {!showGear && guild.name}
            </Menu.Item>
          }
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
      </Grid.Column>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guilds: state.user.guilds
  }
};

export default connect(
  mapStateToProps,
  null
)(ChannelSelector);