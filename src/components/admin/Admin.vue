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
            <a href=""><i class="fab fa-node-js"></i><span>Technology</span></a>
          </li>
          <li>
            <a href=""><i class="fas fa-user-tie"></i><span>Members</span></a>
          </li>
          <li>
            <a href=""><i class="fab fa-unity"></i><span>Units</span></a>
          </li>
          <li>
            <a href=""
              ><i class="fas fa-project-diagram"></i><span>Projects</span></a
            >
          </li>
          <li>
            <a href=""><i class="fas fa-tasks"></i><span>Tasks</span></a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="main-content">
    <header>
      <div class="header-title">
        <h2>
          <label for="nav-toggle"> <i class="fas fa-bars"></i></label>
        </h2>
      </div>
      <div class="search-wrapper">
        <i class="fas fa-search"></i>
        <input type="search" placeholder="Search here" />
      </div>
      <div class="user-wapper">
        <i class="fas fa-user-shield"></i>
        <div>
          <small>Admintor</small>
        </div>
      </div>
    </header>
    <main>
      <div class="cards">
        <div class="card-single">
          <div>
            <h1>{{ countTech }}</h1>
            <span>Technology</span>
          </div>
          <div>
            <i class="fab fa-node-js"></i>
          </div>
        </div>
        <div class="card-single">
          <div>
            <h1>{{ countProject }}</h1>
            <span>Projects</span>
          </div>
          <div>
            <i class="fas fa-tasks"></i>
          </div>
        </div>
        <div class="card-single">
          <div>
            <h1>{{ countMember }}</h1>
            <span>Members</span>
          </div>
          <div>
            <i class="fas fa-users"></i>
          </div>
        </div>
        <div class="card-single">
          <div>
            <h1>{{ countUnit }}</h1>
            <span>Units</span>
          </div>
          <div>
            <i class="fas fa-universal-access"></i>
          </div>
        </div>
      </div>
      <div class="recent-grid">
        <div class="projects">
          <div class="card">
            <div class="card-header">
              <h3>Recent Projects</h3>
              <Button
                >See all <i class="fas fa-arrow-alt-circle-right"></i
              ></Button>
            </div>
            <div class="card-body">
              <div class="table-reponsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>Project Title</td>
                      <td>Unit</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>UI/UX Design</td>
                      <td>Frontend</td>
                      <td>
                        <span class="status pink"></span>
                        inprogress
                      </td>
                    </tr>
                    <tr>
                      <td>Shoe Shop</td>
                      <td>Mobile Team</td>
                      <td>
                        <span class="status orange"></span>
                        pending
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="customers">
          <div class="card">
            <div class="card-header">
              <h3>New Customer</h3>
              <Button
                >See all <i class="fas fa-arrow-alt-circle-right"></i
              ></Button>
            </div>
            <div class="card-body">
              <div class="customer">
                <div>
                  <h4><i class="fas fa-file-signature"></i> Loki</h4>
                  <i class="fas fa-envelope-square"></i> loki@gmail.com
                </div>
                <div><i class="fas fa-phone"></i> 0914134253</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import jwt from 'jsonwebtoken';
export default {
  name: 'Admin',
  data() {
    return {
      countTech: 0,
      countMember: 0,
      countProject: 0,
      countUnit: 0,
      errorMessage: '',
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
      const techs = await axios.get('/technologies');
      techs.data.forEach(() => {
        this.countTech += 1;
      });
      const users = await axios.get('/users');
      users.data.forEach(() => {
        this.countMember += 1;
      });
      const projects = await axios.get('/projects');
      projects.data.forEach(() => {
        this.countProject += 1;
      });
      const units = await axios.get('/units');
      units.data.forEach(() => {
        this.countUnit += 1;
      });
    } catch (error) {
      this.errorMessage = error.response.data;
      console.log('error' + this.errorMessage);
    }
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
  font-size: 18px;
}
.sidebar {
  width: 345px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #8fcaca;
  z-index: 100%;
}

.main-content {
  margin-left: 345px;
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
.search-wrapper input {
  height: 100%;
  padding: 0.5rem;
  outline: none;
  border: none;
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

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  margin-top: 1rem;
}

.card-single {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 2rem;
  border-radius: 2px;
}

.card-single i {
  font-size: 3rem;
  color: rgb(172, 53, 53);
}
.card-single span {
  color: grey;
}

.recent-grid {
  margin-top: 3.5rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 67% auto;
}

.card {
  background: #fff;
}
.card-header,
.card-body {
  padding: 1rem;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-header button {
  background: rgb(155, 72, 72);
  border-radius: 10px;
  color: #fff;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgb(155, 72, 72);
}
table {
  border-collapse: collapse;
}

thead tr {
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

thead td {
  font-weight: 700;
}
td {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #222;
}
td .status {
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-right: 1rem;
}
.status.pink {
  background-color: pink;
}

tr td:last-child {
  display: flex;
  align-items: center;
}
.status.orange {
  background-color: orange;
}

.table-reponsive {
  width: 100%;
  overflow-x: auto;
}

.customer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5re 1rem;
}
.customer h4 {
  font-size: 0.8rem;
  font-weight: 700;
  color: #222;
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
  .cards {
    grid-template-columns: 100%;
  }
}
</style>
