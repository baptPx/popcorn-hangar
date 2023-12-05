<template>
    <img :src="isSelected() ? 'targetred.svg' : 'target.svg'"
     :style="
     'left: '+ (pays.x - pays.width/2) + '%;' +
      'top: '+ (pays.y - pays.width/2) + '%;' +
      'width:' + pays.width + '%;' +
      'opacity:' + (pays.find ? 1 : 1) + ';'"
      @click="setSelectedPays"/>
</template>

<script>
export default {
  name: 'Screen',
  data () {
    return {
      selectedPays: "FFrance"
    }
  },
  props: {
    index: Number
  },
  methods: {
    isSelected() {
      return this.$store.state.selectedPays === this.index
    },
    setSelectedPays() {
      this.$store.commit('SET_SELECTED', this.index)
    }
  },
  computed: {
    pays() {
      return this.$store.state.pays[this.index]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  position: absolute;
  cursor: pointer;
}
</style>
