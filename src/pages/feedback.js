import React, {Component} from "react";
import { Container, Header, Divider, Form, Radio, TextArea, Button } from "semantic-ui-react";
import update from 'immutability-helper';
import {postGuildFeedback} from '../actions/guild';
import connect from "react-redux/es/connect/connect";
import {Menu} from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";


class UserFeedback extends Component {
  reasons = [
    "Too many permissions needed",
    "I couldn't get it to work",
    "It is too hard to use",
    "It didn't do what I wanted",
    "I have too many bots in my server",
    "I don't think the main functionality is ethical",
    "I bought Nitro",
    "Other reason",
  ];
  async componentDidMount() {
    //const query = parse(this.props.location.search);
    this.setState({reason: null, details: ""});
  }

  submit() {
    const urlParams = new URLSearchParams(window.location.search);
    const guildID = urlParams.get('guild_id');

    this.props.postGuildFeedback(guildID, this.state.reason, this.state.details, () => {
      window.location.replace(window.location.origin);
    });
  }

  render() {
    if (this.state === null) {
      return null;
    }
    return (
      <Container text>
        <Divider hidden/>
        <Header>
          Feedback
        </Header>
        Thanks for deciding to help out by sending me some feedback.
        <br/>
        The only extra thing we're logging is the server you came from, not who you are on Discord.
        <br/>
        If you want, you can <a
          href="https://discord.gg/UMVpPN7"
          target="_blank"
          rel="noopener"
        >join our support server</a> if there's anything we can help you with.
        <Divider/>


        <Form>
          Please select the main reason why you removed NQN from your server
          <Divider hidden/>
          { this.reasons.map(reason => (
            <Form.Field key={reason}>
              <Radio
                label={reason}
                checked={this.state.reason === reason}
                onChange={() => this.setState(update(this.state, {$merge: {reason}}))}
              />
            </Form.Field>
          ))}
          <Divider hidden/>
          If you want, you can add more detail here:
          <TextArea
            rows={8}
            onChange={(event) => this.setState(update(this.state, {$merge: {details: event.target.value}}))}
          />
          <Divider hidden/>
          <Button
            onClick={() => this.submit()}
            disabled={this.state.reason === null}
          >
            Submit Feedback
          </Button>
        </Form>
        <Divider hidden/>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    guilds: state.user.guilds
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postGuildFeedback: (guildID, reason, details, callback) => dispatch(postGuildFeedback(guildID, reason, details, callback))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFeedback);
