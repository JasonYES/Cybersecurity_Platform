<template>
  <div ref="dom" class="charts chart-map"></div>
</template>
<script>
import echarts from "echarts";
import "echarts/map/js/world.js";
import tdTheme from "./theme.json";
import { on, off } from "@/libs/tools";
echarts.registerTheme("tdTheme", tdTheme);
/////////////
//  忠告:
//          使用该组件务必指定像素高度, 如style="height:600px;", 否则很可能出现无法显示的状况.
/////////////
export default {
  name: "ChartMap",
  props: {
    title: String
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
          min: 0,
          max: 1,
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
            data: [
              { name: "China", value: 0.6 },
              { name: "India", value: 0.9 },
              { name: "United States", value: 0.9 },
              { name: "Indonesia", value: 0.9 },
              { name: "Iran", value: 0.9 },
              { name: "Brazil", value: 0.9 },
              { name: "Pakistan", value: 0.9 },
              { name: "Nigeria", value: 0.9 },
              { name: "Bangladesh", value: 0.9 },
              { name: "Japan", value: 0.9 },
              { name: "Mexico", value: 0.9 },
              { name: "Philippines", value: 0.9 },
              { name: "Vietnam", value: 0.9 },
              { name: "Ethiopia", value: 0.8 },
              { name: "Germany", value: 0.8 },
              { name: "Egypt", value: 0.8 },
              { name: "Turkey", value: 0.8 },
              { name: "The Bahamas", value: 0.8 },
              { name: "Thailand", value: 0.8 },
              { name: "France", value: 0.8 },
              { name: "Dem. Rep. Congo", value: 0.8 },
              { name: "United Kingdom", value: 0.8 },
              { name: "Ivory Coast", value: 0.8 },
              { name: "Italy", value: 0.8 },
              { name: "Myanmar", value: 0.6 },
              { name: "South Korea", value: 0.6 },
              { name: "South Africa", value: 0.6 },
              { name: "Colombia", value: 0.6 },
              { name: "Spain", value: 0.6 },
              { name: "Ukraine", value: 0.6 },
              { name: "United Republic of Tanzania", value: 0.6 },
              { name: "Kenya", value: 0.6 },
              { name: "Argentina", value: 0.6 },
              { name: "Poland", value: 0.6 },
              { name: "Algeria", value: 0.6 },
              { name: "Sudan", value: 0.6 },
              { name: "Canada", value: 0.6 },
              { name: "Uganda", value: 0.6 },
              { name: "Morocco", value: 0.6 },
              { name: "Iraq", value: 0.6 },
              { name: "Peru", value: 0.6 },
              { name: "Afghanistan", value: 0.6 },
              { name: "Malaysia", value: 0.6 },
              { name: "Uzbekistan", value: 0.6 },
              { name: "Saudi Arabia", value: 0.6 },
              { name: "Nepal", value: 0.6 },
              { name: "Ghana", value: 0.6 },
              { name: "Mozambique", value: 0.6 },
              { name: "Yemen", value: 0.6 },
              { name: "Australia", value: 0.6 },
              { name: "Romania", value: 0.6 },
              { name: "Russia", value: 0.6 },
              { name: "Madagascar", value: 0.6 },
              { name: "Sri Lanka", value: 0.6 },
              { name: "Cameroon", value: 0.6 },
              { name: "Angola", value: 0.6 },
              { name: "Chile", value: 0.6 },
              { name: "Netherlands", value: 0.6 },
              { name: "Kazakhstan", value: 0.6 },
              { name: "Niger", value: 0.6 },
              { name: "Burkina Faso", value: 0.6 },
              { name: "Malawi", value: 0.6 },
              { name: "Ecuador", value: 0.6 },
              { name: "Cambodia", value: 0.6 },
              { name: "Guatemala", value: 0.6 },
              { name: "Mali", value: 0.6 },
              { name: "Zambia", value: 0.6 },
              { name: "Zimbabwe", value: 0.6 },
              { name: "Senegal", value: 0.6 },
              { name: "Chad", value: 0.6 },
              { name: "Cuba", value: 0.6 },
              { name: "Greece", value: 0.6 },
              { name: "Belgium", value: 0.6 },
              { name: "Guinea", value: 0.6 },
              { name: "Guinea Bissau", value: 0.6 },
              { name: "Rwanda", value: 0.6 },
              { name: "Tunisia", value: 0.6 },
              { name: "Portugal", value: 0.6 },
              { name: "Czech Republic", value: 0.6 },
              { name: "Dominican Republic", value: 0.2 },
              { name: "East Timor", value: 0.2 },
              { name: "Hungary", value: 0.2 },
              { name: "South Sudan", value: 0.2 },
              { name: "Haiti", value: 0.2 },
              { name: "Somaliland", value: 0.2 },
              { name: "Somalia", value: 0.2 },
              { name: "Benin", value: 0.2 },
              { name: "Belarus", value: 0.2 },
              { name: "Sweden", value: 0.2 },
              { name: "Burundi", value: 0.2 },
              { name: "Azerbaijan", value: 0.4 },
              { name: "United Arab Emirates", value: 0.4 },
              { name: "Austria", value: 0.4 },
              { name: "Switzerland", value: 0.4 },
              { name: "Syria", value: 0.4 },
              { name: "Tajikistan", value: 0.4 },
              { name: "Honduras", value: 0.4 },
              { name: "Israel", value: 0.4 },
              { name: "Bulgaria", value: 0.4 },
              { name: "Papua New Guinea", value: 0.4 },
              { name: "Paraguay", value: 0.4 },
              { name: "Jordan", value: 0.4 },
              { name: "Laos", value: 0.4 },
              { name: "Togo", value: 0.4 },
              { name: "El Salvador", value: 0.4 },
              { name: "Libya", value: 0.4 },
              { name: "Nicaragua", value: 0.3 },
              { name: "Sierra Leone", value: 0.3 },
              { name: "Eritrea", value: 0.3 },
              { name: "Denmark", value: 0.3 },
              { name: "Slovakia", value: 0.3 },
              { name: "Finland", value: 0.3 },
              { name: "Kyrgyzstan", value: 0.3 },
              { name: "Turkmenistan", value: 0.3 },
              { name: "Norway", value: 0.3 },
              { name: "Costa Rica", value: 0.3 },
              { name: "Ireland", value: 0.3 },
              { name: "Georgia", value: 0.3 },
              { name: "New Zealand", value: 0.3 },
              { name: "Central African Republic", value: 0.3 },
              { name: "Lebanon", value: 0.7 },
              { name: "Croatia", value: 0.7 },
              { name: "Liberia", value: 0.7 },
              { name: "Bosnia and Herzegovina", value: 0.7 },
              { name: "Puerto Rico", value: 0.7 },
              { name: "Panama", value: 0.7 },
              { name: "Mauritania", value: 0.7 },
              { name: "Republic of the Congo", value: 0.7 },
              { name: "Republic of Serbia", value: 0.7 },
              { name: "Uruguay", value: 0.7 },
              { name: "Albania", value: 0.7 },
              { name: "Lithuania", value: 0.7 },
              { name: "Kuwait", value: 0.7 },
              { name: "Armenia", value: 0.7 },
              { name: "Oman", value: 0.7 },
              { name: "Jamaica", value: 0.7 },
              { name: "Mongolia", value: 0.7 },
              { name: "Namibia", value: 0.7 },
              { name: "Latvia", value: 0.7 },
              { name: "Slovenia", value: 0.2 },
              { name: "Lesotho", value: 0.2 },
              { name: "Botswana", value: 0.2 },
              { name: "Qatar", value: 0.2 },
              { name: "Gambia", value: 0.2 },
              { name: "Gabon", value: 0.2 },
              { name: "Trinidad and Tobago", value: 0.2 },
              { name: "Estonia", value: 0.2 },
              { name: "Swaziland", value: 0.2 },
              { name: "Cyprus", value: 0.2 },
              { name: "Fiji", value: 0.2 },
              { name: "Djibouti", value: 0.2 },
              { name: "Guyana", value: 0.2 },
              { name: "Bolivia", value: 0.2 },
              { name: "Bhutan", value: 0.2 },
              { name: "Equatorial Guinea", value: 0.1 },
              { name: "Montenegro", value: 0.1 },
              { name: "Solomon Islands", value: 0.1 },
              { name: "Suriname", value: 0.1 },
              { name: "W. Sahara", value: 0.1 },
              { name: "Luxembourg", value: 0.1 },
              { name: "Macedonia", value: 0.1 },
              { name: "Iceland", value: 0.1 },
              { name: "Belize", value: 0.1 },
              { name: "French Southern and Antarctic Lands", value: 0.1 },
              { name: "New Caledonia", value: 0.1 },
              { name: "Venezuela", value: 0.1 },
              { name: "Vanuatu", value: 0.1 },
              { name: "French Guiana", value: 0.1 },
              { name: "Moldova", value: 0.1 },
              { name: "Kosovo", value: 0.1 },
              { name: "Bermuda", value: 0.1 },
              { name: "Greenland", value: 0.1 },
              { name: "Falkland Islands", value: 0.1 },
              { name: "Brunei", value: 0.1 },
              { name: "West Bank", value: 0.1 },
              { name: "Northern Cyprus", value: 0.1 },
              { name: "North Korea", value: 0.1 }
            ]
          }
        ]
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
