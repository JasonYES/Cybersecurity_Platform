<template>
  <div class="scoring scoreBoard">
    <Table border :loading="tableLoading" :columns="columns" :data="dataByPage" :width="tableWidth"></Table>
    <br>
    <div align="center">
      <Page :current="page.now" :total="page.all" @on-change="pageOnChange" simple/>
    </div>
    <Modal v-model="judgingModal.showModal1" ok-text="保存" @on-ok="modalSave" width="1200">
      <p slot="header">
        <span>{{judgingModal.title}}</span>
      </p>
      <Collapse v-model="judgingModal.panel">
        <Panel name="1">
          评分
          <!-- <CheckboxGroup v-model="judgingModal.chosen" slot="content">
            <Checkbox v-for="i in judgingModal.allIndexes" :key="i" :label="i">
              <span>{{dName[i]}}</span>
            </Checkbox>
          </CheckboxGroup>-->
          <div slot="content">
            <Row type="flex" justify="center" align="middle">
              <i-col span="24">
                <div align="center">
                  <Table
                    border
                    :columns="judgingModal.tableColumns"
                    :width="judgingModal.tableWidth"
                    :data="judgingModal.tableValue"
                  >
                    <template slot-scope="{ row, index }" slot="score">
                      <InputNumber :max="1" :min="0" v-model="judgingModal.tableValue[index].score"></InputNumber>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                      <Button type="primary" icon="ios-search" @click="modalReference(row, index)"></Button>
                    </template>
                  </Table>
                </div>
              </i-col>
            </Row>
          </div>
        </Panel>
        <Panel name="2">
          资料参考
          <div slot="content">
            <div align="center">
              <h1>{{judgingModal.refName + "评分依据"}}</h1>
            </div>
            <br>
            <Row>
              <i-col span="12">
                <Card>
                  <p>{{judgingModal.refContent[0][0]}}</p>
                </Card>
              </i-col>
              <i-col span="12">
                <Card>
                  <p>{{judgingModal.refContent[0][1]}}</p>
                </Card>
              </i-col>
            </Row>
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
import { manualSubmit, manualUndo } from "@/api/scoring";
import { finalSubmit, finalUndo } from "@/api/scoring";
import { getFinalStatus } from "@/api/scoring";
export default {
  name: "ScoreBoard",
  props: {
    data: Array,
    text: String,
    indexesChosen: Array,
    type: String,
    tableLoading: Boolean
  },
  computed: {
    ...mapState({
      dName: state => state.cbdata.dynamicName,
      indexes: state => state.cbdata.indexes,
      indexesSet1: state => {
        return new Set(Object.keys(state.cbdata.indexes));
      }
    }),
    dataByPage: function() {
      return this.data.slice((this.page.now - 1) * 10, this.page.now * 10);
    }
  },
  watch: {
    data: function() {
      this.addCellStyle(this.data);
      this.page.all = this.data.length;
      this.page.now = 1;
    },
    dataByPage: function() {
      this.boardDrawer();
    }
  },
  mounted() {
    this.initByType(this.type);
  },
  methods: {
    initByType(type) {
      switch (type) {
        case "manual":
          this.addCellStyle(this.data);
          this.boardDrawer();
          break;
        case "final":
          getFinalStatus()
            .then(res => {
              if (res.data.code == 0) {
                var data = res.data.data;
                this.statusData = data;
                this.addCellStyle(this.data);
                this.boardDrawer();
                this.tableLoading = false;
              } else {
                alert(res.data.msg);
              }
            })
            .catch(err => {
              alert(err);
            });
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
      if (mark === 0) {
        return "zero";
      } else {
        return "";
      }
    },
    addCellStyle(data) {
      // this method only modifies data, has nothing to do with drawing
      for (var i in data) {
        var cellClassName = {};
        for (var j in data[i]) {
          if (
            j === "country" ||
            j === "cellClassName" ||
            this.indexesSet1.has(j)
          ) {
            // 如果是1 2 country之类的是标志位, 不是具体分数, 所以跳过
            continue;
          }
          switch (this.type) {
            case "manual":
              cellClassName[j] = this.cellStyleParser(data[i][j]);
              break;
            case "final":
              if (this.statusData.length === 0) {
                cellClassName[j] = this.cellStyleParserFinal("uninit");
                break;
              }
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
    AdaptedSubmit(data) {
      console.log(data);
      switch (this.type) {
        case "manual":
          return manualSubmit(data);
        case "final":
          return finalSubmit(data);
      }
    },
    AdaptedUndo(data) {
      switch (this.type) {
        case "manual":
          return manualUndo(data);
        case "final":
          return finalUndo(data);
      }
    },
    // 以下都是Modal框方法
    judgingBoard(params) {
      // 基本信息的设定
      this.judgingModal.title =
        params.row["country"] + " - " + this.dName[params.column.key];
      this.judgingModal.country = params.row["country"];
      this.judgingModal.index = params.column.key;

      // 是否已审阅的判定
      switch (params.row[params.column.key]) {
        case "no":
          /// final modal adjust
          if (this.type === "manual") {
            this.indexesToCheckbox(params.row, params.column.key);
            this.judgingModal.tableWidth = 450;
          }
          if (this.type === "final") {
            var tableValue = tmpData["scoringDetail"];
            this.judgingModal.tableColumns = this.columnsExtractor([
              ...tableValue
            ]);
            this.addModalCellStyle(tableValue);
            this.judgingModal.tableValue = tableValue;
            this.judgingModal.tableWidth = 750;
          }
          ///
          this.judgingModal.refName = "";
          this.judgingModal.refContent = [["", ""]];
          this.judgingModal.showModal1 = true;
          break;
        case "yes":
          this.judgingModal.selected = "";
          this.$Modal.confirm({
            title: this.judgingModal.title,
            content: "<p>该指标已审阅过, 是否撤销并重新审阅?</p>",
            onOk: () => {
              var postData = {
                country: params.row["country"],
                index: params.column.key
              };
              this.AdaptedUndo(postData)
                .then(res => {
                  if (res.data.code == 0) {
                    this.$emit("refresh");
                  } else {
                    alert(res.data.msg);
                  }
                })
                .catch(err => {
                  alert(err);
                });
            },
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
              slot: i,
              width: 120
            });
            break;
          case "detail":
            res.push({
              title: i,
              key: i,
              width: 300
            });
            break;
          default:
            res.push({
              title: i,
              key: i
            });
        }
      }
      res.push({
        title: "评分依据",
        slot: "action",
        width: 90
      });
      return res;
    },
    indexesToCheckbox(row, key) {
      var tableData = [];

      var chosen = [];
      var allIndexes = [];
      for (var i in this.indexes[key]) {
        allIndexes.push(...this.indexes[key][i]);
      }
      for (var i in allIndexes) {
        if (row[allIndexes[i]] == "1") {
          chosen.push(allIndexes[i]);
        }
        tableData.push({
          index: allIndexes[i],
          score: row[allIndexes[i]]
        });
      }

      this.judgingModal.tableColumns = this.columnsExtractor([...tableData]);
      this.judgingModal.tableValue = tableData;

      this.judgingModal.chosen = chosen;
      this.judgingModal.allIndexes = allIndexes;
    },
    modalSave() {
      let postData = {
        country: this.judgingModal.country,
        index: this.judgingModal.index,
        scores: this.modalTableValueExtractor()
      };
      this.AdaptedSubmit(postData)
        .then(res => {
          if (res.data.code == 0) {
            this.$emit("refresh");
          } else {
            alert(res.data.msg);
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    modalTableValueExtractor() {
      let tableValue = this.judgingModal.tableValue;
      console.log(tableValue);
      let scoreObj = {};
      for (let i in tableValue) {
        scoreObj[tableValue[i]["index"]] = tableValue[i]["score"];
      }
      return scoreObj;
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
    },
    pageOnChange(page) {
      this.page.now = page;
    },
    modalReference(row, rowIndex) {
      var indexName = row.index;
      this.judgingModal.refName = indexName;
      this.judgingModal.refContent = [tmpData["scoringRef"][rowIndex % 3]];
    }
  },
  data() {
    return {
      judgingModal: {
        status: 0, // 是否已审阅过
        title: "",
        country: "",
        index: "",
        showModal1: false, // 默认modal
        panel: ["1", "2"],
        chosen: [],
        allIndexes: [],
        selected: "",
        tableColumns: [],
        tableValue: [],
        tableWidth: 750,
        refName: "x",
        refContent: [["x", "x"]]
      },
      page: {
        now: 1,
        all: 30
      },
      columns: [],
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
