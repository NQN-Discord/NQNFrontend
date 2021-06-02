import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import {Container, Menu, Segment} from 'semantic-ui-react';

import GuildSettings from './settings/guild_settings';
import AuditLogs from './settings/audit_logs';
import EmoteSettings from './settings/emotes';
import GuildPermissions from './settings/permissions';
import connect from "react-redux/es/connect/connect";


class GuildSettingsRoot extends Component {
  render() {
    const guild = this.props.guilds[this.props.guildID];
    const pageName = this.props.match.params.page || "settings";
    const page = {
      settings: <GuildSettings guildID={this.props.guildID} showHeader={true}/>,
      logs: <AuditLogs guildID={this.props.guildID}/>,
      emotes: <EmoteSettings guildID={this.props.guildID}/>,
      upload_emotes: <EmoteSettings guildID={this.props.guildID}/>,
      permissions: <GuildPermissions guildID={this.props.guildID}/>
    }[pageName];
    return (
      <Container>
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
        </Menu>
        <Segment attached='bottom'>
          {page}
        </Segment>
      </Container>
    );
  }
}

/*
<Menu.Item
  name='Custom Emotes'
  active={["emotes", "upload_emotes"].includes(pageName)}
  onClick={() => this.props.history.push("./emotes")}
/>
 */

const mapStateToProps = (state) => {
  return {
    guilds: state.user.guilds
  }
};

export default withRouter(connect(
  mapStateToProps,
  null
)(GuildSettingsRoot));
