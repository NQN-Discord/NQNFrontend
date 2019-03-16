import {Component} from "react";
import React from "react";

import connect from "react-redux/es/connect/connect";

import {search} from "../actions/search";


class Search extends Component {
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
            this.props.search(event.target.value, 0);
        }
    }

}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        search: (term, page) => dispatch(search(term, page))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)