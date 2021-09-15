import React, {Component} from "react";

import {Image, Card} from 'semantic-ui-react';

import '../semantic/src/definitions/elements/image.less';
import '../semantic/src/definitions/views/card.less';


import classNames from "classnames";


export class Emote {
  constructor(emoteObj) {
    this.name = emoteObj.name;
    this.id = emoteObj.id;
    this.animated = emoteObj.animated;
    this.source = emoteObj.source;
  }

  renderImg(onClick, id, kwargs={verticalAlign: 'middle'}) {
    if (typeof(onClick) === "undefined") {
      onClick = () => {};
    }
    return <Image
      key={id || this.id}
      className="emote"
      src={`https://cdn.discordapp.com/emojis/${this.id}.${this.animated? "gif": "png"}?size=32`}
      alt={`:${this.name}:`}
      title={`:${this.name}:`}
      onClick={(e) => onClick(e)}
      loading="lazy"
      {...kwargs}
    />;
  }

  renderEmote() {
    return `<${this.animated? "a": ""}:${this.name}:${this.id}>`;
  }

  renderText() {
    return `:${this.name}:`;
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
