import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import {Container, Image, Card, Button} from 'semantic-ui-react';

import "./server_list.css";

class GuildSelector extends Component {
  render() {
    if (Object.keys(this.props.guilds).length === 0) {
      return <div/>;
    }
    return (
      <Container className="server_list">
        <Card.Group>
          {Object.keys(this.props.guilds)
            .map(guildID => this.props.guilds[guildID])
            .filter(guild => guild.bot_in_guild || guild.user_permissions.includes("manage_guild"))
            .map(guild => {
              return (
                <Card
                  key={guild.id}
                  onClick={() => this.props.onSelect(this.props.selected === guild.id ? null : guild.id)}
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
                    <Button
                      primary
                    >
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

const mapStateToProps = (state) => {
  return {
    guilds: state.user.guilds,
  }
};
export default connect(
  mapStateToProps,
  null
)(GuildSelector);