import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import {Container, Menu, Segment} from 'semantic-ui-react';

import GuildSettings from './guild_settings/guild_settings';
import AuditLogs from './guild_settings/audit_logs';


class GuildSettingsRoot extends Component {
  render() {
    const pageName = this.props.match.params.page || "settings";
    const page = {
      settings: <GuildSettings guildID={this.props.guildID}/>,
      logs: <AuditLogs guildID={this.props.guildID}/>
    }[pageName];
    return (
      <Container>
        <Menu attached='top' tabular>
          <Menu.Item
            name='Settings'
            active={pageName === "settings"}
            onClick={() => this.props.history.push("./settings")}
          />
          <Menu.Item
            name='Audit Logs'
            active={pageName === "logs"}
            onClick={() => this.props.history.push("./logs")}
          />
        </Menu>
        <Segment attached='bottom'>
          {page}
        </Segment>
      </Container>
    );
  }
}

export default withRouter(GuildSettingsRoot);