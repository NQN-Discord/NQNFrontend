import React, {Component} from 'react';

import { Header, Container, List } from 'semantic-ui-react'
import GuildSettings from "./guild_dashboard/settings/guild_settings";
import {parse} from "query-string";
import connect from "react-redux/es/connect/connect";

import "./joined_server.css";


class JoinedPage extends Component {
  render() {
    const query = parse(this.props.location.search);
    if (!query.guild_id) {
      return <div/>
    }
    const guild = this.props.guilds[query.guild_id];
    if (!guild) {
      return <div/>
    }

    return (
      <div>
        <Header as='h2' icon textAlign='center'>
          <Header.Content>
            Thank you for inviting NQN to {guild.name}
          </Header.Content>
        </Header>
        <Container>
          <p>
            You'll probably want to start off by testing out what the bot can do. We've had a look at the channels and
            can run commands in all of the following:
          </p>
          {Object.entries(guild.channels).map(([id, channel]) =>
            <List.Item key={id}>
              <List.Icon name='hashtag'/>
              <List.Content>{channel.name}</List.Content>
            </List.Item>
          )}
          <br/>
          <p>
            In any of these channels, try posting <code>NQN is a bot which allows everyone in the server
            free Nitro :nqn-nqn:</code>, and the bot will replace that with a new message with the actual emote.
            This makes use of our emote pack functionality to work straight out of the box.
          </p>
          <p>
            NQN can only use emotes that are in servers it is also in, and defaults to letting you use emotes in any
            server you and the bot share. <code>{guild.prefix}search</code> allows you to add additional emotes the bot
            has to your list.
          </p>
          <p>
            Due to how NQN can only use emotes in servers it's in, adding NQN to servers helps everyone.
            You because you can use more emotes, and them to gain Nitro.
          </p>
          <p>
            The help for NQN can be accessed by running <code>{guild.prefix}help</code> in the Discord client.
          </p>
          <hr/>
          <p>
            As a server admin, you can change the server settings for NQN, which are provided below.
            <br/>
            More server specific settings can be found with <code>{guild.prefix}server</code>.
          </p>
          <GuildSettings guildID={query.guild_id} showHeader={false}/>
        </Container>
      </div>
    )}
}


const mapStateToProps = (state) => {
  return {
    guilds: state.user.guilds
  }
};

export default connect(
  mapStateToProps,
  null
)(JoinedPage);