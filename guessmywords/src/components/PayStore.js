import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  pays: [{"nom":"France","reg":"[fF]rance","x":79.25531914893617,"y":33.134453781512605,"width":"6","find":false},{"nom":"Suède","reg":"[Ss]u[eé]de","x":3.1914893617021276,"y":27.632052821128454,"width":5,"find":false},{"nom":"Brésil","reg":"[bB]r[ée]sil","x":17.907801418439718,"y":59.08463385354141,"width":5,"find":false},{"nom":"Israél","reg":"[iI]sra[ée]l","x":90.69148936170212,"y":52.262905162064826,"width":"10","find":false},{"nom":"Espagne","reg":"[eE]spagne","x":91.93262411347519,"y":23.45258103241296,"width":"16","find":false},{"nom":"Vietnam","reg":"[vV]ietnam","x":77.74822695035462,"y":15.687875150060023,"width":"8","find":false},{"nom":"Australie","reg":"[Aa]ustralie","x":81.82624113475178,"y":47.68007202881153,"width":"6","find":false},{"nom":"Pérou","reg":"[Pp][ée]rou","x":73.31560283687944,"y":43.839735894357744,"width":"11","find":false},{"nom":"Canada","reg":"[cC]anada","x":58.86524822695035,"y":56.183673469387756,"width":"6","find":false},{"nom":"Groenland","reg":"[Gg]roenland","x":62.5886524822695,"y":44.79891956782713,"width":5,"find":false},{"nom":"Argentine","reg":"[Aa]rgentine","x":60.1063829787234,"y":13.446578631452581,"width":"6","find":false},{"nom":"Angleterre","reg":"([Aa]ngleterre)|([Rr]oyaume [Uu]ni)","x":58.707360861759426,"y":23.189550425273392,"width":"10","find":false},{"nom":"Russie","reg":"[Rr]ussie","x":82.97872340425532,"y":92.53841536614645,"width":"8","find":false},{"nom":"Allemagne","reg":"[Aa]llemagne","x":55.85106382978723,"y":72.04981992797119,"width":5,"find":false},{"nom":"Suisse","reg":"[Ss]uisse","x":68.26241134751773,"y":66.48799519807923,"width":"7","find":false},{"nom":"République tchéque","reg":"[Tt]ch[ée]qu","x":37.94326241134752,"y":76.49159663865547,"width":"5","find":false},{"nom":"Méxique","reg":"[Mm][ée]xique","x":32.09219858156028,"y":80.33313325330131,"width":5,"find":false},{"nom":"Portugal","reg":"[Pp]ortugal","x":40.60283687943262,"y":84.17466986794717,"width":"6","find":false},{"nom":"Maroc","reg":"[Mm]aroc","x":63.12056737588653,"y":94.01860744297718,"width":"7","find":false},{"nom":"états-unis","reg":"[éEe]tats[ -][uU]nis|usa|USA","x":52.4822695035461,"y":64.96698679471788,"width":5,"find":false},{"nom":"Thaïlande","reg":"[Tt]ha[iï]lande","x":79.60992907801419,"y":69.16866746698679,"width":"6","find":false},{"nom":"Norvège","reg":"[Nn]orv[èe]ge","x":78.45744680851064,"y":82.25390156062424,"width":"7","find":false},{"nom":"Jamaïque","reg":"[Jj]ama[ïi]que","x":29.25531914893617,"y":54.762905162064826,"width":5,"find":false},{"nom":"Italie","reg":"[Ii]talie","x":10.638297872340425,"y":78.05222088835534,"width":"6","find":false},{"nom":"Corée","reg":"[Cc]or[ée]e","x":7.9787234042553195,"y":87.63745498199279,"width":"12","find":false},{"nom":"Vatican","reg":"[Vv]atican","x":0.975177304964539,"y":35.0750300120048,"width":"5","find":false},{"nom":"Chine","reg":"[Cc]hine","x":9.929078014184398,"y":35.97599039615846,"width":"8","find":false},{"nom":"Afrique du sud","reg":"[Aa]frique","x":47.4290780141844,"y":16.22749099639856,"width":"7","find":false},{"nom":"Turquie","reg":"[Tt]urquie","x":69.76950354609929,"y":2.7821128451380552,"width":5,"find":false},{"nom":"Japon","reg":"[Jj]apon","x":28.368794326241137,"y":23.031812725090035,"width":"13","find":false},{"nom":"Grèce","reg":"[Gg]r[èe]ce","x":45.744680851063826,"y":32.895558223289314,"width":"12","find":false},{"nom":"égypte","reg":"[éEe]gypte","x":50.443262411347526,"y":44.55882352941176,"width":5,"find":false},{"nom":"Belgique","reg":"[Bb]elgique","x":37.854609929078016,"y":51.521608643457384,"width":"7","find":false},{"nom":"Pays[ -]bas","reg":"[Pp]ays [Bb]as|[hH]ollande","x":37.322695035460995,"y":69.40876350540216,"width":5,"find":false}],
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
