<script>
import store from './store/store.js'

export default {
  created: function () {
    
  },
  mounted() {
    this.loadCrispChat();
  },
  methods: {
    loadCrispChat() {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "72a8a6b9-731d-4d69-aad8-919cef48f113"; // Ваш ID Crisp

      const script = document.createElement('script');
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }
}

</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #0C0E1B;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


</style>

