import React, {useEffect} from 'react';
import {inviteURL} from "../config";
import {Container} from "semantic-ui-react";

import '../semantic/src/definitions/elements/container.less';

import {parse} from "query-string";
import {Helmet} from "react-helmet";


function InvitePage(props) {
  useEffect(() => {
    // On Mount redirect to inviteURL
    const query = parse(props.location.search);
    if (query.guild_id) {
      window.open(inviteURL + `&guild_id=${query.guild_id}`, '_self')
    } else {
      window.open(inviteURL, "_self")
    }
  }, [props.location.search]);


  return (
    <Container>
      <Helmet>
        <title>Invite NQN to server</title>
        <meta content="Invite NQN to your server with default permissions" property="og:title"/>
      </Helmet>
      <h1>
        Inviting NQN to your server
      </h1>
    </Container>
  );
}

export default InvitePage;
