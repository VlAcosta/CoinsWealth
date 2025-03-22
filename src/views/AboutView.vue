<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Bar from '@/components/Bar.vue'


export default {
  name: 'HomeView',
  components: {
    Header,
    Footer,
    Bar
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
    <div class="main-str">
        <Header/>
        <div id="block_1">
            <div class="block_welcome">
                <div class="grad">
                    <div id="grad-left"></div>
                </div>
                <div class="block-text">
                    <div id="small_text">Learn more</div>
                    <div id="big_text">About Coinwealth</div>
                    <div id="devis_text">What is it and how it works</div>
                </div>
                <img id="logo_city" src="../assets/about_btc_image.png">      
            </div>
            <div class="general-fluid-container what-is-limercoin-fluid-container container-fluid">
              <div class="what-is-limercoin-container container">
                  <div class="row">
                      <div class="display-flex-column col-12 col-sm-12 col-md-12 col-lg-11 offset-lg-1">
                          <div class="small-grey-text mb-2">Make money on exchange rate differences</div>
                          <div class="heading-text green-color mb-2">Reliable solution</div>
                      </div>
                      <div class="display-flex-column justify-content-start col-12 col-sm-6 col-md-6 col-lg-5 offset-lg-1">
                          <div class="medium-white-text">In today's fast-paced world, making money has become more challenging than ever. With the rise of globalization, businesses and individuals alike are exposed to the fluctuating exchange rates of different currencies</div>
                      </div>
                      <div class="display-flex-column justify-content-start  col-12 col-sm-6 col-md-6 col-lg-5">
                          <div class="medium-white-text">While this may seem like a daunting task, Coinwealth has emerged as a reliable solution for those who want to make money on exchange rate differences.</div>
                      </div>
                      <div class="display-flex-column col-12 col-sm-12 col-md-12 col-lg-11 offset-lg-1">
                          <div class="mt-3"><button type="button" class="default-btn white-btn btn btn-secondary"><span><router-link class="cl_1" to="/sign-up">Create account</router-link></span></button></div>
                      </div>
                  </div>
              </div>
            </div>
            <div class="block_feel block_container block_left">
              <div class="text_container">
                <div class="text-small">Let's expand our understanding further</div>
                <div class="text-big">What is Coinwealth</div>
                <div class="text-bot">Coinwealth is a company that specializes in foreign currency trading. The company's primary goal is to help its clients make money by investing in various currencies at the right time. With years of experience in the industry, Coinwealth has developed a reputation for being one of the most trusted and reliable companies in the market.</div>
                <button id="but-reg"><router-link class="cl_1" to="/sign-up">Create account</router-link></button>
              </div>
            </div>
            <div class="block_many block_container block_right">
              <div class="text_container">
                <div class="text-small">Experienced professionals</div>
                <div class="text-big">Your investments are in safe hand</div>
                <div class="text-bot">Coinwealth is the company that has a team of experienced professionals who have a deep understanding of the foreign exchange market. These experts use their knowledge and expertise to analyze market trends and identify profitable opportunities for their clients. This means that clients can rest assured that their investments are in safe hands.</div>
                <button id="but-reg"><router-link class="cl_1" to="/sign-up">Create account</router-link></button>
              </div>
          </div>
          <div class="block_feel block_container block_left">
              <div class="text_container">
                <div class="text-small">Options for different needs</div>
                <div class="text-big">Choose a plan that best suits your investment goals</div>
                <div class="text-bot">Coinwealth offers a range of investment options to suit different needs and budgets. Whether you are a seasoned investor or a beginner, Coinwealth has something to offer you. The company's investment plans are designed to be flexible and customizable, so clients can choose a plan that best suits their investment goals.</div>
                <button id="but-reg"><router-link class="cl_1" to="/sign-up">Create account</router-link></button>
              </div>
            </div>
            <div class="block_many block_container block_right">
              <div class="text_container">
                <div class="text-small">Make informed investment decisions</div>
                <div class="text-big">Learn more about the foreign exchange market</div>
                <div class="text-bot">In addition to its investment services, Coinwealth also offers educational resources to help clients learn more about the foreign exchange market. The company's website features a range of articles, videos, and tutorials that cover everything from the basics of foreign currency trading to advanced trading strategies. This makes it easier for clients to make informed investment decisions and maximize their returns.</div>
                <button id="but-reg"><router-link class="cl_1" to="/sign-up">Create account</router-link></button>
              </div>
          </div>
          <Bar/>
        </div>
        <Footer/>
    </div>
</template>


<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
*{
  max-width: 100vw;
}

.cl_1{
  text-decoration: none;
  color: black;
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
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 50%;
  margin-right: -50%;
  transform: translateX(-50%);
}

.block_right{
  display: flex;
  min-width: 350px;
  flex-direction: row;
  align-self: flex-start;
}

.block_left{
  display: flex;
  min-width: 350px;
  flex-direction: row-reverse;
  align-self: flex-end;
}

.block_welcome{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  width: 100%;
  padding: 0 20px 0 20px;
}


#grad-left{
  position: absolute;
  margin-top: 8vh;
  left: 0px;
  width: 211px;
  height: 269px; 
  z-index: 1;
  border-radius: 269px;
  background: rgba(185, 247, 0, 0.8);
  filter: blur(100px);
}

#logo_city{
  height: 550px;
}

.block-text{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  margin-top: 18vh;
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

.second-block{
  display: flex;
  max-width: 960px;
  padding: 0px 8px 8px 8px;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

#small-sec{
  color: #AEB1C5;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 137.5% */
}

.general-fluid-container {
    width: 100%;
    padding-right: 0;
    padding-left: 0;
    position: relative;
}

.what-is-limercoin-fluid-container {
    padding-top: 48px;
}

.small-grey-text {
    color: #aeb1c5;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    line-height: 22px;
}

.heading-text.green-color {
    font-size: 34px;
    line-height: 45px;
    color: #f8f8f8;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    color: #b9f700;
}

.medium-white-text {
    color: #f8f8f8;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
}

.front-page-container .display-flex-column {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-right: 10px;
    width: 100%;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.default-btn.white-btn {
  display: flex;
  margin: 35px 0;
  max-width: 153.13px;
  padding: 10px  18px 10px 18px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 5px;
  background: #f8f8f8!important;
  color: #0c0e1b!important;
  z-index: 2; 
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

#but-reg > text{
  color: #0C0E1B;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  line-height: 18.2px; /* 130% */
  letter-spacing: 0.14px;
}


.text_container {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 50px;
    max-width: 50%;
}






@media screen and (max-width: 920px)  {
  .block_create2{
    flex-wrap: wrap;
  }
  .block_create_list{
    margin-top: 30px;
  }
}

@media screen and (max-width: 820px) {
  .logo_city{
    height: 300px;
    margin-left: -100px;
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
    max-width: 400px;
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
    min-width: 500px;
    margin-left: -140px;
  }
  #small_text{
    font-size: 12px;
    line-height: 18px; 
  }
  #big_text{
    font-size: 32px;
    line-height: 42px; 
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

@media screen and (max-width: 1250px) {
  #logo_city{
    height: 400px;
  }
}

</style>