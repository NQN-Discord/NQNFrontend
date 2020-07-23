import React, {Component} from 'react';
import {Container} from "semantic-ui-react";


class LicensePage extends Component {
  render() {
    return (
      <Container>
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
    )}
}

export default LicensePage;
