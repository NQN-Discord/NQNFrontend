import React, {Component} from 'react';

import {Container} from 'semantic-ui-react';

import '../../semantic/src/definitions/elements/container.less';


import UserEmotes from "../../components/user_emotes";
import Alert from 'react-s-alert';


class ReferencePage extends Component {
  render() {
    return (
      <Container>
        <p>
          Clicking on an emote will copy it to your clipboard to use on Discord!
        </p>
        <UserEmotes
          onClick={(emote) => {
            Alert.success(<div>
              {emote.renderImg(undefined, undefined, {"centered": true})}
              <p>
                Copied :{emote.name}: to clipboard
              </p>
            </div>);
            navigator.clipboard.writeText(`:${emote.name}:`);
          }}
        />
      </Container>
    );
  }
}

export default ReferencePage;
