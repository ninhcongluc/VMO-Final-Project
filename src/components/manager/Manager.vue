<template>
  <div>
    <h3>Project management of the unit {{ manager.unit.name }}</h3>
    <template v-for="project in projects" :key="project.id">
      <button>{{ project.name }}</button>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import jwt from 'jsonwebtoken';
export default {
  name: 'Manager',
  data() {
    return {
      manager: {},
      projects: [],
    };
  },
  async created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/');
    } else {
      const token = localStorage.getItem('token');
      const user = jwt.verify(token, process.env.VUE_APP_SOMEKEY);
      try {
        const userInfo = await axios.get(`/users/${user.id}`);
        this.manager = userInfo.data;
        const projects = await axios.get('/projects');
        this.projects = projects.data.filter(
          project => project.unit.id === this.manager.unit.id
        );
        console.log(this.projects);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  },
  async mounted() {},
  methods: {},
};
</script>

<style scoped>
button {
  width: 300px;
  height: 300px;
  margin-left: 10%;
}
</style>
