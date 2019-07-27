import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

import {Header, Divider, Input} from 'semantic-ui-react';

import {setAliases, unsetAliases, changeAliases} from "../../actions/user";
import EmoteAliases from "../../components/emote_aliases";
import update from "immutability-helper";


class ManagePage extends Component {
  componentDidMount() {
    this.setState({
      term: "",
      temp: [],
    });
  }

  handleToggle(id, alias) {
    if (alias) {
      this.setState(update(this.state, {temp: {$push: [alias]}}));
    } else {
      this.setState(update(this.state, {temp: {$set: this.state.temp.filter(alias => alias.id !== id)}}));
    }
  }

  render() {
    if (!this.state) {
      return <div/>;
    }
    const renderedEmotes = (
      this.props.aliases.concat(this.state.temp)
      .filter(alias => alias.name.includes(this.state.term))
      .sort((e1, e2) => (e1.id < e2.id) - (e1.id > e2.id))
    );
    const noAliases = Object.keys(this.props.aliases).length;
    return (
      <div>
        <Input
          icon='search'
          placeholder='Filter...'
          value={this.state.term}
          onChange={(e) => {
            this.setState(update(this.state, {$merge:
                {term: e.target.value}
            }));
          }}
        />
        <Divider hidden />
        <Header as="h4">
          You have {noAliases} alias{noAliases !== 1? 'es': ''}
        </Header>
        <EmoteAliases emotes={renderedEmotes} onToggle={(id, alias) => this.handleToggle(id, alias)}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    aliases: state.user.user_aliases
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setAliases: (aliases) => dispatch(setAliases(aliases)),
    changeAliases: (aliases) => dispatch(changeAliases(aliases)),
    unsetAliases: (emotes) => dispatch(unsetAliases(emotes))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagePage);