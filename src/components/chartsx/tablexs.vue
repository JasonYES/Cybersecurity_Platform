<template>
  <Tabs>
    <TabPane :label="paneCombined">
      <Row type="flex" justify="center" :gutter="20" style="margin-top: 10px;">
        <i-col :md="16" :lg="16" style="margin-bottom: 20px;">
          <Tablex :value="dataCombined" :text="paneCombined"/>
        </i-col>
      </Row>
    </TabPane>
    <TabPane :label="'集合视图+地图'">
      <Row type="flex" justify="center" :gutter="20" style="margin-top: 10px;">
        <i-col :md="14" :lg="14" style="margin-bottom: 20px;">
          <Tablex :value="dataCombined" :text="paneCombined"/>
        </i-col>
        <i-col :md="10" :lg="10" style="margin-top: 25px;">
          <Card shadow>
            <chart-map style="height:500px;" :index="'score'"></chart-map>
          </Card>
        </i-col>
      </Row>
    </TabPane>
    <TabPane :label="paneDivided">
      <Row type="flex" justify="center" :gutter="20" style="margin-top: 10px;">
        <i-col :md="16" :lg="16" style="margin-bottom: 20px;">
          <div v-for="(object, continent)  in dataDivided" :key="continent">
            <Tablex :value="dataDivided[continent]" :text="continent + paneSuffix"/>
            <br>
            <br>
          </div>
        </i-col>
      </Row>
    </TabPane>
  </Tabs>
</template>
<script>
import { Tablex, ChartMap } from "_c/charts";
import { vname } from "@/config/properties";
import { mapState } from "vuex";
import { divideScoresBy } from "@/libs/tools";
export default {
  components: {
    Tablex,
    ChartMap
  },
  mounted() {},
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
      vname,
      paneCombined: vname["集合"],
      paneDivided: vname["各洲"],
      paneSuffix: vname["视图"]
    };
  }
};
</script>