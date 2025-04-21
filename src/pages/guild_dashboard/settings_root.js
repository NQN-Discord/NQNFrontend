import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import {Container, Menu, Segment} from 'semantic-ui-react';

import '../../semantic/src/definitions/elements/container.less';
import '../../semantic/src/definitions/collections/menu.less';
import '../../semantic/src/definitions/elements/segment.less';

import GuildSettings from './settings/guild_settings';
import AuditLogs from './settings/audit_logs';
import EmoteSettings from './settings/emotes';
import GuildPermissions from './settings/permissions';
import connect from "react-redux/es/connect/connect";
import {Helmet} from "react-helmet";


class GuildSettingsRoot extends Component {
  render() {
    const guild = this.props.guilds[this.props.guildID];
    const pageName = this.props.match.params.page || "settings";
    const page = {
      settings: <GuildSettings guildID={this.props.guildID} showHeader={true}/>,
      logs: <AuditLogs guildID={this.props.guildID}/>,
      emojis: <EmoteSettings guild={guild} emotes={this.props.emotes[this.props.guildID] || []}/>,
      permissions: <GuildPermissions guildID={this.props.guildID}/>
    }[pageName];
    return (
      <Container>
        <Helmet>
          <title>NQN Dashboard</title>
        </Helmet>
        <Menu attached='top' tabular>
          {guild.user_permissions.includes("manage_guild") && <Menu.Item
            name='Settings'
            active={pageName === "settings"}
            onClick={() => this.props.history.push("./settings")}
          />}
          {guild.user_permissions.includes("manage_guild") && <Menu.Item
            name='Permissions'
            active={pageName === "permissions"}
            onClick={() => this.props.history.push("./permissions")}
          />}
          {guild.user_permissions.includes("view_audit_log") && <Menu.Item
            name='Audit Logs'
            active={pageName === "logs"}
            onClick={() => this.props.history.push("./logs")}
          />}
          {guild.user_permissions.includes("manage_expressions") && <Menu.Item
            name='Custom Emojis'
            active={pageName === "emojis"}
            onClick={() => this.props.history.push("./emojis")}
          />}
        </Menu>
        <Segment attached='bottom'>
          {page}
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guilds: state.user.guilds,
    emotes: state.user.guild_emotes,
  }
};

export default withRouter(connect(
  mapStateToProps,
  null
)(GuildSettingsRoot));
