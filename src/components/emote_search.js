import React, {Component} from 'react';
import {Header, Divider, Grid, Pagination} from 'semantic-ui-react';

import Entry from "./entry";


class EmoteSearchComponent extends Component {
  renderNavigationButtons() {
    return (
      <Grid centered>
        <Grid.Row>
          <Pagination
            activePage={this.props.pageNo + 1}
            boundaryRange={1}
            onPageChange={(event) => {
              const pageNo = parseInt(event.target.innerText);
              this.props.search(this.props.term, pageNo - 1);
            }}
            size='mini'
            siblingRange={2}
            totalPages={Math.ceil(this.props.totalResults / 20)}
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
    return (
      <div>
        <Entry
          icon='search'
          placeholder='Search...'
          onSubmit={(term) => {this.props.search(term, 0)}}
          clearOnSubmit={false}
        />
        { (this.props.term !== "" || this.props.totalResults !== 0) && <div>
          <Divider hidden />
          <Header as="h4">
            {this.props.totalResults} result{this.props.totalResults !== 1? 's ': ' '}
            (page {this.props.pageNo + 1} of {Math.ceil(this.props.totalResults / 20)})
          </Header>
          {this.props.renderer()}
          {this.props.totalResults > 20 && this.renderNavigationButtons()}
        </div>}
      </div>
    );
  }
}


export default EmoteSearchComponent;