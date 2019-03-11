<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "./theme.json";
import { on, off } from "@/libs/tools";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "ChartBar",
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  data() {
    return {
      dom: null
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    objToArray(obj) {
      var res = [];
      var dimensions = Object.keys(obj[0]);
      res.push(dimensions);
      for (var i in obj) {
        var item = [];
        for (var j in obj[i]) item.push(obj[i][j]);
        res.push(item);
      }
      return res;
    }
  },
  mounted() {
    this.$nextTick(() => {
      let sourceData = this.objToArray(this.value);
      let option = {
        dataset: {
          source: sourceData
        },
        title: {
          text: this.text,
          subtext: this.subtext,
          x: "center"
        },
        legend: {},
        tooltip: {},
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#ccc",
            fontSize: 16
          },
          splitLine: {
            lineStyle: {
              color: "#555"
            }
          }
        },
        yAxis: {
          axisLabel: {
            color: "#ccc",
            fontSize: 16
          },
          splitLine: {
            lineStyle: {
              color: "#555"
            }
          }
        },
        series: [
          { type: "bar", seriesLayoutBy: "row" },
          { type: "bar", seriesLayoutBy: "row" },
          { type: "bar", seriesLayoutBy: "row" },
          { type: "bar", seriesLayoutBy: "row" },
          { type: "bar", seriesLayoutBy: "row" },
          { type: "bar", seriesLayoutBy: "row" }
        ],
        backgroundColor: "#2c343c"
      };
      this.dom = echarts.init(this.$refs.dom, "tdTheme");
      this.dom.setOption(option);
      on(window, "resize", this.resize);
    });
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
