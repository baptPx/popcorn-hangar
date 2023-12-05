<template>
  <div :style="{ background: theme.global.current.value.colors.background, paddingTop: '8rem' }">
      <router-view />
  </div>
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router';
import styles from './styles/settings.scss'
import { useTheme } from 'vuetify/lib/framework.mjs';

const theme = useTheme()
const router = useRouter()
const logout = () => {
  localStorage.removeItem('token')
}
  //
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
  .menu {
    position: fixed;
    right: 0;
    margin: 1rem;
    cursor: pointer;
  }
</style>
