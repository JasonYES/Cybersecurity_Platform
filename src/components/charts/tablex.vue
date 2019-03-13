<template>
  <div class="charts tablex">
    <Table border :row-class-name="rowClassName" :columns="columns" :data="data"></Table>
  </div>
</template>
<script>
import * as math from "mathjs";
export default {
  name: "tablex",
  props: {
    dataset: String
  },
  mounted() {
    this.dataSet();
    this.statAverage();
  },
  methods: {
    dataSet() {
      switch (this.dataset) {
        case "countries":
          this.data = this.countriesData;
          break;
        case "orgs":
          this.data = this.orgsData;
          break;
      }
    },
    statAverage() {
      // 结果项
      var mean = { country: "平均数" };
      var std = { country: "标准差" };
      var median = { country: "中位数" };
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
        for (var j in this.data) {
          array.push(this.data[j][title]);
        }
        mean[title] = math.mean(array).toFixed(2);
        std[title] = math.std(array).toFixed(2);
        median[title] = math.median(array).toFixed(2);
      }
      // 插入结果
      this.data.push(mean);
      this.data.push(std);
      this.data.push(median);
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
      data: [],
      columns: [
        {
          title: "地区名",
          key: "country"
        },
        {
          title: "总得分",
          key: "score",
          sortable: true
        },
        {
          title: "法律",
          key: "legal",
          sortable: true
        },
        {
          title: "技术",
          key: "technical",
          sortable: true
        },
        {
          title: "组织",
          key: "organization",
          sortable: true
        },
        {
          title: "建设",
          key: "capacity",
          sortable: true
        },
        {
          title: "合作",
          key: "cooperation",
          sortable: true
        }
      ],
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
