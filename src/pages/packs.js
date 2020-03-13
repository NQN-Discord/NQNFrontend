import React, {Component} from 'react';

import {Container, Accordion} from 'semantic-ui-react';
import {Emote} from "../components/emote";
import connect from "react-redux/es/connect/connect";
import Alert from "react-s-alert";


const regex = /^[a-zA-Z0-9_]+$/g;


class PackPage extends Component {
  renderPack(title, entries) {
    const names = new Set();
    const content = entries.filter(emote => {
      if (names.has(emote.name)) {
        return false;
      }
      names.add(emote.name);
      return true;
    }).map(emote => (new Emote(emote)).renderImg(() => {
      if (!title.match(regex)) {
        Alert.info(`The '${title}' emote pack does not support copying to clipboard`)
      } else {
        Alert.success(<div>
          {(new Emote(emote)).renderImg(undefined, undefined, {"centered": true})}
          <p>
            Copied :{title}-{emote.name}: to clipboard
          </p>
        </div>);
        navigator.clipboard.writeText(`:${title}-${emote.name}:`);
      }
    }, emote.name));
    return {key: title, title, content}
  }

  render() {
    if (!Object.keys(this.props.packs).length) {
      return <Container/>
    }
    return (
      <Container>
        <p>
          Some emote packs allow you to use their emotes without joining them - click on the emote to copy it
          to your clipboard. If you're running an emote pack and are finding yours does not support copy-paste
          functionality, make sure the name is composed of only letters, numbers and underscores.
        </p>
        <Accordion
          defaultActiveIndex={Object.keys(this.props.packs).map((_, i) => i)}
          panels={Object.entries(this.props.packs).map(([name, entries]) => this.renderPack(name, entries))}
          exclusive={false}
          fluid
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    packs: state.user.packs
  }
};

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackPage);
