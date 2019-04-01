<template>
  <div>
    <Carousel v-model="carousel" loop>
      <CarouselItem>
        <div class="demo-carousel" align="center">
          <img :src="win1" key="win1" height="500px">
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel" align="center">
          <img :src="win2" key="win2" height="500px">
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel" align="center">
          <img :src="win3" key="win3" height="500px">
        </div>
      </CarouselItem>
    </Carousel>
    <!-- <Row :gutter="20">
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
    </Row>-->
  </div>
</template>

<script>
import win1 from "@/assets/images/win1.jpg";
import win2 from "@/assets/images/win2.png";
import win3 from "@/assets/images/win3.jpg";
import { getTableData } from "@/api/data";
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import { ChartPie, ChartBar } from "_c/charts";
import Example from "./example.vue";
export default {
  name: "home",
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data() {
    return {
      win1,
      win2,
      win3,
      carousel: 0,
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
      }
    };
  },
  mounted() {
    getTableData()
      .then(res => {
        console.log("get Table");
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
