<template>
  <div>
    <h1>Employee Page</h1>
  </div>
</template>

<script>
// import axios from 'axios';
import jwt from 'jsonwebtoken';
export default {
  name: 'Employee',
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
  methods: {},
};
</script>

<style scoped></style>
