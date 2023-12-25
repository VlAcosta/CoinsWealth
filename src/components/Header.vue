<template>
    <header>
        <div class="main-header" id="app">
            <div class="container-main">
                <router-link v-show="isLoggedIn" to="/wallet"><img id="logo" src="../assets/logo.png"></router-link>
                <router-link v-show="!isLoggedIn" to="/"><img id="logo" src="../assets/logo.png"></router-link>
                <div class="main-header-au" v-if="isLoggedIn">
                    <router-link to="/market" >
                        <div class="header-icon-container">
                            <div class="icon market-icon"></div>
                        </div>
                    </router-link>
                    <router-link to="/wallet" >
                        <div class="header-icon-container">
                            <div class="icon wallet-icon"></div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="container-main-rg">
                <div class="main-header-au-rg-1" v-if="isLoggedIn">
                    <div class="container_wallet">
                        <div class="single_value">
                            {{$store.state.user.balance}}
                        </div>
                        <img id="usdt_text" src="../assets/usdt.png">
                    </div>
                    <div class="username-text">
                        <img :src="require('../assets/avatars/'+$store.state.user.avatar+'.svg')" alt="avatar" id="avatar">
                        <router-link to='/profile'>{{ this.$store.state.user.name }}</router-link>
                    </div>
                </div>
                <img id="burger" @click="toggleMenu"  src="../assets/burger.svg">
            </div>
        </div>
        <div class="main-header-au-rg" v-if="isLoggedIn">
                    <div class="container_wallet">
                        <div class="single_value">
                            {{$store.state.user.balance}}
                        </div>
                        <img id="usdt_text" src="../assets/usdt.png">
                    </div>
                    <div class="username-text">
                        <img :src="require('../assets/avatars/'+$store.state.user.avatar+'.svg')" alt="avatar" id="avatar">
                        <router-link to='/profile'>{{ this.$store.state.user.name }}</router-link>
                    </div>
                </div>
        <div class="fixed-navbar-menu" :class="{ 'fixed-navbar-menu_visible': isMenuOpen }">
            <div class="header-main">
                <div @click="closeMenu" class="close-menu"></div>
            </div>
            <div class="vertical-menu">
                <router-link class="menu-item" to="/sign-in" v-if="!isLoggedIn">
                    <div class="icon sign-in-icon"></div>
                    <div class="ml-3">Sign in</div>
                </router-link>
                <router-link class="menu-item" to="/sign-up" v-if="!isLoggedIn">
                    <div class="icon sign-up-icon"></div>
                    <div class="ml-3">Sign up</div>
                </router-link>
                <router-link class="menu-item" to="/admin" v-if="$store.getters.isLoggedIn && $store.getters.isAdmin">
                    <div class="icon home-icon"></div>
                    <div class="ml-3">Admin Panel</div>
                </router-link>
                <router-link class="menu-item" to="/">
                    <div class="icon home-icon"></div>
                    <div class="ml-3">Home</div>
                </router-link>
                <router-link class="menu-item" to="/profile">
                    <div class="icon home-icon"></div>
                    <div class="ml-3">Profile</div>
                </router-link>
                <router-link class="menu-item" to="/wallet" v-if="isLoggedIn">
                    <div class="icon wallet-icon"></div>
                    <div class="ml-3">Wallet</div>
                </router-link>
                <router-link class="menu-item" to="/market" v-if="isLoggedIn">
                    <div class="icon market-icon"></div>
                    <div class="ml-3">Market</div>
                </router-link>
                <router-link class="menu-item" to="/referral-program">
                    <div class="icon ref-program-icon"></div>
                    <div class="ml-3">Referral Program</div>
                </router-link>
                <router-link class="menu-item" to="/about">
                    <div class="icon about-icon"></div>
                    <div class="ml-3">About</div>
                </router-link>
                <router-link class="menu-item" to="/faq">
                    <div class="icon faq-icon"></div>
                    <div class="ml-3">FAQ</div>
                </router-link>
                <div class="delimiter"></div>
                <div v-if="isLoggedIn" class="menu-item" @click="logout">
                    <div class="icon logout-icon"></div>
                    <div class="ml-3">Log out</div>
                </div>
                <div v-if="isLoggedIn" class="delimiter"></div>
                <router-link class="menu-item" to="/privacy">
                    <div class="icon"></div>
                    <div class="text-grey ml-3">Privacy Policy</div>
                </router-link>
                <router-link class="menu-item" to="/terms">
                    <div class="icon"></div>
                    <div class="text-grey ml-3">Terms of Service</div>
                </router-link>
            </div> 
        </div>
    </header>
</template>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Poppins&display=swap');

    #usdt_text{
        width: 20px;
        height: 20px;
        margin: 6px 6px;
    }
    
    header{
        display: block;
        padding: 24px ;
    }
    .main-header{
        display: flex;
        -moz-box-pack: justify;
        justify-content: space-between;
        -moz-box-align: center;
        align-items: flex-start;
        box-sizing: border-box;
    }
    #logo{
        width: 240px;
        display: flex;
        justify-content: start;
    }
    #burger{
        display: flex;
        justify-content: end;
        margin-top: 4px;
        margin-right: 4px;
    }

    .fixed-navbar-menu{
        font-family: 'Poppins', sans-serif;
        font-size: 12px;
        line-height: 140%;
        color: rgb(255, 255, 255);
        box-sizing: border-box;
        position: fixed;
        right: -281px;
        width: 280px;
        max-width: 100vw;
        top: 0;
        background: rgb(34, 36, 50);
        border-radius: 0px 0px 0px 8px;
        z-index: 10;
        transition: all 0.8s ease 0s;
        visibility: hidden;
    }
    .header-main{
        display: flex;
        -moz-box-pack: end;
        justify-content: flex-end;
        -moz-box-align: center;
        align-items: center;
        padding: 16px 24px;
    }
    .close-menu{
        width: 42px;
        height: 42px;
        margin-top: 3px;
        margin-right: 3px;
        cursor: pointer;
        content: url("../assets/burger_menu_cross.svg");
    }
    .fixed-navbar-menu .vertical-menu{
        margin-bottom: 8px;
    }
    .fixed-navbar-menu .vertical-menu > .menu-item{
        display: flex;
        -moz-box-align: center;
        align-items: center;
        -moz-box-pack: start;
        justify-content: flex-start;
        padding: 12px 32px;
        margin: 0px;
        width: 100%;
    }

    .fixed-navbar-menu .vertical-menu > .menu-item > .sign-in-icon {
        content: url("../assets/sign_in.svg");
    }
    .fixed-navbar-menu .vertical-menu > .menu-item:hover .sign-in-icon {
       content: url("../assets/sign_in_green.svg");
    }

    .fixed-navbar-menu .vertical-menu > .menu-item > .sign-up-icon {
        content: url("../assets/sign_up.svg");
    }
    .fixed-navbar-menu .vertical-menu > .menu-item:hover .sign-up-icon {
       content: url("../assets/sign_up_green.svg");
    }

    .fixed-navbar-menu .vertical-menu > .menu-item > .home-icon {
        content: url("../assets/home.svg");
    }
    .fixed-navbar-menu .vertical-menu > .menu-item:hover .home-icon {
       content: url("../assets/home_green.svg");
    }

    .fixed-navbar-menu .vertical-menu > .menu-item > .wallet-icon {
        content: url("../assets/wallet.svg");
    }
    .fixed-navbar-menu .vertical-menu > .menu-item:hover .wallet-icon {
       content: url("../assets/wallet_green.svg");
    }

    .fixed-navbar-menu .vertical-menu > .menu-item > .market-icon {
        content: url("../assets/market.svg");
    }
    .fixed-navbar-menu .vertical-menu > .menu-item:hover .market-icon {
       content: url("../assets/market_green.svg");
    }

    .fixed-navbar-menu .vertical-menu > .menu-item > .ref-program-icon {
        content: url("../assets/referral_program.svg");
    }
    .fixed-navbar-menu .vertical-menu > .menu-item:hover .ref-program-icon {
       content: url("../assets/referral_program_green.svg");
    }

    .fixed-navbar-menu .vertical-menu > .menu-item > .about-icon {
        content: url("../assets/about_us.svg");
    }
    .fixed-navbar-menu .vertical-menu > .menu-item:hover .about-icon {
       content: url("../assets/about_us_green.svg");
    }

    .fixed-navbar-menu .vertical-menu > .menu-item > .logout-icon {
        content: url("../assets/log_out.svg");
    }
    .fixed-navbar-menu .vertical-menu > .menu-item:hover .logout-icon {
       content: url("../assets/log_out_green.svg");
    }

    .fixed-navbar-menu_visible {
        right: 0px;
        visibility: visible;
        transition: all 0.8s ease 0s;
    }
    .fixed-navbar-menu .delimiter {
        width: 100%;
        border: 0.5px solid rgba(255, 255, 255, 0.1);
        margin-bottom: 8px;
        margin-top: 8px;
    }

    .ml-3{
        margin-left: 1rem !important;
    }
    .fixed-navbar-container .vertical-menu > .menu-item > .icon {
        height: 16px;
        width: 16px;
    }

    .fixed-navbar-menu .vertical-menu > a {
        text-decoration: none;
        color: rgb(255, 255, 255);
    }

    .fixed-navbar-menu .vertical-menu > .menu-item > .icon {
        height: 16px;
        width: 16px;
    }

    a:hover {
        fill: rgb(0, 86, 179);
    }
    .fixed-navbar-menu .vertical-menu > .menu-item:hover {
        background: rgb(18, 21, 39);
    }

    .container-main{
        max-width: 200px;
        display: flex;
        flex-direction: row;
    }
    
    .container-main-rg{
        display: flex;
        flex-direction: row;
        margin-top: 10px;
    }


    .main-header-au{
        margin-left: 15px;
        align-items: center;
        display: flex;
        flex-direction: row;
    }

    

    .header-icon-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 4px 8px;
        width: 40px;
        height: 40px;
        background: hsla(0,0%,100%,.1);
        border: 1px transparent;
        border-radius: 4px;
        margin-right: 8px;
    }

    .icon {
        height: 20px;
        width: 20px;
        cursor: pointer;
    }

    .market-icon {
        content: url(../assets/market_white.svg);
    }
    .wallet-icon{
        content: url(../assets/wallet_white.svg);
    }

    .container_wallet{
        display: flex;
        align-items: center;
        min-width: 10px;
        font-size: 14px;
        padding: 4px 6px 4px 10px;
        border: 1px solid #4f5364;
        border-radius: 2px;
        background-color: #0c0e1b;
    }

    #icon_btc{
        width: 24px;
    }
    p{
        margin: 0 0 0 7px;
    }
    .single_value{
        text-align: center;
        color: #f8f8f8;
    }

    .username-text {
        align-items: center;
        margin-left: 15px;
        display: flex;
        height: 40px;
        margin-right: 0;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #f8f8f8;
        overflow: hidden;
    }

    a{
        text-decoration: none;
        color: #f8f8f8;

    }

    #avatar{
        width: 32px;
        margin-right: 10px;
    }

    .main-header-au-rg{
        display: none;
    }

    .main-header-au-rg-1{
        display: flex;
        flex-direction: row;
        padding: 0 10px;
        margin-top: 5px;

    }


@media screen and (max-width: 760px) {
    .main-header-au-rg{
        max-width: 100%;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .main-header-au-rg-1{
        display: none;
    }
    #burger{
        margin-top: 0;
    }
    .main-header-au{
        display: none;
    }
}


</style>

<script>
export default {
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    data() {
        return {
            isMenuOpen: false
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        closeMenu() {
            this.isMenuOpen = false;
        },
        logout: function () {
            this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/sign-in')
            })
      }
    }
};
</script>

