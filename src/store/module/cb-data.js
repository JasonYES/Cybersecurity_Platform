export default {
  state: {
    scores: [],
    cboxCounties: [],
    cboxOrgs: [],
    chosenCountries: [],
    chosenOrgs: []
  },
  getters: {

  },
  mutations: {
    setScores(state, data) {
      state.scores = data
    }
  },
  actions: {
    initData(context) {
      var scores =
        context.commit('setScores', scores);
    }
  }
}
