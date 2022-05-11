import React from 'react';
import {Container, Table} from "semantic-ui-react";

import '../semantic/src/definitions/elements/container.less';
import '../semantic/src/definitions/collections/table.less';


import "./policy.css";
import {Helmet} from "react-helmet";


export default () => (
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
      This Log Data may include information such as your Discord information, message you sent,
      related bot information such as permissions the bot has, the time and date of your use of the Service, and other temporary data in use.
      This Log Data is uploaded to Sentry.
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
      The website uses third party services that may collect information used to identify you.
    </p>
    <p>
      Links to privacy policy of third party service providers used by the website:
    </p>
    <ul>
      <li><a href="https://sentry.io/privacy/">Sentry</a></li>
      <li><a href="https://policies.google.com/privacy">Google Analytics</a></li>
    </ul>
    <h4>Log Data</h4>
    <p>
      Whenever you use the Service, in a case of an error in the application, data and information is collected
      (through third party products) called Log Data.
      This Log Data may include information such as your device Internet Protocol (“IP”) address, device name,
      operating system version, the configuration of the app when utilizing my Service, the time and date of your use
      of the Service, message data, and other statistics. This Log Data is uploaded to Sentry.
    </p>

    <div>
      <h2>
        For California Residents: CCPA Information - nqn.blue website ONLY
      </h2>
      <p> This Privacy Notice for California Residents supplements the information contained elsewhere in this Privacy
        Notice and applies solely to all visitors, users, and others who reside in the State of California
        (“consumers” or “you”). We adopt this notice to comply with the California Consumer Privacy Act of 2018
        (CCPA) and any terms defined in the CCPA have the same meaning when used in this notice.
      </p>
      <h2>
        Rights and Choices
      </h2>
      <p>
        The CCPA provides consumers located in the state of California with certain rights regarding their personal
        information and data. The following section describes those rights and explains how to exercise them:
      </p>
      <h2>
        Access to Specific Information and Data Portability Rights
      </h2>
      <p>
        You have the right to request that I disclose certain information to you about our collection and
        use of your personal information over the past 12 months. Once we receive and confirm your verifiable consumer
        request (as described in the section “Exercising Access, Data Portability, and Deletion Rights”), we will
        disclose to you:
      </p>
      <ul>
        <li>The categories of personal information we collected about you.</li>
        <li>The categories of sources for the personal information we collected about you.</li>
        <li>Our business or commercial purpose for collecting or selling that personal
          information.
        </li>
        <li>The categories of third parties with whom we share that personal information.</li>
        <li> The specific pieces of personal information we collected about you (also called data
          portability request)
        </li>
        <li>
          If we sold or disclose your personal information for a business purpose, two separate lists disclosing:
          <ul>
            <li> Sales, identifying the personal information categories that each category of
              recipient purchased, and
            </li>
            <li> Disclosures for a business purpose, identifying the personal information
              categories that each category of recipient obtained
            </li>
          </ul>
        </li>
      </ul>
      <h2>Non-Discrimination</h2>
      <p>
        We will not discriminate against you for exercising any of your CCPA rights. Unless permitted by the CCPA,
        we will not:
      </p>
      <ul>
        <li>
          Deny you goods or services.
        </li>
        <li>
          Charge you different prices or rates for goods or services, including through granting discounts or imposing
          penalties.
        </li>
        <li>
          Provide you a different level or quality of goods or services.
        </li>
        <li>
          Suggest that you may receive a different price or rate for goods or services or a different level of quality
          of goods or services.
        </li>
      </ul>
      <p>
        Any CCPA-permitted financial incentive we offer will reasonably relate to your value
        and contain written terms that describe the program’s material aspects.
      </p>
      <h2>Exercising Access, Data Portability, and Deletion Rights</h2>
      <p>
        To exercise the access, data portability, and deletion rights described above, please submit a verifiable
        consumer request to us by emailing us at <a href="mailto:blue@nqn.blue">blue@nqn.blue</a>
      </p>
      <p>
        Only you, or a person registered with the California Secretary of State that you authorize to act on your
        behalf, may make a verifiable consumer request related to your personal information. You may also make a
        verifiable consumer request on behalf of your minor child.
      </p>
      <p>
        You may only make a verifiable consumer request for access of data portability twice within a 12-month period.
        The verifiable consumer request must:
      </p>
      <ul>
        <li> Provide sufficient information that allows us to reasonably verify you are the
          person about whom we collected personal information or an authorized representative.
        </li>
        <li>
          Describe your request with sufficient detail that allows us to properly understand, evaluate, and respond to it.
        </li>
      </ul>
      <p>
        We cannot respond to your request or provide you with personal information if we cannot
        verify your identity or authority to make the request and confirm the personal information relates to
        you.
      </p>
      <p>
        Making a verifiable consumer request does not require you to create an
        account with us. We will only use personal information provided in a verifiable consumer request to verify the
        requestor’s identity or authority to make the request.
      </p>
      <h2>Information We Collect</h2>
      <p> Our websites, emails (with your consent, where required by law), and
        other products, services and platforms collect information that identifies, relates to, describes, references,
        is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular
        consumer or device (“personal information”). In particular, our websites, apps, emails, and other products,
        services and platforms may have collected the following categories of personal information from its consumers
        within the last twelve (12) months:
      </p>
      <table>
        <tr>
          <th>Category</th>
          <th>Collected</th>
        </tr>
        <tr>
          <td>A. Identifiers</td>
          <td>YES</td>
        </tr>
        <tr>
          <td> B. Personal information categories listed in the California Customer Records
            statute (Cal. Civ. Code § 1798.80(e))
          </td>
          <td>NO</td>
        </tr>
        <tr>
          <td>C. Protected classification characteristics under California or federal law</td>
          <td>NO</td>
        </tr>
        <tr>
          <td>D. Commercial information.</td>
          <td>YES</td>
        </tr>
        <tr>
          <td>E. Biometric information.</td>
          <td>NO</td>
        </tr>
        <tr>
          <td>F. Internet or other similar network activity.</td>
          <td>YES</td>
        </tr>
        <tr>
          <td>G. Geolocation data.</td>
          <td>YES</td>
        </tr>
        <tr>
          <td>H. Sensory data.</td>
          <td>NO</td>
        </tr>
        <tr>
          <td>I. Professional or employment-related information.</td>
          <td>NO</td>
        </tr>
        <tr>
          <td>J. Inferences drawn from other personal information.</td>
          <td>NO</td>
        </tr>
      </table>
      <p>Personal information does not include:</p>
      <ul>
        <li>Publicly available information from government records.</li>
        <li>Deidentified or aggregated consumer information.</li>
        <li> Information excluded from the CCPA’s scope, like: <ul>
          <li>
            health or medical information covered by the Health Insurance Portability and
            Accountability Act of 1996 (HIPAA) and the California Confidentiality of Medical Information Act (CMIA) or
            clinical trial data;
          </li>
          <li>
            personal information covered by certain sector-specific privacy laws, including
            the Fair Credit Reporting Act (FRCA), the Gramm-Leach-Bliley Act (GLBA) or California Financial
            Information Privacy Act (FIPA), and the Driver’s Privacy.
          </li>
        </ul>
        </li>
      </ul>
      <h2>Use of Personal Information</h2>
      <p>
        We may use or disclose the personal information we collect for one or more of the following business purposes:
      </p>
      <ul>
        <li>
          To fulfill or meet the reason you provided the information. For example, if you
          share your name and contact information to ask a question about our products or services, we will use that
          personal information to respond to your inquiry. If you provide your personal information to purchase a service,
          we or our third-party service providers will use that information to process your payment and facilitate
          delivery. We may also save your information to facilitate new product or service orders and requests.
        </li>
        <li>
          To provide you with support and to respond to your inquiries, including
          investigating and addressing your concerns and monitoring and improving our responses.
        </li>
        <li>
          To personalize your website experience and to deliver content and product and service offerings.
        </li>
        <li>
          For testing, research, analysis, and product development, including to develop and
          improve our websites, apps and other products, services and platforms.
        </li>
        <li>
          To respond to law enforcement requests and as required by applicable law, court order, or governmental
          regulations.
        </li>
        <li>
          As described to you when collecting your personal information or as otherwise set forth in the CCPA.
        </li>
        <li>
          To evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale
          or transfer of some or all of my assets, whether as a going concern or as part of bankruptcy, liquidation,
          or similar proceeding, in which personal information held by me about my users is among the assets
          transferred.
        </li>
      </ul>
      <p>
        I will not collect additional categories of personal information or use the personal information we collected
        for materially different, unrelated, or incompatible purposes without providing you notice.
      </p>
      <h2>Sharing Personal Information</h2>
      <p>
        I may disclose your personal information to a third-party for a business purpose.
        When we disclose personal information for a business purpose, we enter a contract that describes the purpose
        and requires the recipient to both keep that personal information confidential and not use it for any purpose
        except performing the contract. The CCPA prohibits third parties who purchase the personal information we hold
        from reselling it.
      </p>
      <p>
        We may share your personal information with the following categories of third parties:
      </p>
      <ul>
        <li>Subsidiaries and affiliates.</li>
        <li>Contractors and service providers.</li>
        <li>Data aggregators.</li>
      </ul>
      <h2>Disclosures of Personal Information for a Business Purpose</h2>
      <p>
        In the preceding twelve (12) months, I have disclosed the following categories of personal information for a
        business purpose:
      </p>
      <ul>
        <li>[Category A: Identifiers.]</li>
        <li>[Category B: California Customer Records personal information categories.]</li>
        <li>[Category F: Internet or other similar network activity.]</li>
        <li>[Category G: Geolocation Data.]</li>
      </ul>
    </div>
    <h2>Cookies</h2>
    <p>
      Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are
      sent to your browser from the websites that you visit and are stored on your device's internal memory. This
      Service uses these “cookies” explicitly to store authentication information. However, the app may use third
      party code and libraries that use “cookies” to collect information and improve their services. You have the
      option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you
      choose to refuse our cookies, you may not be able to use some portions of this Service.
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