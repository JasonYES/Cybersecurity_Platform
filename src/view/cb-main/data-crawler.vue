<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox @checked="checkedData" :type="'crawler'" :typeValue="typeValue"></Cbox>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <!-- jia ru biao dan kong zhi -->
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import { Cbox } from "_c/charts";
import { ScoreBoard } from "_c/scoring";
import tmpData from "@/store/module/tmp-data";
export default {
  components: {
    Cbox
  },
  data() {
    return {
      typeValue: {}
    };
  },
  mounted() {
    this.getTypeValue();
  },
  methods: {
    getTypeValue() {
      this.typeValue = tmpData["countries"];
    },
    checkedData() {}
  }
};
</script>

