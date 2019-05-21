<template>
  <Tabs>
    <TabPane :label="paneCombined">
      <Row type="flex" justify="center" :gutter="20" style="margin-top: 50px;">
        <i-col :md="16" :lg="16" style="margin-bottom: 20px;">
          <chart-scatter
            style="height: 600px;"
            :value="dataCombined"
            :text="paneCombined"
            :chosenIndexes="chosenIndexes"
          />
        </i-col>
      </Row>
    </TabPane>
    <TabPane :label="paneDivided">
      <Row type="flex" justify="center" :gutter="20" style="margin-top: 50px;">
        <i-col :md="16" :lg="16" style="margin-bottom: 20px;">
          <div v-for="(object, continent)  in dataDivided" :key="continent">
            <chart-scatter
              style="height: 600px;"
              :value="dataDivided[continent]"
              :text="continent + paneSuffix"
              :chosenIndexes="chosenIndexes"
            />
            <br>
            <br>
          </div>
        </i-col>
      </Row>
    </TabPane>
  </Tabs>
</template>
<script>
import { ChartScatter } from "_c/charts";
import { vname } from "@/config/properties";
import { mapState } from "vuex";
import { divideScoresBy } from "@/libs/tools";
export default {
  name: "ChartScatterx",
  components: {
    ChartScatter
  },
  props: {
    chosenIndexes: Object
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
      dataCombinedx: [
        { country: "China", legal: 0.64, technical: 0.76 },
        { country: "India", legal: 0.76, technical: 0.58 },
        { country: "United States", legal: 0.68, technical: 0.6 },
        { country: "Indonesia", legal: 0.77, technical: 0.77 },
        { country: "Iran", legal: 0.77, technical: 0.77 },
        { country: "Brazil", legal: 0.29, technical: 0.27 },
        { country: "Pakistan", legal: 0.22, technical: 0.2 },
        { country: "Nigeria", legal: 0.15, technical: 0.18 },
        { country: "Bangladesh", legal: 0.14, technical: 0.1 },
        { country: "Japan", legal: 0.13, technical: 0.25 },
        { country: "Mexico", legal: 0.27, technical: 0.42 },
        { country: "Philippines", legal: 0.21, technical: 0.45 },
        { country: "Vietnam", legal: 0.29, technical: 0.29 },
        { country: "Ethiopia", legal: 0.4, technical: 0.44 },
        { country: "Germany", legal: 0.38, technical: 0.43 },
        { country: "Egypt", legal: 0.49, technical: 0.25 },
        { country: "Turkey", legal: 0.45, technical: 0.42 },
        { country: "The Bahamas", legal: 0.57, technical: 0.8 },
        { country: "Thailand", legal: 0.81, technical: 0.51 },
        { country: "France", legal: 0.56, technical: 0.81 },
        { country: "Dem. Rep. Congo", legal: 0.9, technical: 0.89 },
        { country: "United Kingdom", legal: 0.74, technical: 0.87 },
        { country: "Ivory Coast", legal: 0.8, technical: 0.51 },
        { country: "Italy", legal: 0.59, technical: 0.65 },
        { country: "Myanmar", legal: 0.76, technical: 0.51 },
        { country: "South Korea", legal: 0.69, technical: 0.72 },
        { country: "South Africa", legal: 0.16, technical: 0.32 },
        { country: "Colombia", legal: 0.46, technical: 0.7 },
        { country: "Spain", legal: 0.33, technical: 0.59 },
        { country: "Ukraine", legal: 0.15, technical: 0.47 }
      ],
      dataDividedx: {
        亚洲: [
          { country: "China", legal: 0.64, technical: 0.76 },
          { country: "India", legal: 0.76, technical: 0.58 },
          { country: "Indonesia", legal: 0.77, technical: 0.77 },
          { country: "Iran", legal: 0.77, technical: 0.5 },
          { country: "Vietnam", legal: 0.29, technical: 0.29 },
          { country: "Ethiopia", legal: 0.4, technical: 0.44 },
          { country: "Germany", legal: 0.38, technical: 0.43 },
          { country: "Egypt", legal: 0.49, technical: 0.25 },
          { country: "Turkey", legal: 0.45, technical: 0.42 },
          { country: "The Bahamas", legal: 0.57, technical: 0.8 },
          { country: "Thailand", legal: 0.81, technical: 0.51 },
          { country: "France", legal: 0.56, technical: 0.81 },
          { country: "Colombia", legal: 0.46, technical: 0.7 },
          { country: "Spain", legal: 0.33, technical: 0.59 }
        ],
        欧洲: [
          { country: "China", legal: 0.64, technical: 0.76 },
          { country: "Bangladesh", legal: 0.14, technical: 0.1 },
          { country: "Japan", legal: 0.13, technical: 0.25 },
          { country: "Mexico", legal: 0.27, technical: 0.42 },
          { country: "Germany", legal: 0.38, technical: 0.43 },
          { country: "Egypt", legal: 0.49, technical: 0.25 },
          { country: "Turkey", legal: 0.45, technical: 0.42 },
          { country: "The Bahamas", legal: 0.57, technical: 0.8 },
          { country: "Thailand", legal: 0.81, technical: 0.51 },
          { country: "France", legal: 0.56, technical: 0.81 },
          { country: "Dem. Rep. Congo", legal: 0.9, technical: 0.89 },
          { country: "South Africa", legal: 0.16, technical: 0.32 },
          { country: "Colombia", legal: 0.46, technical: 0.7 },
          { country: "Spain", legal: 0.33, technical: 0.59 }
        ],
        非洲: [
          { country: "China", legal: 0.64, technical: 0.76 },
          { country: "Mexico", legal: 0.27, technical: 0.42 },
          { country: "Egypt", legal: 0.49, technical: 0.25 },
          { country: "Turkey", legal: 0.45, technical: 0.42 },
          { country: "The Bahamas", legal: 0.57, technical: 0.8 },
          { country: "Thailand", legal: 0.81, technical: 0.51 },
          { country: "France", legal: 0.56, technical: 0.81 },
          { country: "Dem. Rep. Congo", legal: 0.9, technical: 0.89 },
          { country: "United Kingdom", legal: 0.74, technical: 0.87 },
          { country: "Ivory Coast", legal: 0.8, technical: 0.51 },
          { country: "Colombia", legal: 0.46, technical: 0.7 },
          { country: "Spain", legal: 0.33, technical: 0.59 },
          { country: "Ukraine", legal: 0.15, technical: 0.47 }
        ]
      }
    };
  }
};
</script>