<template>
  <Tabs>
    <TabPane :label="paneCombined">
      <chart-pie style="height: 1000px;" :value="dataCombined" :text="paneCombined"/>
    </TabPane>
    <TabPane :label="paneDivided">
      <div v-for="(object, continent)  in dataDivided" :key="continent">
        <chart-pie
          style="height: 1000px;"
          :value="dataDivided[continent]"
          :text="continent + paneSuffix"
        />
        <br>
        <br>
      </div>
    </TabPane>
  </Tabs>
</template>
<script>
import { ChartPie } from "_c/charts";
import vname from "@/config/view-name";
import { mapState } from "vuex";
import { divideScoresBy } from "@/libs/tools";
export default {
  name: "ChartPiex",
  components: {
    ChartPie
  },
  computed: {
    ...mapState({
      dname: state => state.cbdata.dynamicName,
      dataCombined: state => [...state.cbdata.cbox.chosenScores], // 防止被更改
      dataDivided: state =>
        divideScoresBy(state.cbdata.cbox.chosenScores, "continent") // 防止被更改 方法内已做处理
    })
  },
  data() {
    return {
      paneCombined: vname["集合"],
      paneDivided: vname["各洲"],
      paneSuffix: vname["视图"],
      XXXdataCombined: [
        {
          country: "新加坡",
          score: 0.92,
          legal: 0.95,
          technical: 0.96,
          organization: 0.88,
          capacity: 0.97,
          cooperation: 0.87
        },
        {
          country: "马来西亚",
          score: 0.55,
          legal: 0.68,
          technical: 0.43,
          organization: 0.55,
          capacity: 0.1,
          cooperation: 0.44
        },
        {
          country: "也门",
          score: 0.36,
          legal: 0.13,
          technical: 0.15,
          organization: 0.28,
          capacity: 0.14,
          cooperation: 0.2
        },
        {
          country: "俄罗斯",
          score: 0.78,
          legal: 0.82,
          technical: 0.67,
          organization: 0.85,
          capacity: 0.5,
          cooperation: 0.7
        },
        {
          country: "埃及",
          score: 0.77,
          legal: 0.92,
          technical: 0.92,
          organization: 0.4,
          capacity: 0.1,
          cooperation: 0.7
        }
      ],
      XXXdataDivided: {
        亚洲: [
          {
            country: "中国",
            score: 0.3,
            legal: 0.88,
            technical: 0.05,
            organization: 0.02,
            capacity: 0.16,
            cooperation: 0.33
          },
          {
            country: "韩国",
            score: 0.42,
            legal: 0.76,
            technical: 0.02,
            organization: 0.1,
            capacity: 0.21,
            cooperation: 0.29
          },
          {
            country: "日本",
            score: 0.82,
            legal: 0.71,
            technical: 0.23,
            organization: 0.62,
            capacity: 0.82,
            cooperation: 0.88
          },
          {
            country: "越南",
            score: 0.31,
            legal: 0.38,
            technical: 0.02,
            organization: 0.39,
            capacity: 0.16,
            cooperation: 0.95
          },
          {
            country: "老挝",
            score: 0.61,
            legal: 0.19,
            technical: 0.01,
            organization: 0.27,
            capacity: 0.73,
            cooperation: 0.74
          }
        ],
        欧洲: [
          {
            country: "芬兰",
            score: 0.35,
            legal: 0.12,
            technical: 0.68,
            organization: 0.62,
            capacity: 0.42,
            cooperation: 0.43
          },
          {
            country: "瑞典",
            score: 0.48,
            legal: 0.95,
            technical: 0.78,
            organization: 0.53,
            capacity: 0.51,
            cooperation: 0.09
          },
          {
            country: "挪威",
            score: 0.83,
            legal: 0.41,
            technical: 0.31,
            organization: 0.58,
            capacity: 0.36,
            cooperation: 0.39
          },
          {
            country: "冰岛",
            score: 0.85,
            legal: 0.1,
            technical: 0.69,
            organization: 0.15,
            capacity: 0.27,
            cooperation: 0.57
          },
          {
            country: "丹麦",
            score: 0.19,
            legal: 0.92,
            technical: 0.95,
            organization: 0.52,
            capacity: 0.85,
            cooperation: 0.88
          },
          {
            country: "法罗群岛",
            score: 0.44,
            legal: 0.21,
            technical: 0.23,
            organization: 0.75,
            capacity: 0.92,
            cooperation: 0.12
          },
          {
            country: "爱沙尼亚",
            score: 0.23,
            legal: 0.43,
            technical: 0.66,
            organization: 0.27,
            capacity: 0.29,
            cooperation: 0.72
          },
          {
            country: "拉脱维亚",
            score: 0.74,
            legal: 0.69,
            technical: 0.82,
            organization: 0.07,
            capacity: 0.99,
            cooperation: 0.19
          }
        ],
        非洲: [
          {
            country: "埃及",
            score: 0.86,
            legal: 0.02,
            technical: 0.42,
            organization: 0.08,
            capacity: 0.29,
            cooperation: 0.31
          },
          {
            country: "苏丹",
            score: 0.87,
            legal: 0.09,
            technical: 0.54,
            organization: 0.46,
            capacity: 0.84,
            cooperation: 0.12
          },
          {
            country: "利比亚",
            score: 0.6,
            legal: 0.82,
            technical: 0.35,
            organization: 0.69,
            capacity: 0.79,
            cooperation: 0.93
          },
          {
            country: "突尼斯",
            score: 0.61,
            legal: 0.87,
            technical: 0.82,
            organization: 0.87,
            capacity: 0.66,
            cooperation: 0.29
          },
          {
            country: "阿尔及利亚",
            score: 0.13,
            legal: 0.18,
            technical: 1,
            organization: 0.11,
            capacity: 0.9,
            cooperation: 0.03
          },
          {
            country: "摩洛哥",
            score: 0.09,
            legal: 0.27,
            technical: 0.73,
            organization: 0.2,
            capacity: 0.95,
            cooperation: 0.67
          }
        ]
      }
    };
  }
};
</script>