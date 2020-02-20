import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import axios from "axios";

import {readStorageState, setRefreshToken} from "./actions/auth";
import {fetchGuilds, fetchEmotes} from "./actions/user";

import WebhookPage from "./pages/server_view";
import AliasRootPage from "./pages/alias_root";
import LoginPage from "./pages/login";
import JoinedPage from "./pages/joined_server";
import Header from "./header";
import {HelpTextPage} from "./components/helpText";
import UserFeedback from "./pages/feedback";

import 'semantic-ui-css/semantic.min.css';
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
      if (err.response.status === 403 && err.response.data.message === "Invalid login token") {
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
          {!this.props.loggedIn &&
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/help" component={HelpTextPage}/>
              <Route exact path="/feedback" component={UserFeedback}/>
              <LoginPage/>
            </Switch>
          }
          {this.props.loggedIn &&
            <div>
              <Header/>
              <Switch>
                <Route exact path="/" component={WebhookPage}/>
                <Route exact path="/channels/:channelID" component={WebhookPage}/>
                <Route exact path="/channels/" component={WebhookPage}/>
                <Route exact path="/guilds/:guildID/:page" component={WebhookPage}/>
                <Route exact path="/guilds/" component={WebhookPage}/>
                <Route exact path="/alias/" component={AliasRootPage}/>
                <Route exact path="/alias/:id" component={AliasRootPage}/>
                <Route exact path="/joined_server" component={JoinedPage}/>
                <Route exact path="/login" component={LoginPage}/>
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