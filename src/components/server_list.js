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
          {Object.keys(this.props.guilds).map(guildID => {
            return (
              <Card
                key={guildID}
                onClick={() => this.props.onSelect(this.props.selected === guildID ? null : guildID)}
              >
                <Image
                  src={this.props.guilds[guildID].icon}
                  centered
                  disabled={!this.props.guilds[guildID].bot_in_guild}
                  size="medium"
                />
                <Card.Content>
                  <Card.Header textAlign="center">
                    {this.props.guilds[guildID].name}
                  </Card.Header>
                </Card.Content>

                {!this.props.guilds[guildID].bot_in_guild &&
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