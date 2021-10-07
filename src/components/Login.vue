<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleSubmit" action="">
        <h3>
          Sign in to
          <div class="header">
            <div class="icon">
              <i id="v_char" class="fab fa-vimeo-v"> </i
              ><i id="m_char" class="fab fa-maxcdn"></i>
              <i id="o_char" class="fab fa-opera"></i>
            </div>
          </div>
        </h3>
        <label id="errMess" for="">{{ errorMessage }}</label>
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
            <a id="forgot_pass" href="/password_reset"
              >Forgot password?</a
            ></label
          >
          <input
            type="password"
            class="form-control"
            v-model="password"
            v-on:keyup.enter="passHandle"
            placeholder="Password"
          />
        </div>
        <div>
          <button id="login" class="btn btn-primary btn-block">Login</button>
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
      errorMessage: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('/login', {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem('token', response.data);
        this.$router.push({ path: '/home' });
      } catch (error) {
        // console.log(error.response);
        this.errorMessage = error.response.data;
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>

<style scoped>
.auth-wrapper {
  margin-top: 50px;
  color: white;
}
.auth-inner {
  background-color: rgb(20, 0, 57);
}
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
  color: rgb(241, 240, 240);
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

#errMess {
  color: red;
}

#login {
  margin-top: 30px;
  background-color: rgb(32, 175, 32);
}
.header {
  margin-top: 10px;
}
.icon {
  margin-left: 0;
}
#v_char {
  color: #ff7200;
}
#m_char,
#o_char {
  color: white;
}

input {
  background-color: black;
  color: white;
}
input:focus {
  background-color: black;
  color: white;
}
</style>
