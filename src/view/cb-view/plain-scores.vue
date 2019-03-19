<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox @checked="checkedData"></Cbox>
        </Card>
      </i-col>
    </Row>
    <Row type="flex" justify="center" style="margin-top: 20px">
      <Tablexs></Tablexs>
    </Row>
  </div>
</template>
<script>
import { Cbox, Tablex } from "_c/charts";
import { Tablexs } from "_c/chartsx";
export default {
  name: "plain-scores",
  components: {
    Cbox,
    Tablexs
  },
  mounted() {
    this.statAverage();
    // store.commit("setScores", ["yyy"]);
  },
  methods: {
    checkedData() {},
    statAverage() {
      // 最终结果
      var res = {
        country: "平均数",
        score: 0,
        legal: 0,
        technical: 0,
        organization: 0,
        capacity: 0,
        cooperation: 0
      };
      var length = this.data.length;
      // 遍历叠加
      for (var i in this.data) {
        for (var j in this.data[i]) {
          if (j == "country") continue;
          res[j] += this.data[i][j];
        }
      }
      // 除以总数
      for (var i in res) {
        if (i == "country") continue;
        var average = res[i] / length;
        res[i] = average.toFixed(2);
      }
      // 插入标识位

      // 插入结果
      this.data.push(res);
    }
  },
  data() {
    return {
      columns: [
        {
          title: "Country",
          key: "country"
        },
        {
          title: "Score",
          key: "score",
          sortable: true
        },
        {
          title: "Legal",
          key: "legal",
          sortable: true
        },
        {
          title: "Technical",
          key: "technical",
          sortable: true
        },
        {
          title: "Organization",
          key: "organization",
          sortable: true
        },
        {
          title: "Capacity",
          key: "capacity",
          sortable: true
        },
        {
          title: "Cooperation",
          key: "cooperation",
          sortable: true
        }
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
      ]
    };
  }
};
</script>

