<template>
  <div class="charts cbox-other">
    <Collapse :value="'1'">
      <Panel name="1">组织选择
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
          <div style="margin-bottom:-10px;">
            <Row type="flex" justify="center">
              <i-col span="6">
                <Button long @click="$emit('checked',checked)">确认</Button>
              </i-col>
            </Row>
          </div>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
export default {
  name: "CboxOther",
  props: {},
  data() {
    return {
      checked: {},
      value: {
        大洲: ["亚洲", "非洲", "欧洲", "北美洲", "拉丁美洲", "大洋洲"],
        联盟: ["欧盟", "东盟", "亚太经合组织", "上合组织", "G20", "G8"]
      }
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

