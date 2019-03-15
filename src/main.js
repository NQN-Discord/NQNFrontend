import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import { Provider } from 'react-redux'
import connect from "react-redux/es/connect/connect";

class App extends Component {
    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        return <h1>test</h1>;
    }
}

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);