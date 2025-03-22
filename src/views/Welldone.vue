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
    this.email =  this.$store.state.user.email
    this.$store.dispatch('logout')
  }
}
</script>

<template>
<div class="container">
    <Header/>
    <div class="main-container">
        <div class="text-confirm">
          Confirm your Email
        </div>
        <div class="page-info-block">
          <div class="default-text">
                <p>Please finish your registration by following the invitation link in the confirmation email sent to:</p>
            </div>
            <div class="green-text">
                <p>{{ this.email }}</p>
            </div>
            <div class="def_text">
                <span>If you don’t see the confirmation email in your box folder, please check your Spam folder. If you have any other problems please contact us via email <br><span style="color: #1970f7;">support@coinwealth.group</span></span>
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