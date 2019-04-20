<template>
  <div>
    <admin-board :type="'sets'"></admin-board>
  </div>
</template>
<script>
import { AdminBoard } from "_c/scoring";
import { Tablex, MapAffix } from "_c/charts";
import tmpData from "@/store/module/tmp-data";
export default {
  components: {
    AdminBoard
  },
  data() {
    return {};
  }
};
</script>

