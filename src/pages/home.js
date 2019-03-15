import React, {Component} from 'react';

import connect from "react-redux/es/connect/connect";

class HomePage extends Component {
    render() {
        return (
            <h4>Home page</h4>
        );
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);