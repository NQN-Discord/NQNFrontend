import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

import Search from '../components/search'
import {parse} from "query-string";
import {search} from "../actions/search";

class HomePage extends Component {

    componentDidMount() {
        const query = parse(this.props.location.search);
        if (Object.keys(query).filter(q => ["page", "term"].includes(q)).length === 2) {
            const term = query.term;
            const page = parseInt(query.page, 10);
            this.props.search(term, page, 20)
        }
    }

    render() {
        return (
            <div>
                <h4>Home page</h4>
                <Search/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        search: (term, page) => dispatch(search(term, page))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);