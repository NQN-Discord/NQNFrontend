import React, {Component} from "react";

import {Container, Image, Card, Button} from 'semantic-ui-react';

import "./server_list.css";

export default class GuildSelector extends Component {
  render() {
    if (Object.keys(this.props.guilds).length === 0) {
      return <div/>;
    }
    return (
      <Container className="server_list">
        <Card.Group>
          {this.props.guilds
            .map(([guildID, guild]) => {
              const perms_needed = (this.props.bot_permissions || []).filter(p => !(guild.bot_permissions.includes(p) || guild.bot_permissions.includes("administrator")));
              return (
                <Card
                  key={guildID}
                  onClick={() => this.props.onSelect(this.props.selected === guildID ? null : guildID)}
                  className="guild_icon"
                >
                  <Image
                    src={guild.icon}
                    centered
                    disabled={!guild.bot_in_guild}
                    size="small"
                  />
                  <Card.Content>
                    <Card.Header textAlign="center">
                      {guild.name}
                    </Card.Header>
                  </Card.Content>

                  {!guild.bot_in_guild &&
                    <Button primary>
                      Add NQN
                    </Button>
                  }
                </Card>
              );
          })}
        </Card.Group>
      </Container>
    );
  }
}