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
import {fetchGuilds, fetchEmotes} from "./actions/user";

import WebhookPage from "./pages/server_view";
import AliasRootPage from "./pages/alias_root";
import LoginPage from "./pages/login";
import JoinedPage from "./pages/joined_server";
import {Header, TopHeader} from "./header";
import {HelpTextPage} from "./components/helpText";
import UserFeedback from "./pages/feedback";
import ReferencePage from "./pages/reference";
import PackPage from "./pages/packs";
import PrivacyPolicy from "./pages/policy";
import GuildCreatorPage from "./pages/guild_creator";
import LicensePage from "./pages/licenses"

import 'semantic-ui-less/semantic.less';
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
        <div>
          <Alert stack={{limit: 3}}/>
          {!this.props.loggedIn &&
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/help" component={HelpTextPage}/>
              <Route exact path="/feedback" component={UserFeedback}/>
              <Route exact path="/privacy" component={PrivacyPolicy}/>
              <Route exact path="/licenses" component={LicensePage}/>
              <LoginPage/>
            </Switch>
          }
          {this.props.loggedIn &&
            <div>
              <TopHeader/>
              <Header/>
              <Switch>
                <Route exact path="/guilds/:channelID" component={WebhookPage}/>
                <Route exact path="/guilds/" component={WebhookPage}/>
                <Route exact path="/guilds/:guildID/:page" component={WebhookPage}/>
                <Route exact path="/alias/" component={AliasRootPage}/>
                <Route exact path="/alias/:id" component={AliasRootPage}/>
                <Route exact path="/joined_server" component={JoinedPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/reference" component={ReferencePage}/>
                <Route exact path="/packs" component={PackPage}/>
                <Route exact path="/guild_creator/aliases" component={GuildCreatorPage}/>

                <Route exact path="/" component={HomePage}/>
                <Route exact path="/help" component={HelpTextPage}/>
                <Route exact path="/feedback" component={UserFeedback}/>
                <Route exact path="/privacy" component={PrivacyPolicy}/>
                <Route exact path="/licenses" component={LicensePage}/>
              </Switch>
            </div>
          }
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