export const api_url = `http://localhost:8888`;
export const redirect_uri = `${window.location.origin}/login`;
export const discordURL = `https://discordapp.com/api/oauth2/authorize?client_id=561541673750888481&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=identify`;
export const inviteURL = "https://discordapp.com/api/oauth2/authorize?client_id=559426966151757824&permissions=537209856&scope=bot";
