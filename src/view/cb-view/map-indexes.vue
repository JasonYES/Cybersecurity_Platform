<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox></Cbox>
        </Card>
      </i-col>
    </Row>
    <Row
      v-for="(object, indexName)  in indexes"
      :key="indexName"
      :gutter="20"
      style="margin-top: 10px;"
    >
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-map :title="'指标: '+indexName" :index="indexName" style="height:600px;"></chart-map>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import { Cbox, ChartMap } from "_c/charts";
import { mapState } from "vuex";
export default {
  name: "plain-scores",
  components: {
    Cbox,
    ChartMap
  },
  computed: {
    ...mapState({
      dName: state => state.cbdata.dynamicName,
      indexes: state => state.cbdata.indexes
    })
  },
  methods: {
    checkedData(checked) {
      this.$store.commit("setCbox", { chosenCountries: checked });
    }
  },
  data() {
    return {
      data: []
    };
  }
};
</script>