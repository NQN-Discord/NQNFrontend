import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import {Container, Header, Button, Divider, Menu, Icon} from 'semantic-ui-react';
import EmotePreview from "./emotes/preview";
import {postGuildEmotes} from "../../../actions/guild"
import {receiveGuildEmotes} from "../../../actions/user"

import {withRouter} from "react-router-dom";


class EmoteSettings extends Component {
  constructor(props) {
    super(props);
    const emotes = this.props.emotes[this.props.guildID] || [];
    this.state = {emotes};
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.guildID !== this.props.guildID) ||
        (prevProps.emotes[prevProps.guildID] !== this.props.emotes[this.props.guildID])) {
      const emotes = this.props.emotes[this.props.guildID] || [];
      this.setState({emotes});
    }
  }

  unsetNames(emotes) {
    this.setState({emotes: this.state.emotes.filter(({id}) => !emotes.some(e => e.id === id))});
  }

  updateEmotes(emotes) {
    const guild = this.props.guilds[this.props.guildID];
    let totals = [
      this.state.emotes.filter(e => !e.animated).length,
      this.state.emotes.filter(e => e.animated).length
    ];
    const concat = emotes.filter(emote => totals[emote.animated ? 1: 0]++ < guild.emote_limit);
    const filteredEmotes = this.state.emotes.filter(({id}) => !concat.some(e => e.id === id)).concat(concat);
    this.setState({emotes: filteredEmotes});
  }

  save() {
    this.props.postGuildEmotes(this.props.guildID, this.state.emotes, (ids) => {
      const emotes = this.state.emotes.map(emote => {
        if (Object.keys(ids).includes(emote.id)) {
          emote.id = ids[emote.id];
        }
        return emote;
      });
      console.log(emotes);
      this.props.receiveGuildEmotes(this.props.guildID, emotes);
    });
  }

  render() {
    const guild = this.props.guilds[this.props.guildID];

    if (!guild.bot_permissions.includes("manage_emojis")) {
      return (
        <Container>
          <Header as="b">
            This server does not allow the bot to manage emotes, so you cannot change them here.
          </Header>
          <Divider hidden={true}/>
          <EmotePreview emotes={this.state.emotes} modifiable={false}/>
        </Container>
      );
    }
    return (
      <Container>
        <Menu>
          <Menu.Item
            position='right'
          >
            {this.state.emotes.filter(e => !e.animated).length} / {guild.emote_limit} Static
          </Menu.Item>
          <Menu.Item
            position='right'
          >
            {this.state.emotes.filter(e => e.animated).length} / {guild.emote_limit} Animated
          </Menu.Item>
          <Menu.Item
            position='right'
          >
            <Button
              primary
              icon
              labelPosition="right"
              onClick={() => this.save()}
            >
              Save
              <Icon name='save' />
            </Button>
          </Menu.Item>
        </Menu>
        <EmotePreview
          emotes={this.state.emotes}
          setAliases={(emotes) => this.updateEmotes(emotes)}
          changeAliases={(emotes) => this.updateEmotes(emotes)}
          unsetAliases={(emotes) => this.unsetNames(emotes)}
          modifiable={true}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guilds: state.user.guilds,
    emotes: state.user.guild_emotes,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postGuildEmotes: (guildID, emotes, cb) => dispatch(postGuildEmotes(guildID, emotes, cb)),
    receiveGuildEmotes: (guildID, emotes) => dispatch(receiveGuildEmotes(guildID, emotes))
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EmoteSettings));