<template>
  <div class="charts cbox">
    <Collapse simple :value="'1'">
      <Panel name="1">国家选择
        <div slot="content">
          <div v-for="(object, continent)  in value" :key="continent">
            <Row>
              <i-col span="2">
                <Button
                  size="small"
                  :key="continent"
                  @click="handleCheckAll(continent)"
                >全选:{{continent}}</Button>
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
          <Row type="flex" justify="center">
            <i-col span="8">
              <Button long @click="$emit('checked',checked)">确认</Button>
            </i-col>
          </Row>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
export default {
  name: "Cbox",
  props: {
    value: Object
  },
  data() {
    return {
      checked: {}
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

