import tmpData from './tmp-data'
import { getScores } from '@/api/visual'
export default {
  state: {
    scores: [],
    cbox: {
      countries: {},
      orgs: {},
      chosenCountries: {},
      chosenOrgs: {},
      // score
      chosenScores: []
    },
    dynamicName: {},
    indexes: {}
  },
  getters: {},
  mutations: {
    setScores(state, data) {
      state.scores = data;
      for (var i in data) {
        state.cbox.chosenScores.push({ ...data[i] });
      }
    },
    setCbox(state, data) {
      for (var i in data) {
        // cbox值的设定
        state.cbox[i] = { ...data[i] } // 用展开式实现clone
        // set 和 chosen的更新 (如果cbox更新)
        if (i == 'chosenCountries') { // if 国家为单位的score
          var allChosen = [];
          for (var j in data[i]) {
            allChosen.push(...data[i][j]);
          }
          var set = new Set(allChosen);
          // 初始化 and 更新 chosenScores
          state.cbox.chosenScores = [];
          for (var i in state.scores) {
            var row = state.scores[i];
            if (set.has(row['country'])) {
              state.cbox.chosenScores.push({ ...row });
            }
          }
        } else if (i == 'chosenOrgs') { // org为单位的score
          var allChosen = [];
          for (var j in data[i]) {
            allChosen.push(...data[i][j]);
          }
          var set = new Set(allChosen);
        }
      }
    },
    setDynamicName(state, data) {
      state.dynamicName = data
    },
    setIndexes(state, data) {
      state.indexes = data
    }
  },
  actions: {
    initData(context) {
      // 总数据
      // getScores().then(res => {
      //   // console.log(res);
      //   // var scores = res.data;
      //   // context.commit('setScores', scores)
      //   // var scores = tmpData['scores']
      //   // context.commit('setScores', scores)
      // }).catch(err => {
      //   alert(err);
      // })
      var scores = tmpData['scores']
      context.commit('setScores', scores)
      // cbox
      var countries = tmpData['countries']
      context.commit('setCbox', { 'countries': countries })
      context.commit('setCbox', { 'chosenCountries': countries })
      var orgs = tmpData['orgs']
      context.commit('setCbox', { 'orgs': { ...orgs } })
      context.commit('setCbox', { 'chosenOrgs': { ...orgs } })
      // dynamicName
      var dynamicName = tmpData['dynamicName']
      context.commit('setDynamicName', dynamicName)
      // indexes
      var indexes = tmpData['indexes']
      context.commit('setIndexes', indexes)
    },
    checkInited(context, dataArray) {
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
