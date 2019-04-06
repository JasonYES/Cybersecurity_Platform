<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox></Cbox>
        </Card>
      </i-col>
    </Row>
    <Row type="flex" justify="center" style="margin-top: 20px">
      <Tablexs></Tablexs>
    </Row>
  </div>
</template>
<script>
import { Cbox, Tablex } from "_c/charts";
import { Tablexs } from "_c/chartsx";
export default {
  name: "plain-scores",
  components: {
    Cbox,
    Tablexs
  },
  mounted() {},
  methods: {},
  data() {
    return {};
  }
};
</script>

