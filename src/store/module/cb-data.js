import tmpData from './tmp-data'
export default {
  state: {
    scores: [],
    cbox: {
      countries: {},
      orgs: {},
      chosenCountries: {},
      chosenOrgs: {}
    },
    dynamicName: {},
    indexes: {}
  },
  getters: {},
  mutations: {
    setScores (state, data) {
      state.scores = data
    },
    setCbox (state, data) {
      for (var i in data) {
        state.cbox[i] = data[i]
      }
    },
    setDynamicName (state, data) {
      state.dynamicName = data
    },
    setIndexes (state, data) {
      state.indexes = data
    }
  },
  actions: {
    initData (context) {
      // 总数据
      var scores = tmpData['scores']
      context.commit('setScores', scores)
      // cbox
      var countries = tmpData['countries']
      context.commit('setCbox', { 'countries': countries })
      context.commit('setCbox', { 'chosenCountries': countries })
      var orgs = tmpData['orgs']
      context.commit('setCbox', { 'orgs': orgs })
      context.commit('setCbox', { 'chosenOrgs': orgs })
      // dynamicName
      var dynamicName = tmpData['dynamicName']
      context.commit('setDynamicName', dynamicName)
      // indexes
      var indexes = tmpData['indexes']
      context.commit('setIndexes', indexes)
    },
    checkInited (context, dataArray) {
      for (var i in dataArray) {
        if (i === 'dynamicName' && context.dynamicName === {}) {
          var dynamicName = tmpData['dynamicName']
          context.commit('setDynamicName', dynamicName)
          console.log('done')
        }

        if (i === 'indexes' && context.indexes === {}) {
          var indexes = tmpData['indexes']
          context.commit('setIndexes', indexes)
        }
      }
    }
  }
}
