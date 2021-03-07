import React, {Component} from 'react';

import {Accordion} from 'semantic-ui-react';
import connect from "react-redux/es/connect/connect";
import {Emote} from "./emote";


class UserEmotes extends Component {
  renderEmotes(title, emotes, names) {
    const emoteList = (
      emotes.filter(emote => {
        if (names.has(emote.name)) {
          return false;
        } else if (this.props.filter && !this.props.filter(emote)) {
          return false
        }
        names.add(emote.name);
        return true;
      }).map(emote => {
        const e = new Emote(emote);
        return e.renderImg(() => this.props.onClick(e))
      })
    );
    if (emoteList.length === 0) {
      return
    }
    return {key: title, title: [
        title,
        <div key="div" style={{display: "inline", padding: "0.5rem"}}/>,
        emoteList.slice(0, 5)
      ], content: emoteList}
  }

  render() {
    const names = new Set();
    const panels = [
      this.renderEmotes("Aliases", this.props.user_aliases, names),
      ...Object.entries(this.props.packs).map(([name, {emotes, is_public}]) => this.renderEmotes(name, emotes, names)),
      ...Object.entries(this.props.guilds).map(([id, {name}]) =>
        this.renderEmotes(name, (this.props.guild_emotes[id] || []).concat(this.props.guild_aliases[id] || []), names))
    ].filter(e => e);
    return (
      <Accordion
        defaultActiveIndex={[0]}
        panels={panels}
        exclusive={false}
        fluid
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    packs: state.user.packs,
    guilds: state.user.guilds,
    guild_emotes: state.user.guild_emotes,
    guild_aliases: state.user.guild_aliases,
    user_aliases: state.user.user_aliases,
  }
};

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEmotes);
