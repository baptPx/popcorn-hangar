<template>
  <img :src="isRed ? targetred : target"
  @click="emits('eventa')"
       :style="
     'left: '+ (point.x - point.width/2) + '%;' +
      'top: '+ (point.y - point.width/2) + '%;' +
      'width:' + point.width + '%;' +
      'opacity:' + (shouldShow ? 1 : 0) + ';'"
      />
  <p      
    v-if="showLabel"
    :style="
     'left: '+ (point.x - point.width/2) + '%;' +
      'top: '+ (point.y - point.width/2 - 2) + '%;' +
      'width:' + point.width + '%;' +
      'opacity:' + (shouldShow ? 1 : 0) + ';'">{{ point.label }}</p>
</template>

<script setup lang="ts">
import target from '../assets/target.svg'
import targetred from '../assets/targetred.svg'
import {onMounted, PropType} from "vue";
import IPoint from '@/models/IPoint';

let showLabel = true
const props = defineProps({
  point: {
    type: Object as PropType<IPoint>,
    required: true 
  },
  isRed: Boolean,
  shouldShow: {
    type: Boolean
  }
})
const emits = defineEmits(['eventa'])
</script>

<style scoped>
  img, p {
    position: absolute;
    cursor: pointer;
  }
  p {
    background-color: black;
    width: min-width;
  }
</style>
