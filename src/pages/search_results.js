import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {stringify} from "query-string";

import SearchResult from "../components/search_result";
import "./search_results.css"


class SearchResultsPage extends Component {
    componentDidMount() {
        this.props.history.push({
            pathname: "/",
            search: stringify({
                term: this.props.search.term,
                page: this.props.search.page
            })
        });
    }

    render() {
        return (
            <div>
                <h4>Search results for <b>{this.props.search.term}</b></h4>
                <p>
                    Total results: {this.props.search.totalResults}<br/>
                    Page: {this.props.search.page}<br/>
                </p>
                <div className="results_container">
                    {this.props.search.shownResults.map(post => {
                        return <SearchResult key={post.id} post={post}/>;
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        search: state.search
    }
};

export default connect(
    mapStateToProps
)(SearchResultsPage);