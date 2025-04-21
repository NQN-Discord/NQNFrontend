import React, {useState} from "react";

import {Container, Menu} from 'semantic-ui-react';

import EmoteGroup from "../../../components/emoteGroup";

function EmoteSettings(props) {
  const [emotePopup, setEmotePopup] = useState(null);

  return (
    <Container>
      <Menu>
        <Menu.Item
          position='right'
        >
          {props.emotes.filter(e => !e.animated).length} / {props.guild.emote_limit} Static
        </Menu.Item>
        <Menu.Item
          position='right'
        >
          {props.emotes.filter(e => e.animated).length} / {props.guild.emote_limit} Animated
        </Menu.Item>
      </Menu>

      <EmoteGroup
        packName={null}
        emotes={props.emotes}
        title={`"${props.guild.name}" Emojis`}
        downloadAll="Download all emojis as zip"
        fileName={`${props.guild.name}.zip`}
        emotePopup={emotePopup}
        setEmotePopup={setEmotePopup}
      />
    </Container>
  );
}


export default EmoteSettings;