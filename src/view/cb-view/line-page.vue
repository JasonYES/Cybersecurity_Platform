<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox @checked="checkedCountry" :type="'history'"></Cbox>
        </Card>
      </i-col>
    </Row>
    <!-- <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox-set @checked="checkedSets"></Cbox-set>
        </Card>
      </i-col>
    </Row>-->
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-line :value="value" style="height: 500px;"></chart-line>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { Cbox, ChartLine, CboxSet } from "_c/charts";
import tmpData from "@/store/module/tmp-data";
import { getLine } from "@/api/visual";

export default {
  name: "home",
  components: {
    ChartLine,
    Cbox,
    CboxSet
  },
  methods: {
    checkedCountry(data) {
      var chosen = [];
      for (var i in data) {
        chosen.push(...data[i]);
      }
      this.chosen.coun = chosen;
      this.refresh();
    },
    checkedSets(data) {
      this.chosen.sets = data;
      this.refresh();
    },
    refresh() {
      getLine({
        index: "score",
        countries: this.chosen.coun
      })
        .then(res => {
          if (res.data.code == 0) {
            var data = res.data.data;
            this.value = data;
          } else {
            alert("错误! " + res.data.msg);
          }
        })
        .catch(err => {
          alert("错误! " + err);
        });

      // this.value = tmpData["lineData"];
    }
  },
  data() {
    return {
      value: [],
      chosen: {
        coun: [],
        sets: []
      }
    };
  },
  mounted() {
    // this.value = tmpData["lineData"];
  }
};
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
