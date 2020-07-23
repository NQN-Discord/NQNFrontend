import React from 'react';
import {Container} from "semantic-ui-react";


export default function PrivacyPolicy() {
  return (
    <Container>
      <h1>
        Privacy Policy
      </h1>

      <p>
        Blue is developing Not Quite Nitro as a free application. This Service is provided by Blue at no cost and is
        intended for use as is.
      </p>
      <p>
        If you choose to use the Service, then you agree to the collection and use of information in relation to this
        policy. The Personal Information that is collected is used for providing and improving the Service. Your
        information is not shared except as described in this Privacy Policy.
      </p>
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
          Messages re-posted by our service on your behalf including the message content, author information and where
          it was sent to. This is to provide our ‘audit’ feature, as well as to report any content to the appropriate
          authorities. This data is stored for up to 30 days.
        </li>
        <li>
          Which commands you have executed in the past, including the user who ran it, where it was run and any
          arguments passed to the command. This is to provide developers of the service with analytical data, and to
          help prevent abuse. This data is stored for up to 30 days.
        </li>
        <li>
          Server metadata, including the server name, metadata, channel names, topics, metadata, role names and
          metadata. This is kept in order to provide the service and to decrease startup-time. We remove this data after
          you stop using the service.
        </li>
        <li>
          The name and access information of all webhooks in your server to determine which webhooks should be removed
          if you stop using the service, and also to decrease load times.
        </li>
        <li>
          Configuration data, such as your user settings and server settings including but not limited to the chosen
          bot prefix, audit log channel location and user ‘alias’ data. This data is removed when you stop using the
          service.
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
      <h3>Third Parties</h3>
      <p>
        The app uses third party services that may collect information used to identify you.
      </p>
      <p>
        Links to privacy policy of third party service providers used by the app:
      </p>
      <ul>
        <li>
          <a href="https://sentry.io/privacy/">Sentry</a>
        </li>
      </ul>
      <h4>Log Data</h4>
      <p>
        Whenever you use the Service, in a case of an error in the application, data and information is collected
        (through third party products) called Log Data.
        This Log Data may include information such as your device Internet Protocol (“IP”) address, device name,
        operating system version, the configuration of the app when utilizing my Service, the time and date of your use
        of the Service, message data, and other statistics. This Log Data is uploaded to Sentry.
      </p>

      <h2>Cookies</h2>
      <p>
        Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are
        sent to your browser from the websites that you visit and are stored on your device's internal memory. This
        Service uses these “cookies” explicitly to store authentication information. However, the app may use third
        party code and libraries that use “cookies” to collect information and improve their services. You have the
        option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you
        choose to refuse our cookies, you may not be able to use some portions of this Service.
      </p>

      <h2>Security</h2>
      <p>
        All data used by the service is stored using encryption at rest. We only allow access to the servers we run the
        service on to developers of the service, and we protect access by forcing the use of keys when accessing the
        servers. Physical access to the servers is also limited. If you find a security issue with any portion of the
        service, please email me at blue@nqn.blue or send me a Direct Message on Discord. DO NOT post the issue publicly
        before we have fixed it.
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
        effective as of 2020-07-19.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at
        blue@nqn.blue. I am also available in the Not Quite Nitro Discord server at <a href="https://discord.gg/e6pQupV">https://discord.gg/e6pQupV</a>
      </p>
    </Container>
  );
}