import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

import Textbox from "../components/textbox";
import postMessage from "../actions/post_message"
import {ListGroup, ListGroupItem} from "react-bootstrap";

import "./webhook_poster.css";

class WebhookPage extends Component {
    constructor(props)  {
        super(props);
        this.state = {
            selectedGuild: null,
            selectedChannel: null
        };
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
                                this.setState({
                                    selectedGuild: this.state.selectedGuild,
                                    selectedChannel: channelID
                                });
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

    renderPostBox() {
        return (
            <Textbox func={(message) => {
                this.props.postMessage(this.state.selectedChannel, message);
            }} clear/>
        );
    }

    renderWelcome() {
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
                    { this.state.selectedGuild === null && this.renderWelcome() }
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
        name_map: state.user.name_map
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