<template>
  <div id="app">
    <Screen />
    <ListPlay />
  </div>
</template>

<script>
import Screen from './components/Screen.vue'
import ListPlay from './components/ListPlay.vue'

export default {
  name: 'App',
  components: {
    Screen,
    ListPlay
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
