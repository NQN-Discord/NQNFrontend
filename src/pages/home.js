import React, {Component} from 'react';

import connect from "react-redux/es/connect/connect";
import classNames from "classnames";
import {TopHeader} from "../header";
import {Image, Grid, Header, Divider} from 'semantic-ui-react';


class HomePage extends Component {
  renderImgColumn(src, right) {
    return (
      <Grid padded doubling={true}>
        <Grid.Column width={8}>
          <Image
            src={src}
            floated="right"
          />
        </Grid.Column>
        <Grid.Column className="large_fonts" width={4}>
          {right}
        </Grid.Column>
      </Grid>
    );
  }

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

        {this.renderImgColumn('/nqn-nqn_demo.gif', (
          <div>
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
          </div>
        ))}
        <Divider hidden={true}/>

        {this.renderImgColumn('/replies_cropped.gif', (
          <div>
            <Header as="h1" className="unisans">
              Quote Messages
            </Header>
            <p>
              Reply to your friends simply by pasting in a Discord message link.
              <br/>
              NQN then instantly responds with the full context; useful for when you're discussing a
              message from a different channel.
            </p>
          </div>
        ))}
        <Divider hidden={true}/>

        {this.renderImgColumn('/packs.png', (
          <div>
            <Header as="h1" className="unisans">
              Emote packs
            </Header>
            <p>
              Search for and join emote packs to instantly gain access to their emotes!
              <br/>
              Publish your own to share your favourite set of emotes with the world!
            </p>
          </div>
        ))}
        <Divider hidden={true}/>

        {this.renderImgColumn('/stickers.gif', (
          <div>
            <Header as="h1" className="unisans">
              Stickers
            </Header>
            <p>
              Embed full size images into your messages.
              <br/>
              Upload your own, or import sticker packs from Telegram and share them with everyone.
            </p>
          </div>
        ))}
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
