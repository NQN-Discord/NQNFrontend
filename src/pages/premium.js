import React, {Component} from 'react';
import { Container, Button } from "semantic-ui-react";

import '../semantic/src/definitions/elements/container.less';
import '../semantic/src/definitions/elements/button.less';

import {parse} from "query-string";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {api_url, patreonPage, patreonOauth} from "../config";
import  {fetchPremiumUser} from "../actions/user";
import Alert from "react-s-alert";

class PremiumPage extends Component {
  async componentDidMount() {
    const query = parse(this.props.location.search);
    const code = query.code;
    const state = query.state;

    if (code) {
      axios.put(`${api_url}/patreon/set_override`, {code, state: state || ''}).then(response => {
        Alert[response.data.tag](response.data.message, {timeout: "none"});
        this.props.history.replace({search: ""});
        this.props.fetchPremiumUser();
      });
    }
  }

  render() {
    console.log(this.props.premium_user)
    const query = parse(this.props.location.search);
    const code = query.code;
    const hasPremium = this.props.premium_user && this.props.premium_user.has_premium;
    return (
      <Container>
        <h2>Premium{hasPremium && " - Linked to this account"}</h2>
        NQN, like all bots, costs money to run.
        If you'd like to show your support to the bot, we have a Patreon account.

        Perks:
        <ul>
          <li>
            Improved emoji curation abilities for server administrators
          </li>
          <li>
            Ability to set a single role which grants the ability to use the bot
          </li>
        </ul>

        {!hasPremium &&
          <Button primary onClick={() =>
            window.open(patreonPage, "_blank")
          }>
            Get Premium
          </Button>
        }
        <Button
          loading={!!code}
          primary={hasPremium}
          onClick={() =>
            window.open(patreonOauth, "_self")
        }>
          {hasPremium && "Reconnect Patreon"}
          {!hasPremium && "Connect Patreon"}
        </Button>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  return {
    premium_user: state.user.premium_user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPremiumUser: () => dispatch(fetchPremiumUser()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PremiumPage);
