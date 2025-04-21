import {Button, Card, Divider, Grid, Popup} from "semantic-ui-react";
import {Emote, EmoteCard} from "./emote";
import React, {useState} from "react";
import Alert from "react-s-alert";
import JSZip from "jszip";

import '../semantic/src/definitions/modules/popup.less';
import "../pages/guild_builder/guild_builder.css";

function sortEmotes(emotes) {
  return emotes.sort((a, b) => a.name.localeCompare(b.name))
}

function doDownload(blob, fileName) {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', fileName);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadEmotes(emotes, fileName = null) {
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

export default function EmoteGroup({packName, emotes, title, downloadAll, fileName, emotePopup, setEmotePopup}) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (emotes.length === 0) {
    return <></>;
  }
  return (
    <>
      <Divider/>
      <Grid>
        <Grid.Column width={10}>
          <h2>{title}</h2>
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            primary
            fluid
            disabled={isDownloading}
            loading={isDownloading}
            onClick={async () => {
              setIsDownloading(true);
              await downloadEmotes(emotes, fileName);
              setIsDownloading(false);
            }}
          >
            {downloadAll}
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