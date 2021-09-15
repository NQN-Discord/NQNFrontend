import React, {useEffect} from 'react';
import {inviteURL} from "../config";
import {Container} from "semantic-ui-react";

import '../semantic/src/definitions/elements/container.less';

import {parse} from "query-string";


function InvitePage(props) {

  useEffect(() => {
    // On Mount redirect to inviteURL
    const query = parse(props.location.search)
    if (query.guild_id) {
      window.open(inviteURL + `&guild_id=${query.guild_id}`, '_self')
    } else {
      window.open(inviteURL, "_self")
    }
  }, []);

  return (
    <Container>
      <h4>Loading...</h4>
    </Container>
  );
}

export default InvitePage;
