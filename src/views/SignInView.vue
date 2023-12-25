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
  data: function () {
    return {
      email: '',
      password: '',
      showPassword: false,
      validationMessage: '',
    };
  },
  computed: {
    inputType() {
      return this.showPassword ? 'text' : 'password';
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    validatePassword() {
      // Add your password validation logic here
      // For example, you can set a validation message based on your criteria
      this.validationMessage = this.password.length < 8 ? 'Password must be at least 8 characters long' : '';
    },
    async sendData() {
      let data = {
        email: this.email,
        password: md5(this.password)
      }
      this.$store.dispatch('login', data)
      .then(() => this.$router.push('/'))
      .catch(err => console.log(err))
    }
  },
}
</script>

<template>
  <div class="block-in">
    <Header/>
    <div class="block-osn">
      <div class="sign-text">SIGN IN</div>
      <div class="main-container-authorize col-12 col-sm-10 col-md-8 col-lg-6">
        <form autocomplete="off" class="form w-100">
          <div xs="12" class="mb-4 form-group">
            <label for="email" class="">Email</label>
            <input id="email" name="email" placeholder="Type here your email" type="email" class="form-control" aria-invalid="false" value="" v-model="email">
            <div class="invalid-feedback"></div>
          </div>
          <div xs="12" class="pos-relative mb-1 form-group">
            <label for="password" class="">Password</label>
            <input id="password" name="password" placeholder="Pa$sw0rd" class="form-control" @input="validatePassword" :type="inputType" v-model="password" value="">
            <div class="password-lock-icon" @click="togglePasswordVisibility">
            <img v-if="showPassword" src="../assets/grey_lock_unlocked.svg" alt="hide_g" />
            <img v-else src="../assets/grey_lock_locked.svg" alt="show_g" />
          </div>
            <div class="invalid-feedback">{{ validationMessage }}</div>
          </div>
          <div xs="12" class="mb-3 form-group">
            <p class="default-text" style="text-align: end;">
              <router-link to="/forgot-password">Forgot your password?</router-link>
            </p>
          </div>
        </form>
        <button type="button" class="default-btn btn btn-secondary" v-on:click="sendData">
          <span>Sign in</span>
        </button>
        <p class="under-button-text">Don’t have an account? <router-link to="/sign-up">Sign up!</router-link></p>
      </div>
    </div>
    <Footer/>
  </div>
</template>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap');

a{
  text-decoration: none;
}

a:hover{
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
  place-content: center;
  -moz-box-pack: center;
  -moz-box-align: center;
  align-items: center;
  margin-top: -24px;
}

.sign-text{
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 56px;
  line-height: 100%;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  font-stretch: normal;
  padding-top: 64px;
  padding-bottom: 56px;
}

.main-container-authorize {
  width: 570px;
  padding-left: 80px;
  padding-right: 80px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  
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
  padding: 48px 0 ;
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
  background: rgb(162, 216, 0) !important;
  color: rgb(12, 14, 27) !important;
  width: 175px;
  border-radius: 4px;
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