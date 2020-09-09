<template>
  <div>
    <app-header></app-header>
    <app-navbar></app-navbar>
    <app-main></app-main>
  </div>
</template>
<script>
import AppHeader from './AppHeader'
import AppNavbar from './AppNavbar'
import AppMain from './AppMain'
export default {
    components: {AppHeader, AppNavbar, AppMain}
}
</script>
<style scoped>
.header {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background-color: #2d3a4b;
    line-height: 50px;
}
.navbar {
    position: absolute;
    left: 0;
    top: 50px;
    bottom: 0;
    background-color: #2d3a4b;
    width: 230px;
    overflow-y: auto;
}
.main {
    position: absolute;
    left: 230px;
    top: 50px;
    right: 0;
    bottom: 0;
    text-align: center;
    padding-top: 20px;
    font-size: 30px;
}
</style>