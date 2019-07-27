import {Component} from "react";
import React from "react";
import { Input, Form } from 'semantic-ui-react'



class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.term || ""
    };
  }

  render() {
    return (
      <Form onSubmit={() => {
        if (this.props.onSubmit) {
          this.props.onSubmit(this.state.query);
        }
        if (this.props.onBlur) {
          this.props.onBlur(this.state.query);
        }
        if (this.props.clearOnSubmit) {
          this.setState({
            query: ""
          });
        }
      }}>
        <Input
          type="text"
          icon={this.props.icon}
          placeholder={this.props.placeholder || ""}
          value={this.state.query}
          fluid={this.props.fluid || false}
          size={this.props.size || "small"}
          disabled={this.props.disabled || false}
          onBlur={(e) => this.props.onBlur && this.props.onBlur(e.target.value)}
          onChange={(e) => {
            this.setState({
              query: e.target.value
            });
          }}
        />
      </Form>
    );
  }
}

export default Entry