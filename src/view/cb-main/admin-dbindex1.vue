<template>
  <div>
    <admin-board :type="'index1'"></admin-board>
  </div>
</template>
<script>
import { AdminBoard } from "_c/scoring";
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

