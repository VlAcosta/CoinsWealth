<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import md5 from 'js-md5';


export default {
  name: 'ProfileView',
  components: {
    Header,
    Footer
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  data: function () {
    return {
      pageselected: false,
      pageselectedName: 'statistics',
      pagedefault: true,
      pageName: {
        default: 'PROFILE',
        statistics: 'ACCOUNT STATISTICS',
        details: 'ACCOUNT DETAILS'
      },
      pageNameSelect: '',

      openedFixContainer: false,

      changeName_isEnabled: false,
      changeAvatar_isEnabled: false,
      changePassword_isEnabled: false,
      
      change_password_save_enabled: false,

      changepass_current: '',
      changepass_current_error: false,
      changepass_current_errormsg: '',

      changepass_new: '',
      changepass_new_error: false,
      changepass_new_errormsg: '',

      changepass_confirm: '',
      changepass_confirm_error: false,
      changepass_confirm_errormsg: '',

      username_new: '',
      username_new_error: false,
      username_new_errormsg: '',

      selectedAvatar: 0,

      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  },
  methods: {
    openAnotherPage(page) {
      switch (page) {
        case "account-statistics":
          {
            this.pageselected = true
            this.pagedefault = false
            this.pageselectedName = 'statistics'
          }
          break;

      case "account-details":
          {
            this.pageselected = false
            this.pagedefault = false
            this.pageselectedName = 'details'
          }
          break;
      
        default:
          this.pageselected = false
          this.pagedefault = true
          break;
      }
    },
    getSize() {
      this.width = document.documentElement.clientWidth;
      this.height = document.documentElement.clientHeight;
      if (this.width <= 990 && !this.pagedefault) {
        this.pageNameSelect = this.pageName[this.pageselectedName]

      }
      else if (this.width <= 990 && this.pagedefault) {
        this.pageNameSelect = this.pageName['default']
      } else {
        this.pageNameSelect = this.pageName['default']
      }
    },
    changePassBtnState() {
      if (this.changepass_current.length > 1 && this.changepass_new.length > 1 && this.changepass_confirm.length > 1 && !this.changepass_current_error && !this.changepass_new_error && !this.changepass_confirm_error) {
        this.change_password_save_enabled = true
      } else {
        this.change_password_save_enabled = false
      }
    },
    changePassText(name) {
      var passwordRegex = /^[A-Za-z0-9]\w{0,}$/;
      switch (name) {
        case "current": {
          if (/*!this.changepass_current.match(passwordRegex)*/ false) {
            this.changepass_current_error = true;
            this.changepass_current_errormsg = 'Password contains forbidden symbols.'
          } else if (this.changepass_current.length < 8) {
            this.changepass_current_error = true;
            this.changepass_current_errormsg = 'Password length should be between 8 and 32 symbols.'
          } else {
            this.changepass_current_error = false;
          }

          if (this.changepass_current == this.changepass_new) {
            this.changepass_new_error = true;
            this.changepass_new_errormsg = 'The new password must be different from the old.'
          } else {
            this.changepass_new_error = false;
          }
          break;
        }
        case "new": {
          if (!/*this.changepass_new.match(passwordRegex)*/ false) {
            this.changepass_new_error = true;
            this.changepass_new_errormsg = 'Password contains forbidden symbols.'
          } else if (this.changepass_new.length < 8) {
            this.changepass_new_error = true;
            this.changepass_new_errormsg = 'Password length should be between 8 and 32 symbols.'
          } else if (this.changepass_current == this.changepass_new) {
            this.changepass_new_error = true;
            this.changepass_new_errormsg = 'The new password must be different from the old.'
          } else {
            this.changepass_new_error = false;
          }

          if (this.changepass_confirm !=this.changepass_new) {
            this.changepass_confirm_error = true;
            this.changepass_confirm_errormsg = 'Confirmed new password is not equal to new password.'
          } else {
            this.changepass_confirm_error = false;
          }
          break;
        }
        case "confirm": {
          if (this.changepass_confirm !=this.changepass_new) {
            this.changepass_confirm_error = true;
            this.changepass_confirm_errormsg = 'Confirmed new password is not equal to new password.'
          } else {
            this.changepass_confirm_error = false;
          }
          break;
        }
      }
      this.changePassBtnState()
    },
    changeNameText() {
      if (this.username_new.length < 4 || this.username_new.length > 32) {
        this.username_new_error = true;
        this.username_new_errormsg = 'Username length should be between 4 and 32 symbols.'
      } else {
        this.username_new_error = false;
      }
    },
    openFixWindow(name) {
      this.changePassword_isEnabled = false;
      this.openedFixContainer = false;
      switch (name) {
        case "changePassword":
        {
          this.changePassword_isEnabled = true;
          this.openedFixContainer = true;
          break;
        }

        case "changeName":
        {
          this.username_new = '';
          this.changeName_isEnabled = true;
          this.openedFixContainer = true;
          break;
        }

        case "changeAvatar":
        {
          this.selectedAvatar = 0;
          this.changeAvatar_isEnabled = true;
          this.openedFixContainer = true;
          break;
        }
      
        default:
        {
          this.changePassword_isEnabled = false;
          this.changeName_isEnabled = false;
          this.openedFixContainer = false;
          break;
        }
      }
    },
    preventMotion(event) {
      if (this.openedFixContainer) {
        window.scrollTo(0, 0);
        event.preventDefault();
        event.stopPropagation();
      }
    },
    saveChangePassBtn(){
      if (!this.isLoggedIn) return this.$router.push('/sign-in')
      let data = {
        oldpass: `${md5(this.changepass_current)}`,
        newpass: `${md5(this.changepass_new)}`,
        token: `${localStorage.token}`,
        userid: this.$store.state.user.id
      }
      this.$store.dispatch('change_password', data)
      .then(resp => {
        switch (resp.data.status) {
          case "success":
          {
            alert('Password changed successfully')
            this.$router.go()
            break;
          }
          case "token_expired":
          {
            this.$router.push('/sign-in')
            alert('Sign in to continue')
          }

          case "oldpass_invalid":
          {
            this.changepass_current_error = true;
            this.changepass_current_errormsg = 'You entered an incorrect old password'
            break;
          }
        }
      })
       .catch(err => console.log(err))
    },
    saveChangeNameBtn(){
      if (!this.isLoggedIn) return this.$router.push('/sign-in')
      let data = {
        newname: `${this.username_new}`,
        token: `${localStorage.token}`,
        userid: this.$store.state.user.id
      }
      this.$store.dispatch('change_username', data)
      .then(resp => {
        switch (resp.data.status) {
          case "success":
          {
            alert('Name changed successfully')
            this.$router.go()
            break;
          }
          case "token_expired":
          {
            this.$router.push('/sign-in')
            alert('Sign in to continue')
            break;
          }
        }
      })
       .catch(err => console.log(err))
    },
    selectAvatar(num) {
      this.selectedAvatar = num
    },
    saveChangeAvatarBtn() {
      if (!this.isLoggedIn) return this.$router.push('/sign-in')
      if (this.selectedAvatar < 2 || this.selectedAvatar > 31) return
      let data = {
        avatar: `${this.selectedAvatar}`,
        token: `${localStorage.token}`,
        userid: this.$store.state.user.id
      }
      this.$store.dispatch('change_avatar', data)
      .then(resp => {
        switch (resp.data.status) {
          case "success":
          {
            alert('Avatar changed successfully')
            this.$router.go()
            break;
          }
          case "token_expired":
          {
            this.$router.push('/sign-in')
            alert('Sign in to continue')
            break;
          }
        }
      })
       .catch(err => console.log(err))
    }
  },
  created() {
    const page = this.$route.path.split('/')[2]
    
    this.openAnotherPage(page)
    this.getSize()
    this.$store.commit('setAuthentication')
  },
  mounted() {
    const page = this.$route.path.split('/')[2]
    
    this.openAnotherPage(page)
    window.addEventListener('resize', this.getSize);

    window.addEventListener("scroll", this.preventMotion, false);
    window.addEventListener("touchmove", this.preventMotion, false);
  },
  unmounted() {
    window.removeEventListener('resize', this.getSize);

    window.removeEventListener("scroll", this.preventMotion, false);
    window.removeEventListener("touchmove", this.preventMotion, false);
  }
}
</script>

<template>
  <div class="main_str">
    <div class="fix_container" v-if="openedFixContainer">
      <div class="fix_container_bg"></div>
      <div class="fix_block_container" v-if="changePassword_isEnabled">
        <div class="fix_container_name">Change Password</div>
        <div class="fix_input_container">
          <label for="current_password">Current Password</label>
          <input type="password" name="" id="current_password" :class="this.changepass_current_error ? 'input_error_border' : ''" placeholder="Pa$sw0rd" v-model="changepass_current" @input="changePassText('current')">
          <div class="password-lock-icon">
            <img src="../assets/grey_lock_locked.svg" alt="show_w">
          </div>
          <label for="current_password" class="invalid_field" v-if="this.changepass_current_error"> {{ this.changepass_current_errormsg }}</label>
        </div>
        <div class="fix_input_container">
          <label for="new_password">New Password</label>
          <input type="password" name="" id="new_password" :class="this.changepass_new_error ? 'input_error_border' : ''" placeholder="Pa$sw0rd" v-model="changepass_new" @input="changePassText('new')">
          <div class="password-lock-icon">
            <img src="../assets/grey_lock_locked.svg" alt="show_w">
          </div>
          <label for="new_password" class="invalid_field" v-if="this.changepass_new_error"> {{ this.changepass_new_errormsg }}</label>
        </div>
        <div class="fix_input_container">
          <label for="confirm_new_password">Confirm New Password</label>
          <input type="password" name="" id="confirm_new_password" :class="this.changepass_confirm_error ? 'input_error_border' : ''" placeholder="Pa$sw0rd" v-model="changepass_confirm" @input="changePassText('confirm')">
          <div class="password-lock-icon">
            <img src="../assets/grey_lock_locked.svg" alt="show_w">
          </div>
          <label for="confirm_new_password" class="invalid_field" v-if="this.changepass_confirm_error"> {{ this.changepass_confirm_errormsg }}</label>
        </div>
        <div class="change_password_tip">
          * Password may contain only such symbols: A-Z, a-z, 0-9, special symbols
        </div>
        <div class="change_password_tip">
          ** Password length should be between 8 and 32 symbols
        </div>
        <div class="change_password_btn_container">
          <button class="fix_container_btn_cancel" @click="openFixWindow('none')">Cancel</button>
          <button class="fix_container_btn_save" :disabled="!change_password_save_enabled" @click="saveChangePassBtn()">Save</button>
        </div>
      </div>
      <div class="fix_block_container" v-if="changeName_isEnabled">
        <div class="fix_container_name">Change Username</div>
        <div class="fix_input_container">
          <label for="current_password">New Username</label>
          <input type="text" name="" id="username_new" :class="this.username_new_error ? 'input_error_border' : ''" placeholder="Username" v-model="username_new" @input="changeNameText()">
          <label for="username_new" class="invalid_field" v-if="this.username_new_error"> {{ this.username_new_errormsg }}</label>
        </div>
        <div class="change_password_btn_container">
          <button class="fix_container_btn_cancel" @click="openFixWindow('none')">Cancel</button>
          <button class="fix_container_btn_save" :disabled="this.username_new_error || this.username_new.length < 4 || this.username_new.length > 32" @click="saveChangeNameBtn()">Save</button>
        </div>
      </div>
      <div class="fix_block_container" id="avatar_container" v-if="changeAvatar_isEnabled">
        <div class="fix_container_name">Change Avatar</div>
        <div class="avatar_list">
          <div class="avatar_item" v-on:click="selectAvatar(2)" :class="this.selectedAvatar == 2 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/2.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(3)" :class="this.selectedAvatar == 3 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/3.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(4)" :class="this.selectedAvatar == 4 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/4.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(5)" :class="this.selectedAvatar == 5 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/5.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(6)" :class="this.selectedAvatar == 6 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/6.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(7)" :class="this.selectedAvatar == 7 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/7.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(8)" :class="this.selectedAvatar == 8 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/8.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(9)" :class="this.selectedAvatar == 9 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/9.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(10)" :class="this.selectedAvatar == 10 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/10.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(11)" :class="this.selectedAvatar == 11 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/11.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(12)" :class="this.selectedAvatar == 12 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/12.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(13)" :class="this.selectedAvatar == 13 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/13.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(14)" :class="this.selectedAvatar == 14 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/14.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(15)" :class="this.selectedAvatar == 15 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/15.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(16)" :class="this.selectedAvatar == 16 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/16.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(17)" :class="this.selectedAvatar == 17 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/17.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(18)" :class="this.selectedAvatar == 18 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/18.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(19)" :class="this.selectedAvatar == 19 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/19.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(20)" :class="this.selectedAvatar == 20 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/20.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(21)" :class="this.selectedAvatar == 21 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/21.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(22)" :class="this.selectedAvatar == 22 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/22.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(23)" :class="this.selectedAvatar == 23 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/23.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(24)" :class="this.selectedAvatar == 24 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/24.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(25)" :class="this.selectedAvatar == 25 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/25.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(26)" :class="this.selectedAvatar == 26 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/26.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(27)" :class="this.selectedAvatar == 27 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/27.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(28)" :class="this.selectedAvatar == 28 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/28.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(29)" :class="this.selectedAvatar == 29 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/29.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(30)" :class="this.selectedAvatar == 30 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/30.svg">
          </div>
          <div class="avatar_item" v-on:click="selectAvatar(31)" :class="this.selectedAvatar == 31 ? 'selected_avatar' : ''">
            <img src="../assets/avatars/31.svg">
          </div>
        </div>
        <div class="change_password_btn_container">
          <button class="fix_container_btn_cancel" @click="openFixWindow('none')">Cancel</button>
          <button class="fix_container_btn_save" :disabled="this.selectedAvatar < 2 || this.selectedAvatar > 31" @click="saveChangeAvatarBtn()">Save</button>
        </div>
      </div>
    </div>
    <Header/>
    <div id="block_1">
      <div class="page_name_container">
      <router-link to="/profile/" class="page_back" v-if="!pagedefault" @click.native="openAnotherPage('default'); getSize()">
        <img src="../assets/back_angle.svg" alt="" srcset="">
        <div>Back</div>
      </router-link>
        <div class="page_name_text">
          {{ pageNameSelect }}
        </div>
        <div class="page_name_info"></div>
        <div id='infoTooltip' class="game-header-tooltip">
          <img src="../assets/info_in_square.svg" alt="info" height="24px" width="24px">
        </div>
      </div>
      <div class="page_container">
        <div class="left_menu" v-show="this.width <= 990 && this.pagedefault || this.width > 990">
          <router-link to="/profile/account-details" class="left_menu_item" :class="pageselected ? '' : 'active'" @click.native="openAnotherPage('account-details'); getSize()">
            <div class="left_menu_item_icon">
              <img src="../assets/account-details-tab-icon.svg" alt="" srcset="">
            </div>
            <div class="left_menu_item_name">
              Account details
            </div>
          </router-link>
          <router-link to="/profile/account-statistics" class="left_menu_item" :class="pageselected ? 'active' : ''" @click.native="openAnotherPage('account-statistics'); getSize()">
            <div class="left_menu_item_icon">
              <img src="../assets/account-statistics-tab-icon.svg" alt="" srcset="">
            </div>
            <div class="left_menu_item_name">
              Account statistics
            </div>
          </router-link>
        </div>
        <div class="right_menu" v-show="!this.pageselected && !this.pagedefault || !this.pageselected && this.width > 990">
          <div class="avatar_block">
            <img :src="require('../assets/avatars/'+$store.state.user.avatar+'.svg')" alt="" srcset="">
            <button class="avatar_edit" @click="openFixWindow('changeAvatar')">
              <div>Edit</div>
              <img src="../assets/pencil-icon.svg" class="account_name_edit_btn_img">
            </button>
          </div>
          <div class="account_info_container">
            <div class="account_name_block">
              <div class="account_name_text">{{ this.$store.state.user.name }}</div>
              <button class="account_name_edit_btn"  @click="openFixWindow('changeName')">
                <img src="../assets/pencil-icon.svg" class="account_name_edit_btn_img">
              </button>
            </div>
            <div class="account_info_block">
              <div class="account_info_row">
                <div class="account_info_name">
                  Email
                </div>
                <div class="account_info_data">
                  {{ this.$store.state.user.email }}
                </div>
              </div>
              <div class="account_info_row">
                <div class="account_info_name">
                  Password
                </div>
                <div class="account_info_data">
                  ○ ○ ○ ○ ○ ○ ○ ○
                </div>
                <button class="account_info_button" @click="openFixWindow('changePassword')">
                  <img src="../assets/pencil-icon.svg" alt="" srcset="">
                </button>
              </div>
              <div class="account_info_row">
                <div class="account_info_name">
                  Registered
                </div>
                <div class="account_info_data">
                  {{ this.$store.state.user.reg_date }}
                </div>
              </div>
              <div class="account_info_row">
                <div class="account_info_name">
                  Refferal link
                </div>
                <router-link to="https://coinwealth.group/refferal/CODE" class="account_info_data">
                  https://coinwealth.group/refferal/CODE
                </router-link>
                <button class="account_info_button">
                  <img src="../assets/copy-icon.svg" alt="" srcset="">
                </button>
              </div>
              
            </div>
          </div>
        </div>
        <div class="right_menu" v-show="pageselected && !this.pagedefault">
          <div class="block_income">
            <div class="income_header">INCOME</div>
            <div class="income_row mb-2">
              <div class="income_cell1"></div>
              <div class="income_cell2">
                USDT
              </div>
            </div>
            <div class="income_row">
              <div class="income_cell1">
                <div class="grey-row-text2">Investing</div>
              </div>
              <div class="income_cell2">
                <p>
                  <div>0</div>
                </p>
                <div class="grey-row-text">USDT</div>
              </div>
            </div>
            <div class="delimiter_light"></div>
            <div class="income_row">
              <div class="income_cell1">
                <div class="grey-row-text2">Refferals</div>
              </div>
              <div class="income_cell2">
                <p>
                  <div>0</div>
                </p>
                <div class="grey-row-text">BTC</div>
              </div>
            </div>
            <div class="delimiter-bold"></div>
            <div class="income_row">
              <div class="income_cell1">
                <div class="green-total-text">TOTAL</div>
              </div>
              <div class="income_cell2">
                <p>
                  <div>0</div>
                </p>
                <div class="grey-row-text">BTC</div>
              </div>
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

.disable_scroll {
  overflow: hidden;
}

.fix_container{
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
}

.fix_block_container{
  width: 368px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #131522;
  border-radius: 4px;
  padding: 24px 32px;
  z-index: 102;
}

#infoTooltip{
  margin-left: 10px;
}

.fix_container_name {
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: #fff;

  margin-bottom: 10px;
}

.fix_input_container {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  margin-bottom: 4px;
}

.fix_input_container > label {
  font-family: 'Poppins';
  font-size: 12px;
  color: #aeb1c5;
  margin-bottom: 4px;
}

.fix_input_container > input {
  height: 48px;
  background-color: #252732;
  color: #f8f8f8;
  font-weight: 200;

  padding: 14px 18px;
  padding-right: 28px;
  border: 1px solid #4f5364;
  border-radius: 2px;
  
  font-size: 1rem;
  outline: none;
}


.input_error_border {
  border: 1px solid #db2626 !important;
}

.invalid_field{
  font-family: 'Poppins';
  font-size: 12px;
  color: #db2626 !important;
  margin-top: 4px;
}


.fix_input_container > input::placeholder {
  color: #7f85ac;
  
}

.password-lock-icon{
  height: 28px;
  width: 28px;
  margin-right: 0;
  margin-top: -36px;
  margin-bottom: 10px;
  align-self: flex-end;

  cursor: pointer;
}

.change_password_tip {
  width: 100%;
  font-family: 'Poppins';
  font-size: 10px;
  color: #646882;
  margin-bottom: 4px;
}

.change_password_btn_container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  margin-top: 6px;
}

.change_password_btn_container > button {
  width: 50%;
  height: 40px;

  border: none;
  border-radius: 2px;
  font-family: 'Poppins';
  font-size: 14px;
  text-align: center;
  letter-spacing: .01em;
  font-weight: 600;
}

.fix_container_btn_cancel {
  background: #4f5364 !important;
  color: #f8f8f8 !important;
  margin-right: 18px;
}

.fix_container_btn_save {
  background: #b9f700 !important;
  color: #0c0e1b !important;
}

.fix_container_btn_save:disabled {
  background: #a8a9b1 !important;
  color: #5b5f7b !important;
}

.avatar_list{
  background: #0c0e1b;

  width: 100%;
  height: 244px;

  overflow-y: scroll;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  margin-bottom: 10px;
}

#avatar_container{
  width: 434px;
}

.avatar_item{
  width: 87px;
  margin: 2px;
}

.avatar_item > img{
  width: 84px;
}

.selected_avatar{
  border-radius: 50%;
  outline: 2px solid #00defc;
  -webkit-filter: drop-shadow(0 0 4px rgba(0,222,252,.8));
  filter: drop-shadow(0 0 4px rgba(0,222,252,.8));
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
}





.page_name_container{
  width: 100%;
  margin-top: 8px;
  padding: 16px 24px;
  background: hsla(0,0%,100%,.03);
  margin-bottom: 33px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.page_back{
  height: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  display: none;

  font-family: 'Poppins';
  font-size: 14px;
  color: #aeb1c5;
  text-decoration: none;
}

.page_back > img{
  height: 20px;
  margin-right: .5rem !important;
}

.page_back > div{
  line-height: 20px;
  margin: 0;
}

.page_name_text{
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  color: white;
  font-size: 16px;
  line-height: 24px;
  width: 70px;
}

.page_container{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  align-items: stretch;
}

.left_menu{
  width: 33%;
  max-width: 372px;
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-right: 1px solid #222432;
}

.left_menu_item.active{
  border: 1px solid #b9f700;
}

.left_menu_item{
  width: 100%;
  padding: 12px;
  background: hsla(0,0%,100%,.03);
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid hsla(0,0%,100%,.03);

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
}

.left_menu_item:hover{
  background: hsla(0,0%,100%,.1);
  cursor: pointer;
}

.left_menu_item_icon{
  width: 28px;
}

.left_menu_item_name{
  font-family: 'Poppins';
  color: white;
  margin-left: 10px;
}

.right_menu{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 16px;
  min-height: 327px;
}

.avatar_block{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 170px;
}

.avatar_block > img {
  width: 170px;
}

.avatar_edit{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  background: #222432 !important;
  border: none;
  color: #aeb1c5 !important;
  font-family: 'Poppins', monospace;
  font-weight: 600;
  border-radius: 2px;
}

.account_name_edit_btn_img{
  margin-left: 8px;
  height: 14px !important;
}

.account_info_container{
  width: 100%;
  padding-right: 8px;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.account_name_block{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: baseline;
  margin-bottom: 24px;
}

.account_name_text{
  font-family: 'IBM Plex Mono';
  font-weight: 700;
  font-size: 24px;
  color: #f8f8f8;
}

.account_name_edit_btn{
  margin-left: 8px;
  width: 30px;
  height: 30px;
  background: #222432;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}

.account_name_edit_btn_img{
  width: 30px;
  height: 30px;
  margin: 0;
}

.account_info_block{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
}

.account_info_row{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: baseline;
  padding: 8px 0;
  border-bottom: 2px solid #222432;
  width: 558px;
}

.account_info_name{
  font-family: 'Poppins';
  font-size: 16px;
  font-weight: 500;
  color: #aeb1c5;
  width: 144px;
}

.account_info_data{
  overflow-x: hidden;
  font-family: 'Poppins';
  font-size: 14px;
  color: #f8f8f8;
  width: 62%;
  white-space: nowrap;
}

a .account_info_data{
  cursor: pointer;
}

.account_info_button{
  width: 30px;
  height: 30px;

  background: #222432 !important;
  border-radius: 2px;
  border: none;

  margin-left: auto;
}

.account_info_button > img {
  width: 14px;
  margin-top: -2px;
}

.block_income{
  width: 390px;
  border-radius: 4px;
  padding: 12px;
  background: hsla(0,0%,100%,.03);
  
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
}

.income_header{
  color: #f8f8f8;
  font-size: 24px;
  font-family: 'IBM Plex Mono';
  font-weight: 800;
  letter-spacing: 2.4px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.income_row{
  width: 100%;
  height: 24px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  font-family: 'Poppins';
  font-size: 16px;
  color: #f8f8f8;
}

.income_cell1{
  width: 33%;
}

.income_cell2{
  width: 67%;
  height: 24px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.income_cell2 > img{
  height: 24px;
  margin-right: 8px;

}

.income_cell3{
  width: 37%;
}

.delimiter_light{
  margin: 8px 0;
  width: 100%;
  border: .5px solid #222432;
}

.delimiter-bold{
  margin: 8px 0;
  width: 100%;
  border: .5px solid #4f5364;
}

.btc-small-numbers{
  font-size: 80%;
  font-weight: 400;
}

.grey-row-text{
  font-family: 'Poppins';
  font-size: 14px;
  align-self: flex-end;
  color: #aeb1c5;
  margin-bottom: 1px;
  margin-left: 4px;
}

.grey-row-text2{
  font-family: 'Poppins';
  font-size: 14px;
  align-self: flex-start;
  color: #aeb1c5;
}

.green-total-text{
  font-family: 'IBM Plex Mono';
  font-weight: 800;
  font-size: 16px;
  text-transform: uppercase;
  color: #a2d800;
}

@media screen and (max-width: 1200px) {
  #block_1{
    width: 960px;
  }

  .avatar_block, .avatar_block > img{
    width: 140px;
  }
  .account_info_row{
    width: 468px;
  }
}

@media screen and (max-width: 990px) {
    #block_1{
      width: 720px;
    }

    .left_menu{
      padding: 0;
      max-width: none;
    }

    .page_back{
      display: flex;
      left: 20px;
      position: absolute;
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

    .left_menu{
      width: 100%;
      border-right: none;
    }

    .left_menu_item.active{
      border: 1px solid hsla(0,0%,100%,.03);
    }

    .right_menu{
      flex-direction: column;
    }
    .account_info_name{
      max-width: 127px;
    }

    .avatar_block, .avatar_block > img{
      width: 336px;
    }

    .avatar_block{
      margin-bottom: 20px;
    }

    .account_info_container{
      padding-left: 0;
      margin-bottom: 80px;
    }
    .account_info_row{
      width: 100%;
    }

    .block_income{
      width: 100%;
    }
}

@media screen and (max-width: 768px) {

  #block_1{
    width: 540px;
  }
  .avatar_block, .avatar_block > img{
    max-width: 246px;
    width: 40vw;
  }

  .account_info_name{
    width: auto;
    margin-right: 5px;
  }


  .account_info_row{
    min-height: 4em;
  }
  .account_info_data{
    white-space: break-spaces;
    height: 100%;
    max-height: 4em;

  }

  .block_income{
    margin-left: 0;
  }
}

@media screen and (max-width: 575px) {
  .fix_block_container{
    width: 100%;
    margin: .5rem;
  }
  
}

@media screen and (max-width: 444px) {
  .avatar_list{
    justify-content: space-around;
  }
  
}

</style>