import React, {Component} from 'react';

import {Container, Menu, Segment} from 'semantic-ui-react';

import ReferencePage from './reference';
import AliasPage from './aliases';
import AliasSearchPage from './alias_search';
import PackSearchPage from './pack_search'

const pages = {
  "/emote_manager/overview": <ReferencePage/>,
  "/emote_manager/alias": <AliasPage/>,
  "/emote_manager/alias/search": <AliasSearchPage/>,
  "/emote_manager/packs/search": <PackSearchPage/>,
};

class ManagerRootPage extends Component {
  renderMenuItem(name, url) {
    return (
      <Menu.Item
        name={name}
        active={window.location.pathname === url}
        onClick={() => this.props.history.push(url)}
      />
    );
  }

  render() {
    return (
      <Container>
        <Menu attached='top' tabular stackable>
          {this.renderMenuItem("Overview", "/emote_manager/overview")}
          {this.renderMenuItem("My Aliases", "/emote_manager/alias")}
          {this.renderMenuItem("Search Emotes", "/emote_manager/alias/search")}
          {this.renderMenuItem("Search Packs", "/emote_manager/packs/search")}
        </Menu>
        <Segment attached='bottom'>
          {pages[window.location.pathname]}
        </Segment>
      </Container>
    );
  }
}

export default ManagerRootPage;