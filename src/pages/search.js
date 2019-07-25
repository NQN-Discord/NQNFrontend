import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import update from "immutability-helper";
import axios from "axios";

import {Container, Header, Divider, Grid, Pagination, Button, Icon, List} from 'semantic-ui-react';

import {setAliases, unsetAliases, changeAliases} from "../actions/user";
import {Emote} from "../components/emote";
import Entry from "../components/entry";
import {api_url} from "../config";

import './search.css'

class SearchPage extends Component {
  componentDidMount() {
    this.setState({
      term: "",
      pageNo: 0,
      emotes: {},
      totalResults: 0,
    });
  }

  getNewEmotes(term, pageNo) {
    axios.get(`${api_url}/emotes/search`, {params: {term, page_no: pageNo}}).then(response => {
      this.setState(update(this.state,
        {$merge: {
          pageNo,
          term,
          totalResults: response.data.total,
          emotes: response.data.results,
        }}
      ));
    });
  }

  toggleAlias(emote) {
    const alias = this.props.aliases.find(alias => alias.id === emote.id);
    if (alias) {
      this.props.unsetAliases([alias.name]);
    }
    else {
      this.props.setAliases([emote]);
    }
  }

  saveAlias(emote, newAlias) {
    const alias = this.props.aliases.find(alias => alias.id === emote.id);
    console.log(update(this.state, {savedAliases: {$merge: {[emote.id]: newAlias}}}))
    this.setState(update(this.state, {savedAliases: {$merge: {[emote.id]: newAlias}}}), () => {
      console.log(this.state)
      this.props.changeAliases([{
        name: newAlias,
        oldName: alias.name,
        id: emote.id,
        animated: emote.animated
      }]);
    });
  }

  renderSearchResult(emote) {
    const emoteObj = new Emote(emote);
    const alias = this.props.aliases.find(alias => alias.id === emote.id);
    return (
      <List.Item
        key={emote.id}
      >
        {emoteObj.renderImg()}
        <List.Content verticalAlign='middle'>
          {emote.name}
          {alias &&
            <Button className="search_edit" icon='edit'/>
          }
        </List.Content>
        <List.Content floated='right'>
          <Button
            icon={alias? 'minus': 'add'}
            negative={Boolean(alias)}
            onClick={() => this.toggleAlias(emote)}
          />
        </List.Content>
      </List.Item>
    );
  }

  renderNavigationButtons() {
    return (
      <Grid centered>
        <Grid.Row>
          <Pagination
            activePage={this.state.pageNo + 1}
            boundaryRange={1}
            onPageChange={(event) => {
              const pageNo = parseInt(event.target.innerText);
              this.getNewEmotes(this.state.term, pageNo - 1);
            }}
            size='mini'
            siblingRange={2}
            totalPages={Math.ceil(this.state.totalResults / 20)}
            firstItem={null}
            lastItem={null}
            prevItem={null}
            nextItem={null}
          />
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    window.update = update;
    if (!this.state) {
      return <div/>;
    }
    return (
      <Container>
        <Header as="h4">
          Alias Emotes
        </Header>
        <Entry
          onSubmit={(term) => {this.getNewEmotes(term, 0)}}
          clearOnSubmit={false}
        />
        { Object.keys(this.state.emotes).length !== 0 && <div>
          <Divider hidden />
          <Header as="h4">
            {this.state.totalResults} results (page {this.state.pageNo + 1} of {Math.ceil(this.state.totalResults / 20)})
          </Header>
          <List celled>
            {this.state.emotes.map(emote => this.renderSearchResult(emote))}
          </List>
          { this.state.totalResults > 20 && this.renderNavigationButtons()}
        </div>}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    aliases: state.user.user_aliases
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setAliases: (aliases) => dispatch(setAliases(aliases)),
    changeAliases: (aliases) => dispatch(changeAliases(aliases)),
    unsetAliases: (emotes) => dispatch(unsetAliases(emotes))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);