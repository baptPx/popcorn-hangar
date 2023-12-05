<template>
<h2>Bonjour {{ store.getUserAccount.username }}</h2>
<h2>Map à jouer</h2>
<v-row>
  <v-col v-for="play of mapsPlay" :key="'mapplay-' + play.id" class="card" cols="4" @click="router.push('/play/' + play.id)">
    <h3>{{ play.title }}</h3>
    <p>{{ play.description }}</p>
    <img :src="API_URL + '/images/' + play.fileName" />
  </v-col>
</v-row>

<h2>Map à éditer</h2>
<v-row>
  <v-col class="card" cols="4" @click="router.push('/edit')">
    <h3>Créer</h3>
    <v-btn >Créer une nouvelle carte</v-btn>
  </v-col>
  <v-col v-for="edit of mapsEdit" :key="'mapedit-' + edit.id" class="card" cols="4" @click="router.push('/edit/' + edit.id)">
    <h3>{{ edit.title }}</h3>
    <p>{{ edit.description }}</p>
    <img :src="API_URL + '/images/' + edit.fileName" />
  </v-col>
</v-row>
</template>

<script lang="ts" setup>
import { API_URL } from '@/configs/constants';
import IMap from '@/models/IMap';
import APIService from '@/services/APIService';
import { useStore } from '@/store/app';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

let mapsPlay = ref<IMap[]>([])
let mapsEdit = ref<IMap[]>([])

onMounted(async () => {
  [mapsPlay.value, mapsEdit.value] = await Promise.all([
    APIService.get('/api/plays'),
    APIService.get('/api/edits')
  ])
})
</script>
<style lang="scss" scoped>
  h1 {
    color: #D2AA45;
    text-align: center;
    margin: 2rem;
    font-size: 3rem;
  }
  .card {
    img {
      width: 100%;
    }
  }

</style>
