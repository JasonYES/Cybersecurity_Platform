<template>
  <div>
    <Row :gutter="20">
      <i-col
        :xs="12"
        :md="8"
        :lg="4"
        v-for="(infor, i) in inforCardData"
        :key="`infor-${i}`"
        style="height: 120px;padding-bottom: 10px;"
      >
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <!-- <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="显著性统计-国家网络安全策略"></chart-pie>
        </Card>
      </i-col>
    </Row>-->
    <!-- <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-scatter style="height: 300px;" :value="scatterData" text="显著性统计-国家网络安全策略"></chart-scatter>
        </Card>
      </i-col>
    </Row>-->
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox :value="cboxvalue"></Cbox>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import { ChartPie, ChartBar, ChartScatter, Cbox } from "_c/charts";
import Example from "./example.vue";
export default {
  name: "home",
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    ChartScatter,
    Example,
    Cbox
  },
  data() {
    return {
      inforCardData: [
        { title: "国家数", icon: "md-map", count: 198, color: "#19be6b" },
        { title: "指标数", icon: "md-flag", count: 28, color: "#ff9900" },
        { title: "已爬网页数", icon: "md-bug", count: 253, color: "#E46CBB" },
        { title: "数据集数", icon: "md-cube", count: 3, color: "#ed3f14" },
        {
          title: "有效数据条数",
          icon: "md-checkmark",
          count: 1225,
          color: "#9A66E4"
        },
        {
          title: "总数据条数",
          icon: "md-archive",
          count: 1502,
          color: "#2d8cf0"
        }
      ],
      pieData: [
        { value: 20, name: "独立制定" },
        { value: 62, name: "非独立制定" },
        { value: 30, name: "正在制定" },
        { value: 70, name: "未制定" }
      ],
      barData: {
        美国: 97,
        加拿大: 89,
        墨西哥: 80,
        古巴: 50,
        智利: 65,
        巴西: 78,
        秘鲁: 30
      },
      scatterData: [
        { product: "Matcha Latte", count: 823, score: 95.8 },
        { product: "Milk Tea", count: 998, score: 81.4 },
        { product: "Cheese Cocoa", count: 1042, score: 91.2 },
        { product: "Walnut Brownie", count: 988, score: 76.9 }
      ],
      cboxvalue: {
        亚洲: [
          "阿富汗",
          "奥兰群岛",
          "阿尔巴尼亚",
          "阿尔及利亚",
          "美属萨摩亚",
          "安道尔",
          "安哥拉",
          "安圭拉",
          "南极洲",
          "安提瓜和巴布达",
          "阿根廷",
          "亚美尼亚",
          "阿鲁巴",
          "澳大利亚",
          "奥地利",
          "阿塞拜疆"
        ],
        欧洲: [
          "巴哈马",
          "巴林",
          "孟加拉国",
          "巴巴多斯",
          "白俄罗斯",
          "比利时",
          "伯利兹",
          "贝宁",
          "百慕大",
          "不丹",
          "玻利维亚",
          "波黑",
          "博茨瓦纳",
          "布维岛",
          "巴西"
        ]
      }
    };
  },
  mounted() {
    //
  }
};
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
