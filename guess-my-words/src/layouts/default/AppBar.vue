<template>
  <v-app-bar flat color="background" id="header" elevation="10">
    <v-app-bar-title class="markoOne title" @click="router.push('/')">
      {{title}}
    </v-app-bar-title>
    <template v-slot:append style="gap: 1rem">
      <v-btn
        v-if="store.isLogged"
        class="navButton"
        variant="text"
        @click="logout()"
        :style=" router.currentRoute.value.name === 'Home' ? cssProps : {}"
      >
          Déconnexion
      </v-btn>
      <v-btn
        v-else
        class="navButton"
        variant="text"
        @click="router.push('/')"
        :style=" router.currentRoute.value.name === 'Home' ? cssProps : {}"
      >
          Connexion
      </v-btn>
      <v-btn
        @click="toggleTheme"
        icon
      >
        <v-icon
          color="primary"
          :icon="theme.global.current.value.dark ? 'custom:dark' : 'custom:sunny'"
          size="large"
        />

      </v-btn>
      <v-img
        contain
        src="@/assets/theme.svg"
      />
     </template>
    </v-app-bar>
  
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify/lib/framework.mjs';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import {title} from '@/configs/constants'
import { useStore } from '@/store/app';
  
const theme = useTheme()
const router = useRouter()
const store = useStore()

const toggleTheme = () => {
  theme.global.name.value =  theme.global.current.value.dark ? 'light' : 'dark'
}

const cssProps = computed(() => {
  return {
    color: theme.global.current.value.colors.secondary,
    borderBottom: '2px solid ' + theme.global.current.value.colors.secondary,
  }
})
const logout = () => {
  localStorage.removeItem('token')
  store.setLogged(false)
  router.push('/')
}
  
</script>
<style>
@font-face {
  font-family: 'MarkoOne';
  src: url('@/assets/MarkoOne-Regular.ttf');
}
#header {
  padding: 1em;
}
.selectedPage {
  color: var(--v-primary-base) !important;
}
.navButton {
  border-radius: 0 !important;
  font-weight: bold !important;
  font: 1rem 'MarkoOne' !important;
}
.title {
  text-align: left;
  cursor: pointer;
}
</style>