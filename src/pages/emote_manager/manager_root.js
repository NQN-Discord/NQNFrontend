import React, {Component} from 'react';

import {Container, Menu, Segment} from 'semantic-ui-react';

import ReferencePage from './reference';
import AliasPage from './aliases';
import AliasSearchPage from './alias_search';
import PackSearchPage from './pack_search'
import Ad from "../../components/ad";

import "./manager_root.css";

const pages = {
  "/emote_manager/overview": <ReferencePage/>,
  "/emote_manager/alias": <AliasPage/>,
  "/emote_manager/alias/search": <AliasSearchPage/>,
  "/emote_manager/packs/search": <PackSearchPage/>,
  "/reference": <ReferencePage/>,
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
      <>
        <div className="manager_root_column manager_root_large_screen_ad manager_root_left_column">
          <Ad id="emote-manager-left-ad" sizes={[["300", "600"], ["160", "600"]]}/>
          <Ad id="emote-manager-video-ad" sizes={[["300", "600"], ["160", "600"]]} format="video-ac" style={{width: "300px", margin: "0px auto"}}/>
        </div>
        <div className="manager_root_column manager_root_middle_column">
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

        </div>
        <div className="manager_root_column manager_root_large_screen_ad manager_root_right_column">
          <Ad id="emote-manager-right-ad" sizes={[["300", "600"], ["160", "600"]]}/>
        </div>
      </>
    );
  }
}

export default ManagerRootPage;