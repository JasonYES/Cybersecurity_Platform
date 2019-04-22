<template>
  <div ref="dom" class="charts chart-map"></div>
</template>
<script>
import echarts from "echarts";
import "echarts/map/js/world.js";
import tdTheme from "./theme.json";
import { on, off } from "@/libs/tools";
import { mapState } from "vuex";
echarts.registerTheme("tdTheme", tdTheme);
/////////////
//  忠告:
//          使用该组件务必指定像素高度, 如style="height:600px;", 否则很可能出现无法显示的状况.
/////////////
export default {
  name: "ChartMap",
  props: {
    title: String,
    index: String
  },
  computed: {
    ...mapState({
      dname: state => state.cbdata.dynamicName,
      seriesData: function(state) {
        return this.chartMapAdaptor(state.cbdata.cbox.chosenScores);
      }
    })
  },
  watch: {
    seriesData: function() {
      this.draw();
    }
  },
  data() {
    return {
      dom: null,
      wat: null,
      visualMap: {
        min: 1,
        max: 5
      }
    };
  },
  methods: {
    chartMapAdaptor(chosen) {
      var result = [];
      for (var i in chosen) {
        var one = {
          name: chosen[i]["country"],
          value: chosen[i][this.index]
        };
        result.push(one);
      }
      return result;
    },
    draw() {
      let option = {
        title: {
          text: this.title,
          subtext: "",
          sublink: "",
          left: "center",
          top: "top"
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            var value = (params.value + "").split(".");
            value =
              value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") +
              "." +
              value[1];
            // return params.seriesName + "<br/>" + params.name + " : " + value;
            return params.name + " : " + value;
          }
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          min: this.visualMap.min,
          max: this.visualMap.max,
          text: ["High", "Low"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["red", "yellow", "green"]
          }
        },
        series: [
          {
            name: "CyberSecurity",
            type: "map",
            mapType: "world",
            roam: true,
            itemStyle: {
              emphasis: { label: { show: true } }
            },
            data: this.seriesData
          }
        ]
      };

      this.dom = echarts.init(this.$refs.dom, "tdTheme");
      this.dom.setOption(option);
      on(window, "resize", this.resize);
    },
    resize() {
      this.dom.resize();
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.index == "score") {
        this.visualMap.max = 30;
        this.visualMap.min = 15;
      }
      this.draw();
    });
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
