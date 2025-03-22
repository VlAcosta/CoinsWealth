<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import md5 from 'js-md5';


export default {
  name: 'SignInVue',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      newpass: '',
      repeatpass: '',
      showNewPassword: false,
      showRepPassword: false,

      err_newpass: false,
      err_reppass: false,

      msg_newpass: '',
      msg_reppass: '',

      validationMessage: '',
      acceptTerms: false,      
      subscribeEmails: false,      
    };
  },
  computed: {
    inputNewType() {
      return this.showNewPassword ? 'text' : 'password';
    },
    inputRepType() {
      return this.showRepPassword ? 'text' : 'password';
    },
    isButtonActive() {
      return !this.err_newpass && !this.err_reppass && this.newpass.length >= 8 && this.repeatpass.length >= 8;
    },
  },
  methods: {
    toggleNewPasswordVisibility() {
      this.showNewPassword = !this.showNewPassword;
    },
    toggleRepPasswordVisibility() {
      this.showRepPassword = !this.showRepPassword;
    },
    validatePassword() {
      if (this.newpass.length < 8 || this.newpass.length > 32) {
        this.msg_newpass = 'Invalid password. Password length must be between 8 and 32 symbols.';
        this.err_newpass = true
      } else this.err_newpass = false;

      if (this.newpass != this.repeatpass) {
        this.msg_reppass = 'Passwords must be the same';
        this.err_reppass = true
      } else this.err_reppass = false;
    },
    BtnClick() {
      let data = {
        code: this.$route.params.key,
        newpass: md5(this.newpass)
      }

      this.$store.dispatch('reset_password', data)
      .then(resp => {
        switch (resp.data.status) {
          case "success":
          {
            alert('Password changed successfully')
            this.$router.push('/sign-in')
            break;
          }
          case "url_expired":
          {
            this.$router.push('/')
            alert('The link has expired or contains an error!')
            break;
          }
        }
      })
       .catch(err => console.log(err))
    },
    check_link() {
      let data = {
        code: this.$route.params.key
      }

      this.$store.dispatch('check_link_resetpass', data)
      .then(async (resp) => {
        if (resp.data.status == "url_expired") {
          this.$router.push('/')
          alert('The link has expired or contains an error!')
        }
      })
    }
  },
  beforeMount() {
    this.check_link()
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
  <div class="block-in">
    <Header/>
    <div class="block-osn">
      <div class="sign-text">PASSWORD RESET</div>
      <div class="main-container-authorize col-12 col-sm-10 col-md-8 col-lg-6">
        <div class="default-text">That’s okay, it happens! Enter new password.</div>
        <form autocomplete="off" class="form w-100">
            <div xs="12" class="mb-4 form-group">
                <label for="newpass" class="">New Password</label>
                <div class="inputflex">
                  <input id="newpass" name="newpass" placeholder="Type here new password" :type="inputNewType" class="form-control" :class="err_newpass ? 'input_error' : ''" v-on:input="validatePassword()" v-model="newpass">
                  <div class="password-lock-icon" v-on:click="toggleNewPasswordVisibility">
                    <img v-if="showNewPassword" src="../assets/grey_lock_unlocked.svg" alt="hide_g" />
                    <img v-else src="../assets/grey_lock_locked.svg" alt="show_g" />
                  </div>
                </div>
                <label v-if="this.err_newpass" for="newpass" class="invalid_message">{{ this.msg_newpass }}</label>

                <label for="repeatpass" class="">Repeat new Password</label>
                <div class="inputflex">
                  <input id="repeatpass" name="repeatpass" placeholder="Repeat New Password"  :type="inputRepType" class="form-control" :class="err_reppass ? 'input_error' : ''" v-on:input="validatePassword()" v-model="repeatpass">
                  <div class="password-lock-icon" @click="toggleRepPasswordVisibility">
                    <img v-if="showRepPassword" src="../assets/grey_lock_unlocked.svg" alt="hide_g" />
                    <img v-else src="../assets/grey_lock_locked.svg" alt="show_g" />
                  </div>
                </div>
                <label v-if="this.err_reppass" for="repeatpass" class="invalid_message">{{ this.msg_reppass }}</label>
            </div>
        </form>
        <button type="button" class="default-btn w-50  btn btn-secondary" :disabled="!isButtonActive" @click="BtnClick()">
          <span>Reset Password</span>
        </button>
      </div>
    </div>
    <Footer/>
  </div>
</template>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

a{
  text-decoration: underline;
}


.block-osn{
  width: 100%;
  display: flex;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  flex-direction: column;
  place-content: center;
  -moz-box-pack: center;
  -moz-box-align: center;
  align-items: center;
}

.sign-text{
  font-family: 'IBM Plex Mono', monospace;
  font-size: 56px;
  font-weight: 800;
  line-height: 100%;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  font-stretch: normal;
  padding-top: 64px;
  padding-bottom: 48px;
}

.main-container-authorize {
  max-width: 580px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  width: 90%;
}


.main-container-authorize label {
  display: flex;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  color: rgb(174, 177, 197);
  flex: 0 0 auto;
  order: 0;
  margin-bottom: 4px;
  text-align: left;
}

label {
  display: inline-block;
  margin-bottom: 0.5rem;
  background-color: 1px solid white;

}

.main-container-authorize .form-group .form-control:hover {
  border: 1px solid rgb(185, 247, 0);
  outline: none;
}

.main-container-authorize .form-group .form-control:focus {
  border: 1px solid rgb(255, 255, 255);
  box-shadow: none;
}

.main-container-authorize .form-group .form-control {
  display: flex;
  height: 46px;
  padding: 13.5px 18px 12.5px 18px;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border: 1px solid #4F5364;
  background: #252732;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal; 
  margin-bottom: 15px;
  outline: none;
}

.invalid_message{
  color: red !important;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  margin-top: -10px;
}

.input_error {
  border: 1px solid red !important;
}

.inputflex {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}

.password-lock-icon {
  height: 45px;
  margin-left: -30px;
  cursor: pointer;
}

::placeholder {
  color: #646882;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.w-100 {
  padding: 20px 20px ;
}


.default-btn {
  background: rgb(162, 216, 0) !important;
  color: rgb(12, 14, 27) !important;
}

.main-container-authorize .under-button-text {
  height: 20px;
  margin-top: 15px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  color: rgb(174, 177, 197);
  -moz-box-flex: 0;
  flex: 0 0 auto;
  -moz-box-ordinal-group: 1;
  order: 0;
}

Footer{
  margin-top: 200px;
}




.default-text {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  line-height: 140%;
  text-align: center;
  color: rgb(248, 248, 248);
}
</style>