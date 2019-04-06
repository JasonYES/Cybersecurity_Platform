<template>
  <Tabs>
    <TabPane :label="paneCombined">
      <Row type="flex" justify="center" :gutter="20" style="margin-top: 10px;">
        <i-col :md="16" :lg="16" style="margin-bottom: 20px;">
          <Tablex :value="dataCombined" :text="paneCombined"/>
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
import { Tablex } from "_c/charts";
import vname from "@/config/view-name";
import { mapState } from "vuex";
import { divideScoresBy } from "@/libs/tools";
export default {
  components: {
    Tablex
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
      paneCombined: vname["集合"],
      paneDivided: vname["各洲"],
      paneSuffix: vname["视图"]
    };
  }
};
</script>