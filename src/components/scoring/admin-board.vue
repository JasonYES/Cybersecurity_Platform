<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Collapse :value="'1'">
            <Panel name="1">
              筛选和新建
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
          <div align="center">
            <Table border :width="tableWidth" :columns="columns" :data="value">
              <template slot-scope="{ row, index }" slot="action">
                <Button
                  type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="actionHandler('edit', index)"
                >修改</Button>
                <Poptip confirm title="确认删除吗?" @on-ok="actionHandler('delete', index)">
                  <Button type="error" size="small">删除</Button>
                </Poptip>
              </template>
            </Table>
            <br>
            <Page :current="2" :total="50" simple/>
            <br>
          </div>
        </Card>
      </i-col>
    </Row>
    <admin-modal :type="type" :value="rowData" :modalOn="modalOn"></admin-modal>
    <admin-modal-insert :type="type" :modalOn="modalOn"></admin-modal-insert>
  </div>
</template>
<script>
import { AdminModal, AdminModalInsert, AdminTableExpand } from "_c/scoringmini";
import tmpData from "@/store/module/tmp-data";
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
      page: {
        start: 0,
        limit: 10
      }
    };
  },
  mounted() {
    this.getValue(this.page, this.searchWord, this.type);
  },
  methods: {
    // 改为分页处理!
    getValue(page, searchWord, type) {
      switch (type) {
        case "country":
          this.value = tmpData["dbcountries"];
          this.columnsHidden = new Set(["id"]);
          break;
        case "index1":
          this.value = tmpData["dbindex1"];
          this.columnsHidden = new Set(["id"]);
          break;
        case "index2":
          this.value = tmpData["dbindex2"];
          this.columnsHidden = new Set(["id", "id1"]);
          break;
        case "index3":
          this.value = tmpData["dbindex3"];
          this.columnsHidden = new Set(["id", "id1", "id2"]);
          break;
        case "orgs":
          this.value = tmpData["dborgs"];
          this.columnsHidden = new Set(["id", "countries"]);
          this.columnsWidthSpecified = { _common: 170 };
          this.columnExpand = "countries";
          break;
        case "users":
          this.value = tmpData["dbusers"];
          this.columnsHidden = new Set(["id"]);
          break;
      }
    },
    // 所有开头为XXX的方法都为deprecated, 都不再使用
    XXXrender(h, params) {
      return h("div", [
        h(
          "Button",
          {
            props: {
              type: "primary",
              size: "small"
            },
            style: {
              marginRight: "5px"
            },
            on: {
              click: () => {
                this.actionHandler("edit", params);
              }
            }
          },
          "编辑"
        ),
        h(
          "Button",
          {
            props: {
              type: "error",
              size: "small"
            },
            on: {
              click: () => {
                this.actionHandler("delete", params);
              }
            }
          },
          "删除"
        )
      ]);
    },
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
          title: i,
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
    actionHandler(modalType, index) {
      switch (modalType) {
        case "edit":
          this.modalOn.on = true;
          this.rowData = { ...this.value[index] }; // 改用index
          break;
        case "delete":
          //delete API here
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
    }
  }
};
</script>
