import {Component} from "react";
import React from "react";

import "./entry.css";


class Entry extends Component {
  render() {
    return (
      <div className={this.props.inline? "entry-inline": ""}>
        <input
          type="text"
          defaultValue={this.props.initial || ""}
          onKeyPress={this.props.onSubmit && (event => this.onKeyPress(event))}
          onBlur={this.props.onBlur && (event => this.onBlur(event))}
        />
      </div>
    );
  }

  onKeyPress(event) {
    if (event.key === "Enter") {
      this.props.onSubmit(event.target.value);
      if (this.props.clearOnSubmit) {
        event.target.value = "";
      }
    }
  }

  onBlur(event) {
    this.props.onBlur(event.target.value);
  }

}

export default Entry