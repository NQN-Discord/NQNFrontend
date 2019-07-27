import {Container, Divider, Header} from "semantic-ui-react";
import React from "react";
import "../components/helpText.css";

export function HelpText() {
  return (
    <div>
      <p>
        You've already seen all those other 'Nitro' bots, but NQN is rather different to them:
      </p>
      <Header as="h4" textAlign='center'>
        NQN has no command to use external emotes.
      </Header>
      <p>
        Instead, NQN looks for :emotes: in your messages and replaces the message with the appropriate emote.
        By default, you can use <em>any</em> emote you and NQN share servers with.
      </p>
      <p>
        You'll end up with the bot posting a message that looks like it came from you, except without any colours
        your role may have and with a fancy <span className="botTag">BOT</span>™ tag.
      </p>
      <p>
        If you ever send something not quite right, you can react to the reposted message with
        <span role="img" aria-label=":x:">❌</span>
        to delete it.
      </p>

      <h2>Emote packs</h2>
      <p>Ever felt like Discord was lacking something? NQN allows you to create emote packs which other people can
        use without having to manually add every emote. It's also very easy to share and use emote packs.
      </p>
      <p>
        To create an emote pack, simply upload your emotes to a server and use
        <code>!pack publish MySuperCoolEmotePackName</code>
        and they'll be available for anyone to use. Once published, you can join a pack with
        <code>!pack join MySuperCoolEmotePackName</code>.
      </p>
      <p>
        Feeling lazy? You can even use emote packs you're not in by typing
        <code>:MySuperCoolEmotePackName-EmoteName:</code> and the bot will know what you meant.
      </p>
      <p>
        Want to see what's out there? NQN provides easy to use emote pack search functionality.
        <code>!pack search Cool</code> or even <code>!pack search</code> to find <em>everything</em>.
      </p>
      <p>
        Forgot which packs you're in? <code>!pack mine</code> tells you just in case.
      </p>

      <h2>Message Replies</h2>
      <p>
        Ever wanted to reply to a message way up in the conversation, but there would be no context? NQN allows you
        to reply to messages sent long ago. Simply copy the message link via Discord (the Share button on mobile and
        then to clipboard) and then paste it into your message, and it'll post the message you're replying to as well.
      </p>

      <h2>Manually adding emotes</h2>
      <p>
        Know exactly which emote you want to use? <code>!alias</code> is for you.
        <code>!alias emote_name emote_url</code> allows you to use an emote the bot has but you don't.
      </p>
      <p>For example <code>!alias FifiHappy
        https://cdn.discordapp.com/emojis/393786352166109195.gif?v=1</code> allows you to
        use <code>:FifiHappy:</code>
      </p>
      <p>
        Don't have the exact emote yet? Why not <code>!search</code> for it?
        <code>!search happy</code> shows you all emotes the bot can use with the word 'happy' in their name.
      </p>
      <Divider/>

      <h2>For server admins:</h2>
      <h3>Auditing messages:</h3>
      <p>
        NQN reposts messages on behalf of users, using their avatars and usernames. This can cause issues with
        users changing their nicknames and avatars to pretend to be another user using the bot.
        To remedy this, NQN allows members with the 'View Audit Logs' permission to run <code>!audit</code>.
        This command allows you to identify who posted a message, including their current username#discriminator
        as well as their Discord ID.
      </p>
      <ul>
        <li><code>!audit guild</code> returns all reposted messages</li>
        <li><code>!audit #channel</code> returns all reposted messages in #channel</li>
        <li><code>!audit @member</code> returns all reposted messages by @member</li>
        <li><code>!audit #channel @member</code> returns all reposted messages by @member in #channel (Note
          that <code>!audit @member #channel</code> does not work)
        </li>
      </ul>
      <p>
        Also consider using the message reply functionality across channels to help discuss certain messages to
        keep a link to context before deleting them.
      </p>

      <h3>Emote Servers</h3>
      <p>
        NQN supports the creation of Emote Servers. Using <code>!search_all</code>, you can look through every
        single emote that the bot has ever seen, and add it directly to your server, as long as you and the bot have
        'manage emotes' permissions. Note that
        the bot does not ask for this permission by default, so it will have to be added manually.
        <code>!search_all</code> supports the same search syntax as <code>!search</code>, except it picks up more
        results.
      </p>

      <h3>NQN's command prefix:</h3>
      <p>If the default prefix NQN uses (<code>!</code>) is not right for your server, someone with 'Manage
        Server' permissions can change it.
      </p>
      <p>
        <code>!server prefix @Not Quite Nitro &gt;</code> will change the prefix NQN listens on
        to <code>&gt;</code>. Note that you need to ping the bot to change the
        prefix to avoid conflicts with other bots with the same change prefix command. NQN allows prefixes that
        are more than one character long, and if the prefix given ends with a letter, a space is appended to it.
        So if the prefix were <code>nqn</code>, you would run commands like <code>nqn help</code>.
      </p>

      <h3>Server wide emotes:</h3>
      <p>
        If you would like everyone in your server to have access to a particular emote, you can use <code>!server
        alias &lt;emote_name&gt; &lt;emote_id&gt;</code>,
        much like the <code>!alias</code> command. In fact, every alias command can be prepended
        with <code>server</code> to add the alias to your entire server.
      </p>
      <p>
        Note that by default, each server gets 10 additional emotes, but you can get more by voting up the bot on
        this site via the link
        sent when adding a server wide alias. Anyone in your server can do this.
      </p>

      <h4>The Boost channel:</h4>
      <p>
        You can encourage your users to get your server more votes by adding a Boost channel via NQN. This posts
        whenever someone votes for
        your server via DBL. To add a bit of friendly inter-server competition, it also shows your members how
        many other servers have more
        server wide emote slots than yours, creating a team effort to get your one up the ranks.
      </p>
      <ul>
        <li><code>!server set_boost_channel #channel</code> sets the Boost channel to #channel</li>
        <li><code>!server set_boost_channel</code> unsets the Boost channel in case you don't want messages posted
          anymore
        </li>
        <li><code>!rank</code> shows you how many servers have more server wide emote slots than yours</li>
      </ul>

      <h3>Permissions:</h3>
      <p>NQN requires the 'Manage Webhooks' server permission to correctly function; reposting messages will not
        work without this.
      </p>
      <ul>
        <li>To disable commands from working in a specific channel, deny NQN 'Send Message' permissions there via
          user permissions.
        </li>
        <li>To disable reposting messages in a specific channel, deny NQN 'Manage Webhook' permissions there via
          user permissions.
        </li>
        <li>To disable all interactions in a specific channel, deny NQN 'Read Message' permissions there via user
          permissions.
        </li>
      </ul>

      <h3>Information gathering:</h3>
      <p>
        NQN stores reposted messages such that users can delete them and for the audit log. Every emote in your
        server is visible by anybody using the bot and is searchable, though unlinkable to your server.
        When NQN is invited to your server, it will crawl through every message viewable and add new emotes to
        it's database. It does not save any of the message content when doing this.
        On occasion, certain statistics about how the bot is used may be gathered to inform choices as to how to
        improve the bot further but will never include generic messages sent by your users.
      </p>
      <Divider/>

      <h2>Things NQN doesn't do</h2>
      <ul>
        <li>Replace emotes in messages with non-image files.</li>
        <li>Allow use of emotes in servers the bot isn't in.</li>
        <li>Allow the editing of a message with a replaced emote.</li>
        <li>Replace messages in your DMs or group DMs.</li>
      </ul>

      <h2>Troubleshooting</h2>
      <ul>
        <li>If you have Nitro, the bot will only be useful for emotes in servers you're not in.</li>
        <li>To use an emote from a server you aren't in, you need to add an alias for it or be part of an emote
          pack with it in.
        </li>
        <li>If you add an alias with the same name as another alias, it will overwrite the old one.</li>
        <li>If you join an emote pack with an emote with the same name as one from your servers, the emote pack
          will be prefered.
        </li>
        <li>If you add an alias with the same name as an emote from a server you're in or an emote pack, the
          alias will be prefered.
        </li>
        <li>If the bot isn't posting messages, try <code>!help</code> - the bot will tell you of any
          permission's it's missing.
        </li>
      </ul>
      <Divider/>
      <p>
        <strong>
          By inviting the bot to your server, you agree to allow users to search for emotes in your server and use
          them in any server the bot is in.
        </strong>
      </p>
    </div>
  );
}

export function HelpTextPage() {
  return (
    <Container>
      <HelpText/>
    </Container>
  )
}