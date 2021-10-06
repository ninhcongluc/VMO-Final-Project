<template>
  <nav id="navbar_1" class="navbar navbar-expand-lg navbar-light bg-light">
    <a id="title" class="navbar-brand" href="/home">Home</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
  </nav>
  <br /><br />
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleSubmit" action="">
        <h3>Sign in<i id="loginFont" class="fas fa-sign-in-alt"></i></h3>
        <label id="errMess" for=""></label>
        <div class="form-group">
          <label for=""
            >Username <i id="userFont" class="far fa-user"></i
          ></label>
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="username"
          />
        </div>

        <div class="form-group">
          <label for=""
            >Password <i id="passFont" class="fas fa-unlock-alt"></i>
            <a id="forgot_pass" href="">Forgot password?</a></label
          >
          <input
            type="password"
            class="form-control"
            v-model="password"
            v-on:keyup.enter="passHandle"
            placeholder="Password"
          />
        </div>
        <label id="errPass" for=""></label>

        <div>
          <button class="btn btn-primary btn-block">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post('/login', {
        username: this.username,
        password: this.password,
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data);
        return this.$router.push({ path: '/home' });
      }
    },
  },
};
</script>

<style scoped>
.auth-wrapper .form-control:focus {
  border-color: #778699;
  box-shadow: none;
}
.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

#userFont,
#passFont,
#loginFont {
  color: rgb(100, 77, 83);
}
#navbarSupportedContent {
  margin-left: 85%;
  margin-right: 0px;
}
#title {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 23px;
  margin-left: 15px;
}
#forgot_pass {
  color: rgb(100, 102, 219);
  margin-left: 120px;
  font-size: 14px;
}
</style>
