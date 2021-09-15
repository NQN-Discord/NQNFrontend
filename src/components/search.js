import React, {Component} from 'react';
import {Header, Grid, Pagination} from 'semantic-ui-react';

import '../semantic/src/definitions/elements/header.less';
import '../semantic/src/definitions/collections/grid.less';


class SearchComponent extends Component {
  componentDidMount() {
    this.setState({
      pageNo: 0,
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
              this.setState({pageNo: pageNo-1});
            }}
            size='mini'
            siblingRange={2}
            totalPages={Math.ceil(this.props.totalResults / this.props.resultsPerPage)}
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
        <Header as="h4">
          {this.props.totalResults} result{this.state.totalResults !== 1? 's ': ' '}
          (page {this.state.pageNo + 1} of {Math.ceil(this.props.totalResults / this.props.resultsPerPage)})
        </Header>
        {this.props.renderPage(this.state.pageNo)}
        {this.props.totalResults > this.props.resultsPerPage && this.renderNavigationButtons()}
      </div>
    );
  }
}


export default SearchComponent;