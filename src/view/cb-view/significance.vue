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
          <chart-piex></chart-piex>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { Cbox } from "_c/charts";
import { ChartPiex } from "_c/chartsx";
export default {
  name: "home",
  components: {
    ChartPiex,
    Cbox
  },
  methods: {
    checkedData() {}
  },
  data() {
    return {
      pieData: [
        { value: 20, name: "独立制定" },
        { value: 62, name: "非独立制定" },
        { value: 30, name: "正在制定" },
        { value: 70, name: "未制定" }
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
