<template>
  <div id="app" v-bind:class="currentTheme">
    <div class="theme-options">
      <div
        v-bind:class="{ active: currentTheme === 'theme-white' }"
        @click="switchTheme('theme-white')"
        class="theme theme-white"
      ></div>
      <div
        v-bind:class="{ active: currentTheme === 'theme-blue' }"
        @click="switchTheme('theme-blue')"
        class="theme theme-blue"
      ></div>
      <div
        v-bind:class="{ active: currentTheme === 'theme-orange' }"
        @click="switchTheme('theme-orange')"
        class="theme theme-orange"
      ></div>
      <div
        v-bind:class="{ active: currentTheme === 'theme-purple' }"
        @click="switchTheme('theme-purple')"
        class="theme theme-purple"
      ></div>
      <div
        v-bind:class="{ active: currentTheme === 'theme-green' }"
        @click="switchTheme('theme-green')"
        class="theme theme-green"
      ></div>
      <div
        v-bind:class="{ active: currentTheme === 'theme-black' }"
        @click="switchTheme('theme-black')"
        class="theme theme-black"
      ></div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      currentTheme: localStorage.getItem('theme-color'),
    };
  },
  methods: {
    switchTheme(theme) {
      localStorage.setItem('theme-color', theme);
      this.currentTheme = localStorage.getItem('theme-color');
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');
* {
  box-sizing: border-box;
}
.theme-options {
  text-align: center;

  padding-right: 100px;
}
.theme {
  width: 10px;
  height: 10px;
  display: inline-block;
  padding: 10px;
  border-radius: 4px;
  margin: 2px 10px;
  border: 1px solid #fff;
  opacity: 0.5;
}
.theme:active {
  opacity: 1;
}
.theme-white {
  background-color: #eee;
}
.theme-blue {
  background-color: #1e41c1;
}
.theme-orange {
  background-color: #b64b1e;
}
.theme-purple {
  background-color: #7852ae;
}
.theme-green {
  background-color: #5faf3b;
}
.theme-black {
  background-color: #000;
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
  font-weight: 500;
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
