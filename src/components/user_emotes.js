import React, {Component} from 'react';

import {Accordion} from 'semantic-ui-react';

import '../semantic/src/definitions/modules/accordion.less';


import connect from "react-redux/es/connect/connect";
import {Emote} from "./emote";


const UserEmotes = (props) => {
  const names = new Set();

  const pack_emotes = Object.entries(props.packs).map(([name, {emotes, is_public}]) => renderEmotes(props, name, emotes, names));
  const guild_emotes = Object.entries(props.guilds).map(
    ([id, {name}]) => renderEmotes(props, name, (props.guild_emotes[id] || []).concat(props.guild_aliases[id] || []), names)
  );

  const panels = [
    renderEmotes(props, "Aliases", props.user_aliases, names),
    ...pack_emotes.sort((a, b) => a.key.localeCompare(b.key)),
    ...guild_emotes.sort((a, b) => a.key.localeCompare(b.key)),
  ].filter(e => e);
  return (
    <Accordion
      defaultActiveIndex={[0]}
      panels={panels}
      exclusive={false}
      fluid
    />
  );
};

const renderEmotes = (props, title, emotes, names) => {
  const emoteList = (
    emotes.filter(emote => {
      if (names.has(emote.name)) {
        return false;
      } else if (props.filter && !props.filter(emote)) {
        return false
      }
      names.add(emote.name);
      return true;
    }).map(emote => {
      const e = new Emote(emote);
      return e.renderImg(() => props.onClick(e))
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
};


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
