import {Container, Card, Divider, Button, Grid} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import React, {useEffect, useState} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {api_url} from "../config";
import {EmoteCard} from "../components/emote";
import {joinGroups, joinPackServer, leaveGroups} from "../actions/user";


import '../semantic/src/definitions/elements/container.less';
import '../semantic/src/definitions/views/card.less';
import '../semantic/src/definitions/elements/divider.less';
import '../semantic/src/definitions/elements/button.less';

import "./guild_builder/guild_builder.css";


function sortEmotes(emotes) {
  return emotes.sort((a, b) => a.name.localeCompare(b.name))
}

function PublicPacks(props) {
  const packName = props.match.params.packName;
  const [emotes, setEmotes] = useState([]);
  const [packExists, setPackExists] = useState(null);

  useEffect(() => {(async () => {
    const packEmotes = await axios.get(`${api_url}/packs?pack_name=${packName}`);
    if (packEmotes.status === 200) {
      setPackExists(true);
      setEmotes(packEmotes.data.emojis);
    } else {
      setPackExists(false);
    }
  })()}, []);
  if (packExists === false) {
    return (
      <Container>
        <Helmet>
          <title>{packName} - 404</title>
          <meta content={`404`} property="og:title"/>
        </Helmet>
        <h1>
          {packName}
        </h1>
        This emote pack either does not exist or is not set to be public.
      </Container>)
  }

  const hasJoined = props.loggedIn && props.user_packs.includes(packName);

  const emoteCount = emotes.length;
  return (
    <>
      <Helmet>
        <title>{packName} Emote Pack</title>
        <meta content={`NQN pack '${packName}'. View emojis and join the server!`} property="og:title"/>
        <meta content={`NQN pack '${packName}' for a publicly joinable server. NQN is an emoji bot which allows anyone on Discord to use emotes without Nitro, free of charge.`} property="og:description"/>
      </Helmet>
      <Grid container>
        <Grid.Column width={12}>
          <h1>
            Discord Emote List for '{packName}' Pack
          </h1>
          <p>
            {packExists === true && `View all ${emoteCount} emotes from the '${packName}' pack, and join their Discord server.`}
            <br/>
            NQN is an emoji bot which allows anyone on Discord to use emotes without Nitro, free of charge.
          </p>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button
            primary
            onClick={() => props.joinPackServer(packName)}
          >
            Join Discord Server
          </Button>
          <Divider hidden/>
          {props.loggedIn && <>
            {!hasJoined && <Button key="pack_join" color="green" onClick={() => props.joinGroups([packName])}>Join Pack</Button>}
            {hasJoined && <Button key="pack_leave" color="red" onClick={() => props.leaveGroups([packName])}>Leave Pack</Button>}
          </>}
        </Grid.Column>
      </Grid>
      <Container>
        <Divider/>
        <h2>
          Discord Nitro Emotes
        </h2>
        <Card.Group className="centered guild_creator">
          {sortEmotes(emotes.filter(({animated}) => animated)).map(emote =>
            <EmoteCard
              key={emote.id}
              emote={emote}
            />
          )}
        </Card.Group>
        <h2>
          Discord Static Emotes
        </h2>
        <Card.Group className="centered guild_creator">
          {sortEmotes(emotes.filter(({animated}) => !animated)).map(emote =>
            <EmoteCard
              key={emote.id}
              emote={emote}
            />
          )}
        </Card.Group>
      </Container>
    </>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    user_packs: state.user.user_packs
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinGroups: (packs) => dispatch(joinGroups(packs)),
    leaveGroups: (packs) => dispatch(leaveGroups(packs)),
    joinPackServer: (pack) => dispatch(joinPackServer(pack))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicPacks);
