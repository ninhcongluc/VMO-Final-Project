<template>
  <div>
    <h1>Home Page</h1>
    <a @click="handleLogout"><i class="fas fa-sign-in-alt"> Logout</i></a>
  </div>
</template>

<script>
// import axios from 'axios';
import jwt from 'jsonwebtoken';
export default {
  name: 'Home',
  data() {
    return {};
  },
  async created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/');
    } else {
      const token = localStorage.getItem('token');
      const user = jwt.verify(token, process.env.VUE_APP_SOMEKEY);
      console.log(user);
    }
  },
  async mounted() {},
  methods: {
    async handleLogout() {
      localStorage.clear();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped></style>
