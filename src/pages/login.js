import React, {Component} from 'react';

import {discordURL} from "../config";
import {parse} from "query-string";
import {exchangeCode} from "../actions/auth";
import connect from "react-redux/es/connect/connect";

class LoginPage extends Component {
    async componentDidMount() {
        const query = parse(this.props.location.search);
        const code = query.code;
        if (!code) {
            window.location = discordURL;
            return
        }
        this.props.exchangeCode(code);
    }

    async componentDidUpdate() {
        if (this.props.refreshToken) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <h4>Redirecting</h4>
        );
    }
}

const mapStateToProps = state => {
    return {
        refreshToken: state.auth.refreshToken
    }
};

const mapDispatchToProps = dispatch => {
    return {
        exchangeCode: (token) => dispatch(exchangeCode(token))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);