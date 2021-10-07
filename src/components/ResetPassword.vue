<template>
  <div class="container">
    <div class="header">
      <div class="icon">
        <i id="v_char" class="fab fa-vimeo-v"> </i
        ><i id="m_char" class="fab fa-maxcdn"></i>
        <i id="o_char" class="fab fa-opera"></i>
      </div>
    </div>
    <h3>Reset your password</h3>
    <div class="form" v-if="!status">
      <p>
        Enter your user account's verified email address and we will send you a
        password reset link.
      </p>
      <form @submit.prevent="submitEmail" action="">
        <input
          id="email"
          type="text"
          v-model="email"
          placeholder="Enter your email address"
        />
        <label id="error_mess">{{ errorMessage }}</label>
        <br />
        <button class="send_mail btn btn-">Send password reset email</button>
      </form>
    </div>
    <div class="form" v-if="status">
      <p>
        Check your email for a link to reset your password. If it doesn’t appear
        within a few minutes, check your spam folder.
      </p>
      <br />
      <button @click="returnSigIn()" class="send_mail btn btn">
        Return to sign in
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      status: false,
      email: '',
      errorMessage: '',
    };
  },
  async created() {},
  async mounted() {},
  methods: {
    async submitEmail() {
      try {
        const response = await axios.post('/verify', { email: this.email });
        if (response.status === 200) {
          this.status = true;
        }
      } catch (error) {
        this.errorMessage = error.response.data;
      }
    },
    returnSigIn() {
      this.$router.push({ path: '/' });
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
  font-size: 30px;
  margin-left: 37%;
  margin-right: auto;
  margin-top: 30px;
}

.form {
  width: 500px;
  height: 400px;
  border: 1px solid;
  margin-top: 20px;
  margin-left: 26%;
  background-color: rgb(80, 65, 107);
}

.form p {
  margin-top: 20px;
  color: white;
  margin-left: 15px;
}
.form #email {
  margin-top: 20px;
  width: 450px;
  height: 40px;
  margin-left: 15px;
  background-color: black;
  border-radius: 3px;
  color: white;
}

.form .send_mail {
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
</style>
