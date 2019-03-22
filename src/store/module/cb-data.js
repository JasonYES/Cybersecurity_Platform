import tmpData from './tmp-data';
export default {
  state: {
    scores: [],
    cbox: {
      countries: {},
      orgs: {},
      chosenCountries: {},
      chosenOrgs: {}
    }
  },
  getters: {
  },
  mutations: {
    setScores(state, data) {
      state.scores = data;
    },
    setCbox(state, data) {
      for (var i in data) {
        state.cbox[i] = data[i];
      }
    }
  },
  actions: {
    initData(context) {
      // 总数据
      var scores = tmpData["scores"];
      context.commit('setScores', scores);
      // cbox
      var countries = tmpData["countries"];
      context.commit('setCbox', { "countries": countries });
      context.commit('setCbox', { "chosenCountries": countries });
      var orgs = tmpData["orgs"];
      context.commit('setCbox', { "orgs": orgs });
      context.commit('setCbox', { "chosenOrgs": orgs });
    }
  }
}
