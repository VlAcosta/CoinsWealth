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
      minimum: 100,
      maximum: 2000,
      selected: 1,
      amount: 100,
      redeem: '',
      apr_min: 5,
      apr_max: 5.5,
      slots: 0,
      prof1: 5,
      autosubscribe: false,
      confirmedAddress: false,
      amountError: false,
      profitPercentage1: 5,
      amountErrorMsg: '',
      request_list: [],
      packages_list: {},
      packages_keys: [],
      selected_package: 0,
      package_id: 0,
      package_loading: true
    };
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn },
    getPackageKeys: function() { return Object.keys(this.packages_list) }
  },
  methods: {
    async changeSelect(number) {
      this.selected = number
      
      this.changePackage(0, this.packages_list[this.selected][0].id)
    },
    async changePackage(number, num2) {
      this.selected_package = number
      this.package_id = num2

      this.minimum = this.packages_list[this.selected][this.selected_package].min_amount;
      this.maximum = this.packages_list[this.selected][this.selected_package].max_amount;
      this.apr_min = this.packages_list[this.selected][this.selected_package].min_apr;
      this.apr_max = this.packages_list[this.selected][this.selected_package].max_apr;
      this.slots = this.packages_list[this.selected][this.selected_package].slots;
      
      if (this.amount < this.minimum) this.amount = this.minimum;
      if (this.amount > this.maximum) this.amount = this.maximum;

      this.checkInput()
    },
    checkInput() {
      if (this.amount < this.minimum) {
        this.amountError = true;
        this.amountErrorMsg = 'Value is small'
      } else if (this.amount > this.maximum) {
        this.amountError = true;
        this.amountErrorMsg = 'Value is big'
      } else if (this.$store.state.user.balance < this.amount) {
        this.amountError = true;
        this.amountErrorMsg = 'Balance is low'
      } else {
        this.amountError = false
      }
      const profitPercentage = (((this.amount - this.minimum) / (this.maximum - this.minimum)) * (this.apr_max - this.apr_min) + this.apr_min );
      const enteredAmount = Number(this.amount);
      this.profitPercentage1 = Math.round(profitPercentage * 10) / 10;
      const prof = (this.amount / 100 * this.profitPercentage1);
      this.prof1 = Math.floor(prof)
      if (this.amount < this.minimum){this.profitPercentage1 = '-'}
      if (this.amount > this.maximum){this.profitPercentage1 = '-'}
      if (!enteredAmount){this.profitPercentage1 = '-'}
    },
    maxBtn() {
      if (this.maximum > this.$store.state.user.balance) this.amount = this.$store.state.user.balance;
      else this.amount = this.maximum;
      this.checkInput()
    },
    ConfirmBtn() {
      if (!this.isLoggedIn) return
      let data = {
        package_id: this.package_id,
        count: this.amount,
        token: this.$store.state.token,
        userid: this.$store.state.user.id,
        autosub: this.autosubscribe
      }
      this.$store.dispatch('buy_packet', data)
      .then(resp => {
        switch (resp.data.status) {
          case "success":
          {
            alert("The package has been activated and added to your personal account!")
            this.$router.push('/profile/account-statistics')
            break;
          }
          case "token_expired":
          {
            this.$router.go()
            alert('Sign in to continue')
            break;
          }
          case "balance_low":
          {
            alert('Your balance is not enough to purchase the package')
            break;
          }
          case "package_not_find":
          {
            alert('This Package not find, Refresh the page')
            break;
          }
          case "package_buyed":
          {
            alert('You have already bought this package')
            break;
          }
          case "slots_full":
          {
            alert('All available slots of the package are over')
            break;
          }
        }
      })
      .catch(err => console.log(err))
    },
    loadPackages() {
      let data = {
        token: this.$store.state.token,
        userid: this.$store.state.user.id
      }
      this.package_loading = true
      this.$store.dispatch('load_user_packages', data)
      .then(async (resp) => {
        
        switch (resp.data.status) {
          case "success":
          {
            this.requests_list = resp.data.packages_list
            if (this.requests_list.length > 0) this.package_loading = false
            for (const item of this.requests_list) {
              if (!this.packages_list[`${item.duration}`]) this.packages_list[`${item.duration}`] = Array()
              this.packages_list[`${item.duration}`].push({
                id: item.id,
                name: item.name,
                min_apr: Number(item.min_apr),
                max_apr: Number(item.max_apr),
                slots: Number(item.max_slots)-Number(item.slots),
                min_amount: Number(item.min_amount),
                max_amount: Number(item.max_amount)
              })
            }
            this.packages_keys = Object.keys(this.packages_list)
            this.changeSelect(this.packages_keys[0])
            break;
          }
          case "token_expired":
          {
            this.$router.go()
            alert('Sign in to continue')
            break;
          }
        }
      })
    }

  },
  beforeMount() {
    this.loadPackages()
  },
  beforeRouteEnter(to, from, next) {
    // Используем функцию next с колбэком, который будет вызван после загрузки компонента
    next((vm) => {
      // Используем метод scrollTo для установки координат прокрутки страницы
      vm.$nextTick(() => {
        window.scrollTo(0, 0);
      });
    });
  }
  
}
</script>
<template>
    <div class="market_block">
        <Header />
        <div class="container">
        
          <div class="page_name_container">
            <div class="page_name_text">
              PACKAGES 
            </div>
            <div class="page_name_info"></div>
            <div id='infoTooltip' class="game-header-tooltip">
              <img id='infoTool' src="../assets/info_in_square.svg" alt="info" height="24px" width="24px">
              <span id="tooltip">Manage your account information. Update your avatar, username, and change password while gaining insight into essential account statistics. Take control and customize your experience with ease.</span>

            </div>
          </div>
          <svg v-if="package_loading" version="1.1" id="package_loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
              <path fill="#b9f700" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                <animateTransform 
                  attributeName="transform" 
                  attributeType="XML" 
                  type="rotate"
                  dur="1s" 
                  from="0 50 50"
                  to="360 50 50" 
                  repeatCount="indefinite" />
            </path>
          </svg>
          <div class="container-mr" v-else>
          <div class="cont">
          <div class="l_block">
            <div class="dayss_block">
              <span id="day_text">Duration (Days)</span>
              <div class="days_block">
                <div class="day_block" :class="selected == item ? 'active' : ''" v-on:click="changeSelect(item)" v-for="item in packages_keys" v-bind:key="item">{{ item }}</div>
              </div>
            </div>
            <div class="dayss_block" style="margin-top: 10px;">
              <span id="day_text">Select Package</span>
              <div class="days_block">
                <div class="day_block" :class="selected_package == index ? 'active' : ''" v-on:click="changePackage(index, item.id)" v-for="(item, index) in packages_list[selected]" v-bind:key="index">{{ item.name }}</div>
              </div>
            </div>
            <div class="amount_block">
              <span id="amount_text">Subscription Amount</span>
              <div class="input_cnt">
                <div class="input_block">
                  <input id="amountInput" type="text" v-model="amount" v-on:input="checkInput()" :class="this.amountError ? 'inputError' : ''">
                  <div class="max" v-on:click="maxBtn()">Max</div>
                  
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
                  <span id='Min_lim'>Avilable Slots: {{ this.slots }}</span>
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
          </div>
          <div class="r_block">
            <div class="est_block">
              <div class="est_l_block">
                <span id="apr">Est. APR</span>
                <span id="apr_text"> {{ this.profitPercentage1  }}{{ (amount < minimum || amount > maximum || !Number(this.amount)) ? ('-') : ('%') }}</span>
              </div>
              <div class="est_r_block">
                <span id="pr">Est. Profit</span>
                <span id="pr_text">{{ (amount < minimum || amount > maximum || !Number(this.amount)) ? ('--') : (this.prof1) }}</span>
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
              <button id='confirm' v-on:click="ConfirmBtn()" :disabled="this.amountError || !this.confirmedAddress || ($store.state.user.balance < this.amount) || !this.isLoggedIn || this.slots == 0">Confirm</button>
            </div>
          </div>
        </div>
        </div>
        </div>
        <Footer />
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700;800;900&family=Poppins&display=swap');

#auto_check {
  opacity: 0;
}

.market_block{
  min-height: 100vh;
}

#tooltip  {
  display: none;
  position: absolute;
  justify-content: space-between;
  max-width: 250px;
  padding: 6px 10px;
  font-size: 12px;
  background: #373843;
  color: #FFFFFF;
  opacity: 0.9;
  margin-left: -105px;
  margin-top: 10px;
}

#infoTooltip:hover #tooltip{
  display: block;
}

Footer {
  margin-top: 7%;
}

.block{
  display: flex;
  flex-direction: column;
}
.container{
  display: flex;
  flex-direction: column;
}

.page_name_container{
  margin-top: 8px;
  padding: 16px 20px;
  background: hsla(0,0%,100%,.03);
  margin-bottom: 33px;
  margin: 8px 190px;
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
  padding: 3px 5px;
  height: 23px;
  flex-direction: column;
  justify-content: center;
  background: #1A1D2B;
  border-radius: 2px;
  color: #FFF;

  display: flex;
  justify-content: center;
  
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  cursor: pointer;
}

.day_block.active{
  outline: 2px solid #B9F700;
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
  cursor: pointer;
}

#BTC{
  color: #FFF;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-left: 5px;
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

#package_loading {
  margin-top: 100px;
  width: 100px;
  margin-left: 50%;
  margin-right: -50%;
  transform: translateX(-50%);
}

@media screen and (max-width: 1199px) {
  .page_name_container{
    margin: 8px 10%;
  }
}

@media screen and (max-width: 995px) {
  .page_name_container{
    margin: 8px 0%;
  }
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