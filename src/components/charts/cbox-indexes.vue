<template>
  <div class="charts cbox-indexes">
    <Collapse :value="'1'">
      <Panel name="1">指标选择
        <div slot="content">
          <div v-for="(object, continent)  in value" :key="continent">
            <Row>
              <i-col span="2">
                <p style="margin-left:10px;">{{continent}}</p>
              </i-col>
              <i-col
                span="22"
                style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;"
              >
                <RadioGroup v-model="checked[continent]">
                  <Radio v-for="c in object" :key="c" :label="c"></Radio>
                </RadioGroup>
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
  name: "CboxIndexes",
  data() {
    return {
      checked: {},
      value: {
        X轴指标: ["指标1", "指标2", "指标3", "指标4", "指标5", "指标6"],
        Y轴指标: ["指标1", "指标2", "指标3", "指标4", "指标5", "指标6"]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.checked = this.copyObjectKeys(this.value);
    });
  },
  methods: {
    copyObjectKeys(obj) {
      var res = JSON.parse(JSON.stringify(obj));
      for (var i in res) {
        res[i] = "";
      }
      return res;
    }
  }
};
</script>

