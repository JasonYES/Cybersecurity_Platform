<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Collapse :value="'1'">
            <Panel name="1">
              搜索
              <div slot="content">
                <Row :gutter="20" style="margin-top: 0px;">
                  <i-col offset="1" :md="7" :lg="7">
                    <Input
                      search
                      @on-search="searchHandler"
                      enter-button
                      placeholder="Enter something..."
                    />
                  </i-col>
                  <i-col offset="0" :md="2" :lg="2" style="margin-top: 1px;">
                    <Button icon="md-add" type="primary" shape="circle" @click="createHandler">新建</Button>
                  </i-col>
                  <div v-if="type==='sets'">
                    <i-col span="5" offset="1">
                      <Select v-model="dbsets['chosen']">
                        <Option
                          v-for="item in dbsets['options']"
                          :value="item.id"
                          :key="item.id"
                        >{{item.name}}</Option>
                      </Select>
                    </i-col>
                    <i-col offset="0" size="large" span="1">
                      <div style="margin-left:0px">
                        <Button type="primary" shape="circle" @click="chooseSet">选定当前批次</Button>
                      </div>
                    </i-col>
                  </div>
                </Row>
              </div>
            </Panel>
          </Collapse>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <br>
          <div align="center">
            <Table
              border
              :width="tableWidth"
              :columns="columns"
              :data="value"
              :row-class-name="addRowStyle"
            >
              <template slot-scope="{ row, index }" slot="action">
                <Button
                  type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="actionHandler('edit', index, row)"
                >修改</Button>
                <Poptip confirm title="确认删除吗?" @on-ok="actionHandler('delete', index, row)">
                  <Button type="error" size="small">删除</Button>
                </Poptip>
              </template>
            </Table>
            <br>
            <Page :current="page.start+1" :total="page.total" @on-change="pageOnChange" simple/>
            <br>
          </div>
        </Card>
      </i-col>
    </Row>
    <admin-modal :type="type" :value="rowData" :modalOn="modalOn" @refresh="refresh"></admin-modal>
    <admin-modal-insert :type="type" :modalOn="modalOn" @refresh="refresh"></admin-modal-insert>
  </div>
</template>
<script>
import { AdminModal, AdminModalInsert, AdminTableExpand } from "_c/scoringmini";
import tmpData from "@/store/module/tmp-data";
import { vname } from "@/config/properties";
import { getSets, getOrgs, getUsers, getCountry } from "@/api/admin";
import { getIndex3, getIndex2, getIndex1, chooseSets } from "@/api/admin";
import { delSets, delOrgs, delUsers, delCountry } from "@/api/admin";
import { delIndex3, delIndex2, delIndex1 } from "@/api/admin";
export default {
  name: "AdminBoard",
  props: {
    type: String
  },
  components: {
    AdminModal,
    AdminModalInsert,
    AdminTableExpand
  },
  computed: {
    columns: function() {
      return this.columnsExtractor(this.value);
    }
  },
  watch: {
    // ??? 是否有用?
    page: function() {
      this.getValue(this.page, this.searchWord);
    }
  },
  data() {
    return {
      value: [],
      rowData: {},
      modalOn: {
        on: false, // action页面
        new: false // create页面
      },
      searchWord: "",
      tableWidth: 0,
      columnsWidthSpecified: {
        _common: 120
      },
      columnsHidden: new Set(),
      columnExpand: null,
      // 分页的控制
      page: {
        start: 0,
        limit: 10,
        total: 10
      },
      // 当前数据集选框 (只sets页面可见)
      dbsets: {
        chosen: "",
        options: []
      }
    };
  },
  mounted() {
    this.getValue(this.page, this.searchWord);
  },
  methods: {
    // 改为分页处理!
    getValue(page, searchWord) {
      let startIndex = page.start * page.limit;
      switch (this.type) {
        case "country":
          getCountry(startIndex, page.limit, searchWord)
            .then(res => {
              if (res.data.code == 0) {
                var data = res.data.data;
                this.page.total = data.total; // 分页记录总数
                this.value = data.countries;
              } else {
                alert("错误! " + res.data.msg);
              }
            })
            .catch(err => {
              alert("错误! " + err);
            });
          this.columnsHidden = new Set(["id"]);
          break;
        case "index1":
          getIndex1(startIndex, page.limit, searchWord)
            .then(res => {
              if (res.data.code == 0) {
                var data = res.data.data;
                this.page.total = data.total; // 分页记录总数
                this.value = data.indexs;
              } else {
                alert("错误! " + res.data.msg);
              }
            })
            .catch(err => {
              alert("错误! " + err);
            });
          this.columnsHidden = new Set(["id", "parent"]);
          break;
        case "index2":
          getIndex2(startIndex, page.limit, searchWord)
            .then(res => {
              if (res.data.code == 0) {
                var data = res.data.data;
                this.page.total = data.total; // 分页记录总数
                this.value = data.index2List;
              } else {
                alert("错误! " + res.data.msg);
              }
            })
            .catch(err => {
              alert("错误! " + err);
            });
          this.columnsHidden = new Set(["id", "id1", "parent"]);
          break;
        case "index3":
          getIndex3(startIndex, page.limit, searchWord)
            .then(res => {
              if (res.data.code == 0) {
                var data = res.data.data;
                this.page.total = data.total; // 分页记录总数
                this.value = data.index3s;
              } else {
                alert("错误! " + res.data.msg);
              }
            })
            .catch(err => {
              alert("错误! " + err);
            });
          this.columnsHidden = new Set(["id", "id1", "id2", "parent"]);
          break;
        case "orgs":
          getOrgs(startIndex, page.limit, searchWord)
            .then(res => {
              if (res.data.code == 0) {
                var data = res.data.data;
                this.page.total = data.total; // 分页记录总数
                this.value = data.org1s;
              } else {
                alert("错误! " + res.data.msg);
              }
            })
            .catch(err => {
              alert("错误! " + err);
            });
          this.columnsHidden = new Set(["id", "countries"]);
          this.columnsWidthSpecified = { _common: 170 };
          this.columnExpand = "countries";
          break;
        case "users":
          getUsers(startIndex, page.limit, searchWord)
            .then(res => {
              if (res.data.code == 0) {
                var data = res.data.data;
                this.page.total = data.total; // 分页记录总数
                this.value = data.users;
                this.columnsHidden = new Set(["id"]);
              } else {
                alert("错误! " + res.data.msg);
              }
            })
            .catch(err => {
              alert("错误! " + err);
            });
          break;
        case "sets":
          getSets(startIndex, page.limit, searchWord)
            .then(res => {
              if (res.data.code == 0) {
                var data = res.data.data;
                this.page.total = data.total; // 分页记录总数
                var tmp = data.sets;
                for (var i in tmp) {
                  if (tmp[i]["isactive"] == 1 || tmp[i]["isactive"] == "是") {
                    tmp[i]["isactive"] = "是";
                  } else {
                    tmp[i]["isactive"] = "否";
                  }
                }
                this.value = tmp;
                this.columnsHidden = new Set(["id"]);
                this.dbsets.options = tmp;
              } else {
                alert("错误! " + res.data.msg);
              }
            })
            .catch(err => {
              alert("错误! " + err);
            });
          break;
      }
    },
    // 所有开头为XXX的方法都为deprecated, 都不再使用
    columnsExtractor(data) {
      if (data.length == 0) {
        return [];
      }
      var res = [];
      var tableWidth = 0;
      var tableWidthEdge = 2;
      var tableWidthExpand = 0;
      if (this.columnExpand != null && this.columnExpand === "countries") {
        tableWidthExpand = 60;
        res.push({
          type: "expand",
          title: "展开",
          width: tableWidthExpand,
          render: (h, params) => {
            return h(AdminTableExpand, {
              props: {
                value: params.row.countries
              }
            });
          }
        });
      }
      for (var i in data[0]) {
        if (this.columnsHidden.has(i)) {
          // 在此将id屏蔽
          continue;
        }
        var width = this.columnWidthGetter(i);
        tableWidth += width;
        res.push({
          title: vname[i],
          key: i,
          width: width
        });
      }
      var actionWidth = 130;
      tableWidth += actionWidth;
      res.push({
        title: "操作",
        // key: "edit", // 就是指标名
        slot: "action",
        width: actionWidth
      });
      this.tableWidth = tableWidth + tableWidthEdge + tableWidthExpand;
      return res;
    },
    columnWidthGetter(field) {
      if (this.columnsWidthSpecified[field] != null) {
        return this.columnsWidthSpecified[field];
      }
      return this.columnsWidthSpecified["_common"];
    },
    XXXtableValueFilter(value, searchWord) {
      if (searchWord == "") {
        return value;
      } else {
        var res = [];
        for (var i in value) {
          for (var j in this.searchFields) {
            var field = this.searchFields[j];
            if (
              value[i][field] != null &&
              value[i][field].includes(searchWord)
            ) {
              res.push({ ...value[i] });
              break;
            }
          }
        }
        return res;
      }
    },
    actionHandler(modalType, index, row) {
      switch (modalType) {
        case "edit":
          this.modalOn.on = true;
          this.rowData = { ...this.value[index] }; // 改用index
          break;
        case "delete":
          switch (this.type) {
            case "country":
              delCountry(row.id)
                .then(res => {
                  if (res.data.code == 0) {
                    this.refresh();
                  } else {
                    alert("错误! " + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误! " + err);
                });
              break;
            case "index1":
              delIndex1(row.id)
                .then(res => {
                  if (res.data.code == 0) {
                    this.refresh();
                  } else {
                    alert("错误! " + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误! " + err);
                });
              break;
            case "index2":
              delIndex2(row.id)
                .then(res => {
                  if (res.data.code == 0) {
                    this.refresh();
                  } else {
                    alert("错误! " + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误! " + err);
                });
              break;
            case "index3":
              delIndex3(row.id)
                .then(res => {
                  if (res.data.code == 0) {
                    this.refresh();
                  } else {
                    alert("错误! " + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误! " + err);
                });
              break;
            case "orgs":
              delOrgs(row.id)
                .then(res => {
                  if (res.data.code == 0) {
                    this.refresh();
                  } else {
                    alert("错误! " + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误! " + err);
                });
              break;
            case "users":
              delUsers(row.id)
                .then(res => {
                  if (res.data.code == 0) {
                    this.refresh();
                  } else {
                    alert("错误! " + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误! " + err);
                });
              break;
            case "sets":
              delSets(row.id)
                .then(res => {
                  if (res.data.code == 0) {
                    this.refresh();
                  } else {
                    alert("错误! " + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误! " + err);
                });
              break;
          }
          break;
      }
    },
    searchHandler(searchWord) {
      this.searchWord = searchWord;
      this.page.start = 0;
      this.getValue(this.page, this.searchWord);
    },
    createHandler() {
      this.modalOn.new = true;
    },
    addRowStyle(row) {
      if (row["isactive"] == "是") {
        return "demo-table-info-row";
      }
      return "";
    },
    refresh() {
      this.getValue(this.page, this.searchWord);
    },
    pageOnChange(page) {
      this.page.start = page - 1;
      this.refresh();
    },
    chooseSet() {
      let postData = {
        id: this.dbsets.chosen
      };
      chooseSets(postData)
        .then(res => {
          if (res.data.code == 0) {
            this.refresh();
          } else {
            alert("错误!" + res.data.msg);
          }
        })
        .catch(err => {
          alert("错误!" + err);
        });
    }
  }
};
</script>
<style>
.ivu-table .demo-table-info-row td {
  background-color: #6cc9f5;
  color: rgb(73, 55, 55);
}
</style>
