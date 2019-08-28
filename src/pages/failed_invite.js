import React from "react";
import { Container, Header, Divider } from "semantic-ui-react";


export default function FailedInvite() {
  return (
    <Container text>
        <Divider hidden/>
        <Header>
          Permissions needed breakdown:
        </Header>
        <ul>
          <li>
            Manage Emojis - Used for importing new emotes from other servers. Unneeded otherwise.
          </li>
          <li>
            Manage Messages - When using nitro emotes, NQN deletes the original message and reposts it. Works without, but degraded.
          </li>
          <li>
            Manage Webhooks - Core functionality for reposting messages. Required for nitro emotes, stickers and replies.
          </li>
          <li>
            Embed Links - NQN sometimes uses embeds for a better user experience.
          </li>
        </ul>
        <Divider/>
        <a href="https://discord.gg/UMVpPN7">Join the support server for more help</a>
    </Container>
  )
}