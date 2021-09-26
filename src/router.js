import React, {Suspense, lazy} from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';


const isBrowser = process.title === "browser";
const dummy = () => {};


const HomePage = isBrowser? lazy(() => import("./pages/home")): dummy;
const HelpTextPage = isBrowser? lazy(() => import("./components/helpText")): dummy;
const WebhookPage = isBrowser? lazy(() => import("./pages/guild_dashboard/server_view")): dummy;
const ManagerRootPage = isBrowser? lazy(() => import("./pages/emote_manager/manager_root")): dummy;
const LoginPage = isBrowser? lazy(() => import("./pages/login")): dummy;
const InvitePage = isBrowser? lazy(() => import("./pages/invite")): dummy;
const PrivacyPolicy = isBrowser? lazy(() => import("./pages/policy")): dummy;
const GuildCreatorPage = isBrowser? lazy(() => import("./pages/guild_builder/guild_builder")): dummy;
const GuildSelectorPage = isBrowser? lazy(() => import("./pages/guild_builder/guild_selector")): dummy;
const GuildStatusPage = isBrowser? lazy(() => import("./pages/guild_builder/guild_status")): dummy;
const LicensePage = isBrowser? lazy(() => import("./pages/licenses")): dummy;
const CommandPage = isBrowser? lazy(() => import("./pages/commands")): dummy;
const BotAddedPage = isBrowser? lazy(() => import("./pages/bot_added")): dummy;
const PremiumPage = isBrowser? lazy(() => import("./pages/premium")): dummy;


export const FullRouter = ({loggedIn}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {!loggedIn && <LoggedOutRouter dummyComponents={false}/>}
      {loggedIn && <LoggedInRouter dummyComponents={false}/>}
    </Suspense>
  );
};

export const LoggedOutRouter = ({dummyComponents}) => {

  return (
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
  );
};

export const LoggedInRouter = ({dummyComponents}) => {
  return (
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
      <Route exact path="/privacy" component={PrivacyPolicy}/>
      <Route exact path="/licenses" component={LicensePage}/>
      <Route exact path="/commands" component={CommandPage}/>
      <Route exact path="/bot_added" component={BotAddedPage}/>
      <Route exact path="/premium" component={PremiumPage}/>
    </Switch>
  );
};
