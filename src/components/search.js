import {Component} from "react";
import React from "react";

import connect from "react-redux/es/connect/connect";

import {search} from "../actions/search";


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ""
        }
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    onKeyPress={(event) => this.onKeyPress(event)}
                />
            </div>
        );
    }

    onKeyPress(event) {
        if (event.key === "Enter") {
            this.props.search(event.target.value, 0, 20);
        }
    }

}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        search: (term, page, per_page) => dispatch(search(term, page, per_page))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)