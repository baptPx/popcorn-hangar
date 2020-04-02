<template>
  <div id="app">
    <Screen />
    <Liste />
  </div>
</template>

<script>
import Screen from './components/Screen.vue'
import Liste from './components/Liste.vue'

export default {
  name: 'App',
  components: {
    Screen,
    Liste
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
