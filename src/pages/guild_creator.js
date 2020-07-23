import React, {Component} from "react";
import { Container } from "semantic-ui-react";
import connect from "react-redux/es/connect/connect";


class GuildCreatorPage extends Component {
  render() {
    return (
      <Container text>
        <h1>Server Builder</h1>
        <p>
          This tool allows you to create a new server for the emotes you have with NQN.
        </p>
        <em>Please remember to only upload emojis that you have permission to do so.</em>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {

  }

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuildCreatorPage);
