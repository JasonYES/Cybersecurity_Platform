<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "./theme.json";
import { on, off } from "@/libs/tools";
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
      console.log(this.pieData);
    },
    countAndDevide(score) {
      if (score >= 0.8) return 1;
      else if (score >= 0.6) return 2;
      else if (score >= 0.4) return 3;
      else if (score >= 0.2) return 4;
      else return 5;
    }
  },
  mounted() {
    this.countData(this.data);
    this.$nextTick(() => {
      let option = {
        dataset: {
          source: this.pieData
        },
        title: {
          text: this.text,
          subtext: this.subtext,
          x: "center"
        },
        tooltip: {},
        legend: {},
        series: [
          {
            type: "pie",
            seriesLayoutBy: "row",
            radius: "20%",
            center: ["33%", "20%"],
            encode: {
              itemName: "指标名",
              value: "指标1"
            }
          },
          {
            type: "pie",
            seriesLayoutBy: "row",
            radius: "20%",
            center: ["66%", "20%"],
            encode: {
              itemName: "指标名",
              value: "指标2"
            }
          },
          {
            type: "pie",
            seriesLayoutBy: "row",
            radius: "20%",
            center: ["33%", "50%"],
            encode: {
              itemName: "指标名",
              value: "指标3"
            }
          },
          {
            type: "pie",
            seriesLayoutBy: "row",
            radius: "20%",
            center: ["66%", "50%"],
            encode: {
              itemName: "指标名",
              value: "指标4"
            }
          },
          {
            type: "pie",
            seriesLayoutBy: "row",
            radius: "20%",
            center: ["33%", "80%"],
            encode: {
              itemName: "指标名",
              value: "指标5"
            }
          },
          {
            type: "pie",
            seriesLayoutBy: "row",
            radius: "20%",
            center: ["66%", "80%"],
            encode: {
              itemName: "指标名",
              value: "指标6"
            }
          }
        ]
      };
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
        ["指标1", 0, 0, 0, 0, 0],
        ["指标2", 0, 0, 0, 0, 0],
        ["指标3", 0, 0, 0, 0, 0],
        ["指标4", 0, 0, 0, 0, 0],
        ["指标5", 0, 0, 0, 0, 0],
        ["指标6", 0, 0, 0, 0, 0]
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
