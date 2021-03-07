import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import {readStorageState, setRefreshToken} from "./actions/auth";
import {fetchEmotes} from "./actions/user";
import {fetchGuilds} from "./actions/guild";

import WebhookPage from "./pages/guild_dashboard/server_view";
import ManagerRootPage from "./pages/emote_manager/manager_root";
import LoginPage from "./pages/login";
import {Header, BottomFooter} from "./header";
import {HelpTextPage} from "./components/helpText";
import UserFeedback from "./pages/feedback";
import PrivacyPolicy from "./pages/policy";
import GuildCreatorPage from "./pages/guild_builder/guild_builder";
import GuildSelectorPage from "./pages/guild_builder/guild_selector";
import GuildStatusPage from "./pages/guild_builder/guild_status";
import LicensePage from "./pages/licenses";
import CommandPage from "./pages/commands";
import BotAddedPage from "./pages/bot_added";

import 'fomantic-ui-less/semantic.less';
import HomePage from "./pages/home";

class App extends Component {
  componentDidMount() {
    this.props.readStorageState();
    axios.interceptors.response.use((response) => {
      const auth = response.data.authorization;
      if (auth) {
        this.props.setRefreshToken(auth);
      }
      return response;
    }, (err) => {
      if (err.response && err.response.status === 403 && err.response.data.message === "Invalid login token") {
        this.props.setRefreshToken("");
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn !== true && this.props.loggedIn === true) {
      this.props.fetchGuilds();
      this.props.fetchEmotes();
    }
  }

  render() {
    if (this.props.loggedIn === null) {
      return <div>
        Loading...
      </div>
    }
    return (
      <Router>
        <div className="site_content">
          <Alert stack={{limit: 3}}/>
          <div className="site_body">
            <Header/>
            <div className="site_container">
              {!this.props.loggedIn &&
                <Switch>
                  <Route exact path="/" component={HomePage}/>
                  <Route exact path="/help" component={HelpTextPage}/>
                  <Route exact path="/privacy" component={PrivacyPolicy}/>
                  <Route exact path="/licenses" component={LicensePage}/>
                  <Route exact path="/commands" component={CommandPage}/>
                  <Route exact path="/bot_added" component={BotAddedPage}/>
                  <LoginPage/>
                </Switch>
              }
              {this.props.loggedIn &&
                <Switch>
                  <Route exact path="/guilds/:guildID" component={WebhookPage}/>
                  <Route exact path="/guilds/:guildID/channels/:channelID" component={WebhookPage}/>
                  <Route exact path="/guilds/" component={WebhookPage}/>
                  <Route exact path="/guilds/:guildID/:page" component={WebhookPage}/>

                  <Route exact path="/emote_manager/overview" component={ManagerRootPage}/>
                  <Route exact path="/emote_manager/packs" component={ManagerRootPage}/>
                  <Route exact path="/emote_manager/packs/search" component={ManagerRootPage}/>
                  <Route exact path="/emote_manager/alias" component={ManagerRootPage}/>
                  <Route exact path="/emote_manager/alias/search" component={ManagerRootPage}/>

                  <Route exact path="/login" component={LoginPage}/>

                  <Route exact path="/guild_builder" component={GuildCreatorPage}/>
                  <Route exact path="/guild_builder/selector" component={GuildSelectorPage}/>
                  <Route exact path="/guild_builder/status" component={GuildStatusPage}/>

                  <Route exact path="/reference" component={ManagerRootPage}/>

                  <Route exact path="/" component={HomePage}/>
                  <Route exact path="/help" component={HelpTextPage}/>
                  <Route exact path="/feedback" component={UserFeedback}/>
                  <Route exact path="/privacy" component={PrivacyPolicy}/>
                  <Route exact path="/licenses" component={LicensePage}/>
                  <Route exact path="/commands" component={CommandPage}/>
                  <Route exact path="/bot_added" component={BotAddedPage}/>
                </Switch>
              }
            </div>
          </div>
          <BottomFooter/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  }
};

const mapDispatchToProps = dispatch => {
  return {
    readStorageState: () => dispatch(readStorageState()),
    setRefreshToken: (auth) => dispatch(setRefreshToken(auth)),
    fetchGuilds: () => dispatch(fetchGuilds()),
    fetchEmotes: () => dispatch(fetchEmotes())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);