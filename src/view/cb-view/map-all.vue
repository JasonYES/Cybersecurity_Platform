<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox></Cbox>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-map style="height:600px;" :index="'score'"></chart-map>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import { Cbox, ChartMap } from "_c/charts";
export default {
  name: "plain-scores",
  components: {
    Cbox,
    ChartMap
  },
  methods: {},
  data() {
    return {
      data: []
    };
  }
};
</script>