import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import update from "immutability-helper";

import GuildSelector from "../components/server_list";
import ChannelSelector from "../components/channel_list";
import HomePage from "./home";
import PostBox from "../components/post_box";

import {Container, Grid} from 'semantic-ui-react';

import "./webhook_poster.css";


class WebhookPage extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      selectedGuild: null,
      selectedChannel: null,
      message: []
    };
  }

  componentDidMount() {
    const channelID = this.props.match.params.id;
    if (channelID) {
      this.setState(update(this.state,
        {
          $merge: {
            selectedChannel: channelID
          }
        }
      ));
    }
  }

  getGuild(channelID) {
    return Object.keys(this.props.guilds).find(guildID => {
      return this.props.guilds[guildID].includes(channelID);
    });
  }

  render() {
    return (
      <Container fluid>
        <Grid>
          <GuildSelector
            selected={this.state.selectedGuild}
            onSelect={guildID => this.setState(update(this.state, {$merge: {selectedGuild: guildID}}))}
          />
          { this.state.selectedGuild !== null &&
            <ChannelSelector
              guildName={this.props.name_map[this.state.selectedGuild]}
              channels={this.props.guilds[this.state.selectedGuild]}
              selected={this.state.selectedChannel}
              onSelect={(channelID) => {
                this.setState(update(this.state,
                  {$merge: {
                      selectedChannel: channelID,
                      selectedGuild: null
                    }}
                ));
                if (channelID !== null) {
                  this.props.history.push(`/channels/${channelID}`);
                } else {
                  this.props.history.push(`/channels/`);
                }
              }}
            />
          }
          <Grid.Column className={`message_container ${this.state.selectedGuild === null? "": "with_channel"}`}>
            { this.state.selectedChannel === null &&
              <HomePage/>
            }
            { this.state.selectedChannel !== null &&
              <PostBox
                guildID={this.getGuild(this.state.selectedChannel)}
                channelID={this.state.selectedChannel}
              />
            }
          </Grid.Column>
        </Grid>
      </Container>
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
)(WebhookPage);