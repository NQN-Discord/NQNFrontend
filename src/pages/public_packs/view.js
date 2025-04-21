import {Container, Button, Grid, Loader} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {joinGroups, joinPackServer, leaveGroups} from "../../actions/user";
import {api_url} from "../../config";


import '../../semantic/src/definitions/elements/container.less';
import '../../semantic/src/definitions/views/card.less';
import '../../semantic/src/definitions/elements/divider.less';
import '../../semantic/src/definitions/elements/button.less';
import '../../semantic/src/definitions/elements/loader.less';

import EmoteGroup, {downloadEmotes} from "../../components/emoteGroup";


function PublicPacks(props) {
  const packName = decodeURIComponent(window.location.pathname.replace("/packs/", ""));
  const [emotes, setEmotes] = useState([]);
  const [packExists, setPackExists] = useState(null);
  const [emotePopup, setEmotePopup] = useState(null);
  const history = props.history;

  useEffect(() => {(async () => {
    const packEmotes = await axios.get(`${api_url}/packs?pack_name=${packName}`, {validateStatus: false});
    if (packEmotes.status === 200) {
      setPackExists(true);
      setEmotes(packEmotes.data.emojis);
    } else {
      setPackExists(false);
    }
  })()}, [packName]);

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
            {packExists === true && `View all ${emoteCount} emotes from the '${packName}' pack, and join their Discord server. `}
            NQN is an emoji bot which allows anyone to use Discord emotes without Nitro, free of charge.
            <br/>
            {packExists === true && "Click an emoji to download it, or copy it to the clipboard such that NQN can repost it."}
          </p>
          <Link to={{pathname: `/packs`, search: history.location.state? history.location.state.search: ""}}>
            <Button fluid secondary>
              Return to search
            </Button>
          </Link>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button.Group vertical fluid>
            <Button
              primary
              onClick={() => props.joinPackServer(packName)}
            >
              Join Discord Server
            </Button>
            <Button
              secondary
              onClick={() => downloadEmotes(emotes, `${packName}.zip`)}
            >
              Download all emojis as zip
            </Button>
            {props.loggedIn && <>
              {!hasJoined && <Button key="pack_join" color="green" onClick={() => props.joinGroups([packName])}>Join Pack</Button>}
              {hasJoined && <Button key="pack_leave" color="red" onClick={() => props.leaveGroups([packName])}>Leave Pack</Button>}
            </>}
          </Button.Group>
        </Grid.Column>
      </Grid>
      {packExists === null && <Loader active inline="centered"/>}
      {packExists === true && (
        <Container>
            <EmoteGroup
              packName={packName}
              emotes={emotes.filter(({animated}) => animated)}
              title="Discord Nitro Emotes"
              downloadAll="Download Nitro emojis as zip"
              fileName={`${packName}_animated.zip`}
              emotePopup={emotePopup}
              setEmotePopup={setEmotePopup}
            />
            <EmoteGroup
              packName={packName}
              emotes={emotes.filter(({animated}) => !animated)}
              title="Discord Static Emotes"
              downloadAll="Download static emojis as zip"
              fileName={`${packName}_static.zip`}
              emotePopup={emotePopup}
              setEmotePopup={setEmotePopup}
            />
        </Container>
      )}
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
