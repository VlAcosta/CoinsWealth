<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Bar from '@/components/Bar.vue'


export default {
beforeRouteEnter(to, from, next) {
    // Используем функцию next с колбэком, который будет вызван после загрузки компонента
    next((vm) => {
      // Используем метод scrollTo для установки координат прокрутки страницы
      vm.$nextTick(() => {
        window.scrollTo(0, 0);
      });
    });
  },
  name: 'HomeView',
  components: {
    Header,
    Footer,
    Bar
  }
}

</script>

<template>
  <div class="main_str">
    <Header/>
    <div id="block_1">
      <div class="block_welcome">
        <div class="grad">
          <div id="grad-left"></div>
          <div id="grad-right"></div>
        </div>
        <div class="block-text">
          <div id="small_text">Welcome to</div>
          <div id="big_text">Coin Wealth</div>
          <div id="devis_text">Invest money. Earn money</div>
        </div>
        <img id="logo_city" src="../assets/city.png">      
      </div>
      <div class="block_create block_left">
        <div class="block_create2">
          <div class="block_create1">
            <div class="text-small">Investment for everyone</div>
            <div class="text-big">Make money on exchange<br> rate differences</div>
            <div class="text-bot">Coinwealth is a company that specializes in foreign currency trading. The company's primary goal is to help its clients make money by investing in various currencies at the right time</div>
          
          </div>
          <div class="block_create_list">
            <div class="create_listitem">
              <img src="../assets/blue_point.svg" class="list_dot">
              <div class="create_listitem_text">Choose your plan for a convenient number of months</div>
            </div>
            <div class="create_listitem">
              <img src="../assets/blue_point.svg" class="list_dot">
              <div class="create_listitem_text">Get your money back at any time</div>
            </div>
            <div class="create_listitem">
              <img src="../assets/blue_point.svg" class="list_dot">
              <div class="create_listitem_text">Withdraw your profit from $50.</div>
            </div>
            <div class="create_listitem">
              <img src="../assets/blue_point.svg" class="list_dot">
              <div class="create_listitem_text">Invite friends and earn money</div>
            </div>
          </div>
        </div>
        <router-link class='cr_rl' to="/sign-up"><button id="but-reg">Create account</button></router-link>
      </div>
      <div class="block_fast block_container block_right">
        <div class="text_container">
          <div id="grad-g"></div>
          <div id="grad-p"></div>
          <div class="text-small">Fast and easy</div>
          <div class="text-big">Open an account</div>
          <div class="text-bot">Within 10 mins top up your new account by transfer USDT to your wallet - free of charge.</div>
          <router-link  class='cr_rl' to="/sign-up"><button id="but-reg">Create account</button></router-link>
        </div>
        <div class="img_container">
          <img src="../assets/open_an_account.png" class="block_image">
        </div>
      </div>
      <div class="block_earn block_container block_left">
        <div class="text_container">
          <div class="text-small">Earn with us</div>
          <div class="text-big">Choose your plan</div>
          <div class="text-bot">There are four plans to choose from with different percentages and times. <br> Choose the one that suits you best.</div>
          <router-link @click.native="$scrollToTop" class='cr_rl' to="/sign-up"><button id="but-reg">Create account</button></router-link>
        </div>
        <div class="img_container">
          <img src="../assets/choose_your_plan.png" class="block_image">
        </div>
        
      </div>
      <div class="block_feel block_container block_right">
        <div class="text_container">
          <div class="text-small">Feel the benefit</div>
          <div class="text-big">Withdraw your <br>profit</div>
          <div class="text-bot">As soon as the profit of your package reaches $50,<br> you can immediately withdraw it to your wallet.</div>
          <router-link @click.native="$scrollToTop" class='cr_rl' to="/sign-up"><button id="but-reg">Create account</button></router-link>
        </div>
        <div class="img_container">
          <img src="../assets/withdraw_your_profit.png" class="block_image">
        </div>
      </div>
      <div class="block_many block_container block_left">
        <div class="text_container">
          <div class="text-small">Many plans together</div>
          <div class="text-big">Choose another plan</div>
          <div class="text-bot">You can choose multiple plans at the same time and invest in them. <br>Invest the way you want.</div>
          <router-link class='cr_rl' to="/sign-up"><button id="but-reg">Create account</button></router-link>
        </div>
      </div>
      <div class="block_under block_container block_right">
        <div class="text_container">
          <div class="text-small">Under control</div>
          <div class="text-big">Get your money back</div>
          <div class="text-bot">At any time you can take your money back minus the withdrawn interest.</div>
          <router-link class='cr_rl' to="/sign-up"><button id="but-reg">Create account</button></router-link>
        </div>
        <div class="img_container">
          <img src="../assets/get_your_money_back.png" class="block_image">
        </div>
      </div>
      <div class="block_invest block_container block_left">
        <div class="text_container">
          <div class="text-small">Invest with your friends</div>
          <div class="text-big">Become an affiliate <br>of Coin Wealth</div>
          <div class="text-bot">Invite your friends, acquaintances or followers and increase your portfolio value.</div>
          <div id="but-learn"><router-link to='/referral-program'>Learn more <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><g clip-path="url(#clip0_1_160)"><path d="M9.67994 1.9292L8.79656 2.81258L14.1686 8.18461H0.559998V9.43392H14.1686L8.79656 14.806L9.67994 15.6894L16.56 8.80926L9.67994 1.9292Z" fill="#9295AD"/></g><defs><clipPath id="clip0_1_160"><rect width="16" height="16" fill="white" transform="translate(0.559998 0.810059)"/></clipPath></defs></svg></router-link></div>
        </div>
        <div class="img_container">
          <img src="../assets/become_an_affilate.png" class="block_image">
        </div>
      </div>
      <div class="bar">
        <Bar />
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');


*{
  max-width: 100vw;
}

.bar{
  margin: 0px 45px
}

.cr_rl{
  text-decoration: none;
  color: white
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
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 50%;
  margin-right: -50%;
  transform: translateX(-50%);
}

.block_left{
  margin-left: 50px;
  margin-right: 50px;
  flex-direction: row;
}



.block_right{
  margin-right: 50px;
  margin-left: 50px;
  flex-direction: row-reverse;
}

.block_welcome{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  width: 100%;
  padding: 0 20px 0 20px;
}


.grad{
  max-width: 100%;
  display: flex;
  -moz-box-pack: justify;
  align-items: center;
  box-sizing: border-box;
}

#grad-left{
  position: absolute;
  left: 150px;
  width: 211px;
  height: 269px; 
  z-index: 1;
  border-radius: 269px;
  background: rgba(185, 247, 0, 0.8);
  filter: blur(100px);
}

#grad-right{
  position: absolute;
  width: 11%;
  height: 269px; 
  left: 80%;
  z-index: 1;
  border-radius: 269px;
  background: rgba(96, 78, 215, 0.8);
  filter: blur(100px);
}

#logo_city{
  height: 550px;
}

.block-text{
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  margin-top: 8vh;
  max-height: 40vh;
}



#small_text{
  color: #AEB1C5;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
}

#big_text{
  color: #F8F8F8;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 64px;
  line-height: 75px; /* 140.625% */
  z-index: 2;

}

#devis_text{
  color: #F8F8F8;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
  z-index: 2;
}

.block_create{
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: -5%;
  margin-bottom: 50px;
}

.block_create1{
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 550px;
}

.block_create2{
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  max-width: 90vw;
}

.block_container{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}


.img_container{
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px;
}


.block_image{
  width: 100%;
  min-width: 200px;
  min-height: 200px;
  align-self: center;
}


.block_create_list{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.create_listitem{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  margin: 5px 0;
}

.create_listitem_text{
  margin-left: 10px;
  color: #F8F8F8;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
}

.list_dot{
  width: 8px;
}

.block_fast > div{
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 50px;
  max-width: 50%;
}




.block_earn > div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-bottom: 50px;
  max-width: 50%;
}

.block_feel > div{
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 50px;
  max-width: 50%;
}

.block_many > div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-bottom: 50px;
  max-width: 50%;
}

.block_under > div{
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 50px;
  max-width: 50%;
}

.block_invest > div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-bottom: 50px;
  max-width: 50%;
}


.text-small{
  color: #AEB1C5;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  padding-bottom: 10px ;
  z-index: 2; 
  background: none;
}

.text-big{
  color: #F8F8F8;
  font-family: 'Poppins', sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; 
  z-index: 3; 
  background: none;
}

.text-bot{
  color: #F8F8F8;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 137.5% */
  z-index: 2; 
  margin-top: 15px ;
  background: none;
}
  

#but-reg{
  display: flex;
  margin-top: 15px ;
  max-width: 153.13px;
  padding: 10px  18px 10px 18px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 5px;
  background: #B9F700;
  z-index: 2; 
}

#but-learn{
  margin-top: 25px;
  color: #FFF;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
  text-decoration: none;
}

#but-reg > text{
  color: #0C0E1B;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  line-height: 18.2px; /* 130% */
  letter-spacing: 0.14px;
}

#but-learn > a{
  text-decoration: none;
  color: white;
  margin-right: 10px;
}

#grad-g{
  position: absolute;
  width: 205px;
  height: 163px;
  flex-shrink: 0;
  z-index: 1;
  border-radius: 205px;
  background: rgba(162, 216, 0, 0.48);
  filter: blur(27.75px);
}

#grad-p{
  position: absolute;
  width: 277px;
  height: 221px;
  flex-shrink: 0;
  z-index: 0;
  margin: -100px 0 0 75px ;
  border-radius: 277px;
  background: rgba(96, 78, 215, 0.50);
  filter: blur(33.75px);
}

a{
  cursor: pointer;
}







@media screen and (max-width: 1250px) {
  #logo_city{
    height: 400px;
  }
}

@media screen and (max-width: 920px)  {
  .block_create2{
    flex-wrap: wrap;
  }
  .block_create_list{
    margin-top: 30px;
  }
    #logo_city{
      max-width: 350px;
  }
}

@media screen and (max-width: 700px) {
  .block_left, .block_right{
    align-self: flex-start;
    margin-left: 0;
    margin-right: 0;
    justify-content: center;
    flex-direction: column;
  }

  .img_container{
    min-width: 80%;
    margin: 0;
    align-items: center;
    max-width: 300px;
  }

  .img_container > img{
    align-self: center;

  }
  .text_container{
    min-width: 100%;
    align-self: flex-start;
  }


  .block_feel:last-child{
    align-self: center;
  }

  .block_right{
    align-self: center;
    margin-left: 0;
    margin-right: 0;
    flex-direction: column;
  }
  .block_create, .block_fast, .block_earn, .block_feel, .block_many, .block_under, .block_invest{
    margin: 20px;
  }
  .block_create{
    margin-top: -10px;
  }
}

@media screen and (max-width: 550px) {
  #logo_city{
    height: 412px;
    margin-left: -250px;
  }
  #small_text{
    font-size: 12px;
    line-height: 18px; 
  }
  #big_text{
    font-size: 52px;
    line-height: 55px; 
  }
  #devis_text{
    font-size: 12px;
    line-height: 18px;
  }
  #grad-left{
    opacity: 0.6;
  }
  .block_welcome{
    padding-left: 36px;
  }
  .block_create{
    margin-top: -90px;
  }
}


</style>






