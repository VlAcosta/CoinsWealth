<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'


export default {
  name: 'HomeView',
  components: {
    Header,
    Footer
  }
}
</script>

<template>
<div class="container">
    <Header/>
    <div class="main-container">
        <div class="page-404">
            <img id='p404' src="../assets/404.svg" alt="">
        </div>
        <div class="page-info-block">
            <div class="green-text">
                <p>Oops, something went wrong!</p>
            </div>
            <div class="default-text">
                <p>The page you are looking for was not found. Check your request or try again later.</p>
            </div>
            <button class="default-btn btn btn-secondary"><router-link to="/">Home page</router-link></button>
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

.default-btn {
  color: rgb(12, 14, 27) !important;
  background: rgb(162, 216, 0) !important;
}

.default-btn:hover{
  opacity: 60%;

}

.default-btn a, .default-btn a:hover {
  text-decoration: none;
}
.default-btn a {
    color: rgb(12, 14, 27);
    font-family: 'Poppins', sans-serif; 
    font-weight: 600;
    font-size: 14px;

}

Footer{
    margin-top: 100px;
}



</style>