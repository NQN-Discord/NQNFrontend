/*global BigInt */

import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {Container, Card, Divider, Button, Modal, Image, Checkbox} from "semantic-ui-react";

import "./guild_builder.css";
import {parse} from "query-string";
import {EmoteCard} from "../../components/emote";
import GuildSelector from "../../components/server_list";
import {inviteURLWithPerms, redirect_uri, generalPermissions} from "../../config";
import update from "immutability-helper";


const discordEmoji = /<(?<animated>a)?:(?<name>[-_a-zA-Z0-9]+):(?<id>\d{16,18})>/;


class GuildSelectorPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const query = parse(this.props.location.search);
    const emotes = (query.emote || []).map(emoteStr => discordEmoji.exec(emoteStr).groups);
    const guild_id = query.guild_id;

    console.log(guild_id)

    return (
      <div>
        {this.renderModal(guild_id, emotes)}
        <Container>
          <h1>Emoji Upload</h1>
          <p>
            Choose the server you want to upload these emotes to:
            <br/>
            <em>Please remember to only upload emojis that you have permission to do so.</em>
          </p>

          <Card.Group className="guild_creator">
            {emotes.map((emote, i) =>
              <EmoteCard
                key={i}
                emote={emote}
                isSelected={false}
              />
            )}
          </Card.Group>

          <Divider/>

          <GuildSelector
            guilds={Object.entries(this.props.guilds).filter(([guildID, guild]) => this.hasPermissions(guild))}
            bot_permissions={["manage_emojis"]}
            onSelect={guildID => {
              const guild = this.props.guilds[guildID];

              const href = new URL(window.location.href);
              href.searchParams.set("guild_id", guildID);

              if (guild.bot_in_guild && (guild.bot_permissions.includes("manage_emojis") || guild.bot_permissions.includes("administrator"))) {
                this.props.history.push(href.pathname + href.search);
              } else {
                const invitePerms = (BigInt(guild.bot_role_permissions) | BigInt("0x40000000") | BigInt(generalPermissions)).toString();

                localStorage.setItem("redirect", href.toString());
                window.open(`${inviteURLWithPerms(invitePerms, "guild_selector", redirect_uri)}&guild_id=${guildID}&disable_guild_select=true`, "_top");
              }
            }}
          />

        </Container>
      </div>
    )
  }

  renderModal(guild_id, emotes) {
    const guild = this.props.guilds[guild_id];
    if (!guild) {
      return <div/>;
    }
    console.log(guild)

    const number = emotes.length;
    const s = number !== 1 ? "s" : "";

    return (
      <Modal
        onClose={() => this.clearGuildId()}
        open={guild_id !== undefined}
        centered={true}
      >
        <Modal.Header>Upload {number} emoji{s} to {guild.name}</Modal.Header>
        <Modal.Content image>
          <Image
            src={guild.icon}
            size="small"
            wrapped
          />
          <Modal.Description>
            <p>
              This will upload {number} emoji{s} to {guild.name}. Do you have permission to do this?
            </p>

            <Checkbox
              label="I have permission to upload all of these emotes, and give permission to NQN to upload them on my behalf"
              checked={this.state.uploadAgree}
              onClick={() => {
                this.setState(update(this.state, {$merge: {uploadAgree: !this.state.uploadAgree}}));
              }}
            />
            <Checkbox
              label="Upload new aliases I create to this server automatically"
              checked={this.state.uploadAliases}
              onClick={() => {
                this.setState(update(this.state, {$merge: {uploadAliases: !this.state.uploadAliases}}));
              }}
            />
            <Checkbox
              label="I will only alias emojis that I have permission to upload, and give permission to NQN to upload them on my behalf"
              checked={this.state.uploadAliases && this.state.futureUploadAgree}
              disabled={!this.state.uploadAliases}
              onClick={() => {
                if (this.state.uploadAliases) {
                  this.setState(update(this.state, {$merge: {futureUploadAgree: !this.state.futureUploadAgree}}));
                }
              }}
              style={{"marginLeft": "24px"}}
            />
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={() => this.clearGuildId()}>
            Cancel
          </Button>

          <Button
            content="Upload"
            labelPosition="right"
            icon="checkmark"
            positive
            disabled={!this.state.uploadAgree || (this.state.uploadAliases && !this.state.futureUploadAgree)}
            onClick={() => {
              console.log("Awoooo")
            }}
          />
        </Modal.Actions>
      </Modal>
    );
  }

  clearGuildId() {
    const href = new URL(window.location.href);
    href.searchParams.delete("guild_id");

    this.props.history.push(href.pathname + href.search);
  }

  hasPermissions(guild) {
    return guild.user_permissions.includes("manage_emojis") && (guild.bot_in_guild || guild.user_permissions.includes("manage_guild"));
  }
}

const mapStateToProps = (state) => {
  return {
    guilds: state.user.guilds
  }
};

const mapDispatchToProps = dispatch => {
  return {

  }

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuildSelectorPage);
