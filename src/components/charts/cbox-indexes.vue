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
import vname from "@/config/view-name";
export default {
  name: "CboxIndexes",
  data() {
    return {
      vnamex: vname,
      checked: {},
      value: {
        X轴指标: [
          "score",
          "legal",
          "technical",
          "organization",
          "capacity",
          "cooperation"
        ],
        Y轴指标: [
          "score",
          "legal",
          "technical",
          "organization",
          "capacity",
          "cooperation"
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.vnamefy(this.value);
      this.checked = this.copyObjectKeys(this.value);
    });
  },
  methods: {
    vnamefy(value) {
      for (var i in value) {
        for (var j in value[i]) {
          value[i][j] = vname[value[i][j]];
        }
      }
    },
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

