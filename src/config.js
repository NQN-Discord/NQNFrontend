const {
  apiUrl,
  clientId,
  guildBuilderClientId,
  rawGuildBuilderUri,
  allowHttp,
} = window.env;

const api_url = apiUrl;
const guildBuilderApiURL = allowHttp ? `http://${rawGuildBuilderUri}/v0` : `https://${rawGuildBuilderUri}/v0`;
const guildBuilderApiWS = allowHttp ? `ws://${rawGuildBuilderUri}/v0` : `wss://${rawGuildBuilderUri}/v0`;

const guild_builder_redirect_uri = `${window.location.origin}/guild_builder/status`;
const redirect_uri = `${window.location.origin}/login`;
const guildBuilderRedirect = `${window.location.origin}/guild_builder/status`;
const pateronRedirectURI = `${window.location.origin}/premium`;
const addBotRedirect = `${window.location.origin}/bot_added`;

const discordNoLoginURL = `https://discordapp.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=identify%20guilds`;
const discordURL = `${discordNoLoginURL}&prompt=none`;

const generalPermissions = "1610968128";

function inviteURLWithPerms(perms, state, redirectURI) {
  return `https://discordapp.com/oauth2/authorize?client_id=${clientId}&permissions=${perms}&scope=bot&state=${state}&response_type=code&redirect_uri=${redirectURI}`;
}

const inviteURL = inviteURLWithPerms(generalPermissions, "web_invite", addBotRedirect);

const inviteURLGuildBuilder = `https://discordapp.com/oauth2/authorize?client_id=${clientId}&permissions=${generalPermissions}&scope=bot&state=web_invite&response_type=code&redirect_uri=${guildBuilderRedirect}`;

const discordGuildBuilderURL = `https://discord.com/api/oauth2/authorize?client_id=${guildBuilderClientId}&redirect_uri=${encodeURIComponent(guild_builder_redirect_uri)}&response_type=code&scope=guilds.join%20identify&prompt=none`;

const patreonPage = "https://www.patreon.com/NQN";
const patreonOauth = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=r_47XahhSeLzbI2FkrFoFnF0o-D0ntGhzmseg2PSJMTAANeycktMWNxT6eDOuEYK&redirect_uri=${pateronRedirectURI}`;

export {
  api_url,
  discordURL,
  inviteURL,
  patreonPage,
  patreonOauth,
  guildBuilderApiURL,
  discordGuildBuilderURL,
  inviteURLWithPerms,
  redirect_uri,
  generalPermissions,
  guildBuilderApiWS,
  inviteURLGuildBuilder,
};
