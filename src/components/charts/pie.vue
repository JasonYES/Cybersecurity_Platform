<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "./theme.json";
import { on, off } from "@/libs/tools";
import vname from "@/config/view-name";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "ChartPie",
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    countData(data) {
      for (var i in data) {
        var index = 1;
        for (var j in data[i]) {
          if (j == "country") continue;
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
        index1++;
        var tmpTitle = {
          textAlign: "center",
          text: vname[this.pieData[index1][0]],
          left: xyOfTitles[i][0],
          top: xyOfTitles[i][1],
          textStyle: titleStyles
        };
        option.title.push(tmpTitle);
      }
    }
  },
  mounted() {
    this.countData(this.value);
    this.$nextTick(() => {
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
        series: [
          {
            name: vname[this.pieData[1][0]],
            type: "pie",
            seriesLayoutBy: "row",
            radius: "20%",
            center: xyOfPies[0],
            encode: {
              itemName: "指标名",
              value: this.pieData[1][0]
            }
          },
          {
            name: vname[this.pieData[2][0]],
            type: "pie",
            seriesLayoutBy: "row",
            radius: "20%",
            center: xyOfPies[1],
            encode: {
              itemName: "指标名",
              value: this.pieData[2][0]
            }
          },
          {
            name: vname[this.pieData[3][0]],
            type: "pie",
            seriesLayoutBy: "row",
            radius: "20%",
            center: xyOfPies[2],
            encode: {
              itemName: "指标名",
              value: this.pieData[3][0]
            }
          },
          {
            name: vname[this.pieData[4][0]],
            type: "pie",
            seriesLayoutBy: "row",
            radius: "20%",
            center: xyOfPies[3],
            encode: {
              itemName: "指标名",
              value: this.pieData[4][0]
            }
          },
          {
            name: vname[this.pieData[5][0]],
            type: "pie",
            seriesLayoutBy: "row",
            radius: "20%",
            center: xyOfPies[4],
            encode: {
              itemName: "指标名",
              value: this.pieData[5][0]
            }
          },
          {
            name: vname[this.pieData[6][0]],
            type: "pie",
            seriesLayoutBy: "row",
            radius: "20%",
            center: xyOfPies[5],
            encode: {
              itemName: "指标名",
              value: this.pieData[6][0]
            }
          }
        ]
      };
      this.addTitleOption(option, xyOfTitles);
      this.dom = echarts.init(this.$refs.dom, "tdTheme");
      this.dom.setOption(option);
      on(window, "resize", this.resize);
    });
  },
  data() {
    return {
      dom: null,
      pieData: [
        ["指标名", "0.81-1.00", "0.61-0.80", "0.41-0.6", "0.21-0.4", "0-0.2"],
        ["score", 0, 0, 0, 0, 0],
        ["legal", 0, 0, 0, 0, 0],
        ["technical", 0, 0, 0, 0, 0],
        ["organization", 0, 0, 0, 0, 0],
        ["capacity", 0, 0, 0, 0, 0],
        ["cooperation", 0, 0, 0, 0, 0]
      ],
      data: [
        {
          country: "新加坡",
          score: 0.92,
          legal: 0.95,
          technical: 0.96,
          organization: 0.88,
          capacity: 0.97,
          cooperation: 0.87
        },
        {
          country: "马来西亚",
          score: 0.55,
          legal: 0.68,
          technical: 0.43,
          organization: 0.55,
          capacity: 0.28,
          cooperation: 0.44
        },
        {
          country: "也门",
          score: 0.22,
          legal: 0.11,
          technical: 0.34,
          organization: 0.25,
          capacity: 0.44,
          cooperation: 0.35
        },
        {
          country: "尼日利亚",
          score: 0.43,
          legal: 0.99,
          technical: 0.22,
          organization: 0.68,
          capacity: 0.77,
          cooperation: 0.21
        },
        {
          country: "澳大利亚",
          score: 0.82,
          legal: 0.94,
          technical: 0.96,
          organization: 0.86,
          capacity: 0.94,
          cooperation: 0.44
        },
        {
          country: "日本",
          score: 0.81,
          legal: 0.91,
          technical: 0.77,
          organization: 0.82,
          capacity: 0.9,
          cooperation: 0.7
        },
        {
          country: "法国",
          score: 0.81,
          legal: 0.94,
          technical: 0.96,
          organization: 0.6,
          capacity: 1,
          cooperation: 0.61
        },
        {
          country: "俄罗斯",
          score: 0.78,
          legal: 0.82,
          technical: 0.67,
          organization: 0.85,
          capacity: 0.91,
          cooperation: 0.7
        },
        {
          country: "埃及",
          score: 0.77,
          legal: 0.92,
          technical: 0.92,
          organization: 0.4,
          capacity: 0.92,
          cooperation: 0.7
        }
      ]
    };
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
