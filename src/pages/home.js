import React, {Component, lazy, Suspense} from 'react';

import connect from "react-redux/es/connect/connect";
import {Image, Grid, Divider} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

import '../semantic/src/definitions/elements/image.less';
import '../semantic/src/definitions/collections/grid.less';
import '../semantic/src/definitions/elements/divider.less';
import '../semantic/src/definitions/elements/container.less';

const Ad = lazy(() => import("../components/ad"));


class HomePage extends Component {
  renderImgColumn(swap, src, alt, animated, right) {
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
                alt={alt}
              />
            }
            {animated &&
              <video autoPlay loop muted playsInline className="centered ui image" style={{display: "block"}}>
                <source src={`${src}.webm`} type="video/mp4" title={alt}/>
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
        </Helmet>

        <div className="bot_branding">
          <Image
            src="/wumpus_logo.png"
            alt="NQN Wumpus Logo"
          />
          <div className="nqn_title">
            <div className="bot_font nqn_name">
              Not Quite Nitro
            </div>
            <button
              className="bot_font nqn_add"
              onClick={() => {
                this.props.history.push("/invite")
              }}
            >
              Add NQN
            </button>
          </div>
        </div>

        <Divider hidden/>

        <Grid padded>
          <Grid.Column computer={13} mobile={16} tablet={16}>
            {this.renderImgColumn(true, '/nqn-nqn_demo', "NQN Demo Video", true, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
                <h1 className="bot_font">
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

            {this.renderImgColumn(false, '/recently_used', "Demo showing recently used emojis are usable for other users", true, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
                <h2 className="bot_font">
                  Use the same emotes as your friends
                </h2>
                <p>
                  NQN remembers emotes that have been used recently and allows anyone to reuse them, without any further setup!
                </p>
              </Grid.Column>
            ))}

            {this.renderImgColumn(true, '/packs.png', "Demo showing joining emoji packs", false, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
                <h2 className="bot_font">
                  Emote packs
                </h2>
                <p>
                  Search for and join emote packs to instantly gain access to their emotes!
                  <br/>
                  Publish your own to share your favourite set of emotes with the world!
                </p>
              </Grid.Column>
            ))}

            {this.renderImgColumn(false, '/replies_cropped', "Demo showing replies functionality", true, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
                <h2 className="bot_font">
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

            {this.renderImgColumn(true, '/stickers', "Demo showing NQN's stickers", true, (
              <Grid.Column className="large_fonts" width={5} verticalAlign="middle">
                <h2 className="bot_font">
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
              <Suspense fallback={<></>}>
                <Ad id="home-column-ad" sizes={[["160", "600"]]}/>
              </Suspense>
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
