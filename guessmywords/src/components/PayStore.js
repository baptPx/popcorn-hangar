import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  pays: [],
  selectedPays: -1
}

const mutations = {
  ADD_PAYS: (state) => {
    state.pays.push({
      nom: "Inconnu",
      reg: "Inconnu",
      x: 50,
      y: 50,
      width: 5,
      find: false
    })
    state.selectedPays = state.pays.length - 1
  },
  SET_SELECTED: (state, selectedPays) => {
    state.selectedPays = selectedPays
  },
  UPDATE_POS: (state, {posY, posX}) => {
    if(state.selectedPays !== -1) {
      state.pays[state.selectedPays].y = posY - state.pays[state.selectedPays].width/2
      state.pays[state.selectedPays].x = posX //- state.pays[state.selectedPays].width/2
    }
  },
  UPDATE_PAYS: (state, {nom, reg, size}) => {
    if(state.selectedPays !== -1) {
      if(nom !== undefined) state.pays[state.selectedPays].nom = nom
      if(reg !== undefined) state.pays[state.selectedPays].reg = reg
      if(size !== undefined) state.pays[state.selectedPays].width = size
    }
  },
  SET_FIND: (state) => {
    state.pays[state.selectedPays].find = true
  }
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: {},
  actions: {}
})

global.store = store
export default store
