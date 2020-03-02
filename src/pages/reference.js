import React, {Component} from 'react';

import {Container, Accordion} from 'semantic-ui-react';
import {Emote} from "../components/emote";
import connect from "react-redux/es/connect/connect";
import Alert from 'react-s-alert';


class ReferencePage extends Component {
  renderEmotes(title, emotes, names) {
    const content = (
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
    if (content.length === 0) {
      return
    }
    return {key: title, title, content}
  }

  render() {
    const names = new Set();
    return (
      <Container>
        <p>
          Clicking on an emote will copy it to your clipboard for use on Discord!
        </p>
        <Accordion
          defaultActiveIndex={[0, 1, 2]}
          panels={[
            this.renderEmotes("Aliases", this.props.user_aliases, names),
            this.renderEmotes("Packs", this.props.packs, names),
            this.renderEmotes("Mutual Servers", this.props.guild_emotes, names),
          ].filter(e => e)}
          exclusive={false}
          fluid
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    packs: Object.values(state.user.packs).flat(),
    guild_emotes: Object.values(state.user.guild_emotes).flat(),
    guild_aliases: Object.values(state.user.guild_aliases).flat(),
    user_aliases: state.user.user_aliases
  }
};

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferencePage);
