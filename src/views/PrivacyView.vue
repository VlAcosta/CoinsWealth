<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'


export default {
  name: 'HomeView',
  components: {
    Header,
    Footer
  }
}
</script>

<template>
<div class="container">
    <Header/>
    <div class="container2">
        <div class="privacy-page-container row">
            <div class="privacy-header-container col-12 col-lg-12"><div class="privacy-page-name-container privacy-policy">PRIVACY POLICY</div></div>
            <div class="col-lg-3">
                <div class="privacy-sidebar-container">
                    <div class="privacy-sidebar-header">Table of contents</div>
                    <ul>
                        <li><a href="#general">General</a></li>
                        <li><a href="#infoWeCollect">Information We Collect</a></li>
                        <li><a href="#logData">Log Data</a></li>
                        <li><a href="#deviceData">Device Data</a></li>
                        <li><a href="#personalInfo">Personal Information</a></li>
                        <li><a href="#sensitiveInfo">Sensitive Information</a></li>
                        <li><a href="#legReasonsForProcessing">Legitimate Reasons for Processing Your Personal Information</a></li>
                        <li><a href="#collectionAndUse">Collection and Use of Information</a></li>
                        <li><a href="#securityOfPerInfo">Security of Your Personal Information</a></li>
                        <li><a href="#howLongWeKeep">How Long We Keep Your Personal Information</a></li>
                        <li><a href="#childrenPrivacy">Children's Privacy</a></li>
                        <li><a href="#sharingPerInfo">Sharing of Personal Information</a></li>
                        <li><a href="#intTransfersPerInfo">International Transfers of Personal Information</a></li>
                        <li><a href="#yourRightsContrPerInfo">Your Rights and Controlling Your Personal Information</a></li>
                        <li><a href="#useOfCookies">Use of Cookies</a></li><li><a href="#businessTransfers">Business Transfers</a></li>
                        <li><a href="#limitsOfOurPolicy">Limits of Our Policy</a></li>
                        <li><a href="#changesToPolicy">Changes to This Policy</a></li>
                        <li><a href="#addDiscForGDPR">Additional Disclosures for General Data Protection Regulation (GDPR) Compliance (EU)</a></li>
                        <li><a href="#dataController">Data Controller / Data Processor</a></li>
                        <li><a href="#legalBasesForProcessing">Legal Bases for Processing Your Personal Information</a></li>
                        <li><a href="#consent">Consent</a></li>
                        <li><a href="#performanceOfContract">Performance of a Contract or Transaction</a></li>
                        <li><a href="#ourLegitimateInterests">Our Legitimate Interests</a></li>
                        <li><a href="#complianceWithLaw">Compliance with Law</a></li>
                        <li><a href="#intTransfersOutsideEEA">International Transfers Outside of the European Economic Area (EEA)</a></li>
                        <li><a href="#yourRightsControllingYourPerInfo">Your Rights and Controlling Your Personal Information</a></li>
                        <li><a href="#doNotTrack">Do Not Track</a></li>
                        <li><a href="#contactUs">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div class="privacy-content-container col-12 col-lg-8">
                <div id="general" class="privacy-info-block">
                    <p>Protecting our customers' privacy is of utmost importance to us.</p>
                    <p>This Privacy Policy outlines the collection and processing of your personal information when you interact with our website (https://limercoin.com/) and other websites that we own and operate (collectively referred to as "website").</p>
                    <p>It is applicable to all activities involving the processing of personal information conducted by us. Even if you are not directly using our services but are accessing our website, this Privacy Policy also applies to you.</p>
                    <p>Please note that our website may contain links to third-party sites and services. It's important to be aware that those sites and services have their own privacy policies. Once you click on a link to access third-party content, we recommend reviewing their privacy policy to understand how they collect and utilize personal information. Our Privacy Policy does not extend to any activities that occur after you leave our site.</p>
                    <p>Last updated: July 1, 2023.</p>
                </div>
                <div class="privacy-info-block">
                    <div id="infoWeCollect" class="header-text-block">Information We Collect</div>
                    <div>
                        <p>Information we collect falls into one of two categories: "voluntarily provided" information and "automatically collected" information.</p>
                        <p>"Voluntarily provided" information includes any data that you knowingly and actively provide us when using or engaging in our services and promotions.</p>
                        <p>"Automatically collected" information refers to any data that is automatically transmitted by your devices while accessing our products and/or services.</p>
                    </div>
                </div> 
                <div class="privacy-info-block">
                    <div id="logData" class="header-text-block">Log Data</div>
                    <div
                        ><p>When you visit our website, your web browser automatically provides certain standard data, which is then logged by our servers. This data may include your device's Internet Protocol (IP) address, browser type and version, the pages you visit, the time and date of your visit, the duration spent on each page, and other relevant details about your visit.</p>
                        <p>Furthermore, if you come across any errors while using the site, we may automatically gather data regarding the error and the circumstances surrounding its occurrence. This data may encompass technical information about your device, the specific action you were attempting when the error happened, and other technical details related to the issue. Please note that you may or may not receive immediate notice of such errors, their occurrence, or the nature of the error.</p>
                        <p>It is important to be aware that although this information may not personally identify you on its own, it could potentially be combined with other data to personally identify individuals.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="deviceData" class="header-text-block">Device Data</div>
                    <div>
                        <p>When you visit our website or engage with our services, we may automatically collect certain data about your device, which can include:</p>
                        <ul>
                            <li>Device Type</li>
                            <li>Operating System</li>
                            <li>Geo-location data</li>
                        </ul>
                        <p>The specific data we collect may vary depending on the individual settings of your device and software. To understand what information is made available to us, we recommend referring to the policies provided by your device manufacturer or software provider.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="personalInfo" class="header-text-block">Personal Information</div>
                    <div>
                        <p>We may request personal information from you in specific instances, such as when you subscribe to our newsletter or when you contact us. This personal information may include one or more of the following:</p>
                        <ul>
                            <li>Name</li>
                            <li>Email address</li>
                            <li>IP address</li>
                            <li>Any other information voluntarily provided by you during the interaction.</li>
                        </ul>
                        <p>Please note that the collection of personal information will be conducted in accordance with applicable laws and regulations, and we will only request information that is necessary for the specific purpose stated at the time of collection.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="sensitiveInfo" class="header-text-block">Sensitive Information</div>
                    <div>
                        <p>We recognize that certain types of personal information require a higher level of protection and are categorized as "sensitive information" or "special categories of data." Examples of sensitive information include details regarding your racial or ethnic origin, political opinions, religious beliefs, trade union affiliations, philosophical beliefs, sexual orientation, sexual practices or sex life, criminal records, health information, or biometric data.</p>
                        <p>We will not collect sensitive information about you without obtaining your explicit consent, unless otherwise permitted, required, or authorized by applicable laws. Furthermore, we will only use or disclose your sensitive information in accordance with the provisions of the law that governs its protection.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="legReasonsForProcessing" class="header-text-block">Legitimate Reasons for Processing Your Personal Information</div>
                    <div>
                        <p>We understand the importance of processing personal information only when there is a legitimate reason to do so. We ensure that we collect and use your personal information in accordance with such legitimate reasons. In instances where we require your personal information, we will only collect the data that is reasonably necessary to provide our services to you.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="collectionAndUse" class="header-text-block">Collection and Use of Information</div>
                    <div>
                        <p>The collection and use of information on our website may occur in the following situations:</p>
                        <ul>
                            <li>Registering for an account</li>
                            <li>Subscribing to receive updates via email or social media channels</li>
                            <li>Accessing our website through a mobile device or web browser</li>
                            <li>Contacting us through email, social media, or similar technologies</li>
                            <li>Mentioning us on social media platforms</li>
                        </ul>
                        <p>We may collect, store, use, and disclose personal information for the following purposes, ensuring that the processing remains compatible with these stated purposes:</p>
                        <ul>
                            <li>Providing you with core features and services of our platform</li>
                            <li>Allowing you to personalize and customize your website experience</li>
                            <li>Delivering products and/or services to you</li>
                            <li>Contacting and communicating with you</li>
                            <li>Conducting analytics, market research, and business development activities to enhance our website, applications, and social media platforms</li>
                            <li>Advertising and marketing, including sending promotional information about our products and services, as well as information about third-party offerings that may be of interest to you</li>
                            <li>Enabling your access and usage of our website, applications, and social media platforms</li>
                            <li>Complying with legal obligations and resolving any disputes</li>
                            <li>Ensuring the security, fraud prevention, and proper usage of our sites and applications in accordance with our terms and conditions of use</li>
                            <li>Conducting technical assessments to improve the functionality of our app, associated applications, and social media platforms</li>
                        </ul>
                        <p>Furthermore, we may combine voluntarily provided and automatically collected personal information with general information or research data obtained from other trusted sources.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="securityOfPerInfo" class="header-text-block">Security of Your Personal Information</div>
                    <div>
                        <p>We implement necessary security measures to safeguard personal information from loss, misuse, unauthorized access, alteration, disclosure, or destruction. We have put in place measures to ensure the continuous confidentiality, integrity, and availability of the systems and services that handle personal information.</p>
                        <p>While we strive to ensure the utmost protection of the personal information you provide, it is important to note that no method of electronic transmission or storage is completely secure, and absolute data security cannot be guaranteed by anyone.</p>
                        <p>You bear the responsibility of selecting a strong password and ensuring the overall security of your own information within the scope of our services.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="howLongWeKeep" class="header-text-block">How Long We Keep Your Personal Information</div>
                    <div>
                        <p>We will keep your personal information for the duration of our service provision to you and as long as it is necessary to address any concerns, questions, complaints, or requests you have made. The length of time we retain your information will be determined by factors such as the nature of our interactions, legal obligations, and the need to maintain records for purposes such as investigations or legal proceedings.</p>
                        <p>In some cases, we may be required to retain data for an extended period if there is a legal obligation or a necessity to maintain records for purposes such as legal, financial, compliance, or reporting requirements.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="childrenPrivacy" class="header-text-block">Children's Privacy</div>
                    <div>
                        <p>Our services are designed for individuals who are 18 years of age or older. We do not knowingly collect personal information from individuals under the age of 18.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="sharingPerInfo" class="header-text-block">Sharing of Personal Information</div>
                    <div>
                        <p>We may disclose your personal information to the following entities:</p>
                        <ul>
                            <li>Parent, subsidiary, or affiliate companies within our corporate structure.</li>
                            <li>Third-party service providers who assist us in delivering our services. These may include IT service providers, data storage, hosting and server providers, analytics providers, error loggers, debt collectors, maintenance or problem-solving providers, marketing providers, professional advisors, and payment systems operators.</li>
                            <li>Our employees, contractors, and related entities who need access to the information to fulfill their responsibilities.</li>
                            <li>Existing or potential agents or business partners who collaborate with us in providing services to you.</li>
                            <li>Credit reporting agencies, courts, tribunals, and regulatory authorities if you fail to pay for goods or services we have provided.</li>
                            <li>Courts, tribunals, regulatory authorities, and law enforcement officers as required by law or in connection with legal proceedings or to protect our legal rights.</li>
                            <li>Third parties, including agents or sub-contractors, who assist us in delivering information, products, services, or direct marketing to you.</li>
                            <li>Third parties engaged in data collection and processing activities.</li>
                            <li>An entity that acquires or merges with our company, or to which we transfer all or substantially all of our assets and business.</li>
                        </ul>
                        <p>Please note that we currently utilize Google Analytics as one of our third-party service providers, but this list is not exhaustive.</p>
                        <p>Additionally, we may make certain data related to your Limercoin account publicly available. This may include leaderboard information, your online username or game ID, your mining power capacity, the number of games played, and the number of miners and racks. By accessing Limercoin, you provide your consent to the publication of this data on the publicly available leaderboard and on publicly available profile page on Limercoin website.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="intTransfersPerInfo" class="header-text-block">International Transfers of Personal Information</div>
                    <div>
                        <p>The personal information we collect may be stored and/or processed in the United Kingdom or other countries where we or our partners, affiliates, and third-party providers have facilities.</p>
                        <p>Please be aware that the countries where we store, process, or transfer your personal information may not have the same data protection laws as the country in which you initially provided the information. However, when we transfer your personal information to third parties in other countries, we will ensure that: (i) The transfers comply with the requirements of applicable law; and (ii) We protect your transferred personal information in accordance with the provisions outlined in this privacy policy.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="yourRightsContrPerInfo" class="header-text-block">Your Rights and Controlling Your Personal Information</div>
                    <div>
                        <p>Your choice: By providing us with your personal information, you acknowledge and understand that we will collect, store, use, and disclose your personal information in accordance with this privacy policy. While providing personal information is optional, please note that not providing it may affect your ability to fully utilize our website and the products and/or services offered through it.</p>
                        <p>Information from third parties: If we receive personal information about you from a third party, we will protect it as outlined in this privacy policy. If you are providing personal information about someone else, you confirm that you have obtained their consent to provide their personal information to us.</p>
                        <p>Marketing preferences: If you previously agreed to receive direct marketing communications from us and have changed your mind, you can opt-out at any time by contacting us using the details provided below.</p>
                        <p>Access: You have the right to request details of the personal information we hold about you.</p>
                        <p>Correction: If you believe that any of the personal information we hold about you is inaccurate, outdated, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy. We will take reasonable steps to correct any such information that is found to be inaccurate, incomplete, misleading, or outdated.</p>
                        <p>Non-discrimination: We will not discriminate against you for exercising your rights regarding your personal information. Unless your personal information is necessary to provide you with a specific service or offer, we will not deny you goods or services, charge you different prices or rates, impose penalties, provide different levels or quality of goods or services, or withhold discounts or benefits.</p>
                        <p>Data breach notifications: In the event of a data breach, we will comply with applicable laws regarding notification requirements.</p>
                        <p>Complaints: If you believe that we have violated applicable data protection laws and wish to file a complaint, please contact us using the details provided below and provide us with comprehensive information about the alleged breach. We will promptly investigate your complaint and respond to you in writing, outlining the outcome of our investigation and the steps we will take to address your concerns. You also have the right to contact a regulatory body or data protection authority to lodge a complaint.</p>
                        <p>Unsubscribe: To unsubscribe from our email list or opt-out of communications, including marketing communications, please contact us using the details provided in this privacy policy or use the opt-out options provided in the communication itself. We may need to verify your identity and request specific information to process your request effectively.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="useOfCookies" class="header-text-block">Use of Cookies</div>
                    <div>
                        <p>In order to enhance your browsing experience and gather insights into your interactions on our website, we utilize "cookies". These are small data files that are stored on your computer and accessed each time you visit our site. By using cookies, we can analyze your preferences and tailor the content we provide to you accordingly. Rest assured that the information collected through cookies is used solely for improving your user experience and delivering personalized content.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="businessTransfers" class="header-text-block">Business Transfers</div>
                    <div>
                        <p>In the event of our acquisition, bankruptcy, or cessation of business operations, it is possible that our data, including your personal information, may be transferred to acquiring parties. You acknowledge and agree that such transfers may take place, and any acquiring parties will be required to abide by this policy and utilize your personal information in accordance with its provisions, to the extent permitted by applicable law. This ensures the continuity of the rights and obligations associated with your personal information as outlined in this policy, even under new ownership or usage arrangements.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="limitsOfOurPolicy" class="header-text-block">Limits of Our Policy</div>
                    <div>
                        <p>While our website may provide links to external sites, it's important to note that we have no control over the content and policies of those sites. Therefore, we cannot assume responsibility or liability for their privacy practices. We recommend that you review the privacy policies of any external sites you visit to ensure your personal information is protected according to your preferences.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="changesToPolicy" class="header-text-block">Changes to This Policy</div>
                    <div>
                        <p>We reserve the right to modify this privacy policy at our discretion to align with evolving business processes, industry best practices, or changes in laws and regulations. Any updates or modifications to this policy will be posted on the same link through which you accessed this privacy policy. We encourage you to regularly review our websites to stay informed about any recent changes.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="addDiscForGDPR" class="header-text-block">Additional Disclosures for General Data Protection Regulation (GDPR) Compliance (EU)</div>
                </div>
                <div class="privacy-info-block">
                    <div id="dataController" class="header-text-block">Data Controller / Data Processor</div>
                    <div>
                        <p>Under the General Data Protection Regulation (GDPR), organizations are classified as either "data controllers" or "data processors." Data controllers are organizations that process personal information for their own purposes, while data processors are organizations that process personal information on behalf of others.</p>
                        <p>LIMERCOIN acts as both a data controller and a data processor in relation to the personal information you provide to us. This means that we may process your personal information for our own purposes as well as on behalf of other organizations, as required. We are committed to ensuring that all processing of personal information is conducted in compliance with the GDPR and other applicable data protection laws.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="legalBasesForProcessing" class="header-text-block">Legal Bases for Processing Your Personal Information</div>
                    <div>
                        <p>We adhere to legal principles and bases when collecting and using your personal information. We ensure that the collection and use of your personal information is done lawfully, fairly, and transparently. If we require your consent to process your personal information and you are under the age of 16, we will seek consent from your parent or legal guardian for that specific purpose.</p>
                        <p>The specific legal bases for collecting and using your personal information depend on the services you use and how you interact with them. We only collect and use your information on the following grounds:</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="consent" class="header-text-block">Consent</div>
                    <div>
                        <p>When you provide us with your consent to collect and use your personal information for a specific purpose. You have the right to withdraw your consent at any time using the provided facilities. However, any processing that has already occurred before the withdrawal will remain valid. For example, you may consent to receiving marketing emails from us by providing your email address. While you can unsubscribe from these emails, any emails already sent cannot be recalled. If you have any questions regarding withdrawing your consent, please contact us using the details provided in the "Contact Us" section of this privacy policy.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="performanceOfContract" class="header-text-block">Performance of a Contract or Transaction</div>
                    <div>
                        <p>When it is necessary to collect and use your personal information to fulfill a contract or transaction you have entered into with us, or for preliminary steps leading to such a contract or transaction. For instance, if you reach out to us with an inquiry, we may need your name and contact details to respond to you.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="ourLegitimateInterests" class="header-text-block">Our Legitimate Interests</div>
                    <div>
                        <p>When we determine that it is necessary to process your personal information for our legitimate interests, provided that such processing does not override your rights and interests. Our legitimate interests include conducting research and development, understanding our audience, marketing and promoting our services, operating our services efficiently, conducting marketing analysis, and protecting our legal rights and interests.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="complianceWithLaw" class="header-text-block">Compliance with Law</div>
                    <div>
                        <p>In certain situations, we may have a legal obligation to use or retain your personal information. These situations may involve court orders, criminal investigations, government requests, and regulatory obligations. If you have any questions regarding how we retain personal information to comply with the law, please contact us using the details provided in the "Contact Us" section of this privacy policy.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="intTransfersOutsideEEA" class="header-text-block">International Transfers Outside of the European Economic Area (EEA)</div>
                    <div>
                        <p>When we transfer personal information from countries within the European Economic Area (EEA) to countries outside the EEA, we will take necessary measures to ensure that your personal information is adequately protected. We will implement appropriate safeguards, such as using standard data protection clauses approved by the European Commission, binding corporate rules, or other legally accepted mechanisms, to protect the privacy and security of your personal information during the transfer. These safeguards are in place to ensure that the level of protection for your personal information is equivalent to the protection provided within the EEA.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="yourRightsControllingYourPerInfo" class="header-text-block">Your Rights and Controlling Your Personal Information</div>
                    <div>
                        <p>Restrict: You have the right to request that we restrict the processing of your personal information if (i) you are concerned about the accuracy of your personal information; (ii) you believe your personal information has been unlawfully processed; (iii) you need us to maintain the personal information solely for the purpose of a legal claim; or (iv) we are in the process of considering your objection in relation to processing on the basis of legitimate interests.</p>
                        <p>Right to access: You have the right to obtain confirmation that your personal information is processed and to obtain a copy of it as well as certain information related to its processing.</p>
                        <p>Right to object: You can object, for reasons relating to your particular situation, to the processing of your Personal Data. For instance, where we process your data for direct marketing purposes.</p>
                        <p>Right to delete: You can, in some cases, have your Personal Data deleted.</p>
                        <p>Right to restrict processing: In specific cases, you have the right to temporarily restrict the processing of your personal information. However, we may continue processing your personal information if it is necessary for legal defense or falls within other exceptions permitted by applicable law.</p>
                        <p>Right to portability: You can request to receive your personal information, which you have provided to us, in a structured, commonly used, and machine-readable format. If feasible, we can also transfer your personal information to another Data Controller upon your request.</p>
                        <p>Right to withdraw your consent: For processing requiring your consent, you have the right to withdraw your consent at any time.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="doNotTrack" class="header-text-block">Do Not Track</div>
                    <div>
                        <p>Certain web browsers offer a "Do Not Track" feature that allows you to express your preference not to be tracked during your online activities. However, please note that our website does not currently respond to "Do Not Track" signals from your browser. Nevertheless, we uphold the principles outlined in this privacy policy, ensuring that we collect and process personal information in a lawful, fair, transparent, and legitimate manner based on valid legal grounds.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="contactUs" class="header-text-block">Contact Us</div>
                    <div>
                        <p>If you have any questions or concerns about your privacy or the handling of your personal information, please feel free to contact us using the following details:</p>
                        <p><a href="mailto: support@limercoin.com">support@limercoin.com</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
</div> 
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap');


* {
  font-family: 'Poppins', sans-serif;
  color: rgb(255, 255, 255);
}





@media screen and (min-width: 993px) {  
.privacy-page-container .privacy-header-container .privacy-page-name-container.privacy-policy {
    margin-left: 80px;
    margin-right: 40px;
    font-size: 36px;
    letter-spacing: 3.6px;
    font-weight: 600;
  }
}


@media screen and (max-width: 992px) {
    Header{
        padding: 0 0 24px 0;
    }
    .col-lg-3 {
        display: none;
    }
    .privacy-content-container{
        padding: 0 12.5%;
    }
    .privacy-page-container .privacy-header-container .privacy-page-name-container.privacy-policy{
        margin-right: 0;
        margin-left: 0;
        font-size: 24px;
        padding: 0 12%;
    }
}

@media screen and (max-width: 570px){
    .privacy-content-container{
        padding: 0 9px;
    }
    .privacy-page-container .privacy-header-container .privacy-page-name-container.privacy-policy{
        padding: 0;
    }
}

.privacy-page-container .privacy-header-container .privacy-page-name-container.privacy-policy {
    font-weight: 600;
  }

.container{
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.container2{
    max-width: 1020px;
    margin-left: 50%;
    margin-right: -50%;
    transform: translateX(-50%);
}


.privacy-page-container .privacy-sidebar-container {
  display: flex;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  flex-direction: column;
  padding: 12px;
  border-radius: 2px;
  background: rgb(34, 36, 50);
}

.privacy-page-container .privacy-sidebar-container .privacy-sidebar-header {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: rgb(255, 255, 255);
  font-size: 16px;
  line-height: 18px;
  margin-bottom: 16px;
}

.privacy-page-container .privacy-sidebar-container ul li a {
  color: rgb(255, 255, 255) !important;
  text-decoration: none;
  font-size: 12px;
}

.privacy-page-container .privacy-content-container .privacy-info-block {
    word-break: normal;
    padding: 4px;
    margin-bottom: 8px;
    color: rgb(255, 255, 255);
    font-size: 12px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    line-height: 20px;
}

dl, ol, ul {
  margin-top: 0px;
}

.privacy-page-container .privacy-content-container .privacy-info-block .header-text-block {
  width: 100%;
  margin-bottom: 4px;
  color: rgb(248, 248, 248);
  font-size: 16px;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  text-transform: uppercase;
}



</style>