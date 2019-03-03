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
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox :value="cboxvalue" @checked="checkedData"></Cbox>
        </Card>
      </i-col>
    </Row>
    <router-view/>
  </div>
</template>
<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import Cbox from "_c/charts";
export default {
  name: "viewHome",
  components: {
    InforCard,
    CountTo,
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
      cboxvalue: {}
    };
  }
};
</script>

