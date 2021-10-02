import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';


const isBrowser = process.title === "browser";
const dummy = () => {};


const prerenderedLazy = React.lazy;



const HelpTextPage = isBrowser? prerenderedLazy(() => import("./components/helpText")): dummy;
const WebhookPage = isBrowser? prerenderedLazy(() => import("./pages/guild_dashboard/server_view")): dummy;
const ManagerRootPage = isBrowser? prerenderedLazy(() => import("./pages/emote_manager/manager_root")): dummy;
const LoginPage = isBrowser? prerenderedLazy(() => import("./pages/login")): dummy;
const InvitePage = isBrowser? prerenderedLazy(() => import("./pages/invite")): dummy;
const PrivacyPolicy = isBrowser? prerenderedLazy(() => import("./pages/policy")): dummy;
const GuildCreatorPage = isBrowser? prerenderedLazy(() => import("./pages/guild_builder/guild_builder")): dummy;
const GuildSelectorPage = isBrowser? prerenderedLazy(() => import("./pages/guild_builder/guild_selector")): dummy;
const GuildStatusPage = isBrowser? prerenderedLazy(() => import("./pages/guild_builder/guild_status")): dummy;
const LicensePage = isBrowser? prerenderedLazy(() => import("./pages/licenses")): dummy;
const CommandPage = isBrowser? prerenderedLazy(() => import("./pages/commands")): dummy;
const BotAddedPage = isBrowser? prerenderedLazy(() => import("./pages/bot_added")): dummy;
const PremiumPage = isBrowser? prerenderedLazy(() => import("./pages/premium")): dummy;
const PublicPackSearchPage = isBrowser? prerenderedLazy(() => import("./pages/public_packs/search")): dummy;
const PublicPackPage = isBrowser? prerenderedLazy(() => import("./pages/public_packs/view")): dummy;


export const FullRouter = ({loggedIn, HomePage}) => {
  return (
    <React.Suspense fallback={<div>Loading Page...</div>}>
      {!loggedIn && <LoggedOutRouter HomePage={HomePage}/>}
      {loggedIn && <LoggedInRouter HomePage={HomePage}/>}
    </React.Suspense>
  );
};

export const LoggedOutRouter = ({HomePage}) => {

  return (
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/help" component={HelpTextPage}/>
      <Route exact path="/privacy" component={PrivacyPolicy}/>
      <Route exact path="/licenses" component={LicensePage}/>
      <Route exact path="/commands" component={CommandPage}/>
      <Route exact path="/bot_added" component={BotAddedPage}/>
      <Route exact path="/invite" component={InvitePage}/>
      <Route exact path="/packs" component={PublicPackSearchPage}/>
      <Route exact path="/packs/:packName" component={PublicPackPage}/>
      <LoginPage/>
    </Switch>
  );
};

export const LoggedInRouter = ({HomePage}) => {
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
      <Route exact path="/packs" component={PublicPackSearchPage}/>
      <Route exact path="/packs/:packName" component={PublicPackPage}/>
      <Route exact path="/premium" component={PremiumPage}/>
    </Switch>
  );
};
