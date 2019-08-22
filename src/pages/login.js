import React, {Component} from 'react';

import {discordURL} from "../config";
import {parse} from "query-string";
import {exchangeCode} from "../actions/auth";
import connect from "react-redux/es/connect/connect";

class LoginPage extends Component {
  async componentDidMount() {
    const query = parse(this.props.location.search);
    const code = query.code;
    const state = query.state;
    const redirect = localStorage.getItem("redirect");

    if (this.props.refreshToken) {
      localStorage.setItem("redirect", "");
      this.props.history.push(redirect || "/");
      return
    }
    if (!code) {
      localStorage.setItem("redirect", this.props.location.pathname);
      window.location = discordURL;
      return
    }
    this.props.exchangeCode(code, state);
  }

  render() {
    return (
      <h4>Redirecting</h4>
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
    exchangeCode: (token, state) => dispatch(exchangeCode(token, state))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);