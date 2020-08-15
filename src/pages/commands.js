import React, {Component} from 'react';
import {Accordion, Container, Divider, Icon, Header, Label, Grid} from "semantic-ui-react";
import connect from "react-redux/es/connect/connect";
import {fetchCommands} from "../actions/commands";
import "./commands.css";

const levelDeep = {
  0: "h3",
  1: "h4",
  2: "h5"
};

const checkOrder = {
  guild_only: 1,
  dm_only: 1,
  has_permissions: 2,
  bot_has_permissions: 3
};

class CommandPage extends Component {
  componentDidUpdate() {
    const element = document.getElementById(this.getLocation());
    if (element) {
      element.scrollIntoView({behavior: "smooth"});
    }
  }

  getPermColour(perm, attr, match="every") {
    const guildID = new URLSearchParams(this.props.location.search).get("guild");
    if (!this.props.loggedIn || !guildID) {
      return "green"
    }
    const guild = this.props.guilds[guildID];
    if (!guild) {
      return "yellow";
    }
    if (typeof perm === "string") {
      return guild[attr].includes(perm)? "green": "red";
    }
    return perm[match](p => this.getPermColour(p, attr, match) === "green")? "green": "red";
  }


  getLocation() {
    return decodeURI(window.location.hash.substr(1).replace(/\+/g, ' '));
  }

  sortCommands(commands) {
    return commands.sort((a, b) => a.name.localeCompare(b.name))
  }

  humanise(name) {
    return name.replace(/_/g, " ").replace(/guild/g, "server");
  }

  getCheckData(command) {
    return Object.entries(command.checks).map(([name, perms]) => {
      return [checkOrder[name], {name, perms}];
    }).sort(([s1, v1], [s2, v2]) => s1-s2).map(([s, v]) => v);
  }

  renderTitle(command, depth) {
    return (
      <Accordion.Title id={command.name} className="command_title_padding">
        <Icon name="dropdown"/>
        <Header as={levelDeep[depth]} className="inline">
          {command.name}
        </Header> - {command.short_doc}
        <div className="right">
          {this.getCheckData(command)
            .map(({name, perms}) => {
              switch (name) {
                case "guild_only":
                  return <Label color="blue" key={name}>Server Only</Label>;
                case "dm_only":
                  return <Label color="blue" key={name}>DM Only</Label>;
                case "has_permissions":
                  return <Icon color={this.getPermColour(perms, "user_permissions")} key={name} circular bordered inverted name="user"/>;
                case "bot_has_permissions":
                  return <Icon color={this.getPermColour(perms, "bot_permissions")} key={name} circular bordered inverted className="robot"/>;
                default:
                  return <Label key={name}>{name}</Label>;
              }
            })
          }
        </div>
      </Accordion.Title>
    );
  }

  renderPerms(perms, icon, name) {
    return (
      <Grid.Column width={3} className="center_text to_title">
        <Label color={this.getPermColour(perms, name)} circular>
          <Icon className={icon}/>
          {this.humanise(name)}
        </Label>
        <Label.Group className="label_padding">
          {perms.map(perm => {
            const guildID = new URLSearchParams(this.props.location.search).get("guild");
            const colour = this.getPermColour(perm, name);
            return (
              <Label color={colour} key={perm} className="fluid">
                {guildID && this.props.loggedIn && colour !== "yellow" &&
                  <Icon
                    name={colour === "green"? "check": "times"}
                    className="left"
                  />
                }
                {this.humanise(perm)}
              </Label>
            )}
          )}
        </Label.Group>
      </Grid.Column>
    );
  }

  renderCommand(command, depth) {
    const title = command.signature? `${command.name} ${command.signature}`: command.name;
    const bot_perms = command.checks.bot_has_permissions;
    const user_and_perms = command.checks.has_permissions;
    const count = !!bot_perms + !!user_and_perms;
    return {
      key: command.name,
      title: this.renderTitle(command, depth),
      content: (
        <Accordion.Content className="newlines quote">
          <Grid container doubling stackable>
            <Grid.Column width={10}>
              <code>{title}</code>
              <Divider hidden/>
              {command.help}
            </Grid.Column>
            {count === 1 && <Grid.Column width={3}/>}
            {user_and_perms && this.renderPerms(user_and_perms, "user", "user_permissions")}
            {bot_perms && this.renderPerms(bot_perms, "robot", "bot_permissions")}
          </Grid>
        </Accordion.Content>
      )
    }
  }

  renderGroup(group, depth) {
    const sorted = this.sortCommands(group.commands);
    return {
      key: group.name,
      title: this.renderTitle(group, depth),
      content: (
        <Accordion.Content className="newlines quote">
          <Grid container doubling stackable>
            <Accordion
              defaultActiveIndex={[sorted.findIndex(c => this.getLocation().startsWith(c.name))]}
              panels={sorted.map(command => this.renderCommandOrGroup(command, depth+1))}
              exclusive={false}
              fluid
            />
          </Grid>
        </Accordion.Content>
      )
    }
  }

  renderCommandOrGroup(command, depth) {
    switch (command.type) {
      case "command":
        return this.renderCommand(command, depth);
      case "group":
        return this.renderGroup(command, depth);
      default:
        return "Invalid!";
    }
  }


  render() {
    if (!Object.keys(this.props.commands).length) {
      this.props.fetchCommands();
      return <div/>
    }
    const groups = this.props.commands.filter(command => command.type === "group");
    const everythingElse = this.props.commands.filter(command => command.type === "command");
    const sorted = this.sortCommands(groups);
    sorted.push({
      type: "group",
      name: "Everything Else",
      short_doc: "All the other commands NQN has",
      commands: everythingElse,
      checks: {}
    });

    return (
      <Container>
        <h2>
          Full Command List:
        </h2>

        <Accordion
          defaultActiveIndex={[sorted.findIndex(c => {
            if (c.name !== "Everything Else") {
              return this.getLocation().startsWith(c.name);
            }
            return this.getLocation() !== "";
          })]}
          panels={sorted.map(command => this.renderCommandOrGroup(command, 0))}
          exclusive={false}
          fluid
        />
      </Container>
    )}
}

const mapStateToProps = state => {
  return {
    commands: state.user.commands,
    guilds: state.user.guilds,
    loggedIn: state.auth.loggedIn
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCommands: () => dispatch(fetchCommands())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommandPage);
