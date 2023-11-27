<template>
  <form class="wrapper__form m-auto mt-200" @submit="signup">
    <input type="text" placeholder="Username:" v-model="signupForm.username">
    <input type="password" placeholder="Password:" v-model="signupForm.password">
    <button type="submit">Sign up</button>
  </form>
</template>
<script>
  import "../../../styles/form.component.css";

  export default {
    data() {
      return {
        signupForm: {
          username: "",
          password: ""
        }
      }
    },
    methods: {
      async signup(e) {
        e.preventDefault();

        const api = await this.axios.post("/signup", {
          username: this.signupForm.username,
          password: this.signupForm.password
        });
      }
    }
  }
</script>
