import React, {Component, Suspense, lazy} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import './semantic/src/definitions/globals/reset.less';
import './semantic/src/definitions/globals/site.less';

/* Elements */
import './semantic/src/definitions/elements/button.less';
import './semantic/src/definitions/elements/container.less';
import './semantic/src/definitions/elements/divider.less';
import './semantic/src/definitions/elements/emoji.less';
import './semantic/src/definitions/elements/flag.less';
import './semantic/src/definitions/elements/header.less';
import './semantic/src/definitions/elements/icon.less';
import './semantic/src/definitions/elements/image.less';
import './semantic/src/definitions/elements/input.less';
import './semantic/src/definitions/elements/label.less';
import './semantic/src/definitions/elements/list.less';
import './semantic/src/definitions/elements/loader.less';
import './semantic/src/definitions/elements/placeholder.less';
import './semantic/src/definitions/elements/rail.less';
import './semantic/src/definitions/elements/reveal.less';
import './semantic/src/definitions/elements/segment.less';
import './semantic/src/definitions/elements/step.less';
import './semantic/src/definitions/elements/text.less';

/* Collections */
import './semantic/src/definitions/collections/breadcrumb.less';
import './semantic/src/definitions/collections/form.less';
import './semantic/src/definitions/collections/grid.less';
import './semantic/src/definitions/collections/menu.less';
import './semantic/src/definitions/collections/message.less';
import './semantic/src/definitions/collections/table.less';

/* Views */
import './semantic/src/definitions/views/ad.less';
import './semantic/src/definitions/views/card.less';
import './semantic/src/definitions/views/comment.less';
import './semantic/src/definitions/views/feed.less';
import './semantic/src/definitions/views/item.less';
import './semantic/src/definitions/views/statistic.less';

/* Modules */
import './semantic/src/definitions/modules/accordion.less';
import './semantic/src/definitions/modules/calendar.less';
import './semantic/src/definitions/modules/checkbox.less';
import './semantic/src/definitions/modules/dimmer.less';
import './semantic/src/definitions/modules/dropdown.less';
import './semantic/src/definitions/modules/embed.less';
import './semantic/src/definitions/modules/modal.less';
import './semantic/src/definitions/modules/nag.less';
import './semantic/src/definitions/modules/popup.less';
import './semantic/src/definitions/modules/progress.less';
import './semantic/src/definitions/modules/slider.less';
import './semantic/src/definitions/modules/rating.less';
import './semantic/src/definitions/modules/search.less';
import './semantic/src/definitions/modules/shape.less';
import './semantic/src/definitions/modules/sidebar.less';
import './semantic/src/definitions/modules/sticky.less';
import './semantic/src/definitions/modules/tab.less';
import './semantic/src/definitions/modules/toast.less';
import './semantic/src/definitions/modules/transition.less';


import {readStorageState, setRefreshToken} from "./actions/auth";
import {fetchEmotes} from "./actions/user";
import {fetchGuilds} from "./actions/guild";

import {Header, BottomFooter} from "./header";
import {HelpTextPage} from "./components/helpText";


const WebhookPage = lazy(() => import("./pages/guild_dashboard/server_view"));
const ManagerRootPage = lazy(() => import("./pages/emote_manager/manager_root"));
const LoginPage = lazy(() => import("./pages/login"));
const InvitePage = lazy(() => import("./pages/invite"));
const UserFeedback = lazy(() => import("./pages/feedback"));
const PrivacyPolicy = lazy(() => import("./pages/policy"));
const GuildCreatorPage = lazy(() => import("./pages/guild_builder/guild_builder"));
const GuildSelectorPage = lazy(() => import("./pages/guild_builder/guild_selector"));
const GuildStatusPage = lazy(() => import("./pages/guild_builder/guild_status"));
const LicensePage = lazy(() => import("./pages/licenses"));
const CommandPage = lazy(() => import("./pages/commands"));
const BotAddedPage = lazy(() => import("./pages/bot_added"));
const PremiumPage = lazy(() => import("./pages/premium"));
const HomePage = lazy(() => import("./pages/home"));

class App extends Component {
  componentDidMount() {
    this.props.readStorageState();
    axios.interceptors.response.use((response) => {
      const auth = response.data.authorization;
      if (auth) {
        this.props.setRefreshToken(auth);
      }
      return response;
    }, (err) => {
      if (err.response && err.response.status === 403 && err.response.data.message === "Invalid login token") {
        this.props.setRefreshToken("");
      } else {
        throw err;
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn !== true && this.props.loggedIn === true) {
      this.props.fetchGuilds();
      this.props.fetchEmotes();
    }
  }

  render() {
    if (this.props.loggedIn === null) {
      return <div>
        Loading...
      </div>
    }
    return (
      <Router>
        <div className="site_content">
          <Alert stack={{limit: 3}}/>
          <div className="site_body">
            <Header/>
            <div className="site_container">
              <Suspense fallback={<div>Loading...</div>}>
                {!this.props.loggedIn &&
                  <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/help" component={HelpTextPage}/>
                    <Route exact path="/privacy" component={PrivacyPolicy}/>
                    <Route exact path="/licenses" component={LicensePage}/>
                    <Route exact path="/commands" component={CommandPage}/>
                    <Route exact path="/bot_added" component={BotAddedPage}/>
                    <Route exact path="/invite" component={InvitePage}/>
                    <LoginPage/>
                  </Switch>
                }
                {this.props.loggedIn &&
                  <Switch>
                    <Route exact path="/guilds/:guildID" component={WebhookPage}/>
                    <Route exact path="/guilds/:guildID/channels/:channelID" component={WebhookPage}/>
                    <Route exact path="/guilds/" component={WebhookPage}/>
                    <Route exact path="/guilds/:guildID/:page" component={WebhookPage}/>
  
                    <Route exact path="/emote_manager/overview" component={ManagerRootPage}/>
                    <Route exact path="/emote_manager/packs" component={ManagerRootPage}/>
                    <Route exact path="/emote_manager/packs/search" component={ManagerRootPage}/>
                    <Route exact path="/emote_manager/alias" component={ManagerRootPage}/>
                    <Route exact path="/emote_manager/alias/search" component={ManagerRootPage}/>
  
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/invite" component={InvitePage}/>
  
                    <Route exact path="/guild_builder" component={GuildCreatorPage}/>
                    <Route exact path="/guild_builder/selector" component={GuildSelectorPage}/>
                    <Route exact path="/guild_builder/status" component={GuildStatusPage}/>
  
                    <Route exact path="/reference" component={ManagerRootPage}/>
  
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/help" component={HelpTextPage}/>
                    <Route exact path="/feedback" component={UserFeedback}/>
                    <Route exact path="/privacy" component={PrivacyPolicy}/>
                    <Route exact path="/licenses" component={LicensePage}/>
                    <Route exact path="/commands" component={CommandPage}/>
                    <Route exact path="/bot_added" component={BotAddedPage}/>
                    <Route exact path="/premium" component={PremiumPage}/>
                  </Switch>
                }
              </Suspense>
            </div>
          </div>
          <BottomFooter/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  }
};

const mapDispatchToProps = dispatch => {
  return {
    readStorageState: () => dispatch(readStorageState()),
    setRefreshToken: (auth) => dispatch(setRefreshToken(auth)),
    fetchGuilds: () => dispatch(fetchGuilds()),
    fetchEmotes: () => dispatch(fetchEmotes())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
