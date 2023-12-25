<script>
export default {
    methods: { 
        scrollToTop() {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'instant'
            })
        }
}

}
</script>

<template>
    <footer>
        <div class="mb-3-osn">
            <div class="mb-3">
                <span class="name_g">Quick links</span>
                <span class="name_v_g"><router-link @click.native="scrollToTop" to="/">Home</router-link></span>
                <span class="name_v_g"><router-link @click.native="scrollToTop" to="/about">About</router-link></span>
                <span class="name_v_g"><router-link @click.native="scrollToTop" to="/faq">FAQ</router-link></span>
                <span class="name_v_g"><router-link @click.native="scrollToTop" to="/referral-program">Referral Program</router-link></span>
            </div>
            <div class="mb-3">
                <span class="name_g">Legals</span>
                <span class="name_v_g"><router-link @click.native="scrollToTop" to="/">Privacy Policy</router-link></span>
                <span class="name_v_g"><router-link @click.native="scrollToTop" to="/terms">Terms of Service</router-link></span>
                <span class="name_v_g"><router-link @click.native="scrollToTop" to="">Disclaimer</router-link></span>
            </div>
            <div class="mb-3" id="mb-3">
                <span class="name_g">Contact us</span>
                <div class="lg_block">
                    <img class="lg" id="inst" src="../assets/inst.svg">
                    <img class="lg" id="twit" src="../assets/twit.svg">
                </div>
                <div class="em_block">
                    <img class="lg" id="email" src="../assets/emai.svg">
                    <span class="name_v_g"><a href="support@coinwealth.group"></a></span>
                </div>
            </div>
        </div>
        <div class="block_rights">
            <span id="rights">coinwealth © 2023 All rights reserved</span>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700;800;900&family=Poppins&display=swap');

footer{
    padding: 16px;
    justify-content: center;
    flex-direction: column;
    display: flex;
}
.mb-3-osn {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    max-width: 1300px;
    margin-left: 50%;
    margin-right: -50%;
    padding-left: 10%;
    transform: translateX(-50%);
    border-bottom: 2px solid #4F5364;
    height: 100%;
    padding-bottom: 10px;
}
.mb-3{
    width: 380px;
    display: flex;
    text-align: left;
    flex-direction: column;
    justify-content: space-between;

}
#mb-3{
    width: 363px;
    justify-content: flex-start;
}
.name_g{
    color: #F8F8F8;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    padding-bottom: 5px;
    text-transform: uppercase;
}
.name_v_g{
    color: #AEB1C5;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
}

#twit{
    margin-left: 16px;
}

#email{
    display: inline-block;
}
.lg{
    width: 24px;
    height: 24px;
}

.em_block{
    margin-top: 16px;
    justify-content: center;
    white-space: nowrap;
}

.em_block > span{
    margin-left: 8px;
    line-height: none;
}

.block_rights{
    display: flex;
    flex-direction: column;
}

#rights{
    color: #4F5364;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-style: normal;
    line-height: 14px;  
    font-weight: 400; 
    padding-top: 12px;
}

hr{
    border-top: 1px solid #4F5364;
    margin: 0;
    margin-left: 13%;
    margin-right: 120px;
}

a {
    cursor: pointer;
    text-decoration: none;
    color: #AEB1C5;
}

@media screen and (max-width: 766px){
        .mb-3-osn{
        flex-direction: column;
    }
}

@media screen and (max-width: 700px)  {
    .name_g{
        font-size: 15px;
        line-height: 20px; 

    }
    .name_v_g{
        font-size: 12px;
        line-height: 18px;
        max-width: 80%;
    }

}

@media screen and (max-width: 620px)  {
    .name_g{
        font-size: 13px;
        line-height: 20px; 

    }

}


@media screen and (max-width: 480px)  {

    .mb-3-osn{
        width: 90vw;
        padding-left: 0;
    }
    .name_g{
        font-size: 12px;
        line-height: 20px; 

    }
    .name_v_g{
        font-size: 10px;
        line-height: 18px;
        max-width: 80%;
    }
    .em_block{
        margin-top: 6px;
        min-width: 80px;   
    }
    #twit{
        margin-left: 6 ;
    }
}
</style>