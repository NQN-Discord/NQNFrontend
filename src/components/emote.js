import React from "react";

import {Image} from 'semantic-ui-react';


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