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
      <i-col :md="12" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-scatter style="height: 500px;" :value="scatterData" text></chart-scatter>
        </Card>
      </i-col>
    </Row>
    <!-- <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>-->
  </div>
</template>

<script>
import { Cbox, CboxIndexes, ChartScatter } from "_c/charts";
import Example from "./example.vue";
export default {
  name: "by-indexes",
  components: {
    Example,
    Cbox,
    ChartScatter,
    CboxIndexes
  },
  methods: {
    checkedData() {}
  },
  data() {
    return {
      scatterData: [
        { product: "Matcha Latte", count: 2, score: 0.5 },
        { product: "Milk Tea", count: 5, score: 0.6 },
        { product: "Cheese Cocoa", count: 6, score: 0.1 },
        { product: "Walnut Browe", count: 9, score: 0.8 },
        { product: "Walnut Bnie", count: 10, score: 0.4 },
        { product: "Walnut Browie", count: 3, score: 0.2 },
        { product: "Walnut Brie", count: 8, score: 0.7 }
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
