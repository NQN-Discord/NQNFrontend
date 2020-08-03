import React, {Component} from "react";
import { Container, Progress, Header, Divider, Card, Message } from "semantic-ui-react";
import {Emote, EmoteCard} from "../../components/emote";
import connect from "react-redux/es/connect/connect";
import {parse} from "query-string";
import {createGuild} from "../../actions/guild";
import update from "immutability-helper";
import Websocket from 'react-websocket';
import {guildBuilderApiWS, inviteURL} from "../../config";


class GuildStatusPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: "",
      no_emotes: 0,
      guild_progress: 0,
      emote_progress: 0,
      emotes: [],
      errors: []
    };
  }

  async componentDidMount() {
    const query = parse(this.props.location.search);
    const code = query.code;
    const guildBuilder = localStorage.getItem("guild_builder");

    if (guildBuilder) {
      const guildAliases = JSON.parse(guildBuilder);
      localStorage.removeItem("guild_builder");
      this.props.createGuild(guildAliases, code, localStorage.getItem("template_id") || "", (uuid) => {
        localStorage.setItem("guild_builder_uuid", uuid);
        this.loadUUID(uuid);
      });
      return
    }

    const uuid = localStorage.getItem("guild_builder_uuid");
    if (uuid) {
      this.loadUUID(uuid);
    }
    else {
      this.props.history.push("/guilds");
      window.location.reload();
    }
  }

  loadUUID(uuid) {
    this.setState(update(this.state, {$merge: {uuid}}));
  }

  handleData(rawData) {
    const data = JSON.parse(rawData);
    let mergeState = {};
    let done = false;
    let requestData = true;
    Object.entries(data).forEach(([key, value]) => {
      switch (key) {
        case "status":
          if (value === "DONE") {
            done = true;
            requestData = false;
          }
          break;
        case "no_emotes":
        case "emote_progress":
        case "guild_progress":
          mergeState[key] = value;
          break;
        case "emote":
        case "error":
          mergeState[`${key}s`] = [value, ...this.state[`${key}s`]];
          break;
        case "guild_id":
          window.open(`${inviteURL}&guild_id=${value}&disable_guild_select=true`, "_top");
          requestData = false;
          break;
        default:
          console.log({key, value});
      }
    });
    if (done) {
      this.props.history.push("/guilds");
    } else {
      this.setState(update(this.state, {$merge: mergeState}));
    }
    if (requestData) {
      this.requestNextData();
    }
  }

  requestNextData(){
    this.refWebSocket.sendMessage("");
  }

  render() {
    const totalGuilds = Math.ceil(this.state.no_emotes / 50);
    return (
      <div>
        {this.state.uuid &&
          <Container>
            <Header
              as='h2'
            >
              Building server {this.state.guild_progress} of {totalGuilds}...
            </Header>
            <Header
              as='h4'
            >
              You will be redirected to invite NQN to the new servers as this progresses.
            </Header>
            <Divider hidden/>
            <Progress
              indicating
              percent={100 * ((this.state.guild_progress - 1) * 50 + this.state.emote_progress) / this.state.no_emotes}
            />
            <Divider hidden/>

            {this.state.errors.map((error, i) =>
              <Message
                negative
                icon={!!error.emote}
                key={i}
              >
                {error.text}
                {error.emote && (new Emote(error.emote)).renderImg(
                  () => {},
                  null,
                  {
                    style: {marginLeft: "auto"}
                  }
                )}
              </Message>
            )}

            <Card.Group className="guild_creator">
              {this.state.emotes.map((emote, i) =>
                <EmoteCard
                  key={i}
                  emote={emote}
                  isSelected={i === 0}
                />
              )}
            </Card.Group>
          </Container>
        }

        {this.state.uuid &&
          <Websocket
            url={`${guildBuilderApiWS}/guild/status?uuid=${this.state.uuid}`}
            onMessage={(data) => this.handleData(data)}
            reconnect={true}
            ref={Websocket => {
              this.refWebSocket = Websocket;
            }}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createGuild: (aliases, code, templateCode, callback) => dispatch(createGuild(aliases, code, templateCode, callback))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuildStatusPage);
