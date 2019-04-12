<template>
  <div>
    <Row class="expand-row" v-for="(unit, index) in row" :key="index" type="flex">
      <i-col :md="5" :lg="5" offset="1" v-for="(countryName, index2) in unit" :key="index2">
        <p style="font-size:14px">{{countryName}}</p>
      </i-col>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    value: Array
  },
  computed: {
    row: function() {
      var res = [];
      var unit = [];
      for (var i in this.value) {
        if (unit.length === 4) {
          res.push(unit);
          unit = [];
        }
        unit.push(this.value[i]);
      }
      if (unit.length > 0) {
        res.push(unit);
      }
      console.log(res);
      return res;
    }
  }
};
</script>
<style scoped>
.expand-row {
  margin-bottom: 3px;
}
</style>