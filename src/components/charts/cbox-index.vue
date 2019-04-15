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
                <CheckboxGroup v-model="chosen">
                  <Checkbox v-for="c in object" :key="c" :label="c">{{dname[c]}}</Checkbox>
                </CheckboxGroup>
              </i-col>
            </Row>
          </div>
          <div style="margin-bottom:-10px;">
            <Row type="flex" justify="center">
              <i-col span="6">
                <Button long @click="$emit('checked',chosen)">确认</Button>
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
import vname from "@/config/view-name";
export default {
  name: "CboxIndex",
  computed: {
    ...mapState({
      value: function(state) {
        var res = this.dataToCboxFormmater(
          state.cbdata.indexes,
          state.cbdata.dynamicName
        );
        return res;
      },
      dname: state => state.cbdata.dynamicName
    })
  },
  data() {
    return {
      chosen: []
    };
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
      var indexBox = []; // 将指标树状结构展开
      for (var i in indexes) {
        indexBox.push(i);
      }

      this.chosen = [...indexBox];
      this.$emit("checked", [...indexBox]);

      return { 指标多选: indexBox };
    }
  }
};
</script>

