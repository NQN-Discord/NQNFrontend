import React from 'react';
import {Container} from "semantic-ui-react";

import '../semantic/src/definitions/elements/container.less';
import {Helmet} from "react-helmet";

export default () => (
  <Container>
    <Helmet>
      <title>License Information</title>
      <meta content="Website License Information" property="og:title"/>
    </Helmet>
    <h2>
      Licenses:
    </h2>
    <ul>
      <li>
        The Logo font is from <a href="http://www.fontfabric.com/">Fontfabric</a>
      </li>
      <li>
        Our Wumpus avatar and bot art are by <a href="https://www.dooleytm.com/">Dooley</a> from <a href="https://discord.gg/pEjCBNF">Wump Motes</a>
      </li>
    </ul>
  </Container>
);
