<template>
  <div class="charts cbox-indexes">
    <Collapse :value="'1'">
      <Panel name="1">
        指标选择
        <div slot="content">
          <Row>
            <i-col span="2">
              <Button size="small" @click="handleCheckAll()">全选批次</Button>
            </i-col>
            <i-col
              span="22"
              style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;"
            >
              <CheckboxGroup v-model="chosen">
                <Checkbox v-for="s in sets" :key="s" :label="s"></Checkbox>
              </CheckboxGroup>
            </i-col>
          </Row>
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
import { vname } from "@/config/properties";
import { getSets } from "@/api/admin";

export default {
  name: "CboxSet",
  computed: {
    ...mapState({
      dname: state => state.cbdata.dynamicName
    })
  },
  data() {
    return {
      chosen: [],
      sets: ["p1", "p2"]
    };
  },
  // watch: {
  //   checked: function() {
  //     this.$emit('checked',checked)
  //   }
  // },
  mounted() {
    this.$nextTick(() => {
      getSets(0, 100, "")
        .then(res => {
          if (res.data.code == 0) {
            var data = res.data.data;
            var sets = data.sets;
            this.sets = sets.map(x => x["name"]);
            this.chosen = [...this.sets];
            this.$emit("checked", this.chosen);
          } else {
            alert("错误! " + res.data.msg);
          }
        })
        .catch(err => {
          alert("错误! " + err);
        });
    });
  },
  methods: {
    handleCheckAll(continent) {
      if (this.chosen.length == this.sets.length) {
        this.chosen = [];
      } else {
        this.chosen = [...this.sets];
      }
    }
  }
};
</script>

