<template>
  <div ref="dom" class="charts chart-line"></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "./theme.json";
import { on, off, dvname } from "@/libs/tools";
import * as math from "mathjs";
import { vname } from "@/config/properties";
import { mapState } from "vuex";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "ChartLine",
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  data() {
    return {
      dom: null,
      data: {},
      series: [
        { type: "line" },
        { type: "line" },
        { type: "line" },
        { type: "line" },
        { type: "line" },
        { type: "line" }
      ]
    };
  },
  watch: {
    value: function() {
      this.draw();
    }
  },
  computed: {
    ...mapState({
      dname: state => state.cbdata.dynamicName
    })
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    draw() {
      if (this.value == null || this.value.length == 0) {
        // 关于数据为空的处理
        this.dom = echarts.init(this.$refs.dom, "tdTheme");
        this.dom.setOption({
          dataset: {
            source: []
          },
          title: {
            text: this.text,
            textStyle: {
              color: "#ccc"
            },
            padding: 15
          },
          series: []
        });
        on(window, "resize", this.resize);
        return;
      }
      // 初始化各个option参数
      let dimensions = ["sets"];
      let copyObj = { ...this.value[0] };
      delete copyObj["sets"];
      dimensions.push(...Object.keys(copyObj));
      //   series更新
      this.series = [];
      for (var i in this.value) {
        this.series.push({ type: "line" });
      }
      let sourceData = this.value;
      //   let sourceData = this.value;
      this.option = {
        dataset: {
          dimensions: dimensions,
          source: sourceData
        },
        legend: {
          padding: 15,
          formatter: param => {
            return param;
          }
        },
        tooltip: {},
        series: this.series,
        title: {
          text: this.text
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#000000",
            fontSize: 16
          },
          splitLine: {
            lineStyle: {
              color: "#CCCCCC"
            }
          }
        },
        yAxis: {
          axisLabel: {
            color: "#000000",
            fontSize: 16
          },
          splitLine: {
            lineStyle: {
              color: "#CCCCCC"
            }
          }
        },
        backgroundColor: "#FFFFFF"
      };
      this.dom = echarts.init(this.$refs.dom, "tdTheme");
      this.dom.setOption(this.option);
      on(window, "resize", this.resize);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.draw();
    });
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
