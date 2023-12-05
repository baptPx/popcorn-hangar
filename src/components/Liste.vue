<template>
  <div id="ListePays">
    <h1>Pays</h1>
    <ul>
      <li v-for="(pays, i) of getPays()" :key="i" :class="{ isSelect : i === selectedPays}"
      @click="setSelectedPays(selectedPays !== i ? i : '')"> {{ pays.nom }} - {{ pays.reg }}</li>
    </ul>
      <label for="nom">Nom </label>
      <input type="text" id="nom" v-model="nom" /><br>
      <label for="reg">Regex </label>
      <input type="text" id="reg" v-model="reg" /><br>
      <label for="size">Taille </label>
      <input type="number" id="size" v-model="size" />
      <button @click="addPays">Ajouter un pays</button>
  </div>
</template>

<script>

let data = {
  nom: '',
  reg: '',
  size: 0
}

export default {
  name: 'Liste',
  methods : {
    getPays() {
      return this.$store.state.pays
    },
    setSelectedPays(selectedPays) {
      this.$store.commit('SET_SELECTED', selectedPays)
    },
    addPays() {
      this.$store.commit('ADD_PAYS')
    }
  },
  watch: {
    nom(val) {
      this.$store.commit('UPDATE_PAYS', {nom: val})
    },
    reg(val) {
      this.$store.commit('UPDATE_PAYS', {reg: val})
    },
    size(val) {
      this.$store.commit('UPDATE_PAYS', {size: val})
    }
  },
  data () {
    return data
  },
  computed: {
    selectedPays() {
      let pays = this.$store.state.selectedPays
      data.nom = this.$store.state.pays[pays].nom
      data.reg = this.$store.state.pays[pays].reg
      data.size = this.$store.state.pays[pays].width
      return pays
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#ListePays {
  width: 20%;
  float: right;
}
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
img {
  width: 80%;
  float: left;
}
.isSelect {
  color: red;
  font-weight: bold;
}
ul li {
  cursor: pointer;
}
</style>
