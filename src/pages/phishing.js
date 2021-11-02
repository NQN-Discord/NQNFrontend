import React from "react";
import { Container, Header } from "semantic-ui-react";

import '../semantic/src/definitions/elements/container.less';
import '../semantic/src/definitions/elements/header.less';

export default function PhishingPage() {
  return (
    <Container text>
      <Header as="h1">
        <span role="img" aria-label="Fish">🐟</span> Woah there! You nearly got phished! <span role="img" aria-label="Fishing rod">🎣</span>
      </Header>
      <Header as="h2">
        What is phishing?
      </Header>
      <p>
        NQN automatically hides and censors phishing messages.
        Phishing is where someone tries to trick you into submitting personal information, often so they can steal your Discord account.
        If you got here, you must have tried to visit the website anyway, which isn't a great idea.
        NQN's phishing list is generated based off Discord Nitro and Steam scam domains, and is vetted by real humans.
      </p>
      <Header as={"h2"}>
        How does Discord phishing work?
      </Header>
      <p>
        Most of the time, users sending phishing messages have had their own account stolen by falling for a phishing scam themselves.
        Their account credentials are then uploaded and stored by the attackers and later used, often sending links to all the servers they're in.
        In these cases, you'll mostly find that the user in question's been in your server for a decent period, or might have even been an active member of the community.
      </p>
      <p>
        The scammers then sell the account, and if applicable, purchase Discord Nitro gifts on your saved bank details.
      </p>
      <Header as={"h2"}>
        What do I do if I got phished?
      </Header>
      <p>
        If you still have access to your account (which you may not have), change your password on Discord.
        Doing this will prevent the scammers using any logged in sessions they may have, and prevent them from logging in again.
      </p>
    </Container>
  )
}
