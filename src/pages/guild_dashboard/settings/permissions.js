import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import {Container, Table, Icon, Label, List} from 'semantic-ui-react';

import "./permissions.css";

function humanise(name) {
  return name.replace(/_/g, " ").replace(/guild/g, "server");
}

class GuildPermissions extends Component {
  render() {
    const guild = this.props.guilds[this.props.guildID];

    return (
      <Container>
        <p>
          This table describes most permissions the bot needs for normal functionality.
        </p>
        <List as="ul">
          <List.Item as="li">
            The first row of the table shows the bot's permissions at a server level.
          </List.Item>
          <List as="ul">
            <List.Item as="li">
              If you have just invited the bot, any column completely coloured red (has
              an <Icon name="times"/> in the first row) means the bot does not have this
              permission at the role level, and you will need to give it to NQN.
            </List.Item>
          </List>
          <List.Item as="li">
            The remaining rows show the bot's permissions for each channel you can view.
            It does NOT include any channel you yourself cannot at least read.
          </List.Item>
          <List as="ul">
            <List.Item as="li">
              If an individual cell has an <Icon name="times"/>, the bot has been explitly
              denied this permission.
            </List.Item>
            <List.Item as="li">
              If you've only just added the bot, the only case this can happen is
              an explicit deny of the @everyone role in the channel OR you have another
              bot which provides automatic roles.
            </List.Item>
          </List>
        </List>
        <Table celled striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Channel Name
              </Table.HeaderCell>
              {this.props.required_permissions.map(perm =>
                <Table.HeaderCell
                  key={perm}
                  className="permissions_table_header"
                >
                  <span
                    title={humanise(perm)}
                  >
                    {humanise(perm)}
                  </span>
                </Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell>
                <Label ribbon>Server ({guild.name})</Label>
              </Table.HeaderCell>
              {this.props.required_permissions.map(perm =>
                <Table.Cell
                  key={perm}
                  negative={guild.bot_missing.includes(perm)}
                  textAlign="center"
                >
                  {guild.bot_missing.includes(perm) &&
                    <Icon
                      name="times"
                    />
                  }
                </Table.Cell>
              )}
            </Table.Row>
            {Object.entries(guild.channels).map(([id, {name, missing_permissions}]) =>
              <Table.Row key={id}>
                <Table.HeaderCell>
                  {name}
                </Table.HeaderCell>
                {this.props.required_permissions.map(perm =>
                  <Table.Cell
                    key={perm}
                    negative={guild.bot_missing.includes(perm) || missing_permissions.includes(perm)}
                    textAlign="center"
                  >
                    {missing_permissions.includes(perm) &&
                    <Icon
                      name="times"
                    />
                    }
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>

        <List as="ul">
          <List.Item as="li">
            Read Messages, Manage Webhooks, Manage Messages and External Emojis are
            required for the Nitro message reposting functionality.
          </List.Item>
          <List.Item as="li">
            Read Messages and Send Messages permissions are required to run any command.
          </List.Item>
          <List.Item as="li">
            Denying the Send Messages permission whilst keeping Manage Webhooks will
            allow Nitro emoji reposting whilst disallowing command usage.
            (The react command is an exception to this.)
          </List.Item>
          <List.Item as="li">
            Embed Links is required for many commands.
          </List.Item>
          <List.Item as="li">
            Add Reactions, External Emojis and Read Message History are required for the
            react command.
          </List.Item>
        </List>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guilds: state.user.guilds,
    required_permissions: state.user.required_permissions
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuildPermissions);