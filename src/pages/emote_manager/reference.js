import React, {Component} from 'react';

import {Container} from 'semantic-ui-react';

import '../../semantic/src/definitions/elements/container.less';


import UserEmotes from "../../components/user_emotes";



const ReferencePage = () => (
  <Container>
    <p>
      Clicking on an emote will copy it to your clipboard to use on Discord!
    </p>
    <UserEmotes
      onClick={(emote) => emote.copyToClipboard()}
    />
  </Container>
);

export default ReferencePage;
