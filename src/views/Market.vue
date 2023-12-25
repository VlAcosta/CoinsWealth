<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'


export default {
  name: 'HomeView',
  components: {
    Header,
    Footer
  },
  data: function () {
    return {
      minimum: 2000,
      maximum: 2000,
      selected: 1,
      amount: 2000,
      redeem: '',
      autosubscribe: false,
      confirmedAddress: false,
      amountError: false,
      amountErrorMsg: ''
    };
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
    async changeSelect(number) {
      this.selected = number

      switch (number) {
        case 1:
        {
          this.minimum = 2000;
          this.maximum = 2000;
          if (this.amount < this.minimum) {
            this.amount = this.minimum
          }
          if (this.amount > this.maximum) {
            this.amount = this.maximum
          }
          break;
        }
        case 2:
        {
          this.minimum = 2000;
          this.maximum = 10000;
          if (this.amount < this.minimum) {
            this.amount = this.minimum
          }
          if (this.amount > this.maximum) {
            this.amount = this.maximum
          }
          break;
        }
        case 3:
        {
          this.minimum = 5000;
          this.maximum = 10000;
          if (this.amount < this.minimum) {
            this.amount = this.minimum
          }
          if (this.amount > this.maximum) {
            this.amount = this.maximum
          }
          break;
        }
        case 4:
        {
          this.minimum = 10000;
          this.maximum = 15000;
          if (this.amount < this.minimum) {
            this.amount = this.minimum
          }
          if (this.amount > this.maximum) {
            this.amount = this.maximum
          }
          break;
        }
      }
      await this.checkInput()
    },
    checkInput() {
      if (this.amount < this.minimum) {
        this.amountError = true;
        this.amountErrorMsg = 'Value is small'
      } else if (this.amount > this.maximum) {
        this.amountError = true;
        this.amountErrorMsg = 'Value is big'
      } else if (this.$store.state.user.balance/10000000000 < this.amount) {
        this.amountError = true;
        this.amountErrorMsg = 'Balance is low'
      } else {
        this.amountError = false
      }
    },
    ConfirmBtn() {
      if (!this.isLoggedIn) return
      let data = {
        duration: ['60', '90', '180', '180prem'][this.selected-1],
        count: this.amount,
        token: this.$store.state.token,
        userid: this.$store.state.user.id,
        autosub: this.autosubscribe
      }
      this.$store.dispatch('buy_packet', data)
    }

  }
  
}
</script>
<template>
    <div class="market_block">
        <Header />
        
        
        <div class="container">
          <div class="page_name_container">
            <div class="page_name_text">
              PACKSAGES
            </div>
            <div class="page_name_info"></div>
            <div id='infoTooltip' class="game-header-tooltip">
              <img src="../assets/info_in_square.svg" alt="info" height="24px" width="24px">
            </div>
          </div>
          <div class="cont">
          <div class="l_block">
            <div class="dayss_block">
              <span id="day_text">Duration (Days)</span>
              <div class="days_block">
                <div class="day_block" :class="selected == 1 ? 'active' : ''" v-on:click="changeSelect(1)">60</div>
                <div class="day_block" :class="selected == 2 ? 'active' : ''" v-on:click="changeSelect(2)">90</div>
                <div class="day_block" :class="selected == 3 ? 'active' : ''" v-on:click="changeSelect(3)">180</div>
                <div class="day_block" id='day' :class="selected == 4 ? 'active' : ''" v-on:click="changeSelect(4)">180<span>*</span></div>
              </div>
            </div>
            <div class="amount_block">
              <span id="amount_text">Subscription Amount</span>
              <div class="input_cnt">
                <div class="input_block">
                  <input id="amountInput" type="text" v-model="amount" v-on:input="checkInput()" :class="this.amountError ? 'inputError' : ''">
                  <div class="max">Max</div>
                  
                </div>
                <span id='BTC'>USDT</span>
              </div>
              <label for="amountInput" class="amountInputLabel" v-if="this.amountError">{{ this.amountErrorMsg }}</label>
            </div>
            <div class="limit_block">
              <span id="limit_text">Amount Limits</span>
              <div class="limits_tx">
                <div class="cont_lim">
                  <span id='Min_lim'>Minimum: {{ this.minimum }} USDT</span>
                </div>
                <div class="cont_lim">
                  <span id='Min_lim'>Maximum: {{ this.maximum }} USDT</span>
                </div>
                <div class="cont_lim">
                  <span id='Min_lim'>Avilable Quota: 0.0001 USDT</span>
                </div>
              </div>
            </div>
            <div class="scribe_block">
              <span id="scribe_text">Auto-Subcribe</span>
              <label class="switch">
                <input type="checkbox" name="" id="auto_check" v-model="autosubscribe">
                <span class="slider round"></span>
              </label>
            </div>
            <div class="text_block">Enable Auto-Subscribe to resubscribe to the same Locked Product upon expiry. If disabled, your assets will be automatically transferred to the corresponding Flexible Product upon expiry.</div>
            <div class="reedem_block">
              <span id="redeem_text">Redeem to</span>
              <input type="text" placeholder="test@gmail.com">
            </div>
          </div>
          <div class="r_block">
            <div class="est_block">
              <div class="est_l_block">
                <span id="apr">Est. APR</span>
                <span id="apr_text">5%</span>
              </div>
              <div class="est_r_block">
                <span id="pr">Est. Profit</span>
                <span id="pr_text">--</span>
              </div>
            </div>
            <div class="r_text">
              <div class="ARP_text">
                <img src="../assets/io.svg" alt="">
                <span id="APR-tx">The APR is subject to change on daily basis. Please refer to the details on the page.</span>
              </div>
              <div class="ARP_text_1">
                <img src="../assets/io.svg" alt="">
                <span id="APR-tx">APR does not mean the actual or predicted returns in fiat currency.</span>
              </div>
              <div class="Upon_text">
                <img src="../assets/io.svg" alt="">
                <span id="APR-tx">Upon expiry, your digital assets will be resubscribed to the same product. If you choose to redeem early, your digital assets will be returned to your Spot Wallet.</span>
              </div>
              <div class="confirm_address">
                <input id="confirm_adress" name="confirmAdress" type="checkbox" class="limer-checkbox form-check-input" v-model="confirmedAddress">
                <label id="confirmtext" for="confirm_adress">I have read and agreed to Privacy Policy and Terms of Service</label>
              </div>
              <button id='confirm' v-on:click="ConfirmBtn()" :disabled="this.amountError || !this.confirmedAddress || ($store.state.user.balance/10000000000 < this.amount) || !this.isLoggedIn">Confirm</button>
            </div>
          </div>
        </div>
        </div>
        <Footer />
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700;800;900&family=Poppins&display=swap');



.market_block{
  min-height: 100vh;
}

Footer {
  margin-top: 7%;
}

.block{
  display: flex;
  flex-direction: column;
}

.page_name_container{
  width: 100%;
  margin-top: 8px;
  padding: 16px 20px;
  background: hsla(0,0%,100%,.03);
  margin-bottom: 33px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.page_name_text{
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  color: white;
  font-size: 16px;
  line-height: 24px;
  width: 120px;
}
.cont{
  padding: 10px 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
}
#infoTooltip{
  margin-left: -20px;
}
.dayss_block{
  max-width: 160px;
  height: 50px;
}
#day_text{
  color: #FFF;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
}

.days_block{
  margin-top: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.day_block{
  width: 31px;
  height: 23px;
  flex-direction: column;
  justify-content: center;
  background: #1A1D2B;
  border-radius: 2px;
  color: #FFF;

  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  cursor: pointer;
}

.day_block.active{
  border: 2px solid #B9F700;
}

.day_block + .day_block {
  margin-left: 10px;
}

#day {
  width: 40px
}

#day span{
  color: #B9F700;
}

.amount_block{
  max-width: 342px;
  margin-top: 13px;
}

#amount_text{
  color: #FFF;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
}

.input_cnt {
  display: flex;
  flex-direction: row;
}

.input_cnt img{
  width: 18px;
  margin: 0 5px;
}

.input_block{
  max-width: 277px;
  flex-shrink: 0;
  display:flex;
  flex-direction:row;
}

input{
  border-radius: 2px;
  border: 1px solid #282A37;
  background: #1A1D2B;
  color:#FFFFFF;
  padding: 0px 5px;  
}

.max{
  color: #FFFFFF;
  margin-left: -40px;
  padding-right: 10px;
}

#BTC{
  color: #FFF;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
}

.limit_block{
  margin-top: 16px;
}

#limit_text{
  color: #FFF;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
}

.cont_lim{
  display: flex;
  flex-direction: row;
}

.cont_lim span{
  padding: 0 5px;
}

.limits_tx{
  display: flex;
  flex-direction: column;
  padding-top: 10px;
}

#Min_lim{
  color: #D1D1D1;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 160% */
}

.scribe_block{
  margin-top: 13px;
}

#scribe_text{
  color: #FFF;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
}

.switch {
  position: relative;
  display: inline-block;
  width: 39px;
  height: 20px;
  margin-left: 20px;
}

input{
  outline: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 5px;
  left: -4px;
  right: 0;
  bottom: 0;
  background-color: #1A1D2B;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider::before {
  background-color: #B9F700;;
}



input:checked + .slider:before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.text_block{
  max-width: 367px;
  overflow: hidden;
  margin-top: 25px;
  color: #D1D1D1;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.reedem_block{
  display: flex;
  flex-direction: column;
  max-width: 277px;
  overflow: hidden;
  margin-top: 28px;
}

#redeem_text{
  color: #FFF;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  margin-bottom: 5px;
}

input::placeholder{
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
}

.r_block{
  margin-left: 90px;
  display: flex;
  flex-direction: column;
}

.est_block{
  max-width: 200px;
  display: flex;
  flex-direction: column;
}

.est_l_block{
  display: flex;
  justify-content: space-between;
}

.est_r_block{
  display: flex;
  justify-content: space-between;
}

#apr, #pr{
  color: #D1D1D1;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 160% */
}

#apr_text, #pr_text{
  color: #B9F700;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 160% */
}

.ARP_text{
  display: flex;
  max-width: 358px;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 24px;
  overflow: hidden;
}

#APR-tx{
  color: #D1D1D1;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.ARP_text_1{
  max-width: 358px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 24px;
}

.Upon_text{
  max-width: 358px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 24px;
}

.confirm_address{
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  align-items: flex-start;
}

.confirm_address > label {
  margin-left: 10px;
  font-family: 'Poppins' !important;
  color: #D1D1D1;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.confirm_address > input {
  margin-left: 13px;
}

input[type=checkbox] {
  background: none;
  border-radius: 1px;
  border: solid 1px #4f5364;
  margin-top: 6px;
}

input[type=checkbox]:checked{
  background-image: url("../assets/checkbox_filled.be68eed66a791a4daba7c0366c25802e.svg");
  background-position: center center; 
}

#confirm{
  margin-top: 45px;
  width: 386px;
  height: 40px;
  border: none;
  border-radius: 2px;
  background: #B9F700;

  color: #000;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18.2px; /* 130% */
  letter-spacing: 0.14px;
}

#confirm:disabled {
  background: #a8a9b1 !important;
  color: #5b5f7b !important;
}


.inputError {
  border: 1px solid red !important;
}

.amountInputLabel {
  color: red;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
}




@media screen and (max-width:890px) {
  .cont{
    flex-direction: column;
    padding: 0;

  }
  .r_block{
    margin-left: 0;
    margin-top: 30px;
  }
}

@media screen and (max-width:590px) {
  .cont{
    padding-left: 30px;
  }

  .text_block{
    max-width: 260px;
  }

  #APR_tx{
    max-width: 260px;
  }

  .confirm_address > label{
    max-width: 260px;
  }

  #confirm{
    max-width: 330px;
  }
}

</style>