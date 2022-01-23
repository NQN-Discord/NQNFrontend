import React, {Component} from "react";

import {Image, Card} from 'semantic-ui-react';

import '../semantic/src/definitions/elements/image.less';
import '../semantic/src/definitions/views/card.less';
import classNames from "classnames";
import Alert from "react-s-alert";


const clipboardRegex = /^:(?:[a-zA-Z0-9_]+-)?[a-zA-Z0-9_]+:$/g;


export class Emote {
  constructor(emoteObj) {
    this.name = emoteObj.name;
    this.id = emoteObj.id;
    this.animated = emoteObj.animated;
  }

  renderImg(onClick, id, kwargs={verticalAlign: 'middle'}) {
    if (typeof(onClick) === "undefined") {
      onClick = () => {};
    }
    return <Image
      key={id || this.id}
      className="emote"
      src={`${this.url()}?size=32`}
      alt={`:${this.name}:`}
      title={`:${this.name}:`}
      onClick={(e) => onClick(e)}
      loading="lazy"
      {...kwargs}
    />;
  }

  downloadName() {
    return `${this.name}.${this.animated? "gif": "png"}`
  }

  url() {
    return `https://cdn.discordapp.com/emojis/${this.id}.${this.animated? "gif": "png"}`
  }

  async toBlob() {
    const resp = await fetch(this.url());
    const blob = await resp.blob();
    return new Blob([blob]);
  }

  renderEmote() {
    return `<${this.animated? "a": ""}:${this.name}:${this.id}>`;
  }

  renderText() {
    return `:${this.name}:`;
  }

  copyToClipboard(packName=null) {
    const name = packName === null? this.renderText(): `:${packName}-${this.name}:`;

    if (!name.match(clipboardRegex)) {
      Alert.info(`The '${packName}' emote pack does not support copying to clipboard`)
    } else {
      Alert.success((
        <div>
          {this.renderImg(undefined, undefined, {"centered": true})}
          <p>
            Copied {name} to clipboard
          </p>
        </div>
      ));
      navigator.clipboard.writeText(name);
    }
  }
}


export class EmoteCard extends Component {
  render() {
    const emoteObj = new Emote(this.props.emote);
    return (
      <Card
        onClick={() => {(this.props.onClick || (() => {}))()}}
        className={classNames({inverted: this.props.isSelected})}
      >
        <Card.Content>
          {emoteObj.renderImg(
            () => {},
            emoteObj.id,
            {
              floated: 'right'
            }
          )}
          <Card.Header>
            {emoteObj.name}
          </Card.Header>
        </Card.Content>
      </Card>
    );
  }
}
