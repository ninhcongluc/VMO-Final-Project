<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');
* {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  font-family: 'Fira Sans', sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6,
label,
span {
  font-weight: 300;
  font-family: 'Fira Sans', sans-serif;
}
body,
html,
#app,
#root,
auth-wrapper {
  width: 100%;
  height: 100%;
}
.navbar-light {
  background-color: #fff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}
.auth-inner {
  width: 450px;
  height: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
</style>
