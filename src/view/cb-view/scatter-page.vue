<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox @checked="checkedData"></Cbox>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox-indexes @checked="checkedData"></Cbox-indexes>
        </Card>
      </i-col>
    </Row>
    <Row type="flex" justify="center" :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-scatterx :chosenIndexes="chosenIndexes"></chart-scatterx>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { Cbox, CboxIndexes } from "_c/charts";
import { ChartScatterx } from "_c/chartsx";
export default {
  name: "scatter-page",
  components: {
    Cbox,
    ChartScatterx,
    CboxIndexes
  },
  methods: {
    checkedData(chosen) {
      this.chosenIndexes = { ...chosen };
    }
  },
  data() {
    return {
      chosenIndexes: {
        X轴指标: "",
        Y轴指标: ""
      },
      scatterData: [
        { country: "China", 指标1: 0.64, 指标2: 0.76 },
        { country: "India", 指标1: 0.76, 指标2: 0.58 },
        { country: "United States", 指标1: 0.68, 指标2: 0.6 },
        { country: "Indonesia", 指标1: 0.77, 指标2: 0.77 },
        { country: "Iran", 指标1: 0.77, 指标2: 0.5 },
        { country: "Brazil", 指标1: 0.29, 指标2: 0.27 },
        { country: "Pakistan", 指标1: 0.22, 指标2: 0.2 },
        { country: "Nigeria", 指标1: 0.15, 指标2: 0.18 },
        { country: "Bangladesh", 指标1: 0.14, 指标2: 0.1 },
        { country: "Japan", 指标1: 0.13, 指标2: 0.25 },
        { country: "Mexico", 指标1: 0.27, 指标2: 0.42 },
        { country: "Philippines", 指标1: 0.21, 指标2: 0.45 },
        { country: "Vietnam", 指标1: 0.29, 指标2: 0.29 },
        { country: "Ethiopia", 指标1: 0.4, 指标2: 0.44 },
        { country: "Germany", 指标1: 0.38, 指标2: 0.43 },
        { country: "Egypt", 指标1: 0.49, 指标2: 0.25 },
        { country: "Turkey", 指标1: 0.45, 指标2: 0.42 },
        { country: "The Bahamas", 指标1: 0.57, 指标2: 0.8 },
        { country: "Thailand", 指标1: 0.81, 指标2: 0.51 },
        { country: "France", 指标1: 0.56, 指标2: 0.81 },
        { country: "Dem. Rep. Congo", 指标1: 0.9, 指标2: 0.89 },
        { country: "United Kingdom", 指标1: 0.74, 指标2: 0.87 },
        { country: "Ivory Coast", 指标1: 0.8, 指标2: 0.51 },
        { country: "Italy", 指标1: 0.59, 指标2: 0.65 },
        { country: "Myanmar", 指标1: 0.76, 指标2: 0.51 },
        { country: "South Korea", 指标1: 0.69, 指标2: 0.72 },
        { country: "South Africa", 指标1: 0.16, 指标2: 0.32 },
        { country: "Colombia", 指标1: 0.46, 指标2: 0.7 },
        { country: "Spain", 指标1: 0.33, 指标2: 0.59 },
        { country: "Ukraine", 指标1: 0.15, 指标2: 0.47 }
      ]
    };
  },
  mounted() {
    //
  }
};
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
