import {Container, Card, Divider, Button, Grid, Popup, Loader} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import JSZip from "jszip";
import axios from "axios";
import {joinGroups, joinPackServer, leaveGroups} from "../../actions/user";
import {EmoteCard, Emote} from "../../components/emote";
import {api_url} from "../../config";


import '../../semantic/src/definitions/elements/container.less';
import '../../semantic/src/definitions/views/card.less';
import '../../semantic/src/definitions/elements/divider.less';
import '../../semantic/src/definitions/elements/button.less';
import '../../semantic/src/definitions/modules/popup.less';
import '../../semantic/src/definitions/elements/loader.less';

import "../guild_builder/guild_builder.css";
import Alert from "react-s-alert";


function sortEmotes(emotes) {
  return emotes.sort((a, b) => a.name.localeCompare(b.name))
}

function doDownload(blob, fileName) {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', fileName,);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function downloadEmotes(emotes, fileName = null) {
  if (emotes.length === 0) {
    Alert.info("No emotes to download")
  } else if (fileName === null) {
    const emote = new Emote(emotes[0]);
    doDownload(await emote.toBlob(), emote.downloadName());
  } else {
    const zipFile = new JSZip();
    await Promise.all(emotes.map(async e => {
      const emote = new Emote(e);
      zipFile.file(emote.downloadName(), await emote.toBlob());
    }));
    const blob = await zipFile.generateAsync({type:"blob"});
    doDownload(blob, fileName);
  }
}


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
              download="Download Nitro emojis as zip"
              fileName={`${packName}_animated.zip`}
              emotePopup={emotePopup}
              setEmotePopup={setEmotePopup}
              packExists={packExists}
            />
            <EmoteGroup
              packName={packName}
              emotes={emotes.filter(({animated}) => !animated)}
              title="Discord Static Emotes"
              download="Download static emojis as zip"
              fileName={`${packName}_static.zip`}
              emotePopup={emotePopup}
              setEmotePopup={setEmotePopup}
              packExists={packExists}
            />
        </Container>
      )}
    </>
  );
}

function EmoteGroup({packName, emotes, title, download, fileName, emotePopup, setEmotePopup}) {
  if (emotes.length === 0) {
    return <></>;
  }
  return (
    <>
      <Divider/>
      <Grid>
        <Grid.Column width={12}>
          <h2>{title}</h2>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button
            secondary
            fluid
            onClick={() => downloadEmotes(emotes, fileName)}
          >
            {download}
          </Button>
        </Grid.Column>
      </Grid>
      <Card.Group className="centered guild_creator">
        {sortEmotes(emotes).map(emote =>
          <Popup
            key={emote.id}
            position="top right"
            trigger={<EmoteCard emote={emote} onClick={() => setEmotePopup(emote.id)}/>}
            open={emote.id === emotePopup}
            onClose={() => setEmotePopup(null)}
            content={
              <Button.Group vertical fluid>
                <Button primary onClick={() => {
                  downloadEmotes([emote]);
                  setEmotePopup(null);
                }}>
                  Download Emoji
                </Button>
                <Button secondary onClick={() => {
                  const e = new Emote(emote);
                  e.copyToClipboard(packName);
                  setEmotePopup(null);
                }}>
                  Copy to clipboard
                </Button>
              </Button.Group>
            }
          >
          </Popup>
        )}
      </Card.Group>
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
