import React, {Component} from 'react';

import {Container, Menu, Segment} from 'semantic-ui-react';

import SearchPage from './aliases/search';
import ManagePage from './aliases/manage';


class AliasRootPage extends Component {
  render() {
    const pageName = this.props.match.params.id || "search";
    const page = {
      search: <SearchPage/>,
      manage: <ManagePage/>
    }[pageName];
    return (
      <Container>
        <Menu attached='top' tabular>
          <Menu.Item
            name='Search Emotes'
            active={pageName === "search"}
            onClick={() => this.props.history.push("/alias/search")}
          />
          <Menu.Item
            name='Manage Aliases'
            active={pageName === "manage"}
            onClick={() => this.props.history.push("/alias/manage")}
          />
        </Menu>
        <Segment attached='bottom'>
          {page}
        </Segment>
      </Container>
    );
  }
}

export default AliasRootPage;