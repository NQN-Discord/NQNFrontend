import React, {Component, lazy} from 'react';

import connect from "react-redux/es/connect/connect";
import {Image, Grid, Divider} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

import '../semantic/src/definitions/elements/image.less';
import '../semantic/src/definitions/collections/grid.less';
import '../semantic/src/definitions/elements/divider.less';
import '../semantic/src/definitions/elements/container.less';

const Ad = lazy(() => import("../components/ad"));


class HomePage extends Component {
  renderImgColumn(swap, src, animated, right) {
    return (
      <div>
        <Grid padded doubling={true} columns={2} reversed={swap && "mobile"}>
          <Grid.Column width={2}/>
          {!swap && right}
          <Grid.Column width={9}>
            {!animated &&
              <Image
                src={src}
                centered
                loading="lazy"
                ui
                alt=""
              />
            }
            {animated &&
              <video autoPlay loop muted playsInline className="centered ui image" style={{display: "block"}}>
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
    return (
      <div>
        <Helmet>
          <title>Not Quite Nitro - A free Discord Nitro alternative</title>
          <meta content="Not Quite Nitro - A free Discord Nitro alternative" property="og:title"/>
          <meta content="A free Discord Nitro alternative. NQN is a Discord emojis bot which allows anyone to use emojis for free" property="og:description"/>
          <meta content="A free Discord Nitro alternative. NQN is a Discord emojis bot which allows anyone to use emojis for free" name="description"/>
          <meta content="https://discord.com/api/oauth2/authorize?client_id=559426966151757824&permissions=536895488&scope=bot%20applications.commands" property="og:url"/>
          <meta content="#7289DA" name="theme-color"/>
        </Helmet>

        <div className="bot_branding">
          <Image
            src="/wumpus_logo.png"
            alt=""
          />
          <div className="nqn_title">
            <div className="unisans nqn_name">
              Not Quite Nitro
            </div>
            <button
              className="unisans nqn_add"
              onClick={() => {
                this.props.history.push("/invite")
              }}
            >
              Add NQN
            </button>
          </div>
        </div>

        <Divider hidden/>

        <Grid>
          <Grid.Column computer={13} mobile={16} tablet={16} >
            {this.renderImgColumn(true, '/nqn-nqn_demo', true, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
                <h1 className="unisans">
                  Discord Nitro Free Alternative
                </h1>
                <p>
                  NQN is a Discord bot which allows anyone to use emotes for free, including animated emojis!
                  <br/>
                  It does this by looking for :emotes: in your messages and automatically replacing them with what you meant!
                  <br/>
                  By default, you can use <em>any</em> emote you and NQN share servers with.
                </p>
              </Grid.Column>
            ))}

            {this.renderImgColumn(false, '/recently_used', true, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
                <h2 className="unisans">
                  Use the same emotes as your friends
                </h2>
                <p>
                  NQN remembers emotes that have been used recently and allows anyone to reuse them, without any further setup!
                </p>
              </Grid.Column>
            ))}

            {this.renderImgColumn(true, '/packs.png', false, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
                <h2 className="unisans">
                  Emote packs
                </h2>
                <p>
                  Search for and join emote packs to instantly gain access to their emotes!
                  <br/>
                  Publish your own to share your favourite set of emotes with the world!
                </p>
              </Grid.Column>
            ))}

            {this.renderImgColumn(false, '/replies_cropped', true, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
                <h2 className="unisans">
                  Quote Messages
                </h2>
                <p>
                  Reply to your friends simply by pasting in a Discord message link.
                  <br/>
                  NQN then instantly responds with the full context; useful for when you're discussing a
                  message from a different channel.
                </p>
              </Grid.Column>
            ))}

            {this.renderImgColumn(true, '/stickers', true, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
                <h2 className="unisans">
                  Stickers
                </h2>
                <p>
                  Embed full size images into your messages.
                  <br/>
                  Upload your own, or import sticker packs from Telegram and share them with everyone.
                </p>
              </Grid.Column>
            ))}
          </Grid.Column>
          <Grid.Column width={3} only="computer">
            {window.matchMedia('only screen and (min-width: 992px)').matches &&
              <Ad id="home-column-ad" sizes={[["160", "600"]]}/>
            }
          </Grid.Column>
        </Grid>
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
