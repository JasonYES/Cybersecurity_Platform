<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox @checked="checkedData"></Cbox>
        </Card>
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
          <chart-barx></chart-barx>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import { ChartPie, ChartBar, ChartScatter, Cbox, ChartMap } from "_c/charts";
import { ChartBarx } from "_c/chartsx";
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
    Cbox,
    ChartMap,
    ChartBarx
  },
  methods: {
    checkedData(checked) {
      // console.log(checked);
    }
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
        ],
        非洲: [
          "柬埔寨",
          "喀麦隆",
          "加拿大",
          "佛得角",
          "开曼群岛",
          "中非",
          "乍得",
          "智利",
          "中国",
          "圣诞岛",
          "科科斯（基林）群岛",
          "哥伦比亚",
          "科摩罗",
          "刚果（布）",
          "刚果（金）",
          "库克群岛"
        ],
        拉美洲: [
          "加蓬",
          "冈比亚",
          "格鲁吉亚",
          "德国",
          "加纳",
          "直布罗陀",
          "希腊",
          "格陵兰",
          "格林纳达",
          "瓜德罗普",
          "关岛",
          "危地马拉",
          "格恩西岛",
          "几内亚",
          "几内亚比绍",
          "圭亚那"
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
