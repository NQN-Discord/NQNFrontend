import React from "react";
import {Container, Divider, Header, Image} from "semantic-ui-react";

import "../components/helpText.css";

export function HelpText({dbl}) {
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
        If you ever send something not quite right, you can react to the reposted message with the <span role="img" aria-label=":x:">❌</span> emote to delete it.
      </p>
      { dbl && (
        <Image
          src="/try_it_out.gif"
          alt="Example usage image"
          floated='right'
        />
      )}
      { !dbl && (
        <Image
          src="https://discordbots.org/api/widget/559426966151757824.svg"
          floated='right'
          alt=""
          as='a'
          href="https://discordbots.org/bot/559426966151757824"
          target='_blank'
          rel="nofollow noreferrer"
        />
      )}
      <h3>Features</h3>
      <p>
        NQN has a lot of features, and it would be a shame to miss out on them:
      </p>
      <ul>
        <li>
          Emotes anywhere - even without Nitro
        </li>
        <li>
          Stickers - full size images in the middle of messages
        </li>
        <li>
          Emote packs - perfect for sharing
        </li>
        <li>
          Message quoting/replies
        </li>
      </ul>
      <Divider/>

      <h2>Stickers</h2>
      <div>
        <p>
          Telegram has them, so why not Discord? NQN allows you to create and post stickers from inside the app and
          even import them directly from Telegram.
        </p>
        <p>
          Stickers allow anyone to post full size images in the middle of messages. Once you've created the sticker, you
          can use it like you would an emote, except stickers have a file extension at the end.{" "}
          <code>Hello :wave.png: How are you doing?</code> would post a similar message to this one if wave.png was a
          sticker. Each message can contain up to 10 stickers.
        </p>
        <p>
          To import a sticker pack from telegram, run <code>!sticker telegram URL</code>, where URL is the url of the
          pack. NQN supports <a href="#">tg://addstickers?set=</a> and <a href="#">https://t.me/addstickers/</a> style
          urls, as well as plain pack names. NQN will then show them all with their names.
        </p>
        <p>
          To create a sticker from a file, use <code>!sticker create</code> and upload an image to be your new sticker.
          You can optionally give an alias like <code>!sticker create BluePat.gif</code>.
        </p>
        <p>
          If your sticker already exists as an emote, you can import from it.
          Either from an emote directly, with an optional alias. <code>!sticker import :blue_smirk: smirk.png</code>.
          Or by searching through emotes NQN has. <code>!sticker import blue pat</code>.
          Note that the searching through emotes option does not support aliasing.
        </p>
        <p>
          If you've had enough time with a sticker, you can say goodbye with <code>!sticker delete BluePat.gif</code>.
          You can only delete your own stickers.
        </p>
        <p>
          To remind you which stickers are yours, you can use <code>!stickers mine</code> and the bot will tell you which
          are yours.
        </p>
        <p>
          To look through the list of them, use <code>!sticker search</code> with optional search terms.
        </p>
      </div>

      <h2>Emote packs</h2>
      <div>
        <p>
          Ever felt like Discord was lacking something? NQN allows you to create emote packs which other people can
          use without having to manually add every emote. It's also very easy to share and use emote packs.
        </p>
        <p>
          To create an emote pack, simply upload your emotes to a server and use <code>!pack publish MySuperCoolEmotePackName</code> and
          they'll be available for anyone to use. Once published, you can join a pack with <code>!pack join MySuperCoolEmotePackName</code>.
        </p>
        <p>
          Feeling lazy? You can even use emote packs you're not in by typing <code>:MySuperCoolEmotePackName-EmoteName:</code> and
          the bot will know what you meant.
        </p>
        <p>
          Want to see what's out there? NQN provides easy to use emote pack search functionality. <code>!pack search Cool</code> or
          even <code>!pack search</code> to find <em>everything</em>.
        </p>
        <p>
          Forgot which packs you're in? <code>!pack mine</code> tells you just in case.
        </p>
      </div>

      <h2>Message Replies</h2>
      <p>
        Ever wanted to reply to a message way up in the conversation, but there would be no context? NQN allows you
        to reply to messages sent long ago. Simply copy the message link via Discord (the Share button on mobile and
        then to clipboard) and then paste it into your message, and it'll post the message you're replying to as well.
      </p>

      <h2>Aliases</h2>
      <div>
        <p>
          Want control over what emotes you can use? <code>!alias</code> is for you. <code>!alias create</code> allows
          you to use an emote the bot has but you don't.
        </p>
        <p>
          For example <code>!alias create FifiHappy</code> allows you to use <code>:FifiHappy:</code>. If there are
          multiple emotes with a name, then the bot will show a list and ask you which you want.
        </p>
        <p>
          Don't know the exact emote yet? Why not search for it? <code>!alias search happy</code> shows you all emotes
          the bot can use with the word 'happy' in their name. You can select from these to use them in any server you
          share with the bot.
        </p>
      </div>
      <Divider/>

      <h2>For server admins:</h2>
      <div>
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
          'Manage Emotes' permissions.
          <code>!search_all</code> supports the same search syntax as <code>!alias search</code>, except it picks up more
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
          alias create :emote_name:</code>. This works exactly like the <code>!alias</code> set of commands in terms of
          management.
        </p>
        <p>
          Note that by default, each server gets 10 additional emotes, but you can get more by voting up the bot on
          this site via the link sent when adding a server wide alias. Anyone in your server can do this.
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
          <li><code>!rank</code> shows you the voting leaderboard with your server listed if it's in the top 10.</li>
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

        <h3>Disabling Features</h3>
        <p>
          The following features can be disabled per guild:
        </p>
        <ul>
          <li>Emotes everywhere</li>
          <li>Stickers</li>
          <li>Message replies</li>
        </ul>

        <h3>Information gathering:</h3>
        <p>
          NQN stores reposted messages such that users can delete them and for the audit log. Every emote in your
          server is visible by anybody using the bot and is searchable, though unlinkable to your server.
          When NQN is invited to your server, it will crawl through every message viewable and add new emotes to
          its database. It does not save any of the message content when doing this.
          On occasion, certain statistics about how the bot is used may be gathered to inform choices as to how to
          improve the bot further but will never include generic messages sent by your users.
        </p>
      </div>
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
        <li>
          To use an emote from a server you aren't in, you need to add an alias for it or be part of an emote
          pack with it in.
        </li>
        <li>
          If you add an alias with the same name as another alias, it will overwrite the old one.
        </li>
        <li>
          If you join an emote pack with an emote with the same name as one from your servers, the emote pack
          will be preferred.
        </li>
        <li>
          If you add an alias with the same name as an emote from a server you're in or an emote pack, the
          alias will be preferred.
        </li>
        <li>
          If the bot isn't letting you create a sticker, make sure it's an image, under 8MB and isn't called the same
          thing as an already existing sticker.
        </li>
        <li>
          If the bot isn't posting messages, try <code>!help</code> - the bot will tell you of any
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
  return <HelpText dbl={true}/>;
}