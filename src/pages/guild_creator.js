import React, {Component} from "react";
import { Container, Card, Divider, Input, Radio, Form, Grid, Button, Label, Modal, Checkbox } from "semantic-ui-react";
import connect from "react-redux/es/connect/connect";
import {Emote} from "../components/emote";
import {discordGuildBuilderURL} from "../config";
import update from "immutability-helper";
import classNames from "classnames";

import "./guild_creator.css";


const sourceList = [
  "",
  "user_shared",
  "bot_shared",
  "none"
];


class GuildCreatorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      filter: "none",
      selected: new Set(),
      modalOpen: false,
      uploadAgree: false
    };
  }

  filterAliases() {
    return this.props.aliases.filter(({name, source}) => {
      if (!name.toLowerCase().includes(this.state.query)) {
        return false;
      }

      return (
        sourceList.findIndex(i => i === this.state.filter) <=
        sourceList.findIndex(i => i === source)
      );
    });
  }

  countGuilds() {
    const emotes = this.props.aliases.filter(({id}) => this.state.selected.has(id));
    //const animated = emotes.filter(({id, animated}) => animated).length;
    //const static_ = emotes.filter(({id, animated}) => !animated).length;

    //const emoteCount = Math.max(animated, static_);
    const emoteCount = emotes.length;

    return Math.ceil(emoteCount / 50);
  }

  handleFilter(filter) {
    this.setState(update(this.state, {$merge: {filter}}));
  }

  setModal(open) {
    this.setState(update(this.state, {$merge: {modalOpen: open}}));
  }

  renderModal(guildCount, tooManyGuilds) {
    const guildsText = `${guildCount > 1? guildCount: 'a'} Server${guildCount > 1? 's': ''}`;
    return (
      <Modal
        onClose={() => this.setModal(false)}
        onOpen={() => this.setModal(true)}
        open={this.state.modalOpen}
        centered={true}
        trigger={
          <Button
            size="large"
            color="green"
            disabled={this.state.selected.size === 0 || tooManyGuilds}
            className="guild_creator guild_create"
            fluid
          >
            Create {guildsText}
          </Button>
        }
      >
        <Modal.Header>Create {guildsText}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>
              This will create {guildsText} with the emotes you selected, automatically add you to them
              and give you ownership of them.
            </p>
            <Checkbox
              label="I have permission to upload all of these emotes, and give permission to NQN to upload them on my behalf"
              checked={this.state.uploadAgree}
              onClick={() => {
                this.setState(update(this.state, {$merge: {uploadAgree: !this.state.uploadAgree}}));
              }}
            />
          </Modal.Description>
          <Divider hidden/>
          <Modal.Actions>
            <Button
              content="Create"
              labelPosition="right"
              icon="checkmark"
              positive
              disabled={!this.state.uploadAgree}
              onClick={() => {
                localStorage.setItem(
                  "guild_builder",
                  JSON.stringify(
                    this.props.aliases.filter(({id}) => this.state.selected.has(id))
                  ));
                window.location = discordGuildBuilderURL;
              }}
            />
            <Button
              onClick={() => this.setModal(false)}
            >
              Cancel
            </Button>
          </Modal.Actions>
        </Modal.Content>

      </Modal>
    );
  }

  renderEmote(emote) {
    const emoteObj = new Emote(emote);
    const isSelected = this.state.selected.has(emote.id);
    return (
      <Card
        key={emoteObj.name+"-"+emoteObj.id}
        onClick={() => {
          if (isSelected) {
            this.setState(update(this.state, {selected: {$remove: [emote.id]}}));
          }
          else {
            this.setState(update(this.state, {selected: {$add: [emote.id]}}));
          }
        }}
        className={classNames({inverted: isSelected})}
      >
        <Card.Content>
          {emoteObj.renderImg(
            () => {},
            emoteObj.id,
            {
              floated: 'right'
            }
          )}
          <Card.Header>
            {emoteObj.name}
          </Card.Header>
        </Card.Content>
      </Card>
    );
  }

  render() {
    const currentGuildCount = Object.keys(this.props.guilds).length;
    const guildCount = this.countGuilds();
    const tooManyGuilds = guildCount + currentGuildCount > 100;
    return (
      <div>
        <Grid container>
          <Grid.Column width={8}>
            <div>
              <h1>Server Builder</h1>
              <p>
                This tool allows you to create new servers for the emotes you have with NQN.
              </p>
              <em>Please remember to only upload emojis that you have permission to do so.</em>

              <br/>

              <b>After this, you will be in {currentGuildCount+guildCount} servers.</b>
            </div>

            <Divider hidden/>

            <Input
              placeholder="Filter..."
              className="guild_creator"
              onChange={(e) => {
                this.setState(update(this.state, {$merge: {
                    query: e.target.value.toLowerCase()
                  }}));
              }}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Form>
              <Form.Field>
                Show only emotes that you couldn't otherwise use:
              </Form.Field>
              <Form.Field>
                <Radio
                  toggle
                  label="In messages"
                  name="emote_filter"
                  checked={this.state.filter === "none"}
                  onChange={() => this.handleFilter("none")}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  toggle
                  label="In reactions"
                  name="emote_filter"
                  checked={this.state.filter === "bot_shared"}
                  onChange={() => this.handleFilter("bot_shared")}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  toggle
                  label="With Discord Nitro"
                  name="emote_filter"
                  checked={this.state.filter === "user_shared"}
                  onChange={() => this.handleFilter("user_shared")}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  toggle
                  label="Even if they're in another server with me"
                  name="emote_filter"
                  checked={this.state.filter === ""}
                  onChange={() => this.handleFilter("")}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid>

        <Grid container>
          <Grid.Column width={8}>
            <Button
              size="large"
              primary
              className="guild_creator"
              onClick={() => {
                this.setState(update(this.state, {selected: {$add: this.filterAliases().map(({id}) => id)}}));
              }}
            >
              Select All
            </Button>

            <Button
              size="large"
              primary
              className="guild_creator"
              onClick={() => {
                this.setState(update(this.state, {$merge: {selected: new Set()}}));
              }}
            >
              Select None
            </Button>
          </Grid.Column>
          <Grid.Column mobile={8} computer={4}>
            <Grid.Row>
              {this.renderModal(guildCount, tooManyGuilds)}
            </Grid.Row>
            {tooManyGuilds &&
              <Grid.Row>
                <Label
                  pointing
                  color="red"
                  className="fluid guild_creator"
                >
                  You are in too many servers!
                </Label>
              </Grid.Row>
            }
          </Grid.Column>
        </Grid>

        <Divider hidden/>

        <Container fluid>
          <Card.Group className="guild_creator">
            {this.filterAliases().map(emote => this.renderEmote(emote))}
          </Card.Group>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    aliases: state.user.user_aliases,
    guilds: state.user.guilds
  }
};

const mapDispatchToProps = dispatch => {
  return {

  }

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuildCreatorPage);
