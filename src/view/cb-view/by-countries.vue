<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox @checked="checkedData"></Cbox>
        </Card>
      </i-col>
    </Row>
    <Row type="flex" justify="center" :gutter="20" style="margin-top: 10px;">
      <i-col :md="20" :lg="20" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="data"/>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { ChartBar, Cbox } from "_c/charts";
export default {
  name: "by-countries",
  components: {
    ChartBar,
    Cbox
  },
  methods: {
    checkedData() {}
  },
  data() {
    return {
      data: [
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
          capacity: 0.28,
          cooperation: 0.44
        },
        {
          country: "也门",
          score: 0.22,
          legal: 0.11,
          technical: 0.34,
          organization: 0.25,
          capacity: 0.44,
          cooperation: 0.35
        },
        {
          country: "尼日利亚",
          score: 0.43,
          legal: 0.99,
          technical: 0.22,
          organization: 0.68,
          capacity: 0.77,
          cooperation: 0.21
        },
        {
          country: "澳大利亚",
          score: 0.82,
          legal: 0.94,
          technical: 0.96,
          organization: 0.86,
          capacity: 0.94,
          cooperation: 0.44
        },
        {
          country: "日本",
          score: 0.81,
          legal: 0.91,
          technical: 0.77,
          organization: 0.82,
          capacity: 0.9,
          cooperation: 0.7
        },
        {
          country: "法国",
          score: 0.81,
          legal: 0.94,
          technical: 0.96,
          organization: 0.6,
          capacity: 1,
          cooperation: 0.61
        },
        {
          country: "俄罗斯",
          score: 0.78,
          legal: 0.82,
          technical: 0.67,
          organization: 0.85,
          capacity: 0.91,
          cooperation: 0.7
        },
        {
          country: "埃及",
          score: 0.77,
          legal: 0.92,
          technical: 0.92,
          organization: 0.4,
          capacity: 0.92,
          cooperation: 0.7
        }
      ]
    };
  },
  methods: {
    checkedData() {}
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
