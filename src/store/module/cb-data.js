import tmpData from './tmp-data'
import { getScores, getCountries, getOrgs, getDname, getIndexes } from '@/api/visual'
export default {
  state: {
    scores: [],
    scoresOrgs: [],
    cbox: {
      // 切换国家 / 组织功能
      cboxFlag: "countries",
      // 国家 / 组织
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
      // 一开始就初始化所有数据
      for (var i in data) {
        state.cbox.chosenScores.push({ ...data[i] });
      }
    },
    setScoresOrgs(state, data) {
      state.scoresOrgs = data;
    },
    setCbox(state, data) {
      for (var i in data) {
        // cbox值的设定
        state.cbox[i] = { ...data[i] } // 用展开式实现clone
      }
    },
    updateChosenScores(state, cboxFlag) {
      state.cbox.cboxFlag = cboxFlag
      if (cboxFlag === "countries") { // if 国家为单位的score
        var chosen = state.cbox.chosenCountries;
        var originalScore = state.scores;
      } else if (cboxFlag === "orgs") {
        var chosen = state.cbox.chosenOrgs;
        var originalScore = state.scoresOrgs;
      }

      // 将选择扁平化
      var allChosen = [];
      for (var j in chosen) {
        allChosen.push(...chosen[j]);
      }
      var set = new Set(allChosen);
      // 更新chosenScores
      state.cbox.chosenScores = [];
      for (var i in originalScore) {
        var row = originalScore[i];
        if (set.has(row['country'])) {
          state.cbox.chosenScores.push({ ...row });
        }
      }
    }
    ,
    XXXsetCbox(state, data) {
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
      getScores().then(res => {
        if (res.data.code == 0) {
          var scores = res.data.data;
          context.commit('setScores', scores.countries)
          context.commit('setScoresOrgs', scores.orgs)
        } else { alert(res.data.msg) }
      }).catch(err => {
        alert(err);
      })

      getCountries().then(res => {
        if (res.data.code == 0) {
          var countries = res.data.data;
          context.commit('setCbox', { 'countries': countries })
          context.commit('setCbox', { 'chosenCountries': countries })
        } else { alert(res.data.msg) }
      }).catch(err => {
        alert(err);
      })

      getOrgs().then(res => {
        if (res.data.code == 0) {
          var orgs = res.data.data;
          context.commit('setCbox', { 'orgs': { ...orgs } })
          context.commit('setCbox', { 'chosenOrgs': { ...orgs } })
        } else { alert(res.data.msg) }
      }).catch(err => {
        alert(err);
      })

      getDname().then(res => {
        if (res.data.code == 0) {
          var dynamicName = res.data.data;
          context.commit('setDynamicName', dynamicName)
        } else { alert(res.data.msg) }
      }).catch(err => {
        alert(err);
      })

      getIndexes().then(res => {
        if (res.data.code == 0) {
          var indexes = res.data.data;
          context.commit('setIndexes', indexes)
        } else { alert(res.data.msg) }
      }).catch(err => {
        alert(err);
      })

    },
    XXXcheckInited(context, dataArray) {
      for (var i in dataArray) {
        if (i === 'dynamicName' && context.dynamicName === {}) {
          var dynamicName = tmpData['dynamicName']
          context.commit('setDynamicName', dynamicName)
        }

        if (i === 'indexes' && context.indexes === {}) {
          var indexes = tmpData['indexes']
          context.commit('setIndexes', indexes)
        }
      }
    }
  }
}
