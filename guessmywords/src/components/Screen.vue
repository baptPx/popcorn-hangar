<template>
  <div id="screen">
    <img src="../assets/map2.jpg" alt="map" @click="handleClick" ref="map">
    <Point v-for="(pays, i) in getPays()" :key="i" :index="i" @click.stop="setSelected(i)"/>
  </div>
</template>

<script>
import Point from './Point'
export default {
  name: 'Screen',
  components: {
    Point
  },
  props: {
    msg: String
  },
  methods : {
    getPays() {
      return this.$store.state.pays
    },
    handleClick(event) {
      console.log((event.layerY / this.$refs.map.height) * 100)
      this.$store.commit("UPDATE_POS", {posY: (event.layerY / this.$refs.map.height) * 100, posX:  (event.layerX / this.$refs.map.width) * 100})
    },
    setSelected(i) {
      console.log("i : " + i)
      this.$store.commit('SET_SELECTED', i)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#screen {
  width: 80%;
  float: left;
  position: relative;
}
#screen img {
  width: 100%;
}
</style>
