import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import {Container, Header, Placeholder} from 'semantic-ui-react';

import {fetchGuildLogs} from "../../actions/guild";


class AuditLogs extends Component {
  componentDidMount() {
    const guild = this.props.guilds[this.props.guildID];
    if (!guild.auditLogs) {
      this.props.fetchGuildLogs(this.props.guildID);
    }
  }

  renderPlaceholders() {
    return Array.from(Array(5).keys()).map(i => (
      <Placeholder key={i}>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
      </Placeholder>
    ));
  }

  render() {
    const guild = this.props.guilds[this.props.guildID];
    return (
      <Container>
        <Header as="h3">
          Audit logs for {guild.name}
        </Header>
        {this.renderPlaceholders()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guilds: state.user.guilds
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGuildLogs: (guildID) => dispatch(fetchGuildLogs(guildID))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuditLogs);