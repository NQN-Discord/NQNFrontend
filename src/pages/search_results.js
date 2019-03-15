import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {stringify} from "query-string";


class SearchResultsPage extends Component {
    componentDidMount() {
        this.props.history.push({
            pathname: "/",
            search: stringify({
                term: this.props.search.term,
                page: this.props.search.page
            })
        });
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <h4>Search results</h4>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        search: state.search
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultsPage);