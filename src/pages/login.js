import React, {Component} from 'react';

import {discordURL} from "../config";
import {parse} from "query-string";
import {exchangeCode} from "../actions/auth";
import connect from "react-redux/es/connect/connect";

class LoginPage extends Component {
    async componentDidMount() {
        if (this.props.refreshToken) {
            this.props.history.push(localStorage.getItem("redirect") || "/");
            return
        }
        const query = parse(this.props.location.search);
        const code = query.code;
        if (!code) {
            localStorage.setItem("redirect", this.props.location.pathname);
            window.location = discordURL;
            return
        }
        this.props.exchangeCode(code);
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