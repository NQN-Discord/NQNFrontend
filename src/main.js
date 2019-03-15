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
import SearchResultsPage from "./pages/search_results";
import LoginPage from "./pages/login";
import LogoutPage from "./pages/logout";

class App extends Component {
    componentDidMount() {
        this.props.readStorageState();
    }

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Switch>
                        { this.props.search.shownResults.length === 0 &&
                            <Route exact path="/" component={HomePage}/>
                        }
                        { this.props.search.shownResults.length !== 0 &&
                            <Route exact path="/" component={SearchResultsPage}/>
                        }
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
        loggedIn: state.auth.loggedIn,
        search: state.search
    }
};

const mapDispatchToProps = dispatch => {
    return {
        readStorageState: () => dispatch(readStorageState()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);