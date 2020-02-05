import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

import {setAliases, unsetAliases, changeAliases} from "../../actions/user";
import EmoteAliases from "../../components/emote_aliases";
import SearchComponent from "../../components/search";


class SearchPage extends Component {

  render() {
    return (
      <SearchComponent
        getNewEmotes={this.getNewEmotes}
        emoteAliases={(emotes) =>
          <EmoteAliases
            emotes={emotes}
            aliases={this.props.aliases}
            setAliases={this.props.setAliases}
            changeAliases={this.props.changeAliases}
            unsetAliases={this.props.unsetAliases}
            showButtons={true}
          />
        }
      />
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
)(SearchPage);