<template>
  <div class="scoring scoreBoard">
    <Table border :columns="columns" :data="data" height="650" :width="tableWidth"></Table>
    <Modal v-if="type=='manual'" v-model="judgingModal.showModal1" width="800">
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
    <Modal v-if="type=='final'" v-model="judgingModal.showModal1" width="800">
      <p slot="header">
        <span>{{judgingModal.title}}</span>
      </p>
      <Collapse v-model="judgingModal.panel">
        <Panel name="1">
          评分
          <div slot="content">
            <Table border :columns="judgingModal.tableColumns" :data="judgingModal.tableValue">
              <template slot-scope="{ row, index }" slot="score">
                <InputNumber :max="1" :min="0" v-model="judgingModal.tableValue[index].score"></InputNumber>
              </template>
            </Table>
          </div>
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
    data: Array,
    text: String,
    indexesChosen: Array,
    type: String
  },
  computed: {
    ...mapState({
      dName: state => state.cbdata.dynamicName,
      indexes: state => state.cbdata.indexes
    })
  },
  watch: {
    data: function() {
      this.addCellStyle(this.data);
      this.boardDrawer();
    }
  },
  mounted() {
    this.initByType(this.type);
    this.addCellStyle(this.data);
    this.boardDrawer();
  },
  methods: {
    initByType(type) {
      switch (type) {
        case "manual":
          var api;
          break;
        case "final":
          var api;
          this.statusData = tmpData["scoringStatus"];
          break;
      }
    },
    cellStyleParser(mark) {
      if (mark == 1) {
        return "one";
      }
      if (mark == 0) {
        return "zero";
      }
      if (mark == "yes" || mark == "no") {
        return "null";
      }
      return "mid";
    },
    cellStyleParserFinal(mark) {
      if (mark == 0) {
        return "zero";
      }
    },
    addCellStyle(data) {
      for (var i in data) {
        var cellClassName = {};
        for (var j in data[i]) {
          if (j === "country" || j === "cellClassName") {
            // 如果是1 2 country之类的是标志位, 不是具体分数, 所以跳过
            continue;
          }
          switch (this.type) {
            case "manual":
              cellClassName[j] = this.cellStyleParser(data[i][j]);
              break;
            case "final":
              cellClassName[j] = this.cellStyleParserFinal(
                this.statusData[i][j]
              );
              break;
          }
        }
        data[i]["cellClassName"] = cellClassName;
      }
    },
    render(h, params) {
      // 变量定义
      var props = {};
      var text = "";
      // 是否已审阅的判定
      if (params.row[params.column.key] == "yes") {
        props = {
          icon: "md-checkmark",
          size: "small",
          shape: "circle"
        };
        text = "已审阅";
      } else if (params.row[params.column.key] == "no") {
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
      var tableWidth = 0;
      structure.push({
        title: "地区名",
        key: "country",
        fixed: "left",
        width: 130
      });
      tableWidth += 130;
      var indexesChosen = new Set(this.indexesChosen);
      for (var i in this.indexes) {
        if (!indexesChosen.has(i)) {
          continue;
        }
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
            tableWidth += 50;
            tmp2.children.push(tmp3);
          }
          // tmp2.children.push({ title: vname["评分"], key: j });
          tmp.children.push(tmp2);
        }
        tmp.children.push({
          title: vname["评分"],
          key: i, // 就是指标名
          width: 50,
          render: this.render
        });
        tableWidth += 50;
        structure.push(tmp);
      }
      // 防止iview表格的显示bug
      if (tableWidth < 1100 && document.documentElement.clientWidth > 1100) {
        this.tableWidth = tableWidth + 20;
      } else {
        this.tableWidth = 0;
      }
      this.columns = structure;
    },

    // Modal框内方法
    judgingBoard(params) {
      // 是否已审阅的判定
      // console.log(params);
      this.judgingModal.title =
        params.row["country"] + " - " + this.dName[params.column.key];

      switch (params.row[params.column.key]) {
        case "no":
          this.indexesToCheckbox(params.row, params.column.key);
          /// final modal adjust
          if (this.type === "final") {
            var tableValue = tmpData["scoringDetail"];
            this.judgingModal.tableColumns = this.columnsExtractor([
              ...tableValue
            ]);
            this.addModalCellStyle(tableValue);
            this.judgingModal.tableValue = tableValue;
          }
          ///
          this.judgingModal.showModal1 = true;
          break;
        case "yes":
          this.judgingModal.selected = "";
          this.$Modal.confirm({
            title: this.judgingModal.title,
            content: "<p>该指标已审阅过, 是否撤销并重新审阅?</p>",
            onOk: () => {},
            onCancel: () => {}
          });
          break;
        default:
          this.judgingModal.selected = "";
          this.$Modal.confirm({
            title: this.judgingModal.title,
            content: "<p>数据错误, 请检查数据库</p>",
            onOk: () => {},
            onCancel: () => {}
          });
      }
    },
    columnsExtractor(data) {
      if (data.length == 0) {
        return [];
      }
      var res = [];
      for (var i in data[0]) {
        switch (i) {
          case "cellClassName":
            break;
          case "score":
            res.push({
              title: i,
              slot: i
            });
            break;
          case "detail":
            res.push({
              title: i,
              key: i,
              width: 400
            });
            break;
          default:
            res.push({
              title: i,
              key: i
            });
        }
      }
      return res;
    },
    indexesToCheckbox(row, key) {
      var chosen = [];
      var allIndexes = [];
      for (var i in this.indexes[key]) {
        allIndexes.push(...this.indexes[key][i]);
      }
      for (var i in allIndexes) {
        if (row[allIndexes[i]] == "1") {
          chosen.push(allIndexes[i]);
        }
      }
      this.judgingModal.chosen = chosen;
      this.judgingModal.allIndexes = allIndexes;
    },
    modalSave(chosen, index, country) {
      // country: "china",
      // index: "legal",
      // chosen: ['1.1.1', '1.2.3']
    },
    modalUndo(index, country) {
      // country: "china",
      // index: "legal",
    },
    addModalCellStyle(data) {
      for (var i in data) {
        data[i]["cellClassName"] = {};
        if (data[i]["status"] === "冲突") {
          data[i]["cellClassName"]["status"] = "zero";
        } else if (data[i]["status"] === "无评分")
          data[i]["cellClassName"]["status"] = "mid";
      }
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
        selected: "",
        tableColumns: [],
        tableValue: []
      },
      columns: [],
      XXXcolumnss: [
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
      tableWidth: 0,
      statusData: []
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
