import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

import Textbox from "../components/textbox";
import postMessage from "../actions/post_message"

class WebhookPage extends Component {

    componentDidMount() {
        console.log();
    }

    render() {
        return (
            <div>
                <h4>Post to Discord</h4>
                <Textbox func={(message) => {
                    this.props.postMessage(this.props.match.params.id, message);
                }} clear/>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        postMessage: (channel, message) => dispatch(postMessage(channel, message))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WebhookPage);