<script>
// @ is an alias to /src
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
      is_loading: true,
      error_link: false
    };
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
  beforeMount() {
    let data = {
      code: this.$route.params.key
    }
    this.$store.dispatch('confirm_account', data)
      .then(resp => {
        switch (resp.data.status) {
          case "link_invalid":
          {
            this.error_link = true
            this.is_loading = false
            break;
          }
          case "success":
          {
            this.error_link = false
            this.is_loading = false
            break;
          }
          default:
          {
            this.error_link = true
            this.is_loading = false
          }
        }
      })
      .catch(err => console.log(err))
  }
}
</script>

<template>
<div class="container">
    <Header/>
    <svg v-if="this.is_loading" version="1.1" style="margin-top: 50px; margin-left: 50%; margin-right: -50%; transform: translateX(-50%); width: 200px; color: rgb(162, 216, 0);" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
    <div class="main-container" v-else>
        <div class="text-confirm">
          {{ this.error_link ? 'ACCOUNT NOT CONFIRMED' : 'CONFIRMED SUCCESSFULLY' }}
        </div>
        <div class="page-info-block">
          <div class="default-text">
                <p>{{ this.error_link ? 'Your account confirmation link appears to be invalid.' : 'Everything went well, your account was confirmed and you can sign in and start investing right now.' }}</p>
            </div>
            <router-link to="/sign-in" v-if="!this.error_link"><button style="background: rgb(162, 216, 0);" type="button" class="default-btn btn btn-secondary" >
              <span style="color: black;">Sign in</span>
            </button></router-link>
            <br>
            <div class="def_text">
                <span>If you have any problems with access to the site, please contact us via email <br><span style="color: #1970f7;">support@coinwealth.group</span></span>
            </div>
        </div>
    </div>
    <Footer/>
</div> 
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap');

.container{
    height: 980px;
}

.main-container{
    display: flex;
    flex-direction: column;
    height: 550px;
    align-items: center;
    justify-content: center;
    padding-top: 16px;
    padding-bottom: 8px;
}

#p404 {
    width: 300px;
    height: 175px;
}

.text-confirm{
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 56px;
    line-height: 100%;
    text-align: center;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: #fff;
    font-stretch: normal;
    padding-top: 64px;
    padding-bottom: 48px;
}

.page-info-block{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 48px 32px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
}

.green-text {
    font-family: 'Poppins', sans-serif; 
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    color: rgb(185, 247, 0);
}


.default-text {
    font-family: 'Poppins', sans-serif; 
    font-size: 14px;
    line-height: 58px;
    text-align: center;
    color: rgb(248, 248, 248);
}


.def_text{
  width: 70%;
  font-family: 'Poppins', sans-serif; 
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: rgb(248, 248, 248);
}

Footer{
    margin-top: 100px;
}



</style>