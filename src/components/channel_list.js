import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import {Menu, Grid, Button, Icon} from 'semantic-ui-react';

import "./channel_list.css";

class ChannelSelector extends Component {
  render() {
    return (
      <Grid.Column className="channel_list">
        <Menu pointing vertical secondary>
          {this.props.guildName &&
            <Menu.Item header>
              <Button icon labelPosition='right'>
                {this.props.guildName}
                <Icon name='setting' />
              </Button>
            </Menu.Item>
          }
          {this.props.channels.map(channelID => {
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
    name_map: state.user.name_map,
  }
};

export default connect(
  mapStateToProps,
  null
)(ChannelSelector);