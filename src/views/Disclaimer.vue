<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'


export default {
  name: 'HomeView',
  components: {
    Header,
    Footer
  },
  beforeRouteEnter(to, from, next) {
    // Используем функцию next с колбэком, который будет вызван после загрузки компонента
    next((vm) => {
      // Используем метод scrollTo для установки координат прокрутки страницы
      vm.$nextTick(() => {
        window.scrollTo(0, 0);
      });
    });
  },
}
</script>

<template>
<div class="container-pri">
    <Header/>
    <div class="container2">
        <div class="privacy-page-container row">
            <div class="privacy-header-container col-12 col-lg-12"><div class="privacy-page-name-container privacy-policy">DISCLAIMER AND USER WARRANTIES</div></div>
            <div class="col-lg-3">
                <div class="privacy-sidebar-container">
                    <div class="privacy-sidebar-header">Table of contents</div>
                    <ul>
                        <li><a href="#general">General</a></li>
                        <li><a href="#infoWeCollect">You Undertake to Conduct Your Own Research</a></li>
                        <li><a href="#logData">Does Not Offer Investment Advice or Brokering Services</a></li>
                        <li><a href="#deviceData">Does Not Offer Tax Advice or Legal Advice</a></li>
                        <li><a href="#personalInfo">User Warranties</a></li>
                        <li><a href="#sensitiveInfo">Liability</a></li>
                        <li><a href="#legReasonsForProcessing">Awareness of Risks</a></li>
                    </ul>
                </div>
            </div>
            <div class="privacy-content-container col-12 col-lg-8">
                <div id="general" class="privacy-info-block">
                    <p>By accessing and using www.limercoin.com, you acknowledge that you have read, understood, and unconditionally agreed to be bound by the Terms and Conditions of Use and Privacy Policy. Furthermore, you affirm that you understand and accept the Disclaimer provided by Limercoin.com, and you declare that the warranties you make while using the website are truthful and accurate.</p>
                    <p>Limercoin.com does not provide investment, financial, or legal advice. The information and content presented on this website are for informational purposes only and should not be considered a substitute for professional advice or independent verification. To use this website, you must agree to the terms and conditions, disclaimers, and warranties mentioned below.</p>
                    <p>Limercoin.com, including its owners, officers, employees, directors, and agents, is not affiliated with, endorsed by, or sponsored by any of the token sales mentioned on the website. In cases where Limercoin.com advertises specific token sales, it may receive a fee, and such listings will be clearly designated.</p>
                    <p>Note that www.limercoin.com does not recommend or provide advice on any token sales. It is your responsibility to conduct your own research and make informed decisions.</p>
                    <p>By continuing to use the website, you acknowledge and accept the above-mentioned disclaimers and offer the warranties as stated.</p>
                </div>
                <div class="privacy-info-block">
                    <div id="infoWeCollect" class="header-text-block">YOU UNDERTAKE TO CONDUCT YOUR OWN RESEARCH</div>
                    <div>
                        <p>Token sales, as well as buying, selling, or holding tokens, come with inherent risks and should be approached with caution. It is crucial to seek advice from qualified financial professionals before making any decisions.</p>
                        <p>The content provided on Limercoin.com is intended for informational purposes only. It is essential to conduct thorough research and analysis based on your individual circumstances before making any investments. You should independently verify and validate any information found on Limercoin.com that you intend to rely on, whether for investment decisions or other purposes, or consult with a professional financial advisor.</p>
                        <p>Additionally, it is important to be aware of the potential risks associated with token sales and digital tokens. Since these operations often take place online and may not be regulated, there is a higher risk of fraud, limited liquidity, and volatile and opaque pricing. Before making any purchases, you should fully understand the features of the products or business projects you plan to support and carefully consider the risks versus potential returns.</p>
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
                    <div id="deviceData" class="header-text-block">DOES NOT OFFER INVESTMENT ADVICE OR BROKERING SERVICES</div>
                    <div>
                        <p>Limercoin.com does not provide investment advice or brokerage services, and the information posted on the website does not take into account your personal circumstances. Limercoin.com is not involved in activities that require registration as an investment advisor. The content on the website should not be interpreted as a recommendation to engage in securities transactions or investments, nor does it imply an endorsement, recommendation, or rating of any project or investment. We do not offer personalized recommendations or opinions regarding the suitability of a project or investment for your specific financial needs.</p>
                  </div>
                </div>
                <div class="privacy-info-block">
                    <div id="personalInfo" class="header-text-block">DOES NOT OFFER TAX ADVICE OR LEGAL ADVICE</div>
                    <div>
                        <p>Limercoin.com does not provide accounting services or advice, and we are not qualified accountants or lawyers. The content on the website should not be interpreted as legal or tax advice. It is strongly recommended that you consult with a licensed professional for independent advice in these areas.</p>
                   </div>
                </div>
                <div class="privacy-info-block">
                    <div id="sensitiveInfo" class="header-text-block">USER WARRANTIES</div>
                    <div>
                        <p>By using Limercoin.com, you warrant that you will take all necessary measures, exercise due diligence, and act in good faith to prevent any involvement in money laundering or other illegal activities. You further warrant that no funds obtained through money laundering activities will be used to purchase any internal tokens such as LMT or any other tokens listed on Limercoin.com. It is your responsibility to ensure compliance with all relevant anti-money laundering regulations at all times.</p>
                        <p>Additionally, you warrant that you will not engage in any actions, directly or indirectly, that involve offering anything of value to government officials, employees of government-controlled companies, political parties, or any other private individuals or entities acting on behalf of a government, with the intention of obtaining improper benefits or advantages. Furthermore, you warrant that no compensation or payments received by you, whether as remuneration or otherwise, have been or will be used for bribes or kickbacks that would violate applicable laws.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="legReasonsForProcessing" class="header-text-block">LIABILITY</div>
                    <div>
                        <p>Limercoin.com provides information for informational and educational purposes only. The information, including data about token sales and our internal game information, is not intended to guarantee profits or prevent losses. It is your responsibility to exercise your own judgment and seek professional advice if needed before making any investment decisions or relying on the information provided.</p>
                        <p>Please note that the information provided by Limercoin.com, including any linked content, is not intended to be professional, legal, tax, investment, or financial advice. We do not offer advice on the nature, potential value, suitability, or specific coin or token sales.</p>
                        <p>Therefore, you should not interpret any information displayed, published, or provided by Limercoin as advice in any of these areas.</p>
                        <p>Furthermore, nothing on the Limercoin.com website should be considered a solicitation to buy, sell, or hold coins (tokens). Any decisions related to buying, selling, or holding coins should be made based on your own research, analysis, and consultation with professionals. Limercoin.com will not be liable for any damages, expenses, or losses arising from the information provided or any reliance placed upon it. It is advisable to verify any information before making any investment decisions or relying on it for other purposes.</p>
                    </div>
                </div>
                <div class="privacy-info-block">
                    <div id="collectionAndUse" class="header-text-block">AWARENESS OF RISKS</div>
                    <div>
                        <p>It is important for you to assess whether the Information is suitable for your financial situation and risk tolerance.</p>
                        
                        <p>Note that all information, data, white papers, and other materials related to a specific token sale are prepared by the organizer of that sale. The organizer is solely responsible for the accuracy of the statements made in those materials. There is no guarantee that the information provided in these materials is true, accurate, or precise.</p>
                        <p>YOU ALONE ASSUME SOLE RESPONSIBILITY FOR ANY DECISIONS YOU MAKE BASED ON THE INFORMATION AND/OR THE USE OF LIMERCOIN.COM.</p>
                        <p>ALL INFORMATION IS PROVIDED “AS IS” WITHOUT WARRANTY OF ANY KIND. LIMERCOIN.COM MAKES NO REPRESENTATIONS AND DISCLAIM ALL EXPRESS, IMPLIED, AND STATUTORY WARRANTIES OF ANY KIND TO USER AND/OR ANY THIRD PARTY, INCLUDING WARRANTIES AS TO ACCURACY, TIMELINESS, COMPLETENESS, MERCHANTABILITY, OR FITNESS FOR ANY PARTICULAR PURPOSE.</p>
                        <p>UNDER NO CIRCUMSTANCES SHALL LIMERCOIN.COM BE LIABLE FOR ANY LOSS OR DAMAGE YOU OR ANYONE ELSE INCURS AS A RESULT OF ANY ACTIVITY THAT YOU OR ANYONE ELSE ENGAGES IN BASED ON ANY INFORMATION YOU RECEIVE THROUGH LIMERCOIN.COM OR AS A RESULT OF THE USE OF LIMERCOIN.COM.</p>
                        <p>By purchasing internal tokens (such as LMT or others) or investing in cryptocurrency token projects, you acknowledge and warrant that you understand the inherent risks and speculative nature of these activities. These tokens are highly risky and speculative, with no government protection, potential for fraud, dramatic price volatility, and experimental software and business models.</p>
                        <p>It is important to note that you should only engage in purchasing internal virtual tokens or investing in cryptocurrency token projects if you possess substantial technical knowledge and have a clear understanding of the specific offering. It is crucial to conduct thorough due diligence on the projects, network, tokens, and team associated with any token sale.</p>
                        <p>Furthermore, you must recognize that the investments made, both by yourself and others, may not yield a usable or valuable token, and there is a possibility of losing the entire value of your investment.</p>
                        <p>The token sales discussed on the www.limercoin.com website have not been reviewed by any regulatory authority.</p>
                        <p>The regulatory authorities have not confirmed the accuracy or determined the adequacy of the token sales offering documents. Any representation to the contrary is a criminal offense.</p>
                        <p>Tokens may constitute securities pursuant to applicable security laws.</p>
                        <p>Tokens may not be suitable for or offered to investors residing in the United States. The Securities and Exchange Commission (SEC) has cautioned investors residing in the United States that token sales may qualify as securities, and by investing in tokens, these investors may be participating in unregistered securities offerings. In the event of fraud or theft, US investors who invest in tokens may have limited or no recourse to recover any losses incurred.</p>
                        <p>Limercoin.com not providing services and not accept gamers from List of Comprehensively Sanctioned Countries</p>
                        <ul>
                            <li>Cuba</li>
                            <li>Iran</li>
                            <li>Syria</li>
                            <li>Russian Federation</li>
                            <li>Belarus</li>
                            <li>The following regions of Ukraine: Crimea, Donetsk, Luhansk</li>
                            <li>Northern Cyprus</li>
                            <li>Myanmar (Burma)</li>
                            <li>North Korea</li>
                            <li>Central African Republic</li>
                        </ul>
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

.container-pri{
    min-width: 99vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.container2{
    max-width: 1100px;
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