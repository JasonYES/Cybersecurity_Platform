<template>
  <div class="charts cbox">
    <div v-for="(object, continent)  in value" :key="continent">
      <Row>
        <i-col span="2">
          <Button size="small" :key="continent" @click="handleCheckAll(continent)">全选:{{continent}}</Button>
        </i-col>
        <i-col
          span="22"
          style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;"
        >
          <CheckboxGroup v-model="checked[continent]">
            <Checkbox v-for="c in object" :key="c" :label="c"></Checkbox>
          </CheckboxGroup>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cbox",
  props: {
    value: Object // 将数组转换成map, 寻找相应的库
  },
  data() {
    return {
      checked: {
        亚洲: ["阿富汗", "奥兰群岛", "阿尔巴尼亚"]
      },
      indeterminate: true,
      checkAll: false,
      checkAllGroup: ["香蕉", "西瓜"]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.checked = this.copyObject(this.value);
    });
  },
  methods: {
    copyObject(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    handleCheckAll(continent) {
      if (this.checked[continent].length == this.value[continent].length) {
        this.checked[continent] = [];
      } else {
        this.checked[continent] = this.copyObject(this.value[continent]);
      }
    }
  }
};
</script>

