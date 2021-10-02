import React, {Component} from 'react';
import update from "immutability-helper";

import {Button, Popup, List, Input} from 'semantic-ui-react';

import '../semantic/src/definitions/elements/button.less';
import '../semantic/src/definitions/elements/icon.less';
import '../semantic/src/definitions/modules/popup.less';
import '../semantic/src/definitions/elements/list.less';
import '../semantic/src/definitions/elements/input.less';

import {Emote} from "./emote";


class EmoteAliases extends Component {
  componentDidMount() {
    this.setState({
      renameBox: {},
      openPopup: null,
    });
  }

  toggleAlias(emote) {
    const alias = this.props.aliases.find(alias => alias.id === emote.id);
    if (this.props.onToggle) {
      this.props.onToggle(emote.id, alias);
    }
    if (alias) {
      this.props.unsetAliases([alias]);
    }
    else {
      this.props.setAliases([emote]);
    }
  }

  saveAlias(emote, newAlias) {
    this.setState(update(this.state, {openPopup: {$set: null}, renameBox: {$unset: [emote.id]}}));
    const alias = this.props.aliases.find(alias => alias.id === emote.id);
    if (newAlias === "") {
      newAlias = emote.name;
    }
    if (alias.name === newAlias) {
      return;
    }
    this.props.changeAliases([{
      name: newAlias,
      oldName: alias.name,
      id: emote.id,
      animated: emote.animated
    }]);
  }

  renderSearchResult(emote) {
    const emoteObj = new Emote(emote);
    const alias = this.props.showButtons && this.props.aliases.find(alias => alias.id === emote.id);
    const getName = () => {
      if (typeof this.state.renameBox[emote.id] === "undefined") {
        return alias.name.replace(/[^A-Za-z0-9_]+/g, '');
      }
      return this.state.renameBox[emote.id].replace(/[^A-Za-z0-9_]+/g, '');
    };
    return (
      <List.Item
        key={`${emote.id}-${emote.name}`}
      >
        {emoteObj.renderImg()}
        <List.Content verticalAlign='middle'>
          {(alias || emote).name}
        </List.Content>

        {this.props.showButtons &&
          <List.Content floated='right'>
            {alias &&
            <Popup
              open={this.state.openPopup === emote.id}
              onOpen={() => this.setState(update(this.state, {$merge: {openPopup: emote.id}}))}
              onClose={() => this.setState(update(this.state, {$merge: {openPopup: null}}))}
              trigger={
                <Button icon="edit"/>
              }
              content={
                <Input
                  labelPosition='left'
                  label="Rename"
                  action={{
                    color: 'positive',
                    icon: 'save',
                    onClick: () => {
                      this.saveAlias(emote, getName())
                    }
                  }}
                  value={getName()}
                  onChange={(e) => this.setState(update(this.state, {renameBox: {$merge: {[emote.id]: e.target.value}}}))}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      this.saveAlias(emote, getName())
                    }
                  }}
                />
              }
              on="click"
              position="left center"
            />
            }
            <Button
              icon={alias ? 'minus' : 'add'}
              negative={Boolean(alias)}
              onClick={() => this.toggleAlias(emote)}
            />
          </List.Content>
        }
      </List.Item>
    );
  }

  render() {
    if (!this.state) {
      return <div/>;
    }
    const ids = new Set();
    // this.props.emotes -> emotes to render
    // this.props.aliases -> our aliases
    return (
      <List celled>
        {this.props.header}
        {this.props.emotes.filter(emote => {
          if (ids.has(emote.id)) {
            return false;
          }
          ids.add(emote.id);
          return true;
        }).map(emote => this.renderSearchResult(emote))}
      </List>
    );
  }
}

export default EmoteAliases;