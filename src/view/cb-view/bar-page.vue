<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox></Cbox>
        </Card>
      </i-col>
    </Row>
    <Row type="flex" justify="center" :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-barx></chart-barx>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { ChartBar, Cbox } from "_c/charts";
import { ChartBarx } from "_c/chartsx";
export default {
  name: "bar-page",
  components: {
    ChartBar,
    Cbox,
    ChartBarx
  },
  methods: {},
  data() {
    return {};
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
