import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

import {search} from "../actions/search";

class HomePage extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h4>Home page</h4>
            </div>
        );
    }
}

const mapStateToProps = () => {
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