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
            :tableLoading="tableLoading"
            :indexesChosen="indexesChosen"
            :data="[...valueFileterByCbox(scoringValue, chosen, 'country')]"
            :type="'manual'"
            @refresh="refreshTable"
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
import { getCountries } from "@/api/visual";
import { getScoringData } from "@/api/scoring";
export default {
  components: {
    Cbox,
    ScoreBoard,
    CboxIndex
  },
  data() {
    return {
      tableLoading: true,
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
      getCountries()
        .then(res => {
          if (res.data.code == 0) {
            var data = res.data.data;
            this.typeValue = data;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(err => {
          alert(err);
        });
      this.refreshTable();
      // this.typeValue = tmpData["countries"];

      // var tmpScoringValue = tmpData["scoringData"];
      // this.addCellStyleField(tmpScoringValue);
      // this.scoringValue = tmpScoringValue;
    },
    valueFileterByCbox,
    addCellStyleField(value) {
      for (var i in value) {
        value[i]["cellClassName"] = {};
      }
    },
    refreshTable() {
      getScoringData()
        .then(res => {
          if (res.data.code == 0) {
            var data = res.data.data;
            this.addCellStyleField(data);
            this.scoringValue = data;
            this.tableLoading = false;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    checkedData(chosen) {
      this.chosen = { ...chosen };
    },
    checkedIndex(chosen) {
      this.indexesChosen = [...chosen];
    }
  }
};
</script>

