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
                  <i-col :md="7" :lg="7" style="margin-bottom: 0px;">
                    <Input
                      search
                      @on-search="searchHandler"
                      enter-button
                      placeholder="Enter something..."
                    />
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
          <Table border :columns="columns" :data="value">
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
          <div align="center">
            <Page :current="2" :total="50" simple/>
            <br>
          </div>
        </Card>
      </i-col>
    </Row>
    <admin-modal :type="type" :value="rowData" :modalOn="modalOn"></admin-modal>
  </div>
</template>
<script>
import { AdminModal } from "_c/scoringmini";
import tmpData from "@/store/module/tmp-data";
export default {
  name: "AdminBoard",
  props: {
    type: String
  },
  components: {
    AdminModal
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
      modalOn: false,
      searchWord: "",
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
          break;
        case "index1":
          this.value = tmpData["dbindex1"];
          break;
      }
    },
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
      for (var i in data[0]) {
        if (i === "id") {
          // 在此将id屏蔽
          continue;
        }
        res.push({
          title: i,
          key: i
        });
      }
      res.push({
        title: "操作",
        // key: "edit", // 就是指标名
        slot: "action",
        width: 130
      });
      return res;
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
          this.modalOn = true;
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
    }
  }
};
</script>
