import {Component} from "react";
import React from "react";

import connect from "react-redux/es/connect/connect";


class Textbox extends Component {
    render() {
        return (
            <div>
                <input
                    type="text"
                    defaultValue={this.props.initial || ""}
                    onKeyPress={(event) => this.onKeyPress(event)}
                />
            </div>
        );
    }

    onKeyPress(event) {
        if (event.key === "Enter") {
            this.props.func(event.target.value, 0);
            if (this.props.clear === true) {
                event.target.value = "";
            }
        }
    }

}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Textbox)