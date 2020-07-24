import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import update from "immutability-helper";

import GuildSelector from "../components/server_list";
import ChannelSelector from "../components/channel_list";
import GuildSettingsRoot from "./guild_settings_root";
import PostBox from "../components/post_box";

import {Container, Grid} from 'semantic-ui-react';

import "./server_view.css";


class WebhookPage extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      selectedGuild: null,
      selectedChannel: null,
      showSettingsFor: null
    };
  }

  componentDidMount() {
    const channelID = this.props.match.params.channelID;
    if (channelID) {
      this.setState(update(this.state, {$merge: {selectedChannel: channelID}}));
    }
    const guildID = this.props.match.params.guildID;
    if (guildID) {
      this.setState(update(this.state, {$merge: {showSettingsFor: guildID}}));
    }
  }

  getGuild(channelID) {
    return Object.keys(this.props.guilds).find(guildID => {
      return Object.keys(this.props.guilds[guildID].channels).includes(channelID);
    });
  }

  render() {
    const selectedGuild = this.getGuild(this.state.selectedChannel);
    return (
      <Container fluid>
        <Grid>
          <GuildSelector
            selected={this.state.selectedGuild}
            onSelect={guildID => this.setState(update(this.state, {$merge: {selectedGuild: guildID}}))}
          />
          { this.state.selectedGuild !== null &&
            <ChannelSelector
              guildID={this.state.selectedGuild}
              selected={this.state.selectedChannel}
              onSelect={(channelID) => {
                this.setState(update(this.state,
                  {$merge: {
                      selectedChannel: channelID,
                      selectedGuild: null,
                      showSettingsFor: null
                    }}
                ));
                if (channelID !== null) {
                  this.props.history.push(`/channels/${channelID}`);
                } else {
                  this.props.history.push(`/channels/`);
                }
              }}
              showSettings={() => {
                this.setState(update(this.state, {
                  $merge: {
                    selectedGuild: null,
                    selectedChannel: null,
                    showSettingsFor: this.state.selectedGuild
                  }
                }));
                const perms = {
                  "manage_emojis": "emotes",
                  "view_audit_log": "logs",
                  "manage_guild": "settings",
                };
                const guild = this.props.guilds[this.state.selectedGuild];
                const perm = Object.keys(perms).reduce((found, perm) => {
                  if (guild.user_permissions.includes(perm)) {
                    return perm;
                  }
                  return found;
                }, "");

                this.props.history.push(`/guilds/${this.state.selectedGuild}/${perms[perm]}`);
              }}
            />
          }
          <Grid.Column className={`message_container ${this.state.selectedGuild === null? "": "with_channel"}`}>
            { this.state.showSettingsFor !== null && Object.keys(this.props.guilds).length !== 0 &&
              <GuildSettingsRoot
                guildID={this.state.showSettingsFor}
              />
            }
            { this.state.selectedChannel !== null && selectedGuild &&
              <PostBox
                guildID={selectedGuild}
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
    guilds: state.user.guilds
  }
};

export default connect(
  mapStateToProps,
  null
)(WebhookPage);