<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24">
        <Card shadow>
          <Cbox @checked="checkedData" :type="'scoring'" :typeValue="typeValue"></Cbox>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24">
        <Card shadow>
          <CboxIndex @checked="checkedIndex"></CboxIndex>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <score-board
            :indexesChosen="indexesChosen"
            :data="[...valueFileterByCbox(scoringValue, chosen, 'country')]"
            :type="'final'"
          ></score-board>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import { Cbox, CboxIndex } from "_c/charts";
import { ScoreBoard } from "_c/scoring";
import tmpData from "@/store/module/tmp-data";
import { valueFileterByCbox } from "@/libs/tools";
export default {
  components: {
    Cbox,
    ScoreBoard,
    CboxIndex
  },
  data() {
    return {
      scoringValue: [],
      typeValue: {},
      chosen: null,
      indexesChosen: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      //Cbox的初始化  国家目录与visual模块不一定一致
      this.typeValue = tmpData["countries"];
      var tmpScoringValue = tmpData["scoringDataFinal"];
      for (var i in tmpScoringValue) {
        tmpScoringValue[i]["cellClassName"] = {};
      }
      this.scoringValue = tmpScoringValue;
    },
    valueFileterByCbox,
    checkedData(chosen) {
      this.chosen = { ...chosen };
    },
    checkedIndex(chosen) {
      this.indexesChosen = [...chosen];
    }
  }
};
</script>

