import React, {Component} from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import './semantic/src/definitions/globals/reset.less';
import './semantic/src/definitions/globals/site.less';


import {readStorageState, setRefreshToken} from "./actions/auth";
import {fetchEmotes} from "./actions/user";
import {fetchGuilds} from "./actions/guild";

import {Header, BottomFooter} from "./header";

import {Helmet} from "react-helmet";
import {FullRouter} from "./router";
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
      } else {
        throw err;
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
        Loading Login Data...
      </div>
    }

    return (
      <Router>
        <div className="site_content">
          <Helmet>
            <title>Not Quite Nitro</title>
            <meta content="Not Quite Nitro" property="og:title"/>
            <meta content="A free Discord Nitro alternative. NQN is a Discord emojis bot which allows anyone to use emojis for free" property="og:description"/>
            <meta content="A free Discord Nitro alternative. NQN is a Discord emojis bot which allows anyone to use emojis for free" name="description"/>
            <meta content="https://discord.com/api/oauth2/authorize?client_id=559426966151757824&permissions=536895488&scope=bot%20applications.commands" property="og:url"/>
            <meta content="#7289DA" name="theme-color"/>
            <meta content="website" property="og:type"/>
            <meta content="summary" property="twitter:type"/>
            <meta content="https://nqn.blue/wumpus_logo.png" property="og:image"/>
          </Helmet>

          <Alert stack={{limit: 3}}/>
          <div className="site_body">
            <Header/>
            <div className="site_container">
              <FullRouter loggedIn={this.props.loggedIn} HomePage={HomePage}/>
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
