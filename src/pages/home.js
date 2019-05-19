import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

class HomePage extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h4>Home page</h4>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);