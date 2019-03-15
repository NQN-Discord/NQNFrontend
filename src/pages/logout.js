import React, {Component} from 'react';

import {logout} from "../actions/auth";
import connect from "react-redux/es/connect/connect";

class LogoutPage extends Component {
    async componentDidMount() {
        this.props.logout();
        this.props.history.push("/");
    }

    render() {
        return (
            <h4>Redirecting</h4>
        );
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutPage);