<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'


export default {
  name: 'ForgotPassVue',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      email: '',

      err_email: false,
      msg_email: '',    
    };
  },
  computed: {
    isButtonActive() {
      return this.email.length >= 8 && !this.err_email;
    },
  },
  methods: {
    validateEmail() {
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.email.match(emailRegex)) {
        this.err_email = false;
        this.errorMsg_email = ''
      } else {
        this.err_email = true;
        this.msg_email = 'Please enter a valid email'
      }
    },
    BtnClick() {
      let data = {
        email: this.email
      }

      this.$store.dispatch('forgot_password', data)
      .then(resp => {
        switch (resp.data.status) {
          case "success":
          {
            alert('If this email is registered, you will receive an email with a link to restore your password. The email could have ended up in the spam folder!')
            //this.$router.push('/sign-in')
            break;
          }
        }
      })
       .catch(err => console.log(err))
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      
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
        <div class="default-text">That’s okay, it happens! Enter your email address to reset your password. You will <br> receive a link to create a new password.</div>
        <form autocomplete="off" class="form w-100">
            <div xs="12" class="mb-4 form-group">
                <label for="email" class="">Email</label>
                <input id="email" name="email" placeholder="Type here your email" type="email" class="form-control" :class="this.err_email ? 'input_error' : ''" v-on:input="validateEmail()" v-model="email">
                <label v-if="this.err_email"  for="email" class="invalid_message">{{ this.msg_email }}</label>
            </div>
        </form>
        <button type="button" class="default-btn w-50  btn btn-secondary" :disabled="!isButtonActive" @click="BtnClick()">
          <span>Get link</span>
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

}

.invalid_message{
  color: red !important;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
}

.input_error {
  border: 1px solid red !important;
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