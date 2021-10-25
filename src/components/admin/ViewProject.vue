<template>
  <div>
    <input type="checkbox" id="nav-toggle" />
    <div class="sidebar">
      <div class="sidebar-brand">
        <h2>
          <i class="fab fa-r-project"><span>Project Management</span></i>
        </h2>
      </div>
      <div class="sidebar-menu">
        <ul>
          <li>
            <a href=""
              ><i class="fas fa-tachometer-alt"></i><span>Dashboard</span></a
            >
          </li>

          <li>
            <a href="/admin_manager/technologies"
              ><i class="fab fa-node-js"></i><span>Technology</span></a
            >
          </li>
          <li>
            <a href="/admin_manager/members"
              ><i class="fas fa-user-tie"></i><span>Members</span></a
            >
          </li>
          <li>
            <a href="/admin_manager/units"
              ><i class="fab fa-unity"></i><span>Units</span></a
            >
          </li>
          <li>
            <a href="/admin_manager/projects"
              ><i class="fas fa-project-diagram"></i><span>Projects</span></a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="main-content">
    <input type="text" v-model="key" placeholder="search by status" />
    <br />
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Status</th>
          <th scope="col">Type</th>
          <th scope="col">Start Date</th>
          <th scope="col">End Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, id) in filteredProjects" :key="project.id">
          <th scope="row">{{ id + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.status.name }}</td>
          <td>{{ project.type.name }}</td>
          <td>{{ project.startDate }}</td>
          <td>{{ project.endDate }}</td>
        </tr>
      </tbody>
    </table>
    {{ message }}
  </div>
</template>

<script>
import axios from 'axios';
import jwt from 'jsonwebtoken';
export default {
  name: 'ViewProject',
  data() {
    return {
      projects: [],
      key: '',
      message: '',
      id: this.$route.params.id,
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
      const projects = await axios.get(`/units/projects/${this.id}`);
      this.projects = projects.data;
      console.log(this.projects);
    } catch (error) {
      console.log(error.response.message);
    }
  },
  computed: {
    filteredProjects: function () {
      return this.projects.filter(project => {
        return project.status.name.toLowerCase().match(this.key.toLowerCase());
      });
    },
  },

  methods: {},
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
}

.sidebar {
  width: 345px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #8fcaca;
  z-index: 100%;
  font-size: 18px;
}

.main-content {
  margin-left: 345px;
  font-size: 14px;
}
.sidebar-brand {
  height: 90px;
  padding: 1rem 0rem 1rem 2rem;
  color: #fff;
}

.sidebar-brand i {
  display: inline-block;
  padding-right: 1rem;
  font-size: 25px;
}

.sidebar-menu {
  margin-top: 1rem;
}

.sidebar-menu li {
  width: 100%;
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.sidebar-menu a {
  display: block;
  color: #fff;
  font-size: 1.1rem;
}

.sidebar-menu a.active {
  background: #fff;
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: rgb(204, 168, 180);
  border-radius: 30px 0px 0px 30px;
}

.sidebar-menu a i:first-child {
  font-size: 1.5rem;
  padding-right: 1rem;
}
.main-content {
  transition: margin-left 300ms;
  margin-left: 345px;
}
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 345px;
  width: calc(100% - 345px);
  top: 0;
  z-index: 100;
  background-color: #d4f0f0;
  transition: width 300ms;
}

#nav-toggle:checked + .sidebar li,
#nav-toggle:checked + .sidebar .sidebar-brand {
  padding-left: 1rem;
  text-align: center;
}

#nav-toggle:checked + .sidebar li a {
  padding-left: 0rem;
}

#nav-toggle:checked + .sidebar .sidebar-brand h2 span:last-child,
#nav-toggle:checked + .sidebar li a span {
  display: none;
}

#nav-toggle:checked + .sidebar {
  width: 70px;
}
#nav-toggle:checked ~ .main-content {
  margin-left: 70px;
}
#nav-toggle:checked ~ .main-content header {
  width: clac(100% - 70px);
  left: 70px;
}
header h2 {
  color: #222;
}
header label i {
  font-size: 1.7rem;
  padding-right: 1rem;
}
.search-wrapper {
  border: 1px solid #ccc;
  border-radius: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  overflow-x: hidden;
}

.search-wrapper i {
  display: inline-block;
  padding: 0rem 1rem;
  font-size: 1.5rem;
}

.user-wapper {
  display: flex;
  align-items: center;
}
.user-wapper i {
  color: rgb(72, 73, 40);
}

user.wapper small {
  display: inline-block;
  color: grey;
  margin-top: -3px;
}

main {
  margin-top: 85px;
  padding: 2rem 1.5rem;
  background: #f1f5f9;
  min-height: calc(100vh - 90px);
}

@media only screen and (max-width: 1200px) {
  .sidebar li,
  .sidebar .sidebar-brand {
    padding-left: 1rem;
    text-align: center;
  }

  .sidebar li a {
    padding-left: 0rem;
  }

  .sidebar .sidebar-brand h2 span:last-child,
  .sidebar li a span {
    display: none;
  }

  .sidebar {
    width: 70px;
  }
  .main-content {
    margin-left: 70px;
  }
  .main-content header {
    width: calc(100% - 70px);
    left: 70px;
  }

  .sidebar:hover {
    width: 345px;
    z-index: 200;
  }
  .sidebar:hover li,
  .sidebar:hover .sidebar-brand {
    padding-left: 2rem;
    text-align: left;
  }
  .sidebar:hover li a {
    padding-left: 1rem;
  }
  .sidebar:hover .sidebar-brand h2 span:last-child,
  .sidebar:hover li a span {
    display: inline;
  }
}

@media only screen and (max-width: 960px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
  .recent-grid {
    grid-template-columns: 60% 40%;
  }
}

@media only screen and (max-width: 768px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
  .recent-grid {
    grid-template-columns: 100%;
  }
  .search-wrapper {
    display: none;
  }
  .sidebar {
    left: -100% !important;
  }
  header h2 {
    display: flex;
    align-items: center;
  }
  header h2 label {
    display: inline-block;
    background-color: rgb(161, 57, 57);
    padding-right: 0rem;
    margin-right: 1rem;
    height: 40px;
    width: 40px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center !important;
  }
  header h2 {
    font-size: 1rem;
  }
  header h2 span {
    text-align: center;
    padding-right: 0rem;
  }
  .main-content {
    width: 100%;
    margin-left: 0rem;
  }
  header {
    width: 100% !important;
    left: 0 !important;
  }
  #nav-toggle:checked + .sidebar {
    left: 0 !important;
    z-index: 100;
    width: 150px;
  }
}

@media only screen and (max-width: 560px) {
}
</style>
