import React, {Component} from 'react';

import {Container, Accordion} from 'semantic-ui-react';
import {Emote} from "../components/emote";
import connect from "react-redux/es/connect/connect";
import Alert from 'react-s-alert';


class ReferencePage extends Component {
  renderEmotes(title, emotes, names) {
    const emoteList = (
      emotes.filter(emote => {
        if (names.has(emote.name)) {
          return false;
        }
        names.add(emote.name);
        return true;
      }).map(emote => (new Emote(emote)).renderImg(() => {
        Alert.success(<div>
          {(new Emote(emote)).renderImg(undefined, undefined, {"centered": true})}
          <p>
            Copied :{emote.name}: to clipboard
          </p>
        </div>);
        navigator.clipboard.writeText(`:${emote.name}:`);
      }, emote.name))
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
      ...this.props.packs.map(([name, emotes]) => this.renderEmotes(name, emotes, names)),
      ...Object.entries(this.props.guilds).map(([id, {name}]) =>
        this.renderEmotes(name, (this.props.guild_emotes[id] || []).concat(this.props.guild_aliases[id] || []), names))
    ].filter(e => e);
    return (
      <Container>
        <p>
          Clicking on an emote will copy it to your clipboard to use on Discord!
        </p>
        <Accordion
          defaultActiveIndex={[0]}
          panels={panels}
          exclusive={false}
          fluid
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    packs: Object.entries(state.user.packs).filter(([pack, value]) => state.user.user_packs.includes(pack)),
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
)(ReferencePage);
