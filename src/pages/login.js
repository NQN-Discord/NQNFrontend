import React, {Component} from 'react';
import { Container } from "semantic-ui-react";

import {discordURL} from "../config";
import {parse} from "query-string";
import {exchangeCode} from "../actions/auth";
import {createGuild} from "../actions/guild";
import FailedInvite from "./failed_invite";
import connect from "react-redux/es/connect/connect";

class LoginPage extends Component {
  async componentDidMount() {
    const query = parse(this.props.location.search);
    const code = query.code;
    const state = query.state;
    const error = query.error;
    const invitedBot = query.guild_id !== undefined;
    const redirect = localStorage.getItem("redirect");
    const guildBuilder = localStorage.getItem("guild_builder");

    if (error) {
      return
    }

    if (guildBuilder) {
      const guildAliases = JSON.parse(guildBuilder);
      localStorage.removeItem("guild_builder");
      this.props.createGuild(guildAliases, code, () => {
        this.props.history.push("/guilds");
        window.location.reload();
      });
      return
    }

    if (invitedBot && !redirect.startsWith("/joined_server")) {
      localStorage.setItem("redirect", `/joined_server?guild_id=${query.guild_id}`);
      localStorage.setItem("refreshToken", "");
      window.location.reload();
      return
    }

    if (invitedBot && redirect === "/joined_server" && this.props.refreshToken) {
      localStorage.setItem("redirect", "");
      this.props.history.push(redirect);
      return
    }

    if (this.props.refreshToken) {
      localStorage.setItem("redirect", "");
      this.props.history.push(redirect || "/");
      return
    }
    if (!code) {
      localStorage.setItem("redirect", this.props.location.pathname === "/login"? "/": this.props.location.pathname);
      window.location = discordURL;
      return
    }
    this.props.exchangeCode(code, state);
  }

  render() {
    const query = parse(this.props.location.search);
    const error = query.error;
    if (error) {
      return <FailedInvite/>
    }
    return (
      <Container>
        <h4>Loading...</h4>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    refreshToken: state.auth.refreshToken
  }
};

const mapDispatchToProps = dispatch => {
  return {
    exchangeCode: (token, state) => dispatch(exchangeCode(token, state)),
    createGuild: (aliases, code, callback) => dispatch(createGuild(aliases, code, callback))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);