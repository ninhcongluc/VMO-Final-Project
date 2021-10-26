<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="/employee">Home</a>

      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li>
          <a class="nav-link" href="#"
            >Member <span class="sr-only">(current)</span></a
          >
        </li>
        <li>
          <a class="nav-link" href="#">View My Task</a>
        </li>
        <li>
          <a @click="handleLogout" class="nav-link disabled" href="#">Logout</a>
        </li>
      </ul>
    </nav>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Start Date</th>
          <th scope="col">End Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, id) in tasks" :key="task.id">
          <th scope="row">{{ id + 1 }}</th>
          <td>{{ task.name }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.startDate }}</td>
          <td>{{ task.endDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import jwt from 'jsonwebtoken';
export default {
  name: 'Task',
  data() {
    return {
      id: this.$route.params.id,
      tasks: [],
    };
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
  async mounted() {
    try {
      const tasks = await axios.get(`/projects/tasks/${this.id}`);
      this.tasks = tasks.data;
      console.log(this.tasks);
    } catch (error) {
      console.log(error.response.message);
    }
  },
  methods: {
    async handleLogout() {
      localStorage.clear();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped></style>
