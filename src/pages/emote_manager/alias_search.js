import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

import {setAliases, unsetAliases, changeAliases} from "../../actions/user";
import EmoteAliases from "../../components/emote_aliases";
import EmoteSearchComponent from "../../components/emote_search";
import axios from "axios";
import {api_url} from "../../config";
import update from "immutability-helper";


class AliasSearchPage extends Component {
  componentDidMount() {
    this.setState({
      term: "",
      pageNo: 0,
      emotes: {},
      totalResults: 0,
    });
  }

  getNewEmotes(term, pageNo) {
    axios.get(`${api_url}/emotes/search`, {params: {term, page_no: pageNo}}).then(response => {
      this.setState(update(this.state,
        {$merge: {
            pageNo,
            term,
            totalResults: response.data.total,
            emotes: response.data.results,
          }}
      ));
    });
  }

  render() {
    if (!this.state) {
      return <div/>
    }
    return (
      <EmoteSearchComponent
        search={(term, pageNo) => this.getNewEmotes(term, pageNo)}
        renderer={() =>
          <EmoteAliases
            emotes={this.state.emotes}
            aliases={this.props.aliases}
            setAliases={this.props.setAliases}
            changeAliases={this.props.changeAliases}
            unsetAliases={this.props.unsetAliases}
            showButtons={true}
          />
        }
        term={this.state.term}
        pageNo={this.state.pageNo}
        totalResults={this.state.totalResults}
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
)(AliasSearchPage);