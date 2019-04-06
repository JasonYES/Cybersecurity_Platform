<template>
  <div ref="dom" class="charts chart-scatter"></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "./theme.json";
import ecStat, { regression } from "echarts-stat";
import { on, off } from "@/libs/tools";
import vname from "@/config/view-name";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "ChartScatter",
  props: {
    value: Array, // 值
    text: String, // 标题
    subtext: String, // 副标题
    chosenIndexes: Object
  },
  data() {
    return {
      dom: null,
      xAxisName: "",
      yAxisName: "",
      statData: [], // 只供回归分析使用
      statMap: {} // 只供聚类使用
    };
  },
  watch: {
    value: function() {
      this.draw();
    },
    chosenIndexes: function() {
      this.draw();
    }
  },
  methods: {
    objToArray() {
      //只供回归分析使用
      this.statData = [];
      this.statMap = {};
      for (var i in this.value) {
        var x = this.value[i][this.chosenIndexes["X轴指标"]];
        var y = this.value[i][this.chosenIndexes["Y轴指标"]];
        var country = this.value[i]["country"];
        this.statData.push([x, y]);
        this.SetDataMap(x, y, country);
      }
      // var keys = Object.keys(this.value[0]);
      // for (var i in this.value) {
      //   var x = this.value[i][keys[1]];
      //   var y = this.value[i][keys[2]];
      //   var country = this.value[i][keys[0]];
      //   this.statData.push([x, y]);
      //   this.SetDataMap(x, y, country);
      // }
    },
    SetRegression(option) {
      var regression = ecStat.regression("linear", this.statData);
      regression.points.sort(function(a, b) {
        return a[0] - b[0];
      });
      option.series.push({
        name: "线性回归",
        type: "line",
        showSymbol: false,
        smooth: true,
        data: regression.points,
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
              formatter: regression.expression,
              textStyle: {
                color: "#ccc",
                fontSize: 14
              }
            }
          },
          data: [
            {
              coord: regression.points[regression.points.length - 1]
            }
          ]
        }
      });
    },
    SetClustering(option) {
      var result = ecStat.clustering.hierarchicalKMeans(
        this.statData,
        3,
        false
      );
      var centroids = result.centroids;
      var ptsInCluster = result.pointsInCluster;

      for (var i = 0; i < centroids.length; i++) {
        option.series.push({
          name: "数据簇" + (i + 1),
          type: "scatter",
          data: ptsInCluster[i],
          markPoint: {
            symbolSize: 30,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true,
                position: "top",
                formatter: function(params) {
                  return (
                    Math.round(params.data.coord[0] * 100) / 100 +
                    "  " +
                    Math.round(params.data.coord[1] * 100) / 100 +
                    " "
                  );
                },
                textStyle: {
                  color: "#ccc"
                }
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.8
              }
            },
            data: [
              {
                coord: centroids[i]
              }
            ]
          }
        });
      }
    },
    SetDataMap(x, y, country) {
      //该方法用来通过x和y的值查找国家名
      if (this.statMap[x] == null || this.statMap[x][y] == null) {
        this.statMap[x] = {};
        this.statMap[x][y] = [country];
        return;
      }
      this.statMap[x][y].push(country);
    },
    SetTooltip(option) {
      var tooltip = {
        formatter: params => {
          var data = params.data;
          var head = "";
          if (params.componentType == "series") {
            for (var i in this.statMap[data[0]][data[1]]) {
              head += "国家 : " + this.statMap[data[0]][data[1]][i] + "   ";
            }
            head += "<br/>";
            var index1 = this.xAxisName + " : " + data[0] + "<br/>";
            var index2 = this.yAxisName + " : " + data[1];
            return head + index1 + index2;
          } else if (params.seriesName == "线性回归") {
            return "";
          } else {
            head += params.seriesName;
            return head;
          }
        }
      };
      option.tooltip = tooltip;
    },
    resize() {
      this.dom.resize();
    },
    draw() {
      this.objToArray();
      this.xAxisName = this.chosenIndexes["X轴指标"]; //定义X轴名字
      this.yAxisName = this.chosenIndexes["Y轴指标"]; //定义y轴名字
      let option = {
        dataset: {
          source: this.value
        },
        title: {
          text: this.text,
          textStyle: {
            color: "#ccc"
          },
          padding: 15
        },
        tooltip: {},
        legend: {
          padding: 15
        },
        xAxis: [
          {
            name: this.xAxisName,
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
            name: this.yAxisName,
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
          // {
          //   type: "scatter",
          //   encode: {
          //     x: 1, // 默认第一位和第二位对应坐标轴
          //     y: 2 // 默认第一位和第二位对应坐标轴
          //   }
          // }
        ],
        backgroundColor: "#2c343c"
      };

      this.SetClustering(option);
      this.SetRegression(option);
      this.SetTooltip(option);
      this.dom = echarts.init(this.$refs.dom, "tdTheme");
      this.dom.setOption(option);
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
