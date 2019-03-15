import {Component} from "react";
import React from "react";

import connect from "react-redux/es/connect/connect";


class Search extends Component {
    render() {
        return (<p>Search box.</p>);
    }

}

const mapStateToProps = (state) => {};

const mapDispatchToProps = dispatch => {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)