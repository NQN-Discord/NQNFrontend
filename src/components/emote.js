import React from "react";


export class Emote {
  constructor(emoteObj) {
    this.name = emoteObj.name;
    this.id = emoteObj.id;
    this.animated = emoteObj.animated;
  }

  renderImg(onClick) {
    if (typeof(onClick) === "undefined") {
      onClick = () => {};
    }
    return <img
      key={this.id}
      className="emote"
      src={`https://cdn.discordapp.com/emojis/${this.id}.${this.animated? "gif": "png"}`}
      alt={`:${this.name}:`}
      title={`:${this.name}:`}
      onClick={() => onClick()}
    />;
  }

  renderEmote() {
    return `<${this.animated? "a": ""}:${this.name}:${this.id}>`;
  }

  renderText() {
    return `:${this.name}:`;
  }

}