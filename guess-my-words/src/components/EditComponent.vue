<template>
<div id="screen" @mousemove="mouseOnMap" @click="placeTarget">
    <img :src="mapUrl" alt="map" ref="map">
    <point-component 
        v-for="(point, index) of localPoints"
        :point="point"
        :key="'point-' + index"
        :shouldShow="true"
        :is-red="index === localPoints.length - 1"
        />
    <point-component v-if="isOnAdd" :should-show="isOnAdd" :point="pointToAdd" class="no-cursor" ></point-component>
</div>
<div id="edit-menu">
    <h2>Éléments</h2>
    <v-btn v-if="!isOnAdd" @click="isOnAdd = true">Ajouter (A)</v-btn>
    <v-btn v-if="isOnAdd" @click="isOnAdd = false">Stop (Z)</v-btn>
    <div v-if="isOnAdd">
        <v-slider v-model="pointToAdd.width" label="Taille de la cible (q/s)"></v-slider>
        <v-text-field @keydown.stop v-model="pointToAdd.label" label="label"></v-text-field>
        <v-text-field @keydown.stop v-model="pointToAdd.possibleAnswers" label="Réponses possibles ex : ([aA]ngleterre|[gG]rande[ -]?[bB]retagne)"></v-text-field>
    
    </div>
    <ul>
        <li v-for="(point, index) of points" :key="'pointlist-' + index">
            {{ point.label }} - {{ point.possibleAnswers }} <v-btn  @click="deletePoint(point, index)">X</v-btn>
        </li>
    </ul>
</div>
</template>
<script lang="ts" setup>
import IPoint from '@/models/IPoint';
import { onMounted, PropType, ref } from 'vue';
import PointComponent from './PointComponent.vue';
import APIService from '@/services/APIService';

const emit = defineEmits(['edit-points', 'add-point', 'delete-point'])
const props = defineProps({
    points: {
        type: Object as PropType<IPoint[]>,
        required: true
    },
    mapUrl: String,
    mapId: Number
})
let map = ref()
let localPoints = ref<IPoint[]>([])
let pointToAdd = ref<IPoint>({
    x: 50,
    y: 50,
    width: 10,
    show: true,
    possibleAnswers: '',
    label: ''
})
let isOnAdd = ref(false)

onMounted(() => {
    localPoints.value = props.points
    window.addEventListener('keydown', (ev) => {
        if(pointToAdd.value.width < 100 - pointToAdd.value.width && ev.key === 's') pointToAdd.value.width += 2
        if(pointToAdd.value.width > 2 && ev.key === 'q') pointToAdd.value.width -= 2
        if(ev.key === 'a') isOnAdd.value = true
        if(ev.key === 'z') isOnAdd.value = false
        if(ev.key === 'e') emit('delete-point')
    });
})

const mouseOnMap = (event: any) => {
    if(isOnAdd.value) {
        let x = event.x / map.value.width * 100
        let y = ((event.y - map.value.y) / map.value.height) * 100 - pointToAdd.value.width
        if (x <= 100 - pointToAdd.value.width/2 && x >= pointToAdd.value.width/3) pointToAdd.value.x = x 
        if(y <= 100 - pointToAdd.value.width * 1.5 && y >= 0) pointToAdd.value.y = y
    }
}
const placeTarget = async (event: any) => {
    if(isOnAdd.value) {
        let newPoint = await APIService.post(`/api/edits/${props.mapId}`, pointToAdd.value)
        localPoints.value.push({
            ...newPoint
        })
    }

}
const deletePoint = (point: IPoint, index: number) => {
    APIService.deleteAPI(`/api/edits/points/${point.id}`)
    localPoints.value.splice(localPoints.value.indexOf(point), 1)
}
</script>
<style>
.no-cursor {
    cursor: none !important;
}
</style>