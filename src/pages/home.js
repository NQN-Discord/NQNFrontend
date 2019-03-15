import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

import Search from '../components/search'

class HomePage extends Component {
    render() {
        return (
            <div>
                <h4>Home page</h4>
                <Search/>
            </div>
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