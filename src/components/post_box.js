import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import update from "immutability-helper";


import TextareaAutosize from "react-textarea-autosize";

import postMessage from "../actions/post_message"
import {Emote} from "../components/emote";

import {Segment, Form} from 'semantic-ui-react';


class PostBox extends Component {
  constructor(props)  {
    super(props);
    this.textArea = null;
    this.state = {
      message: []
    };
  }

  findEmote(value) {
    let emoteObj = null;
    if (value.match(/-/) === null) {
      emoteObj = [true, false].reduce((rtn, caseSensitive) => {
        if (rtn !== null) {
          return rtn;
        }
        return this.props.all_emotes.find((emote) => {
          if (caseSensitive) {
            return emote.name === value;
          }
          return emote.name.toLowerCase() === value.toLowerCase();
        }, null) || null;
      }, null);
    }
    else {
      const [pack, emote] = value.split(/-/);
      if (!Object.keys(this.props.packs).includes(pack)) {
        return null;
      }
      emoteObj = this.props.packs[pack].find(e => {
        return e.name === emote || e.name === `${pack}${emote}`;
      }) || this.props.packs[pack].find(e => {
        return e.name.toLowerCase() === emote.toLowerCase() || e.name.toLowerCase() === `${pack}${emote}`.toLowerCase();
      });
    }
    if (!emoteObj) {
      return null;
    }
    return new Emote(emoteObj);
  }

  renderEmoteBox() {
    const regex = /:((?:[a-zA-Z0-9_]+-)?[a-zA-Z0-9_]{2,})$/;
    let match = null;
    let prefix = "";
    if (this.state.message.length !== 0) {
      match = regex.exec(this.state.message.slice(-1)[0]);
      if (match !== null) {
        prefix = match[1];
      }
    }
    return (
      <Segment>
        <div className="emote_picker">
          { this.props.all_emotes.filter(emoteObj => {
            return emoteObj.name.toLowerCase().startsWith(prefix.toLowerCase());
          }).concat(
            this.props.all_emotes.filter(emoteObj => {
              return !(emoteObj.name.toLowerCase().startsWith(prefix.toLowerCase())) &&
                (emoteObj.name.toLowerCase().includes(prefix.toLowerCase()));
            })
          ).map(emoteObj => {
            const emote = new Emote(emoteObj);
            return emote.renderImg(() => {
              if (match !== null) {
                const newMsg = this.state.message.slice(-1)[0].slice(0, match.index);
                this.setState(update(this.state, {$merge: {
                    message: this.state.message.splice(0, this.state.message.length - 1)
                      .concat(newMsg)
                      .concat(emote)
                  }}));
                this.textArea.value = this.textArea.value.slice(0,
                  regex.exec(this.textArea.value)
                ) + emote.renderText();
              }
              else {
                this.setState(update(this.state, {$merge: {
                    message: this.state.message.concat(emote)
                  }}));
                this.textArea.value = this.textArea.value + emote.renderText();
              }
            });
          }) }
        </div>
      </Segment>
    );
  }

  renderMessage() {
    return this.state.message.reduce((r, message, i) => {
      if (typeof(message) === 'string') {
        const newlines = message.split(/\n/g).reduce((r, a) => r.concat(a, <br/>), []);
        return r.concat(newlines.splice(0, newlines.length - 1));
      }
      else {
        return r.concat(message.renderImg(undefined, i));
      }
    }, []);
  }

  prerenderMessage(message) {
    const emotes = message.split(/:((?:[a-zA-Z0-9_]+-)?[a-zA-Z0-9_]+):/gm) || [message];
    return emotes.map((value, i) => {
      if (i % 2 === 0) {
        return value;
      }
      return this.findEmote(value) || `:${value}:`;
    });
  }

  render() {
    return (
      <div className="message_poster">
        <h3>
          {this.props.name_map[this.props.guildID]} - #{this.props.name_map[this.props.channelID]}
        </h3>
        <hr/>
        <p>
          Rendered message:
          <br/>
          {this.renderMessage()}
        </p>
        <Form>
          <Form.Field
            control={TextareaAutosize}
            placeholder={`Message #${this.props.name_map[this.props.channelID]}`}
            onInput={event => {
              const message = this.prerenderMessage(event.target.value);
              this.setState(update(this.state, {$merge: {message}}));
            }}
            onKeyDown={event => {
              if (event.key === "Enter" && !event.shiftKey) {
                this.props.postMessage(
                  this.props.channelID,
                  this.state.message.reduce((rtn, message) => {
                    if (typeof(message) === "string") {
                      return rtn + message
                    }
                    return rtn + message.renderEmote();
                  }, "")
                );
              }
            }}
            onKeyUp={event => {
              if (event.key === "Enter" && !event.shiftKey) {
                this.setState(update(this.state, {$merge: {message: []}}));
                event.target.value = "";
              }
            }}
            inputRef={(textArea => this.textArea = textArea)}
          />
        </Form>
        {this.renderEmoteBox()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let seen = new Set();
  return {
    name_map: state.user.name_map,
    packs: state.user.packs,
    user_emotes: state.user.user_emotes,
    user_aliases: state.user.user_aliases,
    all_emotes: state.user.user_aliases.concat(
      Object.entries(state.user.packs).filter(([pack]) => state.user.user_packs.includes(pack)).reduce((rtn, [pack, value]) => {
        return rtn.concat(value);
      }, [])
    ).concat(
      Object.values(state.user.user_emotes).reduce((rtn, value) => {
        return rtn.concat(value);
      }, [])
    ).filter(emote => {
      if (seen.has(emote.id)) {
        return false;
      }
      seen.add(emote.id);
      return true;
    })
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postMessage: (channel, message) => dispatch(postMessage(channel, message))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostBox);