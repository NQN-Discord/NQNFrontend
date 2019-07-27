import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

import {Header, Divider} from 'semantic-ui-react';

import {setAliases, unsetAliases, changeAliases} from "../../actions/user";
import Entry from "../../components/entry";
import EmoteAliases from "../../components/emote_aliases";


class ManagePage extends Component {
  componentDidMount() {
    this.setState({
      term: "",
    });
  }

  render() {
    if (!this.state) {
      return <div/>;
    }
    return (
      <div>
        <Entry
          icon='search'
          placeholder='Search...'
          onSubmit={(term) => {this.getNewEmotes(term, 0)}}
          clearOnSubmit={false}
        />
        <Divider hidden />
        <Header as="h4">
          You have {Object.keys(this.props.aliases).length} aliases
        </Header>
        <EmoteAliases emotes={this.props.aliases}/>
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