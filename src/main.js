import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import axios from "axios";

import {readStorageState, setRefreshToken} from "./actions/auth";
import {fetchGuilds} from "./actions/user";

import HomePage from "./pages/home";
import WebhookPage from "./pages/webhook_poster";
import LoginPage from "./pages/login";
import Header from "./header";

class App extends Component {
    componentDidMount() {
        this.props.readStorageState();
        axios.interceptors.response.use((response) => {
            const auth = response.data.authorization;
            if (auth) {
                this.props.setRefreshToken(auth);
            }
            return response;
        }, (err) => {
            if (err.response.status === 403 && err.response.data.message === "Invalid login token") {
                this.props.setRefreshToken("");
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.loggedIn !== true && this.props.loggedIn === true) {
            this.props.fetchGuilds()
        }
    }

    render() {
        if (this.props.loggedIn === null) {
            return <div>
                Loading...
            </div>
        }
        return (
            <Router>
                <div>
                    {!this.props.loggedIn &&
                        <Switch>
                            <LoginPage/>
                        </Switch>
                    }
                    {this.props.loggedIn &&
                        <div>
                            <Header/>
                            <Switch>
                                <Route exact path="/" component={HomePage}/>
                                <Route exact path="/channels/:id" component={WebhookPage}/>
                                <Route exact path="/channels/" component={WebhookPage}/>
                                <Route exact path="/login" component={LoginPage}/>
                            </Switch>
                        </div>
                    }
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
};

const mapDispatchToProps = dispatch => {
    return {
        readStorageState: () => dispatch(readStorageState()),
        setRefreshToken: (auth) => dispatch(setRefreshToken(auth)),
        fetchGuilds: () => dispatch(fetchGuilds())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);