import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";

import {readStorageState} from "./actions/auth";

import Header from "./header";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";

class App extends Component {
    componentDidMount() {
        this.props.readStorageState();
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);