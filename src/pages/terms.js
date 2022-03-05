import React from 'react';
import {Container} from "semantic-ui-react";

import '../semantic/src/definitions/elements/container.less';
import '../semantic/src/definitions/collections/table.less';


import "./policy.css";
import {Helmet} from "react-helmet";


export default () => (
  <Container>
    <Helmet>
      <title>Terms and Conditions</title>
      <meta content="Privacy policy for bot and website" property="og:title"/>

      <meta content="TLDR: we run ads on the website but don't sell your Discord data" property="og:description"/>
      <meta content="TLDR: we run ads on the website but don't sell your Discord data" name="description"/>
    </Helmet>
    <h1>
      Terms and Conditions
    </h1>
    <p>Last updated: March 04, 2022</p>
    <p>
      Please read these terms and conditions carefully before using Our Service.
    </p>
    <Terms/>
  </Container>
);


const Terms = () => (
  <div>
    <h1>Interpretation and Definitions</h1>
    <h2>Interpretation</h2>
    <p>
      The words of which the initial letter is capitalized have meanings defined under the following conditions.
      The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
    </p>
    <h2>Definitions</h2>
    <p>For the purposes of these Terms and Conditions:</p>
    <ul>
      <li>
        <p><strong>Application</strong> means the software program provided by the Company used by You on any electronic device, named Not Quite Nitro Bot</p>
      </li>
      <li>
        <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Not Quite Nitro Bot.</p>
      </li>
      <li>
        <p><strong>Service</strong> refers to the Application.</p>
      </li>
      <li>
        <p><strong>Terms and Conditions</strong> (also referred as &quot;Terms&quot;)
          mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.
          This Terms and Conditions agreement has been created with the help of the <a href="https://www.termsfeed.com/terms-conditions-generator/" target="_blank" rel="noopener noreferrer">Terms and Conditions Generator</a>.
        </p>
      </li>

      <li>
        <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
      </li>
    </ul>

    <h1>Acknowledgment</h1>
    <p>
      These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company.
      These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
    </p>
    <p>
      Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions.
      These Terms and Conditions apply to all visitors, users and others who access or use the Service.
    </p>
    <p>
      By accessing or using the Service You agree to be bound by these Terms and Conditions.
      If You disagree with any part of these Terms and Conditions then You may not access the Service.
    </p>
    <p>
      You represent that you are over the age of 13.
      The Company does not permit those under 13 to use the Service.
    </p>
    <p>
      Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company.
      Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You.
      Please read Our Privacy Policy carefully before using Our Service.
    </p>

    <h1>Links to Other Websites</h1>
    <p>
      Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.
    </p>
    <p>
      The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
      You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.
    </p>
    <p>
      We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.
    </p>

    <h1>Termination</h1>
    <p>
      We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
    </p>
    <p>
      Upon termination, Your right to use the Service will cease immediately.
    </p>

    <h1>Limitation of Liability</h1>
    <p>
      Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid.
    </p>
    <p>
      To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
    </p>
    <p>
      Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply.
      In these states, each party's liability will be limited to the greatest extent permitted by law.
    </p>

    <h1>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</h1>
    <p>
      The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind.
      To the maximum extent permitted under applicable law, the Company, on its own behalf and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice.
      Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.
    </p>
    <p>
      Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied:
      (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon;
      (ii) that the Service will be uninterrupted or error-free;
      (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or
      (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
    </p>
    <p>
      Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You.
      But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.
    </p>

    <h1>Governing Law</h1>
    <p>
      The laws of the United Kingdom, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service.
      Your use of the Application may also be subject to other local, state, national, or international laws.
    </p>

    <h1>Disputes Resolution</h1>
    <p>
      If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
    </p>

    <h1>For European Union (EU) Users</h1>
    <p>
      If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.
    </p>

    <h1>Severability and Waiver</h1>
    <h2>Severability</h2>
    <p>
      If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
    </p>

    <h2>Waiver</h2>
    <p>
      Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.
    </p>

    <h1>Translation Interpretation</h1>
    <p>
      These Terms and Conditions may have been translated if We have made them available to You on our Service.
      You agree that the original English text shall prevail in the case of a dispute.</p>
    <h1>Changes to These Terms and Conditions</h1>
    <p>
      We reserve the right, at Our sole discretion, to modify or replace these Terms at any time.
      If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect.
      What constitutes a material change will be determined at Our sole discretion.
    </p>
    <p>
      By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms.
      If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.
    </p>

    <h1>Contact Us</h1>
    If you have any questions or suggestions about my Terms and Conditions, do not hesitate to contact me
    at <a href="mailto:blue@nqn.blue">blue@nqn.blue</a>. I am also available in the Not Quite Nitro Discord server
    at <a href="https://discord.gg/e6pQupV">https://discord.gg/e6pQupV</a>
  </div>
);
