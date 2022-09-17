import React from 'react';
import {Container} from "semantic-ui-react";

import '../semantic/src/definitions/elements/container.less';
import {Helmet} from "react-helmet";

const licenses = () => (
  <Container>
    <Helmet>
      <title>License Information</title>
      <meta content="Website License Information" property="og:title"/>

      <meta content="See the attribution for our beautiful avatar" property="og:description"/>
      <meta content="See the attribution for our beautiful avatar" name="description"/>
    </Helmet>
    <h2>
      Licenses:
    </h2>
    <ul>
      <li>
        Our Wumpus avatar and bot art are by <a href="https://www.dooleytm.com/">Dooley</a> from <a href="https://discord.gg/pEjCBNF">Wump Motes</a>
      </li>
    </ul>
  </Container>
);


export default licenses;