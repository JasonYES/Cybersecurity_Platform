<template>
  <div ref="dom" class="charts chart-map"></div>
</template>
<script>
import echarts from "echarts";
import tdTheme from "./theme.json";
import { on, off } from "@/libs/tools";
// echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "ChartScatter",
  props: {
    value: Array, // 值
    text: String, // 标题
    subtext: String // 副标题
  },
  data() {
    return {
      dom: null
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    }
  },
  mounted() {
    this.$nextTick(() => {
      let keys = Object.keys(this.value[0]);
      let xAxisName = keys[1]; //定义X轴名字
      let yAxisName = keys[2]; //定义y轴名字
      let option = {
        dataset: {
          // dimensions: ["count", "score"],
          source: this.value
        },
        tooltip: {},
        title: {
          text: this.text,
          subtext: this.subtext,
          x: "center"
        },
        xAxis: {
          type: "value",
          name: xAxisName,
          nameTextStyle: {
            color: "#242424",
            fontSize: 14
          }
        },
        yAxis: {
          type: "value",
          name: yAxisName,
          nameTextStyle: {
            color: "#242424",
            fontSize: 14
          }
        },
        series: [
          {
            type: "scatter",
            encode: {
              tooltip: [0, 1, 2],
              x: 1, // 默认第一位和第二位对应坐标轴
              y: 2 // 默认第一位和第二位对应坐标轴
            }
          }
        ]
      };
      this.dom = echarts.init(this.$refs.dom);
      this.dom.setOption(option);
      on(window, "resize", this.resize);
    });
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
