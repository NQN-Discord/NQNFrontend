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
import LogoutPage from "./pages/logout";

class App extends Component {
    componentDidMount() {
        this.props.readStorageState();
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/logout" component={LogoutPage}/>
                    </Switch>
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