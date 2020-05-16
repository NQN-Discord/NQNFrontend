import React, {Component} from 'react';
import {Header, Divider, Grid, Pagination} from 'semantic-ui-react';

import Entry from "./entry";
import update from "immutability-helper";
import axios from "axios";
import {api_url} from "../config";


class EmoteSearchComponent extends Component {
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
            {this.state.totalResults} result{this.state.totalResults !== 1? 's ': ' '}
            (page {this.state.pageNo + 1} of {Math.ceil(this.state.totalResults / 20)})
          </Header>
          {this.props.emoteAliases(this.state.emotes)}
          {this.state.totalResults > 20 && this.renderNavigationButtons()}
        </div>}
      </div>
    );
  }
}


export default EmoteSearchComponent;