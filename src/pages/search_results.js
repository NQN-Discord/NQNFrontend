import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {parse, stringify} from "query-string";
import VisibilitySensor from "react-visibility-sensor";

import Search from "../components/search";
import SearchResult from "../components/search_result";
import SearchResultLarge from "../components/search_result_large";
import {search} from "../actions/search";

import "./search_results.css"


class SearchResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shownPost: null
        };
    }

    componentDidMount() {
        this.onUpdate();
    }

    componentDidUpdate() {
        const query = parse(this.props.location.search);
        if (Object.keys(query).filter(q => ["page", "term"].includes(q)).length === 2) {
            const page = parseInt(query.page, 10);
            if (page !== this.props.results.page || query.term !== this.props.results.term) {
                this.onUpdate();
            }
        }
    }

    onUpdate = () => {
        document.title = `BetterE6 - ${this.props.results.totalResults} results`;
        document.addEventListener("scroll", this.trackScroll);
        this.props.history.push({
            pathname: "/",
            search: stringify({
                term: this.props.results.term,
                page: this.props.results.page
            })
        });
    };

    componentWillUnmount() {
        document.removeEventListener("scroll", this.trackScroll);
    }

    trackScroll = () => {
        const pageHeight=document.documentElement.offsetHeight;
        const windowHeight=window.innerHeight;
        const scrollPosition=window.scrollY || window.pageYOffset || document.body.scrollTop + ((document.documentElement && document.documentElement.scrollTop) || 0);
        if (pageHeight - windowHeight <= scrollPosition + 200) {
            this.props.search(this.props.results.term, this.props.results.page + 1);
            document.removeEventListener("scroll", this.trackScroll);
        }

    };

    onClick = (post) => {
        this.setState({shownPost: post});
    };

    render() {
        return (
            <div>
                <div className="results_search_bar">
                    <Search initial={this.props.results.term}/>
                </div>
                <div className="results_container">
                    {this.props.results.shownResults.map(post => {
                        return (
                            <VisibilitySensor key={post.id} partialVisibility={true}>
                                {isVisible => {
                                    return <SearchResult post={post} onClick={this.onClick} isVisible={isVisible.isVisible}/>;
                                }}
                            </VisibilitySensor>
                        );
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
        results: state.search
    }
};

const mapDispatchToProps = dispatch => {
    return {
        search: (term, page) => dispatch(search(term, page))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultsPage);