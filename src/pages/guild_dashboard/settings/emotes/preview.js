import React, {Component} from "react";

import {Header, Grid, List} from 'semantic-ui-react';

import EmoteAliases from "../../../../components/emote_aliases";


class EmotePreview extends Component {
  listEmotes(emotes, header) {
    return (
      <EmoteAliases
        emotes={emotes.sort((e1, e2) => (e1.id < e2.id) - (e1.id > e2.id))}
        aliases={emotes}
        showButtons={this.props.modifiable}
        setAliases={this.props.setAliases}
        changeAliases={this.props.changeAliases}
        unsetAliases={this.props.unsetAliases}
        header={header}
      />
    );
  }

  render() {
    return (
      <Grid columns={2}>
        <Grid.Column>
          {this.listEmotes(this.props.emotes.filter(e => !e.animated),
            <List.Item>
              <Header as="h3">
                Static Emotes
              </Header>
            </List.Item>
          )}
        </Grid.Column>
        <Grid.Column>
          {this.listEmotes(this.props.emotes.filter(e => e.animated),
            <List.Item>
              <Header as="h3" floated="left">
                Animated Emotes
              </Header>
            </List.Item>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EmotePreview;