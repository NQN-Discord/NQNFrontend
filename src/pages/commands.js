import React, {Component} from 'react';
import {Accordion, Container, Divider, Icon} from "semantic-ui-react";
import connect from "react-redux/es/connect/connect";
import {fetchCommands} from "../actions/commands";
import "./commands.css";


class CommandPage extends Component {
  componentDidUpdate() {
    const location = window.location.hash.substr(1);
    const element = document.getElementById(location);
    if (element) {
      element.scrollIntoView({behavior: "smooth"});
    }
  }

  renderCommand(command) {
    const title = command.signature? `${command.name} ${command.signature}`: command.name;
    return {
      key: command.name,
      title: (
        <Accordion.Title id={command.name}>
          <Icon name="dropdown"/>
          {command.name} - {command.short_doc}
        </Accordion.Title>
      ),
      content: (
        <Accordion.Content className="newlines quote">
          <code>{title}</code>
          <Divider hidden/>
          {command.help}
        </Accordion.Content>
      )
    }
  }


  render() {
    if (!Object.keys(this.props.commands).length) {
      this.props.fetchCommands();
      return <div/>
    }
    const sortedCommands = Object.values(this.props.commands).sort((a, b) => a.name.localeCompare(b.name));
    return (
      <Container>
        <h2>
          Full Command List:
        </h2>

        <Accordion
          defaultActiveIndex={[sortedCommands.findIndex(c => `#${c.name}` === window.location.hash)]}
          panels={sortedCommands.map(command => this.renderCommand(command))}
          exclusive={false}
          fluid
        />
      </Container>
    )}
}

const mapStateToProps = state => {
  return {
    commands: state.user.commands
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCommands: () => dispatch(fetchCommands())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommandPage);
