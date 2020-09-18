import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import update from "immutability-helper";

import GuildSelector from "../../components/server_list";
import ChannelSelector from "../../components/channel_list";
import GuildSettingsRoot from "./settings_root";
import PostBox from "../../components/post_box";

import {Container, Grid} from 'semantic-ui-react';

import "./server_view.css";
import classNames from "classnames";
import {inviteURL} from "../../config";


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
    const channelID = this.props.match.params.channelID || null;
    const guildID = this.props.match.params.guildID || null;
    const showSettingsFor = (this.props.match.params.page && guildID) || null;
    if (guildID || channelID || showSettingsFor) {
      this.setState(update(this.state, {$merge: {
        selectedGuild: guildID,
        selectedChannel: channelID,
        showSettingsFor
      }}));
    }
  }

  getGuild(channelID) {
    return Object.keys(this.props.guilds).find(guildID => {
      return Object.keys(this.props.guilds[guildID].channels).includes(channelID);
    });
  }

  setURL(guildID, channelID) {
    if (channelID !== null) {
      this.props.history.push(`/guilds/${guildID}/channels/${channelID}`);
    } else if (guildID !== null) {
      this.props.history.push(`/guilds/${guildID}`);
    } else {
      this.props.history.push(`/guilds`);
    }
  }

  render() {
    const selectedGuild = this.getGuild(this.state.selectedChannel);
    const showChannels = this.state.showSettingsFor === null;
    return (
      <Container fluid>
        <Grid>
          { this.state.selectedGuild !== null &&
            <ChannelSelector
              guildID={this.state.selectedGuild}
              selected={this.state.selectedChannel}
              onSelect={(channelID) => {
                this.setURL(this.state.selectedGuild, channelID);
                this.setState(update(this.state,
                  {$merge: {
                      selectedChannel: channelID,
                      showSettingsFor: null,
                    }}
                ));
              }}
              showChannels={showChannels}
              showSettings={(showSettings) => {
                if (!showSettings || this.state.showSettingsFor !== null) {
                  this.setURL(this.state.selectedGuild, null);
                  this.setState(update(this.state, {
                    $merge: {
                      selectedChannel: null,
                      showSettingsFor: null
                    }
                  }));
                  return
                }
                this.setState(update(this.state, {
                  $merge: {
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
          <div className={
            classNames(
              "message_container",
              {"no_channel_list": this.state.selectedGuild === null},
              {"discount_channel_list": !showChannels}
            )
          }>
            { this.state.selectedChannel === null && this.state.showSettingsFor === null &&
              <GuildSelector
                selected={this.state.selectedGuild}
                onSelect={guildID => {
                  if (!guildID || this.props.guilds[guildID].bot_in_guild) {
                    this.setURL(guildID, null);
                    this.setState(update(this.state, {$merge: {selectedGuild: guildID}}));
                  }
                  else {
                    window.open(inviteURL + `&guild_id=${guildID}`, '_blank');
                  }
                }}
              />
            }
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
          </div>
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