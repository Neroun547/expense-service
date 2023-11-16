<script setup>
import { RouterLink, RouterView } from 'vue-router'
import "../styles/normalize.css";
import "../styles/main.css";
</script>

<template>
  <div class="wrapper__nav">
    <nav v-if="!auth">
      <RouterLink to="/">Main</RouterLink>
      <RouterLink to="/auth">Auth</RouterLink>
      <RouterLink to="/signup">Sign up</RouterLink>
    </nav>
    <nav v-if="auth">
      <RouterLink to="/">Main</RouterLink>
      <button @click="exit">Exit</button>
    </nav>
  </div>
  <RouterView />
</template>

<script>
  export default {
    data() {
      return {
        auth: false
      }
    },
    methods: {
      exit() {
        localStorage.setItem("token", "");

        window.location.reload();
      }
    },
    async mounted() {
      if(localStorage.getItem("token")) {

        try {
          await this.axios.get("auth");

          this.auth = true;
        } catch(e) {
          this.auth = false;
        }
      } else {
        this.auth = false;
      }
    }
  }
</script>

<style scoped>
  .wrapper__nav {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: rgba(60,106,215,0.98);
  }
  .wrapper__nav nav {
    max-width: 1000px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .wrapper__nav nav a {
    color: #fff;
    text-decoration: none;
    padding: 5px;
    transition: .2s;
  }
  .wrapper__nav a:hover {
    background-color: rgba(215,187,17,0.98);
    border-radius: 5px;
    color: #000;
    transition: .2s;
  }
  .wrapper__nav nav button {
    cursor: pointer;
  }
</style>
