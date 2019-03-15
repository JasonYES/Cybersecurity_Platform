<template>
  <div ref="dom" class="charts chart-scatter"></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "./theme.json";
import ecStat, { regression } from "echarts-stat";
import { on, off } from "@/libs/tools";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "ChartScatter",
  props: {
    value: Array, // 值
    text: String, // 标题
    subtext: String // 副标题
  },
  data() {
    return {
      dom: null,
      statData: [],
      regression: {}
    };
  },
  methods: {
    objToArray() {
      var keys = Object.keys(this.value[0]);
      for (var i in this.value) {
        var x = this.value[i][keys[1]];
        var y = this.value[i][keys[2]];
        this.statData.push([x, y]);
      }
    },
    SetRegression() {
      this.regression = ecStat.regression("linear", this.statData);
      this.regression.points.sort(function(a, b) {
        return a[0] - b[0];
      });
    },
    resize() {
      this.dom.resize();
    }
  },
  mounted() {
    this.objToArray();
    this.SetRegression();
    this.$nextTick(() => {
      let keys = Object.keys(this.value[0]);
      let xAxisName = keys[1]; //定义X轴名字
      let yAxisName = keys[2]; //定义y轴名字
      let option = {
        dataset: {
          source: this.value
        },
        tooltip: {
          formatter: function(params) {
            var data = params.data;

            var head = data.country + "<br/>";
            var index1 = xAxisName + " : " + data[xAxisName] + "<br/>";
            var index2 = yAxisName + " : " + data[yAxisName];
            return head + index1 + index2;
          }
        },
        title: {
          text: this.text,
          textStyle: {
            color: "#ccc"
          },
          padding: 15
        },
        legend: {
          padding: 15
        },
        xAxis: [
          {
            name: xAxisName,
            nameLocation: "center",
            nameGap: 30,
            nameTextStyle: {
              fontSize: 16
            },
            scalse: false,
            axisLabel: {
              color: "#ccc",
              fontSize: 16
            },
            splitLine: {
              lineStyle: {
                color: "#555"
              }
            }
          }
        ],
        yAxis: [
          {
            name: yAxisName,
            nameLocation: "center",
            nameGap: 30,
            nameTextStyle: {
              fontSize: 16
            },
            scalse: false,
            axisLabel: {
              color: "#ccc",
              fontSize: 16
            },
            splitLine: {
              lineStyle: {
                color: "#555"
              }
            }
          }
        ],
        series: [
          {
            type: "scatter",
            encode: {
              x: 1, // 默认第一位和第二位对应坐标轴
              y: 2 // 默认第一位和第二位对应坐标轴
            }
          },
          {
            name: "线性回归",
            type: "line",
            showSymbol: false,
            smooth: true,
            data: this.regression.points,
            markPoint: {
              itemStyle: {
                normal: {
                  color: "transparent"
                }
              },
              label: {
                normal: {
                  show: true,
                  position: "inside",
                  formatter: this.regression.expression,
                  textStyle: {
                    color: "#ccc",
                    fontSize: 14
                  }
                }
              },
              data: [
                {
                  coord: this.regression.points[
                    this.regression.points.length - 1
                  ]
                }
              ]
            }
          }
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
