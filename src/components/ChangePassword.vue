<template>
  <div class="container">
    <div class="header">
      <div class="icon">
        <i id="v_char" class="fab fa-vimeo-v"> </i
        ><i id="m_char" class="fab fa-maxcdn"></i>
        <i id="o_char" class="fab fa-opera"></i>
      </div>
    </div>
    <h3>Change password for</h3>
    <h5>@{{ name }}</h5>
    <div class="form">
      <form @submit.prevent="changePassword" action="">
        <p>Password:</p>
        <input
          id="password"
          type="password"
          v-model="newPassword"
          placeholder="Enter your email address"
        />
        <p>Confirm Password:</p>
        <input
          id="confirm_password"
          type="password"
          v-model="confirmPassword"
          placeholder="Enter your email address"
        />
        <label id="error_mess" v-if="isError">{{ errorMessage }}</label>
        <label id="success_mess" v-if="!isError">{{ successMessage }}</label>
        <br />
        <button class="change_pass btn btn-">Change Password</button>
        <br />
        <a href="/"><i class="fas fa-backward"></i>Login Page</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import jwt from 'jsonwebtoken';
export default {
  name: 'ChangePassword',
  data() {
    return {
      userId: '',
      username: '',
      newPassword: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: '',
      isError: false,
    };
  },
  async created() {
    const token = this.$route.params.token;
    const user = jwt.verify(token, process.env.VUE_APP_SOMEKEY);
    this.userId = user.id;
    this.name = user.name;
  },
  async mounted() {},
  methods: {
    async changePassword() {
      try {
        const response = await axios.post('/change_pass', {
          id: this.userId,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        });
        console.log(response.data);
        this.successMessage = response.data;
        this.isError = false;
        this.$route.push({ path: '/change_pass' });
      } catch (error) {
        this.errorMessage = error.response.data;
        this.isError = true;
      }
    },
  },
};
</script>

<style scoped>
.header {
  font-size: 60px;
  background-color: rgb(20, 0, 57);
  border-radius: 4px;
}
.icon {
  margin-left: 40%;
}
#v_char {
  color: #ff7200;
}
#m_char,
#o_char {
  color: white;
}

h3 {
  margin-top: 20px;
  margin-left: 35%;
}
h5 {
  margin-left: 43%;
  color: rgb(79, 192, 164);
}

.form {
  width: 500px;
  height: 400px;
  border: 1px solid;
  margin-top: 20px;
  margin-left: 26%;
  margin-right: auto;
  background-color: rgb(80, 65, 107);
  border-radius: 5px;
}

.form p {
  margin-top: 20px;
  color: white;
  margin-left: 15px;
}
.form #password,
.form #confirm_password {
  margin-top: 5px;
  width: 450px;
  height: 40px;
  margin-left: 15px;
  background-color: black;
  border-radius: 3px;
  color: white;
}

.form .change_pass {
  margin-top: 40px;
  width: 450px;
  height: 35px;
  margin-left: 15px;
  color: white;
  background-color: green;
}

#error_mess {
  margin-left: 15px;
  color: rgb(221, 61, 61);
}
#success_mess {
  margin-left: 15px;
  color: rgb(56, 228, 79);
}
a {
  margin-left: 15px;
  color: rgb(185, 176, 202);
}
</style>
