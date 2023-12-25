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
    <div class="main_block">
        <Header/>
        <div class="container">
            <div class="osn_block">
                <div class="page-hr">
                    <div class="page-nm-hr">Frequently asked questions</div>
                </div>
                <div class="faq-content">
                    <div class="faq-top-text">Here you'll find answers to commonly asked questions about our products and services. Whether you're a new customer or a long-time user, this comprehensive resource aims to provide clear and concise information to address any inquiries you may have.</div>
                    <div class="row">
                        <div class="quick-links-container col-12 col-lg-9">
                            <div class="quick-links-header">FAQ’s quick links</div>
                            <ul>
                                <li><a href="#q1">Who can invest in Coinwealth?</a></li>
                                <li><a href="#q2">How do I get started?</a></li>
                                <li><a href="#q3">How much can I invest?</a></li>
                                <li><a href="#q4">Can I invest to the same package after completing my plan?</a></li>
                                <li><a href="#q5">Can I take my money back before the plan expires?</a></li>
                                <li><a href="#q6">How many plans I can invest?</a></li>
                                <li><a href="#q7">How you will safe my money?</a></li>
                                <li><a href="#q8">How can I find my withdrawal?</a></li>
                                <li><a href="#q9">Are there any restrictions on the withdrawal from Coinwealth?</a></li>
                                <li><a href="#q10">Where can I find my referral link?</a></li>
                                <li><a href="#q11">How can I contact Coinwealth support?</a></li>
                            </ul>
                        </div>
                        <div class="faq-side-image-block col-lg-3"><img src="../assets/faq_view.svg" alt="faq"></div>
                    </div>
                    <div id="q1">
                        <div class="faq-question-container">
                            <div class="question-header">Who can invest in Coinwealth?</div>
                            <div class="question-answer">Coinwealth is available all over the world. In order to register you must:
                                <br>- Be at least 18 years old
                                <br>- Have a valid passport
                                <br>- Have a valid proof of address document
                            </div>
                        </div>
                    </div>
                    <div id="q2">
                        <div class="faq-question-container">
                            <div class="question-header">How do I get started?</div>
                            <div class="question-answer">- Register 
                                <br>- Chose the desired package 
                                <br>- Deposit the amount 
                                <br>- Start receiving your investment returns in 24 hours
                            </div>
                        </div>
                    </div>
                    <div id="q3">
                        <div class="faq-question-container">
                            <div class="question-header">How much can I invest?</div>
                            <div class="question-answer">Each individual are permitted to invest in one package from each lvl.</div>
                        </div>
                    </div>
                    <div id="q4">
                        <div class="faq-question-container">
                            <div class="question-header">Can I invest to the same package after completing my plan?</div>
                            <div class="question-answer">You can invest in the same package after you complete the investment duration.</div>
                        </div>
                    </div>
                    <div id="q5">
                        <div class="faq-question-container">
                            <div class="question-header">Can I take my money back before the plan expires?</div>
                            <div class="question-answer">You can withdraw your money anytime you want 
                                <br>But if you don’t finish the investment duration you will lose your profit.
                            </div>
                        </div>
                    </div>
                    <div id="q6">
                        <div class="faq-question-container">
                            <div class="question-header">How many plans I can invest?</div>
                            <div class="question-answer">Each individual is allowed to invest one time in each package at the same time.</div>
                        </div>
                    </div>
                    <div id="q7">
                        <div class="faq-question-container">
                            <div class="question-header">How you will safe my money?</div>
                            <div class="question-answer">Withdrawal is open anytime you start your investment as for withdrawing your profit minimum withdrawal will be 50 USDT</div>
                        </div>
                    </div>
                    <div id="q8">
                        <div class="faq-question-container">
                            <div class="question-header">How can I find my withdrawal?</div>
                            <div class="question-answer">Withdrawals are checked and sent manually. Usually, it takes up to 5 business days, but in some cases, the deadline can be extended. Please, rely on the status of your withdrawal request in your account wallet.</div>
                        </div>
                    </div>
                    <div id="q9">
                        <div class="faq-question-container">
                            <div class="question-header">Are there any restrictions on the withdrawal from Coinwealth?</div>
                            <div class="question-answer">Minimum withdrawal is 50 USDT</div>
                        </div>
                    </div>
                    <div id="q10">
                        <div class="faq-question-container">
                            <div class="question-header">Where can I find my referral link?</div>
                            <div class="question-answer">You can visit the "Referral Program" page. On the referral program page you can find your referral link. Please copy it and share with your friends.</div>
                        </div>
                    </div>
                    <div id="q11">
                        <div class="faq-question-container">
                            <div class="question-header">How can I contact Coinwealth support?</div>
                            <div class="question-answer">You can send us a message by email at support@coinwealth.group</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap');

*{
    color: rgb(255, 255, 255);
    text-decoration: none;

}

.container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    margin: 0 15.33333%;
}

.osn_block{
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1540px;
}

.page-hr{
    max-width: 1220px;
    margin-bottom: 32px;
    padding: 18px 24px;
    -moz-box-pack: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.03);
    align-items: center;
}

.page-nm-hr{
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  margin: 0px;
}

.faq-content{
    margin: 0 10.33333%;
}

.faq-top-text{
    width: 100%;
    color: rgb(174, 177, 197);
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 16px;
}


.quick-links-header{
    width: 100%;
    margin-bottom: 16px;
    color: rgb(248, 248, 248);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
    text-transform: uppercase;
}

ul{
    padding-left: 20px;
    margin-bottom: 0px;
    color: rgb(255, 255, 255);
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    line-height: 24px;
}

li{
    color: rgb(255, 255, 255);
    padding: 2px 0px;
    font-size: 15px;
    font-weight: 450;
    font-family: 'Poppins', sans-serif;
    line-height: 24px;
}

a:hover{
    color: rgb(0, 86, 179);
    text-decoration: underline;
}

.faq-side-image-block img{
    margin-top: 20%;
    height: 197px;
}

.faq-question-container {
    margin: 10px 8.33333% 10px 0;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    padding: 12px;
    border-radius: 2px;
    background: #1a1d2b;
}

.question-header {
    margin-bottom: 10px;
    color: #f8f8f8;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    text-transform: uppercase
}

.question-answer {
    color: #aeb1c5;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    line-height: 20px;
}

@media screen and (max-width: 992px) {
    .faq-side-image-block{
        display: none;
    }
}

@media screen and (max-width: 630px) {
    .container{
        margin: 0;  
    }
    .faq-content{
        margin: 0;
    }
}
</style>