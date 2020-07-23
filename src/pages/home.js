import React, {Component} from 'react';

import connect from "react-redux/es/connect/connect";
import classNames from "classnames";
import {TopHeader} from "../header";
import {Image, Grid, Header, Divider} from 'semantic-ui-react';


class HomePage extends Component {
  renderColumn(left, right) {
    return (
      <Grid columns={2} padded centered={true}>
        <Grid.Column textAlign="right">
          <Header as="h1" className="unisans">
            {left}
          </Header>
        </Grid.Column>
        <Grid.Column>
          <p className="large_fonts">
            {right}
          </p>
        </Grid.Column>
      </Grid>
    );
  }

  render() {
    return (
      <div>
        {!this.props.loggedIn &&
          <TopHeader/>
        }
        <div className={classNames(
          "bot_branding",
          {
            "no_banner_margin": this.props.loggedIn
          }
          )}>
          <Image
            src="/wumpus_logo.png"
          />
          <div className="unisans nqn_name">
            Not Quite Nitro
          </div>
        </div>

        <Divider hidden={true}/>

        <Grid columns={2} padded doubling={true}>
          <Grid.Column>
            <Image
              src='/nqn-nqn_demo.gif'
              floated="right"
            />
          </Grid.Column>
          <Grid.Column className="large_fonts">
            <Header as="h1" className="unisans">
              Animated Emotes Without Nitro
            </Header>
            <p>
              NQN has no command for external emotes, instead looking for :emotes: in your messages.
              <br/>
              The bot then automatically replaces the emote with what you meant!
              <br/>
              By default, you can use <em>any</em> emote you and NQN share servers with.
            </p>
          </Grid.Column>
        </Grid>

        <Divider hidden={true}/>

        {this.renderColumn("Quote messages", "Reply to your friends")}
        {this.renderColumn("Emote packs", "Entire packs for you to use")}
        {this.renderColumn("Stickers", "Full size images in the middle of messages")}
      </div>
    )}
  }


const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  }
};

const mapDispatchToProps = () => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
