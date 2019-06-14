<template>
  <div class="charts cbox-indexes">
    <Collapse :value="'1'">
      <Panel name="1">
        指标选择
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
                  <Radio v-for="c in object" :key="c" :label="c">{{dname[c]}}</Radio>
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
import { mapState } from "vuex";
import { vname } from "@/config/properties";
export default {
  name: "CboxIndexes",
  computed: {
    ...mapState({
      value: function(state) {
        var res = this.dataToCboxFormmater(state.cbdata.indexes, state.cbdata.dynamicName);
        return res;
      },
      dname: state => state.cbdata.dynamicName,
      checked: state => {
        return {
          X轴指标: state.cbdata.dynamicName["指标1"],
          Y轴指标: state.cbdata.dynamicName["指标1"]
        };
      }
    })
  },
  data() {
    return {};
  },
  // watch: {
  //   checked: function() {
  //     this.$emit('checked',checked)
  //   }
  // },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    dataToCboxFormmater(indexes, dname) {
      var indexBox = []; // 将指标展开
      for (var i in indexes) {
        indexBox.push(i);
      }
      // 进行chosen的初始化
      // if (this.checked[X轴指标] == "" indexBox.length != 0) {
      //   this.checked = { X轴指标: indexBox[0], Y轴指标: indexBox[0] };
      // }

      // 重要!! 确保scatter中chosen的初始化
      this.$emit("checked", {
        X轴指标: dname["指标1"],
        Y轴指标: dname["指标1"]
      });
      return { X轴指标: indexBox, Y轴指标: indexBox };
    }
  }
};
</script>

