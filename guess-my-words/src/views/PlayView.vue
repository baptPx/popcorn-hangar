<template>
  <div  v-if="map !== null">
    <div id="screen">
        <img :src="API_URL + '/images/' + map.fileName" alt="map">
        <point-component 
            v-for="(point, index) of map.points"
            :point="point"
            :key="'point-' + index"
            :is-red="false"
            :should-show="point.find || selectedItem === index"
            @eventa="selectItem(index)"
            />
            
    </div>
    <div id="list-finds">
      <h2>{{ map?.title }} - ({{ findItems.length }} / {{ map.points.length }})</h2>
      <p>{{ map?.description }}</p>

      <div v-if="selectedItem >= 0">
        <v-text-field 
          v-model="typedText" 
          label="Réponse" 
          @keydown.enter="validateAnswer"
        ></v-text-field>
        <v-btn @click="validateAnswer">Valider</v-btn>
      </div>
      <v-alert
        v-if="success"
        type="success"
      >Bravo ! tu as trouvé une bonne réponse</v-alert>
      
      <v-alert
        v-if="misstake"
        type="error"
      >Non c'est pas ça, essaie encore</v-alert>
      <ul>
        <li 
        v-for="point of findItems"
        >
        {{ point }}
        </li>
      </ul>

    </div>
</div>
</template>

<script lang="ts" setup>
import { API_URL } from '@/configs/constants';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type IMap from '../models/IMap'
import PointComponent from '@/components/PointComponent.vue';
import APIService from '@/services/APIService';


const route = useRoute()
let map = ref<IMap|null>(null)
let selectedItem = ref(-1)
let typedText = ref('')
let mapId = ref(-1)
let findItems = ref<string[]>([])
let success = ref(false)
let misstake = ref(false)
onMounted(async () => {
  mapId.value = +route.params.mapId
  let play = await APIService.get(`/api/plays/${mapId.value}`)
  map.value = play
  if(map.value) {
    findItems.value = map.value?.points
    .filter(p => p.find)
    .map(p => p.label)
  }
})

const selectItem = (index: number) => {
  selectedItem.value = index
}
const validateAnswer = async () => {
  const point = map.value?.points[selectedItem.value]
  const data = await APIService.post(`/api/plays/${point?.id}`, {
    answer: typedText.value
  })
  if(point && data.correct) {
    success.value = true
    setTimeout(() => success.value = false, 5000)
    point.find = true
    if(findItems.value.findIndex(item => item === data.label) === -1) findItems.value.push(data.label)
  } else {
    
    misstake.value = true
    setTimeout(() => misstake.value = false, 5000)
  }
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
  }
  #list-finds {
    width: 20%;
    display: inline-block;
  }
</style>
