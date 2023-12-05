<template>

<div v-if="route.params.mapId && mapData">
  <edit-component 
    :points="mapData.points" 
    :mapUrl="API_URL + '/images/' + mapData.fileName"
    :mapId="mapData.id"
    >
  </edit-component>
</div>
<div v-else>
  <v-file-input label="File input" v-model="input" @change="validFile"></v-file-input>
  <v-text-field label="Titre" v-model="title" />
  <v-btn :disabled="title === '' || wrongType === null || wrongType || tooHeavy === null || tooHeavy " @click="upload">upload</v-btn>
  <v-alert v-if="wrongType" outlined type="error">
    Seul les fichiers de type "PNG" et "JPG" sont acceptés
  </v-alert>
  <v-alert v-if="tooHeavy" outlined type="error">
    Taille maximum: 10Mo
  </v-alert>
</div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import IPoint from "@/models/IPoint";
import {API_URL, MIMETYPE_MAP_ALLOWED} from "@/configs/constants";
import { useRoute, useRouter } from 'vue-router';
import EditComponent from '@/components/EditComponent.vue';
import IMap from '@/models/IMap';
import APIService from '@/services/APIService';

let points = ref<IPoint[]>([])
let mapData = ref<IMap|null>(null)
let input = ref()
let title = ref()
let wrongType = ref<boolean |null>(null)
let tooHeavy = ref<boolean |null>(null)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if(route.params.mapId) {
    APIService.get(`/api/edits/${route.params.mapId}`)
      .then(data =>  mapData.value = data)
      .catch(() => router.push('/edit'))
  }
})
const validFile = () => {
  const file = input.value['0']
  wrongType.value = !MIMETYPE_MAP_ALLOWED.includes(file.type)
  tooHeavy.value = file.size > 10485760 // max 10Mo
}
const upload = () => {
  const formData = new FormData();
  formData.append('map', input.value['0']);
  formData.append('title', title.value)

  APIService.post('/api/edits', formData).then(res => {
    mapData.value = res
    router.push('/edit/' + mapData.value?.id)
  })
}
</script>
<style>
  h1 {
    color: #D2AA45;
    text-align: center;
    margin: 2rem;
    font-size: 3rem;
  }
  #screen {
    width: 80%;
    float: left;
    position: relative;
  }
  img {
    width: 100%;
    cursor: none;
  }
  #edit-menu {
    display: inline-block;
    width: 20%;
  }
</style>
