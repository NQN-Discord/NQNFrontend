import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import {Container, Header, Form, Button, Dropdown, Label, Divider} from 'semantic-ui-react';

import postGuildSettings from "../actions/guild_settings";
import "./channel_list.css";
import update from "immutability-helper";


const announcementHelp = "Announcements about updates to the bot.";
const boostHelp = "Whenever someone gives extra server wide emotes by voting for the bot.";


class GuildSettings extends Component {
  constructor(props) {
    super(props);
    const guild = this.props.guilds[this.props.guildID];
    this.state = {
      prefix: guild.prefix,
      boostChannel: guild.boost_channel,
      announcementChannel: guild.announcement_channel,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.guildID !== this.props.guildID) {
      const guild = this.props.guilds[this.props.guildID];
      this.setState({
        prefix: guild.prefix,
        boostChannel: guild.boost_channel,
        announcementChannel: guild.announcement_channel,
      });
    }
  }

  renderDropdown(description, helpText, attr) {
    const guild = this.props.guilds[this.props.guildID];
    return (
      <Form.Field>
        <Form.Field inline>
          <label>{description}</label>
          <Label pointing='left'>{helpText}</Label>
        </Form.Field>
        <Dropdown button search floating scrolling labeled className='icon'
          icon='hashtag'
          options={[
            {key: "0", text: "None", value: 0},
            <Dropdown.Divider key="divider"/>,
          ].concat(Object.entries(guild.channels).map(([id, {name}]) => ({
            key: id,
            text: name,
            value: id
          })))}
          text={(guild.channels[this.state[attr]] || {name: "None"}).name}
          onChange={(e, d) => this.setState(update(this.state, {$merge: {[attr]: d.value in guild.channels? d.value: "0"}}))}
        />
      </Form.Field>
    );
  }

  render() {
    const guild = this.props.guilds[this.props.guildID];

    return (
      <Container>
        <Header as="h3">
          Settings for {guild.name}
        </Header>
        <Form
          onSubmit={() => {
            this.props.postGuildSettings(this.props.guildID, this.state.prefix, this.state.announcementChannel, this.state.boostChannel);
          }}
        >
          <Form.Field inline>
            <Form.Input
              label="Prefix"
              value={this.state.prefix}
              onChange={e => this.setState(update(this.state, {$merge: {prefix: e.target.value}}))}
            />
          </Form.Field>
          {this.renderDropdown("Announcement Channel", announcementHelp, "announcementChannel")}
          {this.renderDropdown("Boost Channel", boostHelp, "boostChannel")}
          <Divider/>
          <Button type='submit'>Save</Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guilds: state.user.guilds
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postGuildSettings: (guildID, prefix, announcementChannel, boostChannel) => dispatch(postGuildSettings(guildID, prefix, announcementChannel, boostChannel))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuildSettings);