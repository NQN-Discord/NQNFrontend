import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';


export const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
const dummy = () => {};


const HelpTextPage = isBrowser? React.lazy(() => import("./components/helpText")): dummy;
const WebhookPage = isBrowser? React.lazy(() => import("./pages/guild_dashboard/server_view")): dummy;
const ManagerRootPage = isBrowser? React.lazy(() => import("./pages/emote_manager/manager_root")): dummy;
const LoginPage = isBrowser? React.lazy(() => import("./pages/login")): dummy;
const InvitePage = isBrowser? React.lazy(() => import("./pages/invite")): dummy;
const PrivacyPolicy = isBrowser? React.lazy(() => import("./pages/policy")): dummy;
const GuildCreatorPage = isBrowser? React.lazy(() => import("./pages/guild_builder/guild_builder")): dummy;
const GuildSelectorPage = isBrowser? React.lazy(() => import("./pages/guild_builder/guild_selector")): dummy;
const GuildStatusPage = isBrowser? React.lazy(() => import("./pages/guild_builder/guild_status")): dummy;
const LicensePage = isBrowser? React.lazy(() => import("./pages/licenses")): dummy;
const CommandPage = isBrowser? React.lazy(() => import("./pages/commands")): dummy;
const BotAddedPage = isBrowser? React.lazy(() => import("./pages/bot_added")): dummy;
const PremiumPage = isBrowser? React.lazy(() => import("./pages/premium")): dummy;
const PublicPackSearchPage = isBrowser? React.lazy(() => import("./pages/public_packs/search")): dummy;
const PublicPackPage = isBrowser? React.lazy(() => import("./pages/public_packs/view")): dummy;
const PhishingPage = isBrowser? React.lazy(() => import("./pages/phishing")): dummy;
const TermsPage = isBrowser? React.lazy(() => import("./pages/terms")): dummy;


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
      <Route exact path="/terms" component={TermsPage}/>
      <Route exact path="/licenses" component={LicensePage}/>
      <Route exact path="/commands" component={CommandPage}/>
      <Route exact path="/bot_added" component={BotAddedPage}/>
      <Route exact path="/invite" component={InvitePage}/>
      <Route exact path="/phishing" component={PhishingPage}/>
      <Route exact path="/packs" component={PublicPackSearchPage}/>
      <Route path="/packs/:packName" component={PublicPackPage}/>
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
      <Route exact path="/terms" component={TermsPage}/>
      <Route exact path="/licenses" component={LicensePage}/>
      <Route exact path="/commands" component={CommandPage}/>
      <Route exact path="/bot_added" component={BotAddedPage}/>
      <Route exact path="/premium" component={PremiumPage}/>
      <Route exact path="/phishing" component={PhishingPage}/>

      <Route exact path="/packs" component={PublicPackSearchPage}/>
      <Route path="/packs/:packName" component={PublicPackPage}/>
    </Switch>
  );
};
