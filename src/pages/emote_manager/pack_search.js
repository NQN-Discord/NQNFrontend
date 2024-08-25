import React, {Component} from 'react';

import {Container, Accordion, Button, Divider} from 'semantic-ui-react';

import '../../semantic/src/definitions/elements/container.less';
import '../../semantic/src/definitions/modules/accordion.less';
import '../../semantic/src/definitions/elements/button.less';
import '../../semantic/src/definitions/elements/divider.less';


import {Emote} from "../../components/emote";
import EmoteSearchComponent from "../../components/emote_search";
import connect from "react-redux/es/connect/connect";
import {joinGroups, leaveGroups, joinPackServer} from "../../actions/user";
import axios from "axios";
import update from "immutability-helper";
const {api_url} = window.env


class PackSearchPage extends Component {
  componentDidMount() {
    this.setState({
      term: "",
      pageNo: 0,
      packs: {},
      totalResults: 0,
    });
    this.getNewPacks("", 0);
  }

  renderPack(title, emotes, is_public, has_joined) {
    const names = new Set();
    const emoteList = emotes.filter(emote => {
      if (names.has(emote.name)) {
        return false;
      }
      names.add(emote.name);
      return true;
    }).map(emote => {
      const emojiObj = new Emote(emote);
      return emojiObj.renderImg((e) => {
        if (e.target.parentNode.className.includes("title")) {
          return;
        }
        emojiObj.copyToClipboard(title)
      }, emote.name)
    });
    return {
      key: title,
      title: [
        `${title} - ${emoteList.length} emote${emoteList.length === 1? '': 's'}`,
        <div key="div" style={{display: "inline", padding: "0.5rem"}}/>,
        emoteList.slice(0, 5)
      ],
      content: [
          ...emoteList,
          <Divider key="div1" hidden/>,
          !has_joined && <Button key="pack_join" primary onClick={() => this.props.joinGroups([title])}>Join Pack</Button>,
          has_joined && <Button key="pack_leave" primary onClick={() => this.props.leaveGroups([title])}>Leave Pack</Button>,
          is_public && <Button key="join_server" secondary onClick={() => this.props.joinPackServer(title)}>Join Discord Server</Button>,
          <Divider key="div2" hidden/>
      ]
    }
  }

  getNewPacks(term, pageNo) {
    axios.get(`${api_url}/packs/search`, {params: {term, page_no: pageNo, force_public: 0}}).then(response => {
      this.setState(update(this.state,
        {$merge: {
            pageNo,
            term,
            totalResults: response.data.total,
            packs: response.data.results,
          }}
      ));
    });
  }

  render() {
    if (!this.state) {
      return <div/>
    }
    const joined = new Set(this.props.user_packs);
    return (
      <Container>
        <p>
          Some emote packs allow you to use their emotes without joining them - click on the emote to copy it
          to your clipboard. If you're running an emote pack and are finding yours does not support copy-paste
          functionality, make sure the name is composed of only letters, numbers and underscores.
        </p>
        <EmoteSearchComponent
          search={(term, pageNo) => this.getNewPacks(term, pageNo)}
          renderer={() =>
            <Accordion
              defaultActiveIndex={[]}
              panels={
                this.state.packs.map(({name, emotes, is_public}) => this.renderPack(name, emotes, is_public, joined.has(name)))
              }
              exclusive={false}
              fluid
            />
          }
          term={this.state.term}
          pageNo={this.state.pageNo}
          totalResults={this.state.totalResults}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_packs: state.user.user_packs
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinGroups: (packs) => dispatch(joinGroups(packs)),
    leaveGroups: (packs) => dispatch(leaveGroups(packs)),
    joinPackServer: (pack) => dispatch(joinPackServer(pack))
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackSearchPage);
