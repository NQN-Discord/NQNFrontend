import React from 'react';
import {Container, Table} from "semantic-ui-react";

import '../semantic/src/definitions/elements/container.less';
import '../semantic/src/definitions/collections/table.less';


import "./policy.css";
import {Helmet} from "react-helmet";


const Policy = () => (
  <Container>
    <Helmet>
      <title>Privacy Policy</title>
      <meta content="Privacy policy for bot and website" property="og:title"/>

      <meta content="TLDR: We don't sell your data" property="og:description"/>
      <meta content="TLDR: We don't sell your data" name="description"/>
    </Helmet>
    <h1>
      Privacy Policy
    </h1>
    <p>
      This privacy policy is split in two parts, one governing the usage of information on Discord, the other for
      this website.
    </p>
    <p>
      Blue is developing Not Quite Nitro as a free application. This Service is provided by Blue at no cost and is
      intended for use as is.
    </p>
    <p>
      If you choose to use the Service, then you agree to the collection and use of information in relation to this
      policy. The Personal Information that is collected is used for providing and improving the Service. Your
      information is not shared except as described in this Privacy Policy.
    </p>

    <DiscordPlatform/>
    <Website/>
    <AllServices/>
  </Container>
);


const DiscordPlatform = () => (
  <Table className="privacy_policy_header">
    <Table.Header>
      <Table.HeaderCell>
        <h1>
          On the Discord platform
        </h1>
      </Table.HeaderCell>
    </Table.Header>
    <h2>
      Information Collection and Use
    </h2>

    <p>
      To provide the service, all data received by the service may be temporarily stored until it can be processed
      further. We then store the following personally identifiable information, including but not limited to:
    </p>
    <ol>
      <li>
        The servers you have in common with our service. We store this so we know which servers you should be given
        automatic access to emoji from. This information is available to developers of the service to aid with
        debugging any issues you may have. We keep this data up to date with your current mutual servers; they are
        removed as you leave servers the bot is also on.
      </li>
      <li>
        Metadata about messages re-posted by our service on your behalf including: guild, channel, message, and author IDs.
        This is to provide moderation commands, and to allow users to delete their own messages.
        This data is stored for up to 30 days in the main database and backed up for 30 days, totalling 60 days of storage.
      </li>
      <li>
        Which commands you have executed in the past, including the user who ran it, where it was run and any
        arguments passed to the command. This is to provide developers of the service with analytical data, and to
        help prevent abuse.
        This data is stored for up to 30 days in the main database and backed up for 30 days, totalling 60 days of storage.
      </li>
      <li>
        Server metadata, including the server name, premium tier, icon and join time, channel names, permissions
        overrides, and other channel metadata, role name, permissions and other metadata.
        This is kept in order to provide the service and to decrease startup-time times.
        We remove this data after you stop using the service.
      </li>
      <li>
        The name and access information of all webhooks in your server to decrease load times when making use of the
        service.
      </li>
      <li>
        Configuration data, such as your user settings and server settings including but not limited to the chosen
        bot prefix, audit log channel location and user ‘alias’ data.
      </li>
    </ol>

    <h3>
      We Also Store the Following Information
    </h3>
    <ol start={7}>
      <li>
        The name, any link to, checksum and ‘perceptual hash’ of all emojis uploaded to, and posted in your server.
        We store this data to provide an emoji search service and to determine image uniqueness.
      </li>
    </ol>
    <h4>Log Data</h4>
    <p>
      Whenever you use the Service, in a case of an error in the application, data and information is collected
      (through third party products) called Log Data.
      This Log Data may include information such as your Discord information, contents of the message you sent,
      related bot information such as permissions the bot has, the time and date of your use of the Service, and other temporary data in use.
      This Log Data is stored internally, and is not shared with third parties.
    </p>
  </Table>
);

const Website = () => (
  <Table className="privacy_policy_header">
    <Table.Header>
      <Table.HeaderCell>
        <h1>
          The nqn.blue website only
        </h1>
      </Table.HeaderCell>
    </Table.Header>
    <h2>
      Information Collection and Use
    </h2>

    <h3>Third Parties</h3>
    <p>
      The website does not send data to external third party services.
    </p>

    <h4>Log Data</h4>
    <p>
      Whenever you use the Service, in a case of an error in the application, data and information is collected
      (through third party products) called Log Data.
      This Log Data may include information such as your device Internet Protocol (“IP”) address, device name,
      operating system version, the configuration of the app when utilizing my Service, the time and date of your use
      of the Service, website data, and other statistics.
      This Log Data is stored internally, and is not shared with third parties.
    </p>

    <h4>Analytics Data</h4>
    <p>
      Whenever you use the Service, data and information is collected
      (through third party products) called Analytics Data.
      This Analytics Data may include information such as your device Internet Protocol (“IP”) address, device name,
      operating system version, the configuration of the app when utilizing my Service, the time and date of your use
      of the Service, website data, and other statistics.
      This Analytics Data is stored internally, and is not shared with third parties.
    </p>

    <h2>Cookies</h2>
    <p>
      Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are
      sent to your browser from the websites that you visit and are stored on your device's internal memory. This
      Service uses these “cookies” explicitly to store authentication information, and are necessary for site
      functionality.
    </p>
  </Table>
);

const AllServices = () => (
  <Table className="privacy_policy_header">
    <Table.Header>
      <Table.HeaderCell>
        <h1>
          All services
        </h1>
      </Table.HeaderCell>
    </Table.Header>
    <h2>Security</h2>
    <p>
      All data used by the service is stored using encryption at rest. We only allow access to the servers we run the
      service on to developers of the service, and we protect access by forcing the use of keys when accessing the
      servers. Physical access to the servers is also limited. If you find a security issue with any portion of the
      service, please email me at <a href="mailto:blue@nqn.blue">blue@nqn.blue</a> or send me a Direct Message on
      Discord. DO NOT post the issue publicly before we have fixed it.
    </p>

    <h2>Data Removal</h2>
    <p>
      If you would like to have your data removed from the bot, please send me a message including which information
      you want to have removed.
    </p>
    <p>
      If you wish to have an emoji removed from the bot’s search engine, please make sure it is not present in any
      servers the bot is in either by removing the emojis or kicking the bot before contacting me as above.
    </p>

    <h2>Links to Other Sites</h2>
    <p>
      This Service may contain links to other sites. If you click on a third-party link, you will be directed to that
      site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the
      Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy
      policies, or practices of any third-party sites or services.
    </p>

    <h2>Changes to This Privacy Policy</h2>
    <p>
      I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for
      any changes. I will notify you of any changes by posting the new Privacy Policy on this page. This policy is
      effective as of 2022-06-11.
    </p>

    <h2>Contact Us</h2>
    <p>
      If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me
      at <a href="mailto:blue@nqn.blue">blue@nqn.blue</a>. I am also available in the Not Quite Nitro Discord server
      at <a href="https://discord.gg/e6pQupV">https://discord.gg/e6pQupV</a>
    </p>
  </Table>
);


export default Policy;