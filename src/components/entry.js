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
        this.props.onSubmit(this.state.query, 1);
        if (this.props.clearOnSubmit) {
          this.setState({
            query: ""
          });
        }
      }}>
        <Input
          type="text"
          value={this.state.query}
          fluid={this.props.fluid || false}
          size={this.props.size || "small"}
          onBlur={(e) => this.props.onBlur && this.onBlur(e)}
          onChange={(e) => {
            this.setState({
              query: e.target.value
            });
          }}
        />
      </Form>
    );
  }

  onBlur(event) {
    this.props.onBlur(event.target.value);
  }
}

export default Entry