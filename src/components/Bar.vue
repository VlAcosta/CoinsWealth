<template>
    <div class="enter-universe-container container">
        <div class="small-grey-text">Just try it</div>
        <div class="big-white-heading-text mb-3">Enter the Universe</div>
        <div class="row">
            <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                <router-link to='/sign-up' class="menu-item"> 
                    <div class="register-block enter-universe-wrapper">
                        <div class="heading-block">
                            <div class="heading-text mr-2">Register</div>
                            <div><img src="../assets/right_arrow.svg" alt="arrow" width="16" height="16"></div>
                        </div>
                        <div class="general-text">It is very easy. Don’t waste any moment</div>
                        <span></span>
                    </div>
               </router-link>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4">
               <router-link to="/faq" class="menu-item"> 
                    <div class="faq-block enter-universe-wrapper">
                        <div class="heading-block">
                            <div class="heading-text mr-2">FAQ</div>
                            <div><img src="../assets/right_arrow.svg" alt="arrow" width="16" height="16"></div>
                        </div>
                         <div class="general-text">Still have questions? Also, don’t forget to visit our <br><span class="about-us-text">About Us</span> page</div>
                    </div>
                </router-link> 
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                <div class="contact-us-block enter-universe-wrapper">
                    <div class="heading-block">
                        <div class="heading-text mr-2">Contact us</div>
                        <div><img src="../assets/chat_icon.svg" alt="arrow" width="16" height="16"></div>
                    </div>
                    <div class="general-text">Don’t hesitate to reach us directly via <a href="mailto: support@coinwealth.group" class="email-text-link">support@coinwealth.group</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700;800;900&family=Poppins&display=swap');




.small-grey-text {
    color: #aeb1c5;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    line-height: 20px;
}

.big-white-heading-text {
    color: #f8f8f8;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 48px;
    line-height: 67px;
}


.enter-universe-wrapper {
  min-width: 230px;
  height: 100%;
  position: relative;
  display: flex;
  flex: 1 0 30%;
  padding: 80px 30px 50px 30px;
  flex-direction: column;
  align-items: flex-start;
  grid-gap: 8px;
  gap: 8px;
  background: #222432;
  box-sizing: border-box;
}

.col-sm-6{
  margin-bottom: 1.5rem!important;
}
.register-block {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 100% 0;
    background-image: url(../assets/register_block_background.png);
}

.faq-block {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 100% 100%;
    background-image: url(../assets/faq_block_background.png);
}

.contact-us-block {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top;
    background-image: url(../assets/contact_us_background.png);
}

.heading-block {
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
}

.heading-text {
    color: #f8f8f8;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 24px;
    line-height: 34px;
}

.mr-2, .mx-2 {
    margin-right: 0.5rem!important;
}

.general-text {
    width: 100%;
    color: #aeb1c5;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    line-height: 16px;
}
.email-text-link {
    color: #b9f700;
    cursor: pointer;
}

.col-lg-4{
    width: 30%;
}

.menu-item{
    text-decoration: none;
}


.row{
    display: flex;
    flex-wrap: wrap;
}

@media screen and (max-width: 768px) {
 .enter-universe-wrapper {
    width: 100%;
    margin-right: 0;
  }   
}

@media screen and (max-width: 500px) {
    .row{
        display: flex;
        flex-direction: column;
    }
    .enter-universe-wrapper{
        padding: 25px 100px;
    }
    .heading-block{
        margin-left: -80px;
    }
    .general-text{
        margin-left: -80px;
        width: 150px;
    }
}
</style>