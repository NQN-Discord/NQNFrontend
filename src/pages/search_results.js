import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {stringify} from "query-string";

import SearchResult from "../components/search_result";
import SearchResultLarge from "../components/search_result_large";
import "./search_results.css"


class SearchResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shownPost: null
        };
    }

    componentDidMount() {
        this.props.history.push({
            pathname: "/",
            search: stringify({
                term: this.props.search.term,
                page: this.props.search.page
            })
        });
    }

    onClick = (post) => {
        this.setState({shownPost: post});
    }

    render() {
        return (
            <div>
                <h4>Search results for <b>{this.props.search.term}</b></h4>
                <p>
                    Total results: {this.props.search.totalResults}<br/>
                    Page: {this.props.search.page + 1}<br/>
                </p>
                <div className="results_container">
                    {this.props.search.shownResults.map(post => {
                        return <SearchResult key={post.id} post={post} onClick={this.onClick}/>;
                    })}
                </div>
                {this.state.shownPost !== null &&
                    <div className="post_overlay" onClick={
                        (e) => {
                            if (["post_overlay", "post_overlay_center"].includes(e.target.className)) {
                                this.setState({shownPost: null});
                            }
                        }}>
                        <div className="post_overlay_center">
                            <SearchResultLarge post={this.state.shownPost}/>
                        </div>
                    </div>
                }
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