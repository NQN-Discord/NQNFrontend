import React, {Component} from 'react';

import connect from "react-redux/es/connect/connect";
import {Image, Grid, Header, Divider, Container, Button} from 'semantic-ui-react';
import {inviteURL} from "../config";
import Ad from "../components/ad";


// https://stackoverflow.com/a/12646864/3398583
// Laurens Holst
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


class HomePage extends Component {
  renderImgColumn(swap, src, animated, right) {
    return (
      <div>
        <Grid padded doubling={true} columns={2} reversed={swap}>
          <Grid.Column width={2}/>
          {!swap && right}
          <Grid.Column width={9}>
            {!animated &&
              <Image
                src={src}
                centered
                loading="lazy"
                ui
              />
            }
            {animated &&
              <video autoPlay loop muted playsInline className="centered ui image">
                <source src={`${src}.webm`} type="video/mp4"/>
              </video>
            }
          </Grid.Column>
          {swap && right}
          <Grid.Column width={2}/>
          <Grid.Column width={11}>
            <Divider/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  render() {
    const botLists = [
      [
        "https://discordbots.org/api/widget/559426966151757824.svg",
        "https://discordbots.org/bot/559426966151757824"
      ],
      [
        "https://discord.boats/api/widget/559426966151757824",
        "https://discord.boats/bot/559426966151757824"
      ],
      [
        "https://botsfordiscord.com/api/bot/559426966151757824/widget?theme=dark",
        "https://botsfordiscord.com/bots/559426966151757824"
      ]
    ];
    shuffleArray(botLists);

    return (
      <div>
        <div className="bot_branding">
          <Image
            src="/wumpus_logo.png"
          />
          <div className="nqn_title">
            <div className="unisans nqn_name">
              Not Quite Nitro
            </div>
            <Button
              primary
              className="unisans nqn_add"
              onClick={() => {
                window.open(inviteURL, "_blank");
              }}
            >
              Add NQN
            </Button>
          </div>
        </div>

        <Divider hidden/>

        <Grid>
          <Grid.Column width={13}>
            {this.renderImgColumn(true, '/nqn-nqn_demo', true, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
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
            ))}

            {this.renderImgColumn(false, '/replies_cropped', true, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
                <Header as="h1" className="unisans">
                  Quote Messages
                </Header>
                <p>
                  Reply to your friends simply by pasting in a Discord message link.
                  <br/>
                  NQN then instantly responds with the full context; useful for when you're discussing a
                  message from a different channel.
                </p>
              </Grid.Column>
            ))}

            {this.renderImgColumn(true, '/packs.png', false, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
                <Header as="h1" className="unisans">
                  Emote packs
                </Header>
                <p>
                  Search for and join emote packs to instantly gain access to their emotes!
                  <br/>
                  Publish your own to share your favourite set of emotes with the world!
                </p>
              </Grid.Column>
            ))}

            {this.renderImgColumn(false, '/stickers', true, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
                <Header as="h1" className="unisans">
                  Stickers
                </Header>
                <p>
                  Embed full size images into your messages.
                  <br/>
                  Upload your own, or import sticker packs from Telegram and share them with everyone.
                </p>
              </Grid.Column>
            ))}
          </Grid.Column>
          <Grid.Column width={3}>
            <Ad id="home-column-ad" sizes={[["160", "600"]]}/>
          </Grid.Column>
        </Grid>

        <Container>
          <Divider hidden={true}/>
          <Grid columns={3} doubling={true} centered>
            {botLists.map(([src, href]) => (
              <a className="ui centered image" href={href} key={src}>
                <img
                  loading="lazy"
                  src={src}
                  alt="Bot list"
                  style={{maxWidth: "300px"}}
                />
              </a>
            ))}
          </Grid>
        </Container>
        <Divider hidden={true}/>
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
