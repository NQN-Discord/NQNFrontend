import React, {Component} from "react";
import { Container, Card, Divider, Input, Radio, Form, Grid, Button, Label, Modal, Checkbox, Menu } from "semantic-ui-react";
import connect from "react-redux/es/connect/connect";
import {EmoteCard} from "../../components/emote";
import {discordGuildBuilderURL} from "../../config";
import update from "immutability-helper";

import "./guild_builder.css";


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
      emoteType: "alias",
      selected: new Set(),
      modalOpen: false,
      uploadAgree: false
    };
  }

  filterEmotes() {
    return this.props[this.state.emoteType].filter(({name, source}) => {
      if (!name.toLowerCase().includes(this.state.query)) {
        return false;
      }

      return (
        sourceList.findIndex(i => i === this.state.filter) <=
        sourceList.findIndex(i => i === source)
      );
    });
  }

  getSelectedEmotes() {
    return ["alias", "packs", "mutuals"].flatMap(emoteType =>
      this.props[emoteType].filter(({id}) => this.state.selected.has(id))
    );
  }

  countGuilds() {
    const emotes = this.getSelectedEmotes();
    //const animated = emotes.filter(({id, animated}) => animated).length;
    //const static_ = emotes.filter(({id, animated}) => !animated).length;

    //const emoteCount = Math.max(animated, static_);
    const emoteCount = emotes.length;

    return Math.ceil(emoteCount / 50);
  }

  handleFilter(filter) {
    const filterIndex = sourceList.findIndex(i => i === filter);
    let emoteType = this.state.emoteType;
    if (emoteType === "packs" && filterIndex > 1) {
      emoteType = "alias";
    }
    if (emoteType === "mutuals" && filterIndex > 0) {
      emoteType = "alias";
    }
    this.setState(update(this.state, {$merge: {
      filter,
      emoteType
    }}));
  }

  handleEmoteMenu(emoteType) {
    this.setState(update(this.state, {$merge: {emoteType}}));
  }

  setModal(open) {
    this.setState(update(this.state, {$merge: {modalOpen: open}}));
  }

  renderModal(guildCount, tooManyGuilds) {
    const guildsText = `${guildCount > 1? guildCount: 'a'} Server${guildCount > 1? 's': ''}`;
    const them = guildCount > 1 ? "them" : "it";
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
              This will create {guildsText} with the emotes you selected, automatically add you to {them} and give you
              ownership of {them}.
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
                  JSON.stringify(this.getSelectedEmotes()));
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
    const isSelected = this.state.selected.has(emote.id);
    return (
      <EmoteCard
        key={emote.name+"-"+emote.id}
        emote={emote}
        isSelected={isSelected}
        onClick={() => {
          if (isSelected) {
            this.setState(update(this.state, {selected: {$remove: [emote.id]}}));
          }
          else {
            this.setState(update(this.state, {selected: {$add: [emote.id]}}));
          }
        }}
      />
    );
  }

  render() {
    const currentFilterIndex = sourceList.findIndex(i => i === this.state.filter);
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
                this.setState(update(this.state, {selected: {$add: this.filterEmotes().map(({id}) => id)}}));
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

        {currentFilterIndex <= 1 &&
          <Grid container>
            <Menu fluid tabular>
              <Menu.Item
                name="Aliases"
                active={this.state.emoteType === "alias"}
                onClick={() => this.handleEmoteMenu("alias")}
              />
              <Menu.Item
                name="Packs"
                active={this.state.emoteType === "packs"}
                onClick={() => this.handleEmoteMenu("packs")}
              />
              {currentFilterIndex <= 0 &&
                <Menu.Item
                  name="Mutual Servers"
                  active={this.state.emoteType === "mutuals"}
                  onClick={() => this.handleEmoteMenu("mutuals")}
                />
              }
            </Menu>
          </Grid>
        }
        <Divider hidden/>

        <Container fluid>
          <Card.Group className="guild_creator">
            {this.filterEmotes().map(emote => this.renderEmote(emote))}
          </Card.Group>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    alias: state.user.user_aliases,
    packs: Object.values(state.user.packs)
      .filter(({is_mutual}) => !is_mutual)
      .flatMap(({emotes}) => emotes),
    mutuals: Object.values(state.user.guild_emotes).flat(),
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
