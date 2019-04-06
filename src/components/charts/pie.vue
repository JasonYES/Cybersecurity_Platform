<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "./theme.json";
import { on, off } from "@/libs/tools";
import vname from "@/config/view-name";
import { mapState } from "vuex";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "ChartPie",
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  watch: {
    value: function() {
      this.draw();
    }
  },
  computed: {
    ...mapState({
      dname: state => state.cbdata.dynamicName,
      indexes: state => state.cbdata.indexes
    })
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    initPiedata() {
      this.pieData = [];
      this.pieData.push([
        "指标名",
        "0.81-1.00",
        "0.61-0.80",
        "0.41-0.6",
        "0.21-0.4",
        "0-0.2"
      ]);
      for (var i in this.indexes) {
        this.pieData.push([i, 0, 0, 0, 0, 0]);
      }
    },
    countData(data) {
      for (var i in data) {
        var index = 1;
        for (var j in this.indexes) {
          var index2 = this.countAndDevide(data[i][j]);
          this.pieData[index][index2] += 1;
          index++;
        }
      }
    },
    countAndDevide(score) {
      if (score >= 0.8) return 1;
      else if (score >= 0.6) return 2;
      else if (score >= 0.4) return 3;
      else if (score >= 0.2) return 4;
      else return 5;
    },
    addTitleOption(option, xyOfTitles) {
      var titleStyles = {
        color: "#ccc",
        fontSize: 16,
        fontWeight: "normal"
      };
      var index1 = 0;
      for (var i in xyOfTitles) {
        if (index1 + 1 > Object.keys(this.indexes).length) {
          // 确保数组不越界, 当实际的指标比设计的少时.
          break;
        }
        index1++;
        var tmpTitle = {
          textAlign: "center",
          text: this.dname[this.pieData[index1][0]],
          left: xyOfTitles[i][0],
          top: xyOfTitles[i][1],
          textStyle: titleStyles
        };
        option.title.push(tmpTitle);
      }
    },
    addOptionSeries(option, xyOfPies) {
      var limit = Object.keys(this.indexes).length;
      option.series = [];
      for (var i = 1; i <= limit; i++) {
        option.series.push({
          name: this.dname[this.pieData[i][0]],
          type: "pie",
          seriesLayoutBy: "row",
          radius: "20%",
          center: xyOfPies[i - 1],
          encode: {
            itemName: "指标名",
            value: this.pieData[i][0]
          }
        });
      }
    },
    draw() {
      if (Object.keys(this.indexes).length == 0) {
        return;
      }
      this.initPiedata();
      this.countData(this.value);
      var xyOfPies = [
        ["33%", "20%"],
        ["66%", "20%"],
        ["33%", "50%"],
        ["66%", "50%"],
        ["33%", "80%"],
        ["66%", "80%"]
      ];
      var xyOfTitles = [
        ["23%", "5%"],
        ["56%", "5%"],
        ["23%", "35%"],
        ["56%", "35%"],
        ["23%", "65%"],
        ["56%", "65%"]
      ];
      let option = {
        dataset: {
          source: this.pieData
        },
        title: [
          {
            text: this.text,
            textStyle: {
              color: "#ccc"
            },
            padding: 15
          }
        ],
        tooltip: {
          padding: 10,
          backgroundColor: "#222",
          borderColor: "#777",
          borderWidth: 1,
          formatter: function(param) {
            var head =
              '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
              param.seriesName +
              "</div>";
            var title = param.data[0];
            var num = param.data[param.seriesIndex + 1];
            var percent = param.percent;
            var tail = title + "分: " + num + "个 (占比" + percent + "%)";
            return head + tail;
          }
        },
        legend: {},
        backgroundColor: "#2c343c",
        series: []
      };
      this.addTitleOption(option, xyOfTitles);
      this.addOptionSeries(option, xyOfPies);
      this.dom = echarts.init(this.$refs.dom, "tdTheme");
      this.dom.setOption(option);
      on(window, "resize", this.resize);
    }
  },
  mounted() {
    this.draw();
  },
  data() {
    return {
      dom: null,
      pieData: []
    };
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
