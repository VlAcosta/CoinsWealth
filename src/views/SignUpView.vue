<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios';
import md5 from 'js-md5';


export default {
  name: 'SignInVue',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      acceptTerms: false,      
      subscribeEmails: false,
      
      error_email: false,
      error_password: false,

      errorMsg_email: '',
      errorMsg_password: ''
    };
  },
  computed: {
    inputType() {
      return this.showPassword ? 'text' : 'password';
    },
    isButtonActive() {
      return this.acceptTerms && this.subscribeEmails && !this.error_email &&!this.error_password && this.email.length > 0 && this.password.length > 0;
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    validateEmail() {
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.email.match(emailRegex)) {
        this.error_email = false;
        this.errorMsg_email = ''
      } else {
        this.error_email = true;
        this.errorMsg_email = 'Please enter a valid email'
      }
    },
    validatePassword() {
      var passwordRegex = /^[A-Za-z0-9]\w{0,}$/;
      if (/*!this.password.match(passwordRegex) && this.password.length > 0*/ false) {
        this.error_password = true;
        this.errorMsg_password = 'Invalid password. Password contains forbidden symbols.'
      } else if (this.password.length < 8 || this.password.length > 32) {
        this.error_password = true;
        this.errorMsg_password = 'Invalid password. Password length must be between 8 and 32 symbols.'
      } else {
        this.error_password = false;
        this.errorMsg_password = '';
      }
    },
    async sendData() {
      let data = {
          email: this.email,
          password: md5(this.password)
        }
        this.$store.dispatch('register', data)
        .then(resp => {
          if (resp.data.status == 'user_exist') {
            return alert("This email has already been registered")
          } else if (resp.data.status == 'success') this.$router.push('/well-done')
        })
       .catch(err => console.log(err))
    }
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
      <div class="sign-text">SIGN UP</div>
      <div class="main-container-authorize col-12 col-sm-10 col-md-8 col-lg-6">
        <form autocomplete="off" class="form w-100">
            <div xs="12" class="mb-4 form-group">
                <label for="email" class="">Email</label>
                <input id="email" name="email" placeholder="Type here your email" type="email" class="form-control" :class="error_email ? 'error_color' : ''" aria-invalid="false" value="" v-model="email" v-on:input="validateEmail()">
                <div class="invalid_field" v-if="error_email">{{ errorMsg_email }}</div>
            </div>
            <div xs="12" class="pos-relative mb-1 form-group">
              <label for="password" class="">Password</label>
              <input id="password" name="password" placeholder="Pa$sw0rd" class="form-control" @input="validatePassword" :type="inputType" v-model="password" value="" :class="error_password ? 'error_color' : ''">
              <div class="invalid_field" v-if="error_password">{{ errorMsg_password }}</div>
              <div class="password-lock-icon" @click="togglePasswordVisibility">
                <img v-if="showPassword" src="../assets/grey_lock_unlocked.svg" alt="hide_g" />
                <img v-else src="../assets/grey_lock_locked.svg" alt="show_g" />
              </div>
            </div>
            <div class="pos-relative mb-4 form-check">
                <input id="privacy" name="privacy" type="checkbox" class="limer-checkbox form-check-input" v-model="acceptTerms">
                <label for="privacy" class="checkbox-label pl-4">I accept the <router-link to="/terms">Terms of Use</router-link> and the <router-link to="/privacy">Privacy Policy.</router-link></label>
            </div>
            <div class="pos-relative mb-4 form-check">
                <input id="subscribeEmails" name="subscribeEmails" type="checkbox" class="limer-checkbox form-check-input" v-model="subscribeEmails">
                <label for="subscribeEmails" class="checkbox-label pl-4">I don’t mind getting emails with news, promotions, and special offers.</label>
            </div>
        </form>
        <button type="button" class="default-btn w-50  btn btn-secondary" :disabled="!isButtonActive" :style="{ background: isButtonActive ? 'rgb(162, 216, 0) !important' : '' }" v-on:click="sendData">
          <span>Sign up</span>
        </button>
        <p class="under-button-text">Already have an account? <router-link to="/sign-in">Sign in!</router-link></p>
      </div>
    </div>
    <Footer/>
  </div>
</template>


<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap');

a{
  text-decoration: underline;
}

.block-in{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.block-osn{
  width: 100%;
  display: flex;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  flex-direction: column;
  -moz-box-pack: center;
  -moz-box-align: center;
  align-items: center;
}

.sign-text{
  font-family: 'IBM Plex Mono';
  font-weight: 700;
  font-size: 56px;
  line-height: 100%;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  font-stretch: normal;
  padding-top: 38px;
  padding-bottom: 58px;
}

.main-container-authorize {
  width: 570px;
  padding-left: 80px;
  padding-right: 80px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.main-container-authorize label {
  display: block;
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

.error_color {
  border: 1px solid #db2626 !important;
}

.invalid_field{
  font-family: 'Poppins';
  font-size: 12px;
  color: #db2626;
  margin-top: 4px;
}

.main-container-authorize .form-group .form-control:hover {
  border: 1px solid rgb(185, 247, 0);
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
  padding: 27px 0px ;
}

.pos-relative {
  position: relative;
}

.main-container-authorize .password-lock-icon {
  top: 36px;
  height: 28px;
  position: absolute;
  right: 2px;
  width: 28px;
  cursor: pointer;
}

.default-btn {
  
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



.password-lock-icon{
  margin-top: -5px;
}

.main-container-authorize .checkbox-label {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  line-height: 140%;
  color: rgb(248, 248, 248);
  -moz-box-flex: 0;
  flex: 0 0 auto;
  -moz-box-ordinal-group: 2;
  order: 1;
}

.mb-4, .mb-3{
    margin-top: 25px;
}

.main-container-authorize a:hover {
  text-decoration: underline;
}

.main-container-authorize a {
  color: rgb(25, 112, 247);
  text-decoration: none;
  margin: 0 5px 0 5px;
}


input[type=checkbox] {
  background: none;
  border-radius: 1px;
  border: solid 1px #4f5364;
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

@media screen and (max-width: 1200px) {
  .main-container-authorize {
      width: 480px;
    }

}

@media screen and (max-width: 990px) {
  .main-container-authorize {
    padding-left: 65px;
    padding-right: 65px;
  }
}

@media screen and (max-width: 1024px) {
  footer {
    margin-top: 18.52%;
  }
}

@media screen and (max-width: 770px) {
  .main-container-authorize {
      width: 450px;
    }
}

@media screen and (max-width: 575px) {
  .main-container-authorize {
      width: 90vw;
      padding-left: 33px;
      padding-right: 33px;
    }
}
</style>