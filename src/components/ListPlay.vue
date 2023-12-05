<template>
  <div id="ListePays">
    <h1>Pays {{ getPays().filter(pays => pays.find).length }} / 34 </h1>
    <ul>
      <li v-for="(pays, i) of getPays()" :key="i" :class="{ isSelect : i === selectedPays, hide: !pays.find}"
      @click="setSelectedPays(selectedPays !== i ? i : -1)" > {{ pays.nom }} - {{ pays.reg }}</li>
    </ul>
    <div v-if="canShow()">
      <label for="nom">Nom </label>
      <input type="text" id="nom" v-model="nom" /><br>
      <button @click="selectAnswer">Ajouter un pays</button>
      <p v-if="showError">Eh non, c'est pas ça ;-)</p>
    </div>
    <p class="success" v-if="success">Bravo ! tu as trouvé une réponse !</p>
  </div>
</template>

<script>

let data = {
  nom: '',
  reg: '',
  size: 0,
  showError: false,
  success: false
}

export default {
  name: 'ListPlay',
  methods : {
    canShow() {

      return this.$store.state.selectedPays === -1 ? false : !this.$store.state.pays[this.$store.state.selectedPays].find
    },
    getPays() {
      return this.$store.state.pays
    },
    setSelectedPays(selectedPays) {
      this.$store.commit('SET_SELECTED', selectedPays)
    },
    selectAnswer() {
      if(this.nom.match(this.$store.state.pays[this.$store.state.selectedPays].reg)) {
        this.nom = ""
        this.success = true
        this.$store.commit('SET_FIND')
          setTimeout(function() {data.success = false}, 2500)
      } else {
        this.showError = true
        setTimeout(function() {data.showError = false}, 2500)
      }
    }
  },
  data () {
    return data
  },
  computed: {
    selectedPays() {
      let pays = this.$store.state.selectedPays
      return pays
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hide{
  display: none;
}
p {
  color: red;
  font-weight: bold;
}
.success {
  color: green;
}
#ListePays {
  width: 20%;
  float: right;
  display: table;
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
