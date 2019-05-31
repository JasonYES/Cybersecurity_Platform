<template>
  <div class="charts tablex">
    <h2 style="padding-left:10px">{{text}}</h2>
    <div>
      <!-- <Table border :row-class-name="rowClassName" :columns="columns" :data="data"></Table> -->
      <Table stripe border :columns="columns" :data="data"></Table>
    </div>
    <br>
  </div>
</template>
<script>
import * as math from "mathjs";
import { vname } from "@/config/properties";
import { mapState } from "vuex";
export default {
  name: "tablex",
  props: {
    value: Array,
    text: String
  },
  computed: {
    data: function() {
      var valueCopy = [];
      for (var i in this.value) {
        valueCopy.push({ ...this.value[i] });
      }
      this.dataCalculator(valueCopy);
      this.dataTranslator(valueCopy);
      return valueCopy;
    },
    ...mapState({
      dname: state => state.cbdata.dynamicName,
      indexOne: state => Object.keys(state.cbdata.indexes)
    })
  },
  watch: {
    indexOne: function() {
      this.columnsBuilder();
    }
  },
  mounted() {
    this.columnsBuilder();
  },
  methods: {
    dataCalculator(value) {
      // 数组未初始化保护
      if (value == null || value.length === 0) {
        return;
      }
      // 初始化结果项
      var mean = { country: "____平均数____" };
      var std = { country: "____标准差____" };
      var median = { country: "____中位数____" };
      var indexes = ["score", ...this.indexOne];
      // 遍历统计
      for (var i in indexes) {
        var title = indexes[i];
        var array = [];
        for (var j in value) {
          // 放数组, 方便计算数学数据
          if (value[j][title] == null) {
            array.push(0);
          } else {
            array.push(value[j][title]);
          }
        }
        mean[title] = math.mean(array).toFixed(2);
        std[title] = math.std(array).toFixed(2);
        median[title] = math.median(array).toFixed(2);
      }
      // 插入结果
      value.push(mean);
      value.push(std);
      value.push(median);
    },
    dataTranslator(value) {
      // 数组未初始化保护
      if (value == null || value.length === 0) {
        return;
      }
      // 遍历统计
      for (var i in value) {
        // 中文化
        if (this.dname[value[i]["country"]] != null) {
          value[i]["country"] = this.dname[value[i]["country"]];
        }
      }
    },
    columnsBuilder() {
      this.columns = [];
      this.columns.push({
        title: vname["country"],
        key: "country"
      });
      this.columns.push({
        title: vname["score"],
        key: "score",
        sortable: true
      });
      for (let i in this.indexOne) {
        this.columns.push({
          title: this.dname[this.indexOne[i]],
          key: this.indexOne[i],
          sortable: true
        });
      }
    },
    rowClassName(row, index) {
      if (row.country == "平均数") return "stats";
      if (row.country == "标准差") return "stats";
      if (row.country == "中位数") return "stats";
      return "";
    }
  },
  data() {
    return {
      vname,
      splitRatio: 0.8,
      columns: [],
      countriesData: [
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
          country: "美国",
          score: 0.91,
          legal: 1,
          technical: 0.96,
          organization: 0.92,
          capacity: 1,
          cooperation: 0.73
        },
        {
          country: "马来西亚",
          score: 0.89,
          legal: 0.87,
          technical: 0.96,
          organization: 0.77,
          capacity: 1,
          cooperation: 0.87
        },
        {
          country: "也门",
          score: 0.87,
          legal: 0.98,
          technical: 0.82,
          organization: 0.85,
          capacity: 0.95,
          cooperation: 0.75
        },
        {
          country: "尼日利亚",
          score: 0.84,
          legal: 0.99,
          technical: 0.82,
          organization: 0.85,
          capacity: 0.94,
          cooperation: 0.64
        },
        {
          country: "毛里求斯",
          score: 0.82,
          legal: 0.85,
          technical: 0.96,
          organization: 0.74,
          capacity: 0.91,
          cooperation: 0.7
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
          country: "加拿大",
          score: 0.81,
          legal: 0.94,
          technical: 0.93,
          organization: 0.71,
          capacity: 0.82,
          cooperation: 0.7
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
        },
        {
          country: "澳大利亚",
          score: 0.82,
          legal: 0.94,
          technical: 0.96,
          organization: 0.86,
          capacity: 0.94,
          cooperation: 0.44
        }
      ],
      orgsData: [
        {
          country: "亚洲",
          score: 0.92,
          legal: 0.95,
          technical: 0.96,
          organization: 0.88,
          capacity: 0.97,
          cooperation: 0.87
        },
        {
          country: "欧洲",
          score: 0.91,
          legal: 1,
          technical: 0.96,
          organization: 0.92,
          capacity: 1,
          cooperation: 0.73
        },
        {
          country: "大洋洲",
          score: 0.89,
          legal: 0.87,
          technical: 0.96,
          organization: 0.77,
          capacity: 1,
          cooperation: 0.87
        },
        {
          country: "非洲",
          score: 0.87,
          legal: 0.98,
          technical: 0.82,
          organization: 0.85,
          capacity: 0.95,
          cooperation: 0.75
        },
        {
          country: "拉丁美洲",
          score: 0.84,
          legal: 0.99,
          technical: 0.82,
          organization: 0.85,
          capacity: 0.94,
          cooperation: 0.64
        },
        {
          country: "北美洲",
          score: 0.82,
          legal: 0.85,
          technical: 0.96,
          organization: 0.74,
          capacity: 0.91,
          cooperation: 0.7
        }
      ]
    };
  }
};
</script>
</<style>
.ivu-table .stats td{
        background-color: #80d5ff;
        /* color: #fff; */
    }
</style>
