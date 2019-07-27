import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import update from "immutability-helper";
import axios from "axios";

import {Header, Divider, Grid, Pagination} from 'semantic-ui-react';

import {setAliases, unsetAliases, changeAliases} from "../../actions/user";
import EmoteAliases from "../../components/emote_aliases";
import Entry from "../../components/entry";
import {api_url} from "../../config";


class SearchPage extends Component {
  componentDidMount() {
    this.setState({
      term: "",
      pageNo: 0,
      emotes: {},
      renameBox: {},
      openPopup: null,
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

  renderNavigationButtons() {
    return (
      <Grid centered>
        <Grid.Row>
          <Pagination
            activePage={this.state.pageNo + 1}
            boundaryRange={1}
            onPageChange={(event) => {
              const pageNo = parseInt(event.target.innerText);
              this.getNewEmotes(this.state.term, pageNo - 1);
            }}
            size='mini'
            siblingRange={2}
            totalPages={Math.ceil(this.state.totalResults / 20)}
            firstItem={null}
            lastItem={null}
            prevItem={null}
            nextItem={null}
          />
        </Grid.Row>
      </Grid>
    );
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
        { Object.keys(this.state.emotes).length !== 0 && <div>
          <Divider hidden />
          <Header as="h4">
            {this.state.totalResults} results (page {this.state.pageNo + 1} of {Math.ceil(this.state.totalResults / 20)})
          </Header>
          <EmoteAliases emotes={this.state.emotes}/>
          {this.state.totalResults > 20 && this.renderNavigationButtons()}
        </div>}
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
)(SearchPage);