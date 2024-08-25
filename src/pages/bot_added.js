import React, {useEffect} from "react";

import { Container, Divider, Button, Card, List } from "semantic-ui-react";

import '../semantic/src/definitions/elements/container.less';
import '../semantic/src/definitions/elements/divider.less';
import '../semantic/src/definitions/elements/button.less';
import '../semantic/src/definitions/views/card.less';
import '../semantic/src/definitions/elements/list.less';

import connect from "react-redux/es/connect/connect";
import "./bot_added.css";
import {parse} from "query-string";
import Ad from "../components/ad";
import axios from "axios";
import {Helmet} from "react-helmet";
const {api_url, discordURL} = window.env


function BotAddedDialog(props) {
  const loggedIn = props.loggedIn;
  const query = parse(props.location.search);
  const guildId = query.guild_id;
  const guild = props.guilds[guildId];
  const name = guild && guild.name;

  const justLanded = name? ` in ${name}!`: "!";
  const primaryButton = loggedIn? `View ${name}`: "Login";
  const url = `/guilds/${guildId}/permissions`;

  useEffect(() => {
    if (api_url[0] !== "$") {
      axios.post(`${api_url}/join_referral`, {
        guild: guildId || null,
        referrer: query.referrer || null
      }).catch(err => {
      });
    }
  }, [guildId, query.referrer]);

  return (
    <Card centered className="bot_joined_modal">
      <Card.Content>
        <Card.Header textAlign="center" as="h2">
          NQN just landed{justLanded}
        </Card.Header>
        <Card.Description>
          Check everything's working by logging into the website, or join our Support Server for help!
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <List>
          <List.Item
            icon="check"
            content="Check that permissions are set up correctly!"
          />
          <List.Item
            icon="check"
            content="See which channels you can run commands in!"
          />
          <List.Item
            icon="check"
            content="Send a test message to your server!"
          />
        </List>

        <Button primary fluid size="large" loading={loggedIn && !name} onClick={() => {
          if (loggedIn) {
            if (!name) {
              return
            }
            props.history.push(url);
          } else {
            localStorage.setItem("redirect", url);
            window.location = discordURL;
          }
        }}>
          {primaryButton}
        </Button>
        <Divider hidden/>
        <Button secondary fluid size="large" onClick={() => {
          window.open("https://discord.gg/UMVpPN7", "_blank");
        }}>
          Join NQN Support
        </Button>
      </Card.Content>
      <div className="under_ad">
        <Ad id="bot_added_video_ad" sizes={[["300", "600"], ["160", "600"]]} format="video-ac"/>
      </div>
    </Card>
  );
}


function BotAddedPage(props) {
  return (
    <Container fluid>
      <Helmet>
        <title>NQN Added</title>
        <meta content="NQN Join Server Landing" property="og:title"/>
      </Helmet>

      <div className="bot_joined_background"/>
      <div className="bot_added_column bot_added_large_screen_ad bot_added_left_column">
        <Ad id="bot-added-left-ad" sizes={[["300", "600"], ["160", "600"]]}/>
      </div>
      <div className="bot_added_column bot_added_middle_column">
        <BotAddedDialog {...props}/>
      </div>
      <div className="bot_added_column bot_added_large_screen_ad bot_added_right_column">
        <Ad id="bot-added-right-ad" sizes={[["300", "600"], ["160", "600"]]}/>
      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    guilds: state.user.guilds
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BotAddedPage);
