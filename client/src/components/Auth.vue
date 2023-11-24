<template>
  <form class="wrapper__form m-auto mt-200" @submit="auth">
    <input type="text" placeholder="Username:" v-model="authForm.username">
    <input type="password" placeholder="Password:" v-model="authForm.password">
    <button>Auth</button>
  </form>
</template>
<script>
  import "../../styles/form.component.css";

  export default {
    data() {
      return {
        authForm: {
          username: "",
          password: ""
        }
      }
    },
    methods: {
      async auth(e) {
        e.preventDefault();
        const token = (await this.axios.post("/auth", { username: this.authForm.username, password: this.authForm.password })).data.token;

        localStorage.setItem("token", token);

        window.location.href = "/";
      }
    }
  }
</script>
