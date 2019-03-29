<template>
  <div class="scoring scoreBoard">
    <Table border :columns="columns" :data="data" height="650"></Table>
    <Modal v-model="judgingModal.showModal1" width="800">
      <p slot="header">
        <span>{{judgingModal.title}}</span>
      </p>
      <Collapse v-model="judgingModal.panel">
        <Panel name="1">
          评分
          <CheckboxGroup v-model="judgingModal.chosen" slot="content">
            <Checkbox v-for="i in judgingModal.allIndexes" :key="i" :label="i">
              <span>{{dName[i]}}</span>
            </Checkbox>
          </CheckboxGroup>
        </Panel>
        <Panel name="2">
          资料参考
          <div slot="content">
            <Select v-model="judgingModal.selected" style="width:200px">
              <Option v-for="i in judgingModal.allIndexes" :value="i" :key="i">{{dName[i]}}</Option>
            </Select>
            <br>
            <br>
            <Card style="height:400px"></Card>
          </div>
        </Panel>
      </Collapse>
    </Modal>
  </div>
</template>
<script>
import vname from "@/config/view-name";
import tmpData from "@/store/module/tmp-data";
import { mapState } from "vuex";
export default {
  name: "ScoreBoard",
  props: {
    value: Array,
    text: String
  },
  computed: {
    ...mapState({
      dName: state => state.cbdata.dynamicName,
      indexes: state => state.cbdata.indexes
    })
  },
  mounted() {
    this.getScoringData();
    this.addCellStyle(this.data);
    this.boardDrawer();
    // this.$store.dispatch("checkInited", ["dynamicName"]);
    // console.log(this.dynamicName);
    // var list = {};
    // for (var i = 1; i < 5; i++) {
    //   list[i] = {};
    //   for (var j = 1; j < 3; j++) {
    //     list[i][i + "." + j] = [];
    //     for (var k = 1; k < 5; k++) {
    //       list[i][i + "." + j].push(i + "." + j + "." + k);
    //     }
    //   }
    // }
    // this.data = list;
  },
  methods: {
    cellStyleParser(mark) {
      if (mark == 1) {
        return "one";
      }
      if (mark == 0) {
        return "zero";
      }
      return "mid";
    },
    addCellStyle(data) {
      // console.log(data);
      for (var i in data) {
        var cellClassName = {};
        for (var j in data[i]) {
          if (j.length == 1 || j.length > 5) {
            // 如果是1 2 country之类的是标志位, 不是具体分数, 所以跳过
            continue;
          }
          cellClassName[j] = this.cellStyleParser(data[i][j]);
        }
        data[i]["cellClassName"] = cellClassName;
      }
    },
    render(h, params) {
      // 变量定义
      var props = {};
      var text = "";
      // 是否已审阅的判定
      if (params.row[params.column.key] == 1) {
        props = {
          icon: "md-checkmark",
          size: "small",
          shape: "circle"
        };
        text = "已审阅";
      } else {
        props = {
          type: "primary",
          icon: "md-help",
          size: "small",
          shape: "circle"
        };
        text = "未审阅";
      }
      // 组装
      var buttonProps = {
        props: props,
        style: {},
        on: {
          click: () => {
            this.judgingBoard(params);
          }
        }
      };
      return h("div", [h("Button", buttonProps)]);
    },
    boardDrawer() {
      var structure = [];
      structure.push({
        title: "地区名",
        key: "country",
        fixed: "left",
        width: 130
      });
      for (var i in this.indexes) {
        // 1
        var tmp = { title: this.dName[i], align: "center", children: [] };
        var index = 0;
        for (var j in this.indexes[i]) {
          // 1.1
          var tmp2 = {
            title: ++index, // this.dName[j],
            align: "center",
            children: []
          };
          var index2 = 0;
          for (var k in this.indexes[i][j]) {
            // 1.1.1
            var tmp3 = {
              title: ++index2, // this.dName[this.indexes[i][j][k]],
              align: "center",
              width: 50,
              key: this.indexes[i][j][k]
            };
            tmp2.children.push(tmp3);
          }
          // tmp2.children.push({ title: vname["评分"], key: j });
          tmp.children.push(tmp2);
        }
        tmp.children.push({
          title: vname["评分"],
          key: i,
          width: 50,
          render: this.render
        });
        structure.push(tmp);
      }
      this.columns = structure;
    },
    getScoringData() {
      this.data = tmpData["scoringData"];
    },
    judgingBoard(params) {
      // 是否已审阅的判定
      // console.log(params);
      this.judgingModal.title =
        params.row["country"] + " - " + this.dName[params.column.key];
      if (params.row[params.column.key] === 0) {
        this.indexesToCheckbox(params.row, params.column.key);
        this.judgingModal.showModal1 = true;
      } else {
        this.judgingModal.selected = "";
        this.$Modal.confirm({
          title: this.judgingModal.title,
          content: "<p>该指标已审阅过, 是否撤销并重新审阅?</p>",
          onOk: () => {},
          onCancel: () => {}
        });
      }
    },
    indexesToCheckbox(row, key) {
      var chosen = [];
      var allIndexes = [];
      for (var i in row) {
        console.log(row[i]);
        if (i.startsWith(key)) {
          if (i.length == 1) {
            continue;
          }
          if (row[i] === 1) {
            chosen.push(i);
          }
          allIndexes.push(i);
          continue;
        }
      }
      this.judgingModal.chosen = chosen;
      this.judgingModal.allIndexes = allIndexes;
    }
  },
  data() {
    return {
      judgingModal: {
        status: 0, // 是否已审阅过
        title: "",
        showModal1: false, // 默认modal
        panel: ["1", "2"],
        chosen: [],
        allIndexes: [],
        selected: ""
      },
      columns: [],
      columnss: [
        {
          title: "地区名",
          key: "country",
          width: 130
        },
        {
          title: vname["指标1"],
          align: "center",
          children: [
            { title: 1, key: 1.1 },
            { title: 2, key: 1.2 },
            { title: 3, key: 1.3 },
            { title: 4, key: 1.4 },
            { title: 5, key: 1.5 },
            { title: vname["评分"], key: "1", render: this.render }
          ]
        },
        {
          title: vname["指标2"],
          align: "center",
          children: [
            { title: 1, key: 2.1 },
            { title: 2, key: 2.2 },
            { title: 3, key: 2.3 },
            { title: 4, key: 2.4 },
            { title: 5, key: 2.5 },
            { title: vname["评分"], key: "2", render: this.render }
          ]
        },
        {
          title: vname["指标3"],
          align: "center",
          children: [
            { title: 1, key: 3.1 },
            { title: 2, key: 3.2 },
            { title: 3, key: 3.3 },
            { title: 4, key: 3.4 },
            { title: 5, key: 3.5 },
            { title: vname["评分"], key: "3", render: this.render }
          ]
        },
        {
          title: vname["指标4"],
          align: "center",
          children: [
            { title: 1, key: 4.1 },
            { title: 2, key: 4.2 },
            { title: 3, key: 4.3 },
            { title: 4, key: 4.4 },
            { title: 5, key: 4.5 },
            { title: vname["评分"], key: "4", render: this.render }
          ]
        },
        {
          title: vname["指标5"],
          align: "center",
          children: [
            { title: 1, key: 5.1 },
            { title: 2, key: 5.2 },
            { title: 3, key: 5.3 },
            { title: 4, key: 5.4 },
            { title: 5, key: 5.5 },
            { title: vname["评分"], key: "5", render: this.render }
          ]
        }
      ],
      dataEmpty: [],
      data: []
    };
  }
};
</script>
<style>
.ivu-table .one {
  background-color: #339966;
  color: #fff;
}
.ivu-table .mid {
  background-color: #ff6600;
  color: #fff;
}
.ivu-table .zero {
  background-color: #ff6666;
  color: #fff;
}
</style>
