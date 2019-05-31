<template>
  <div ref="dom" class="charts chart-bar"></div>
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
      seriesx: [
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
  watch: {
    value: function() {
      this.draw();
    }
  },
  computed: {
    ...mapState({
      dname: state => state.cbdata.dynamicName,
      series: state => {
        var indexOne = Object.keys(state.cbdata.indexes);
        var series = [];
        series.push({
          name: state.cbdata.dynamicName["score"],
          type: "bar",
          markLine: null
        });
        for (let i in indexOne) {
          series.push({
            name: state.cbdata.dynamicName[indexOne[i]],
            type: "bar",
            markLine: null
          });
        }
        return series;
      }
    })
  },
  methods: {
    markingLine(param) {
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
    jsonToArray(jsonArray) {
      var res = [];
      var dimensions = Object.keys(jsonArray[0]);

      res.push(dimensions);
      for (var i in jsonArray) {
        var item = [];
        for (var j in jsonArray[i]) {
          if (j == "country") {
            item.push(this.dname[jsonArray[i][j]]);
          } else {
            item.push(jsonArray[i][j]);
          }
        }
        res.push(item);
      }
      return res;
    },
    draw() {
      if (this.value == null || this.value.length == 0) {
        // 关于数据为空的处理
        this.dom = echarts.init(this.$refs.dom, "tdTheme");
        this.dom.setOption({
          dataset: {
            source: [[]]
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

      let sourceData = this.jsonToArray(this.value);
      this.option = {
        dataset: {
          source: sourceData
        },
        title: {
          text: this.text,
          textStyle: {
            color: "#ccc"
          },
          padding: 15
        },
        legend: {
          padding: 15,
          formatter: param => {
            return param;
          }
        },
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
