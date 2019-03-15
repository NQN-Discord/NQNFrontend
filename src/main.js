import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import { Provider } from 'react-redux'
import connect from "react-redux/es/connect/connect";

import {readStorageState} from "./actions/auth";

class App extends Component {
    componentDidMount() {
        this.props.readStorageState();
    }

    componentDidUpdate() {
    }

    render() {
        console.log(this.props);
        return <div>
            <h1>BetterE6</h1>
            { this.props.loggedIn &&
                <h2>You are logged in with refresh token: <code>{this.props.refreshToken}</code></h2>
            }
            { !this.props.loggedIn &&
                <h2>You are not logged in</h2>
            }
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        refreshToken: state.auth.refreshToken,
        loggedIn: state.auth.loggedIn
    }
};

const mapDispatchToProps = dispatch => {
    return {
        readStorageState: () => dispatch(readStorageState()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);