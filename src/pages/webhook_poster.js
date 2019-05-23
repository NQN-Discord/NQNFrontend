import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

import Textarea from "react-textarea-autosize";

import postMessage from "../actions/post_message"
import {ListGroup, ListGroupItem, Jumbotron} from "react-bootstrap";

import "./webhook_poster.css";
import update from "immutability-helper";


class Emote {
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

class WebhookPage extends Component {
    constructor(props)  {
        super(props);
        this.textArea = null;
        this.state = {
            selectedGuild: null,
            selectedChannel: null,
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
            <Jumbotron>
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
                                console.log({te: this.textArea, r: emote.renderText()});
                                this.textArea.value = this.textArea.value + emote.renderText();
                            }
                        });
                    }) }
                </div>
            </Jumbotron>
        );
    }

    renderGuilds() {
        return Object.keys(this.props.guilds).map( guildID => {
            return (
                <img
                    key={guildID}
                    className="guild_icon"
                    src={this.props.icons[guildID]}
                    alt={this.props.name_map[guildID]}
                    onClick={() => {
                        this.setState({
                            selectedGuild: guildID,
                            selectedChannel: null
                        });
                    }}
                />
            );
        });
    }

    renderChannels() {
        return (
            <ListGroup>
                {this.props.guilds[this.state.selectedGuild].map(channelID => {
                    return (
                        <ListGroupItem
                            key={channelID}
                            active={this.state.selectedChannel === channelID}
                            onClick={() => {
                                this.setState(update(this.state,
                                    {$merge: {
                                            selectedChannel: channelID
                                    }}
                                ));
                                this.props.history.push(`/channels/${channelID}`);
                            }}
                        >
                            {this.props.name_map[channelID]}
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        );
    }

    renderMessage() {
        return this.state.message.reduce((r, message) => {
            if (typeof(message) === 'string') {
                const newlines = message.split(/\n/g).reduce((r, a) => r.concat(a, <br/>), []);
                return r.concat(newlines.splice(0, newlines.length - 1));
            }
            else {
                return r.concat(message.renderImg());
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

    renderPostBox() {
        return (
            <div className="message_poster">
                <p>
                    Rendered message:
                    <br/>
                    { this.renderMessage() }
                </p>
                <Textarea
                    placeholder={`Message #${this.props.name_map[this.state.selectedChannel]}`}
                    onInput={ event => {
                        const message = this.prerenderMessage(event.target.value);
                        this.setState(update(this.state, {$merge: {message}}));
                        // event.target.value = message + "a";
                    }}
                    onKeyDown={ event => {
                        if (event.key === "Enter" && !event.shiftKey) {
                            this.props.postMessage(
                                this.state.selectedChannel,
                                this.state.message.reduce((rtn, message) => {
                                    if (typeof(message) === "string") {
                                        return rtn + message
                                    }
                                    return rtn + message.renderEmote();
                                }, "")
                            );
                        }
                    }}
                    onKeyUp={ event => {
                        if (event.key === "Enter" && !event.shiftKey) {
                            this.setState(update(this.state, {$merge: {message: []}}));
                            event.target.value = "";
                        }
                    }}
                    inputRef={(textArea => this.textArea = textArea)}
                >
                </Textarea>
                { this.renderEmoteBox() }
            </div>
        );
    }

    static renderWelcome() {
        return (
            <div>
                <h3>
                    Hello, and thanks for using Not Quite Nitro.
                </h3>
                <p>
                    This is the beta version of the web user interface to the bot.
                    It is incomplete in areas and may not function as intended.
                </p>
                <p>
                    To start, click on the icon of the server you want to post to and then
                    choose which channel.
                </p>
                <p>
                    To send a message, simply type into the text box which appears.
                    This site provides emote autocompletion for messages as you're typing them,
                    providing an easier to use interface than the native client.
                    <br/>
                    The site does not support reading new messages from Discord yet.
                    If you would like to see this feature, DM me about it.
                    Any implementation would likely require you to install a native application
                    to your computer and not supporting Android or iOS at all.
                </p>
            </div>
        );
    }

    render() {
        return (
            <div id="container">
                <div className="guild_icons">
                    { this.renderGuilds() }
                </div>
                { this.state.selectedGuild !== null &&
                    <div className="sidebar">
                        { this.renderChannels() }
                    </div>
                }
                <div className="content">
                    { this.state.selectedGuild === null && WebhookPage.renderWelcome() }
                    { this.state.selectedChannel !== null && this.renderPostBox() }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        icons: state.user.guild_icons,
        guilds: state.user.guilds,
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
        )
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
)(WebhookPage);