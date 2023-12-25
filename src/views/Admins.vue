<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'


export default {
  name: 'ProfileView',
  components: {
    Header,
    Footer
  },
  data: function () {
    return {
      pageselected: 'deposit',
      pagedefault: true,
      walletError: false,
      amountError: false,
      confirmedAddress: false,

      deposit_email: '',
      deposit_count: 1,

      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  },
  methods: {
    openAnotherPage(page) {
      if (page == '' || page == undefined) this.pageselected = 'deposit';
      else this.pageselected = page;
      
    },
    getSize() {
      this.width = document.documentElement.clientWidth;
      this.height = document.documentElement.clientHeight;
    },
    copy(element_id) {
      const testingCodeToCopy = document.querySelector(`#${element_id}`)
      testingCodeToCopy.select()

      document.execCommand('copy')
    },
    createDeposit() {

      let data = {
        count: this.deposit_count,
        token: this.$store.state.token,
        userid: this.$store.state.user.id,
        usermail: this.deposit_email
      }
      this.$store.dispatch('manual_deposit', data)
      .then(async resp => {
        
        switch (resp.data.status) {
          case "success":
          {
            alert('Balance is updated')
            break;
          }
          case "user_not_defined":
          {
            alert('The user was not found')
            break;
          }
          case "users_too_much":
          {
            alert('Several users have been found, fix the database')
            break;
          }
          case "token_expired":
          {
            //await this.$router.go()
            alert('Sign in to continue')
            break;
          }
          case "not_admin":
          {
            //await this.$router.go()
            alert('Get Admin to continue')
            break;
          }
        }
      })
    }
  },
  created() {
    const page = this.$route.path.split('/')[2]
    
    this.openAnotherPage(page)
    window.addEventListener('resize', this.getSize);
  },
  mounted() {
    const page = this.$route.path.split('/')[2]
    
    this.openAnotherPage(page)
    window.addEventListener('resize', this.getSize);
  },
  unmounted() {
    window.removeEventListener('resize', this.getSize);
  }
}
</script>

<template>
  <div class="main_str">
    <Header/>
    <div id="block_1">
      <div class="page_name_container">
        <div class="page_name_text">
          ADMINS PANEL
        </div>
        <div class="page_name_info">

        </div>
      </div>
      <div class="page_container">
        <div class="page_selector_container">
          <router-link to="/admin/deposit" class="page_selector_item" :class="this.pageselected == 'deposit' ? 'active' : ''" @click.native="openAnotherPage('deposit');">Deposit</router-link>
          <router-link to="/admin/withdraw" class="page_selector_item" :class="this.pageselected == 'withdraw' ? 'active' : ''" @click.native="openAnotherPage('withdraw');">Withdraw</router-link>
        </div>
        <div class="page_block" v-show="this.pageselected == 'deposit'">
          <div class="total_balance_block">
            <div class="total_balance_text">Replenishment of USDT email</div>
          </div>
          <div class="deposit_adress_block">
            <div class="deposit_count_container">
                <span id='sp_in'>Email</span>
              <input type="text" name="deposit_count" id="deposit_count" placeholder="test@gmail.com" v-model="deposit_email">
              <span id='sp_in'>Value USDT </span>
              <input type="text" name="deposit_count" id="deposit_count" value="1" v-model="deposit_count">
            </div>
          </div>
          <button class="default-btn" v-on:click="createDeposit()">Deposit</button>
        </div>
        <div class="page_block" v-show="this.pageselected == 'withdraw'">
          <div class="container">
                <div class="block_outdrow">
                    <div class="outhdraw">
                        <span id="name_user">Users </span>
                        <span id="value">0.00005 USDT </span>
                        <div class="btn_yes"><span>Accept</span></div>
                        <div class="btn_no"><span>Deny</span></div>
                    </div>
                    <div class="outhdraw">
                        <span id="name_user">Users </span>
                        <span id="value">0.00005 USDT </span>
                        <div class="btn_yes"><span>Accept</span></div>
                        <div class="btn_no"><span>Deny</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page_block" v-show="this.pageselected == 'history'">
          <div class="total_balance_block">
            <div class="total_balance_text">Total Bitcoin balance</div>
            <div class="total_balance_number">
              <div>0</div>
            </div>
          </div>
          <div class="history_container">
            <div class="history_null">
              There are no transactions yet.
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
  max-width: 100vw;
}

body{
  height: 10000px;
}

#sp_in{
    max-width: 150px;
    font-size: 16px;
    padding-left: 10px ;
    margin-top: 20px;
    font-family: 'IBM Plex Mono', monospace;
    color: #fff;
}

.container{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        max-width: 100%;
        margin: 10px -30px;
    }
    .block_outdrow{
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    #title_analytc, #title_outdraw{
        font-size: 28px;
        line-height: 32px;
        font-family: 'IBM Plex Mono', monospace;
        font-weight: 400;
        color: white;
        text-align: center;
        padding: 15px 0;
    }
    .outhdraw{
        border-radius: 5px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: row;
        background: hsla(0,0%,100%,.03);
        padding: 7px;
        color: white;
        text-align: center;
        justify-content: space-between;
        margin: 1% 10%;
    }

    .btn_yes, .btn_no{
        height: 27px;
        padding: 2px 5px 0px 5px;
        border-radius: 5px;
        cursor: pointer;
    }

    .btn_yes span, .btn_no span{
        margin-left: 0;
    }

    .btn_yes{
        background: #008000;
    }
    .btn_no{
        background: #E52E2E;
        
    }

.main_str{
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}



#block_1{
  width: 1140px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-self: flex-start;
  margin-left: 50%;
  margin-right: -50%;
  transform: translateX(-50%);
  flex-grow: 3;
  padding-bottom: 50px;
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

.page_container{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  align-items: stretch;
  padding-right: 8px;
  padding-left: 8px;
}

.page_selector_container{
  width: 100%;
  border-bottom: 1px solid #222432;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 27px;
}

.page_selector_item{
  margin-left: 20px;
  margin-right: 20px;

  font-family: 'Poppins';
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  margin-top: 1px;
  text-decoration: none;
}

.page_selector_item.active {
  border-bottom: 3px solid #b9f700;
  color: #b9f700;
  padding-bottom: 2px;
  margin-top: 0;
}

.total_balance_block{
  width: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 16px;

  background: hsla(0,0%,100%,.03);
  border-radius: 2px;

  color: white;
  font-family: 'Poppins';
  white-space: nowrap;
  margin-top: 25px;
}

.total_balance_text{
  font-size: 14px;
  margin-right: 15px;
}

.total_balance_block > img {
  height: 18px;
  margin-right: 9px;
}

.total_balance_number {
  font-size: 12px;
  height: 18px;
  padding: 0;
}

.btc-small-numbers{
  font-size: 80%;
  font-weight: 400;
}

.send_only_btc_block{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 24px;
}

.send_only_btc_block > img {
  height: 18px;
  margin-right: 8px;
}

.send_only_btc_text{
  font-family: 'Poppins';
  font-size: 12px;
  line-height: 18px;
  color: #aeb1c5;
}

.send_only_btc_text > .bold{
  font-weight: 600;
}

.deposit_adress_block{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  font-family: 'Poppins';
  margin-bottom: 24px;
  width: 500px;
}

.deposit_adress_block > label {
  margin-bottom: 4px;
  font-size: 12px;
  color: #aeb1c5;
}
.deposit_adress_container{
  border: 1px solid #4f5364;
  border-radius: 2px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: baseline;
}

.deposit_count_container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 350px;
}

.deposit_count_container > div {
  font-family: 'Poppins';
  color: white;
  font-size: 14px;
}

#deposit_count{
  border: 1px solid #4f5364;
  border-radius: 2px;
  background: hsla(0,0%,100%,.03);

  padding: 8px 20px;

  width: 150px;
  font-size: 13px;
  color: #f8f8f8;
  outline: 0;
  margin-right: 10px;
}

.deposit_input_buttons{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.input_btn{
  height: 16px;
  width: 16px;
  margin-right: 8px;
}

.default-btn{
  background: #b9f700 !important;
  border: none;
  border-radius: 2px;
  padding: 8px 20px;
  height: 40px;
  font-family: 'Poppins';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: .01em;
  color: #0c0e1b !important;
}

.btn_center{
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.text_input_block{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  font-family: 'Poppins';
  margin-bottom: 22px;
  width: 500px;
}

.text_input_block > label {
  margin-bottom: 4px;
  font-size: 12px;
  color: #aeb1c5;
}
.text_input_container{


  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
}

.text_input_container.input_error{
  border: 1px solid #db2626 !important;
}

.text_input_container > img{
  margin-left: 13px;
  height: 18px;
}

.text_input_container:hover{
  border: 1px solid #b9f700;
}

.text_input_container:active{
  border: 1px solid white;
}

#withdraw_adress{
  font-size: 13px;
  color: #f8f8f8;
  height: 48px;
  padding: 14px 8px;
  background: none;
  border: none;
  width: 100%;
  outline: 0;
}

#withdraw_amount{
  font-size: 16px;
  color: #f8f8f8;
  height: 48px;
  padding: 14px 8px;
  background: none;
  border: none;
  width: 100%;
  outline: 0;

}

.withdraw_amount_btn_max{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  height: 26px;
  margin-right: 12px;
  font-weight: 400;
  font-size: 12px;
}

input[type=checkbox] {
  background: none;
  border-radius: 1px;
  border: solid 1px #4f5364;
  margin-top: 6px;
}
*:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

input[type=checkbox]:checked{
  background-image: url("../assets/checkbox_filled.be68eed66a791a4daba7c0366c25802e.svg");
  background-position: center center; 
}

.confirm_address{
  margin-bottom: 25px;
}

.confirm_address > input {
  margin-left: 13px;
}

.confirm_address > label {
  margin-left: 10px;
  font-family: 'Poppins' !important;
  font-size: 12px !important;
  color: #646882 !important;
}

.info_line {
  font-family: 'Poppins';
  font-size: 12px;
  line-height: 18px;
  color: #646882;
  margin-bottom: 4px;
}

.info_line > img {
  height: 16px;
  margin-right: 6px;
}

.whiteText{
  color: white;
}

.withdraw_btn_container{
  margin-top: 24px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

#withdraw_btn{
  padding: 8px 60px;
}

.history_container{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.history_null{
  padding: 24px 16px;
  background: hsla(0,0%,100%,.03);
  width: 500px;

  border-radius: 4px;
  font-family: 'Poppins';
  font-size: 14px;
  color: #aeb1c5;
}


@media screen and (max-width: 1200px) {
  #block_1{
    width: 960px;
  }
}

@media screen and (max-width: 990px) {
    #block_1{
      width: 720px;
    }

    .page_container{
      flex-direction: column;
    }

    .page_name_container{
      justify-content: center;
      padding: 8px;
    }
    .page_name_text{
      white-space: nowrap;
      width: auto;
      margin: 0;
    }

    .deposit_adress_block, .text_input_block{
      width: 100%;
    }

    .withdraw_btn_container{
      justify-content: center;
    }

    #withdraw_btn{
      padding: 8px 20px;
    }
    .total_balance_block{
      width: 100%;
    }
    
    .history_null{
      width: 100%;
    }
}

@media screen and (max-width: 768px) {
  #block_1{
    width: 540px;
  }
}

@media screen and (max-width: 500px) {
  .outhdraw > span {
    font-size: 14px;
    line-height: 30px;
  }
}

</style>