<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "./theme.json";
import { on, off } from "@/libs/tools";
import * as math from "mathjs";
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
      dom: null,
      data: {},
      series: [
        {
          name: "score",
          type: "bar",
          markLine: null
        },
        {
          name: "legal",
          type: "bar",
          markLine: null
        },
        {
          name: "technical",
          type: "bar",
          markLine: null
        },
        {
          name: "organization",
          type: "bar",
          markLine: null
        },
        {
          name: "capacity",
          type: "bar",
          markLine: null
        },
        {
          name: "cooperation",
          type: "bar",
          markLine: null
        }
      ],
      marklineOpt: {
        animation: false,
        lineStyle: {
          normal: {
            type: "solid"
          }
        },
        data: [
          {
            name: "平均数",
            type: "average"
          }
        ]
      }
    };
  },
  methods: {
    markingLine(param) {
      console.log(param);
      if (param.componentSubType == "bar") {
        for (var i in this.option) {
          this.option.markLine = null;
        }
        this.dom.setOption(this.option);
        this.dom.setOption({
          series: {
            name: param.seriesName,
            type: "bar",
            markLine: this.marklineOpt
          }
        });
      }
    },
    resize() {
      this.dom.resize();
    },
    objToArray(obj) {
      var res = [];
      var dimensions = Object.keys(obj[0]);

      // for (var i in dimensions) {
      //   var item = [];
      //   item.push(dimensions[i]);
      //   for (var j in obj) {
      //     item.push(obj[j][dimensions[i]]);
      //   }
      //   res.push(item);
      // }
      // console.log(res);

      res.push(dimensions);
      for (var i in obj) {
        var item = [];
        for (var j in obj[i]) item.push(obj[i][j]);
        res.push(item);
      }
      return res;
    },
    statAverage(value) {
      // 结果项
      var mean = { country: "平均数" };
      var indexes = [
        "score",
        "legal",
        "technical",
        "organization",
        "capacity",
        "cooperation"
      ];
      // 遍历统计
      for (var i in indexes) {
        var title = indexes[i];
        var array = [];
        for (var j in value) {
          array.push(value[j][title]);
        }
        mean[title] = math.mean(array).toFixed(2);
      }
      // 插入结果
      value.push(mean);
    }
  },
  mounted() {
    this.$nextTick(() => {
      let sourceData = this.objToArray(this.value);
      this.option = {
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
        series: this.series,
        backgroundColor: "#2c343c"
      };
      this.dom = echarts.init(this.$refs.dom, "tdTheme");
      this.dom.setOption(this.option);
      this.dom.on("mouseover", this.markingLine);

      // on(window, "mouseout", function(params) {
      //   console.log("xx");
      // });

      on(window, "resize", this.resize);
    });
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
