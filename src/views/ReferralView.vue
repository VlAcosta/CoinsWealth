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
  <div class="main_str">
    <Header/>
    <div class='referral-program-container row'>
      <div class="wealth-page-header col-12 col-lg-12">
        <div class="page-name-container">
          <div class="page-name mr-3">Referral Program</div>
        </div>
      </div>
      <div class="left-block right-border-delimiter col-12 col-lg-3">
        <div class="active tab-pill">
            <div class="col-12">
              <div class="referral-tab-title d-inline-flex align-items-center">
                <div class="ml-0">
                  <img src="../assets/info-tab-icon.svg" alt="info" width="28" height="28">
                </div>
                <div class="text ml-3">Info</div>
              </div>
            </div>
          </div>
      </div>
      <div class="right-block col-12 col-lg-9">
        <div class="w-100">
          <div class="referral-program-info-container">
            <div class="referral-program-top-banner">
              <div class="info-container">
                <div class="want-to-get-more">Want to get more rewards?</div>
                <div class="invite-your-friends">Invite your Friends</div>
                <div class="mine-with-text">to mine with Wwalth Coin and</div>
                <div class="big-green-text">Receive up to 30%</div>
                <div class="big-green-text">in rewards</div>
                <div class="small-grey-text-bottom">Share your unique link with friends and earn more rewards while they are playing</div>
              </div>
            </div>
            <div class="referral-program-sub-header-block-text">Here's how it works</div>
            <div class="referral-program-grey-text"><p>Once a user clicks on your referral link and successfully creates an account, their account is automatically linked to yours. You can earn commissions for actions they take on our website, such as making purchases at in-game market or buying LMT. Commissions are calculated and added to your balance automatically, and the more players you refer, the more money you can earn each month.</p><p>Spread the word about our mining service simulator by sharing your referral link with friends, family, and colleagues. You can send it via email, post it on social media, or simply share it in person. As your referred customers engage in mining activities and meet specific criteria, you'll earn rewards!</p>
              <p>Get up to <span class="white-text">30%</span> in rewards! Receive <span class="white-text">20%</span> commission in LMT, when your referrals make purchases in the in-game market and <span class="white-text">10%</span> commission in cryptocurrencies (BTC), when your referrals spent cryptocurrencies to buy LMT!</p>
            </div>
            <div class="referral-program-sub-header-block-text">Commission level:</div>
            <div class="referral-program-info-row">
              <div class="referral-program-block-with-value">20%</div>
              <div>in LMT, when your referrals make purchases in the in-game market</div>
            </div>
            <div class="referral-program-info-row">
              <div class="referral-program-block-with-value">10%</div>
              <div>in cryptocurrencies (BTC), when your referrals spent cryptocurrencies to buy LMT</div>
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
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap');



.main_str{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.referral-program-container {
  margin-bottom: 80px;
  margin-top: -48px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  max-width: 1140px;
  margin-left: 50%;
  margin-right: -50%;
  transform: translateX(-50%);
}

.wealth-page-header {
  background: rgba(255, 255, 255, 0.03);
  margin-top: 8px;
  margin-bottom: 32px;
  padding: 16px 0 16px 24px;
  position: relative;
  display: flex;
  flex-direction: row;
}
.wealth-page-header .page-name-container {
  display: flex;
    -moz-box-pack: start;
    justify-content: start;
}
.wealth-page-header .page-name-container {
  display: flex;

}

.wealth-page-header .page-name {
  font-family: 'IBM Plex Mono';
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  margin: 0px;
    margin-right: 0px;
}

.referral-program-container .left-block .tab-pill.active {
  border: 1px solid rgb(185, 247, 0) !important;
}
.tab-pill {
  cursor: pointer;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  line-height: 22px;
  padding: 12px;
  margin: 0px;
}

.align-items-center {
  -moz-box-align: center !important;
  align-items: center !important;
}

.referral-program-container .left-block .tab-pill .text {
  color: rgb(248, 248, 248);
}
.ml-3, .mx-3 {
  margin-left: 1rem !important;
}

.right-block{
  padding-left: 16px;
  padding-right: 0;
}

.referral-program-info-container, .referral-program-info-container .referral-program-top-banner {
  display: flex;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  flex-direction: column;
  width: 100%;
}

.referral-program-info-container .referral-program-top-banner {
  background-position: 100% center;
  background-image: url("../assets/referral_program_header_image_v2.png");
  background-repeat: no-repeat;
  padding: 16px 32px;
}


.referral-program-info-container .referral-program-top-banner {
  padding: 8px 16px;
  -moz-box-align: start;
  align-items: flex-start;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;
}

.info-container{
  margin-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.want-to-get-more {
  width: 100%;
  margin-bottom: 12px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  line-height: 22px;
}

.invite-your-friends {
  width: 100%;
  color: rgb(109, 231, 248);
  font-size: 16px;
  font-weight: 700;
  font-family: 'IBM Plex Mono', monospace;

  line-height: 20px;
  text-transform: uppercase;
}

.mine-with-text {
  width: 100%;
  color: rgb(248, 248, 248);
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  line-height: 24px;
}

.big-green-text {
  width: 100%;
  color: rgb(162, 216, 0);
  font-size: 24px;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 8001;
  letter-spacing: 2.4px;
  text-transform: uppercase;
}

.small-grey-text-bottom {
  width: 100%;
  margin-top: 12px;
  color: rgb(174, 177, 197);
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
  line-height: 18px;
}

.referral-program-info-container .referral-program-sub-header-block-text {
  width: 100%;
  margin-bottom: 16px;
  color: rgb(248, 248, 248);
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  line-height: 22px;
}

.referral-program-info-container .referral-program-grey-text {
  width: 100%;
  margin-bottom: 16px;
  color: rgb(174, 177, 197);
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  line-height: 18px;
}

.referral-program-info-container .referral-program-sub-header-block-text {
  width: 100%;
  margin-bottom: 16px;
  color: rgb(248, 248, 248);
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  line-height: 22px;
}

.referral-program-container .left-block.right-border-delimiter {
  padding-left: 0px;
  padding-right: 16px;
  border-right: 1px solid rgb(34, 36, 50);
}

.referral-program-info-container .referral-program-block-with-value {
  -moz-box-pack: center;
  justify-content: center;
  padding: 14px 8px 8px 8px;
  margin-right: 12px;
  border-radius: 2px;
  background: rgb(34, 36, 50);
  min-width: 48px;
  min-height: 48px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: rgb(185, 247, 0);
  text-align: center;
  font-size: 16px;
  line-height: 22px;
}

.referral-program-info-container .referral-program-block-with-value, .referral-program-info-container .referral-program-info-row {
  display: flex;
  -moz-box-orient: horizontal;
  -moz-box-direction: normal;
  flex-direction: row;
  -moz-box-align: center;
  align-items: center;
  padding-bottom: 16px
}

.referral-program-info-container .referral-program-info-row {
  color: rgb(255, 255, 255);
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
  line-height: 18px;
}

@media screen and (max-width: 1700px) {
  .referral-program-info-container .referral-program-top-banner {
    background-position: 100% center;
    background-image: none;
    background-repeat: no-repeat;
    padding: 16px 32px;
  }
}

@media screen and (max-width: 1018px) {
  .big-green-text {
    font-size: 20px;
  }
}

@media screen and (max-width: 991px) {
  .right-block{
    padding-left: 0;
  }
  .tab-pill {
  border: none;
  }
  .referral-program-container .left-block.right-border-delimiter {
    border-right: none;
  }

  .referral-program-container .left-block.right-border-delimiter {
    padding-right: 0;
  }
}

@media screen and (max-width: 863px) {
  .referral-program-container{
    margin-top: 10px;
  }
  .row{
    width: 80vw;
  }
}

@media screen and (max-width: 478px) {
  .row{
    width: 80vw;
  }
  .want-to-get-more{
    font-size: 12px;
    line-height: 12px;
  }
  .invite-your-friends{
    font-size: 12px;
    line-height: 16px;
  }
  .mine-with-text{
    font-size: 10px;
    line-height: 16px;
  }
  .big-green-text {
    font-size: 17px;
  }
  .small-grey-text-bottom {
    font-size: 10px;
    line-height: 14px;
  }
}


</style>







