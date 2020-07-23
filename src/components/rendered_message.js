import React, {Component} from "react";
import {toHTML} from "discord-markdown";
import ReactDOMServer from "react-dom/server";
import {Emote} from "./emote";



class RenderedMessage extends Component {
  render() {
    return (
      <div
        dangerouslySetInnerHTML={
          {__html:
              toHTML(
                this.props.text,
                {
                  embed: true,
                  discordCallback: {
                    emoji: emote => ReactDOMServer.renderToStaticMarkup(new Emote(emote).renderImg())
                  }
                }
              )
          }
        }
      />
    );
  }
}

export default RenderedMessage;