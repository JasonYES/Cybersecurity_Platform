<template>
  <div class="scoring scoreBoard">
    <h2 style="padding-left:10px">{{text}}</h2>
    <Table border :columns="columns" :data="data"></Table>
    <Modal v-model="judgingModal.showModal1">
      <p slot="header">
        <span>{{judgingModal.title}}</span>
      </p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
    <Modal v-model="judgingModal.showModal2">
      <p slot="header">
        <span>{{judgingModal.title}}</span>
      </p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>
<script>
import vname from "@/config/view-name";
export default {
  name: "ScoreBoard",
  props: {
    value: Array,
    text: String
  },
  mounted() {
    this.addCellStyle(this.data);
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
      for (var i in data) {
        var cellClassName = {};
        for (var j in data[i]) {
          if (j.length == 1 || j.length > 3) {
            // 如果是1 2 country之类的是标志位, 不是具体分数, 所以跳过
            continue;
          }
          cellClassName[j] = this.cellStyleParser(data[i][j]);
        }
        data[i]["cellClassName"] = cellClassName;
      }
    },
    judgingBoard(params) {
      // 是否已审阅的判定
      console.log(params);
      if (params.row[params.column.key] == 1) {
        var text = "已审阅";
      } else {
      }
      //打开面板
      this.judgingModal.showModal1 = true;
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
    }
  },
  data() {
    return {
      judgingModal: {
        status: 0, // 是否已审阅过
        title: "",
        showModal1: false, // 默认modal
        showModal2: false // 提示已审阅
      },
      columns: [
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
      data: [
        {
          country: "China",
          "1.1": 1,
          "1.2": 0,
          "1.3": 1,
          "1.4": 0,
          "1.5": 1,
          "2.1": 0,
          "2.2": 1,
          "2.3": 1,
          "2.4": 0,
          "2.5": 1,
          "3.1": 1,
          "3.2": 1,
          "3.3": 1,
          "3.4": 0,
          "3.5": 1,
          "4.1": 0,
          "4.2": 0,
          "4.3": 0,
          "4.4": 1,
          "4.5": 0,
          "5.1": 0,
          "5.2": 0,
          "5.3": 0,
          "5.4": 0,
          "5.5": 0,
          cellClassName: "",
          "1": 1,
          "2": 1,
          "3": 1,
          "4": 0,
          "5": 0
        },
        {
          country: "India",
          "1.1": 0,
          "1.2": 0,
          "1.3": 0,
          "1.4": 0,
          "1.5": 0,
          "2.1": 1,
          "2.2": 1,
          "2.3": 1,
          "2.4": 1,
          "2.5": 1,
          "3.1": 1,
          "3.2": 0,
          "3.3": 1,
          "3.4": 0,
          "3.5": 1,
          "4.1": 0,
          "4.2": 1,
          "4.3": 1,
          "4.4": 1,
          "4.5": 1,
          "5.1": 1,
          "5.2": 0,
          "5.3": 1,
          "5.4": 0,
          "5.5": 0,
          cellClassName: "",
          "1": 0,
          "2": 0,
          "3": 1,
          "4": 0,
          "5": 0
        },
        {
          country: "United States",
          "1.1": 0,
          "1.2": 1,
          "1.3": 1,
          "1.4": 0,
          "1.5": 0,
          "2.1": 0,
          "2.2": 1,
          "2.3": 1,
          "2.4": 1,
          "2.5": 0,
          "3.1": 1,
          "3.2": 0,
          "3.3": 0,
          "3.4": 0,
          "3.5": 0,
          "4.1": 1,
          "4.2": 0,
          "4.3": 1,
          "4.4": 0,
          "4.5": 0,
          "5.1": 0,
          "5.2": 1,
          "5.3": 1,
          "5.4": 0,
          "5.5": 1,
          cellClassName: "",
          "1": 1,
          "2": 1,
          "3": 1,
          "4": 1,
          "5": 1
        },
        {
          country: "Indonesia",
          "1.1": 1,
          "1.2": 0,
          "1.3": 0,
          "1.4": 1,
          "1.5": 1,
          "2.1": 0,
          "2.2": 0,
          "2.3": 0,
          "2.4": 1,
          "2.5": 1,
          "3.1": 1,
          "3.2": 0,
          "3.3": 1,
          "3.4": 1,
          "3.5": 1,
          "4.1": 0,
          "4.2": 1,
          "4.3": 0,
          "4.4": 1,
          "4.5": 1,
          "5.1": 1,
          "5.2": 0,
          "5.3": 0,
          "5.4": 1,
          "5.5": 0,
          cellClassName: "",
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 1
        },
        {
          country: "Iran",
          "1.1": 0,
          "1.2": 1,
          "1.3": 1,
          "1.4": 0,
          "1.5": 0,
          "2.1": 1,
          "2.2": 0,
          "2.3": 0,
          "2.4": 1,
          "2.5": 0,
          "3.1": 1,
          "3.2": 0,
          "3.3": 0,
          "3.4": 0,
          "3.5": 1,
          "4.1": 1,
          "4.2": 1,
          "4.3": 1,
          "4.4": 0,
          "4.5": 0,
          "5.1": 0,
          "5.2": 0,
          "5.3": 1,
          "5.4": 0,
          "5.5": 1,
          cellClassName: "",
          "1": 0,
          "2": 0,
          "3": 1,
          "4": 0,
          "5": 1
        },
        {
          country: "Brazil",
          "1.1": 0,
          "1.2": 0,
          "1.3": 1,
          "1.4": 0,
          "1.5": 0,
          "2.1": 0,
          "2.2": 0,
          "2.3": 1,
          "2.4": 1,
          "2.5": 1,
          "3.1": 1,
          "3.2": 0,
          "3.3": 0,
          "3.4": 1,
          "3.5": 1,
          "4.1": 0,
          "4.2": 0,
          "4.3": 0,
          "4.4": 1,
          "4.5": 0,
          "5.1": 1,
          "5.2": 1,
          "5.3": 0,
          "5.4": 1,
          "5.5": 0,
          cellClassName: "",
          "1": 0,
          "2": 1,
          "3": 1,
          "4": 0,
          "5": 1
        },
        {
          country: "Pakistan",
          "1.1": 0,
          "1.2": 0,
          "1.3": 0,
          "1.4": 1,
          "1.5": 0,
          "2.1": 0,
          "2.2": 0,
          "2.3": 0,
          "2.4": 1,
          "2.5": 1,
          "3.1": 0,
          "3.2": 0,
          "3.3": 1,
          "3.4": 0,
          "3.5": 0,
          "4.1": 0,
          "4.2": 0,
          "4.3": 1,
          "4.4": 0,
          "4.5": 0,
          "5.1": 0,
          "5.2": 0,
          "5.3": 0,
          "5.4": 1,
          "5.5": 1,
          cellClassName: "",
          "1": 1,
          "2": 1,
          "3": 0,
          "4": 0,
          "5": 1
        },
        {
          country: "Nigeria",
          "1.1": 0,
          "1.2": 0,
          "1.3": 1,
          "1.4": 1,
          "1.5": 0,
          "2.1": 1,
          "2.2": 0,
          "2.3": 1,
          "2.4": 0,
          "2.5": 1,
          "3.1": 1,
          "3.2": 0,
          "3.3": 1,
          "3.4": 1,
          "3.5": 0,
          "4.1": 0,
          "4.2": 0,
          "4.3": 0,
          "4.4": 0,
          "4.5": 0,
          "5.1": 0,
          "5.2": 1,
          "5.3": 1,
          "5.4": 1,
          "5.5": 1,
          cellClassName: "",
          "1": 1,
          "2": 1,
          "3": 0,
          "4": 0,
          "5": 1
        },
        {
          country: "Bangladesh",
          "1.1": 0,
          "1.2": 1,
          "1.3": 1,
          "1.4": 0,
          "1.5": 0,
          "2.1": 1,
          "2.2": 0,
          "2.3": 0,
          "2.4": 1,
          "2.5": 1,
          "3.1": 0,
          "3.2": 1,
          "3.3": 1,
          "3.4": 1,
          "3.5": 0,
          "4.1": 0,
          "4.2": 0,
          "4.3": 0,
          "4.4": 0,
          "4.5": 1,
          "5.1": 1,
          "5.2": 1,
          "5.3": 0,
          "5.4": 1,
          "5.5": 1,
          cellClassName: "",
          "1": 1,
          "2": 1,
          "3": 1,
          "4": 1,
          "5": 0
        },
        {
          country: "Japan",
          "1.1": 1,
          "1.2": 1,
          "1.3": 0,
          "1.4": 0,
          "1.5": 0,
          "2.1": 1,
          "2.2": 1,
          "2.3": 1,
          "2.4": 0,
          "2.5": 0,
          "3.1": 0,
          "3.2": 1,
          "3.3": 0,
          "3.4": 1,
          "3.5": 0,
          "4.1": 1,
          "4.2": 0,
          "4.3": 0,
          "4.4": 0,
          "4.5": 1,
          "5.1": 1,
          "5.2": 1,
          "5.3": 0,
          "5.4": 1,
          "5.5": 0,
          cellClassName: "",
          "1": 1,
          "2": 0,
          "3": 1,
          "4": 0,
          "5": 0
        },
        {
          country: "Mexico",
          "1.1": 0,
          "1.2": 1,
          "1.3": 1,
          "1.4": 1,
          "1.5": 0,
          "2.1": 0,
          "2.2": 0,
          "2.3": 0,
          "2.4": 0,
          "2.5": 0,
          "3.1": 1,
          "3.2": 0,
          "3.3": 0,
          "3.4": 0,
          "3.5": 0,
          "4.1": 1,
          "4.2": 0,
          "4.3": 1,
          "4.4": 0,
          "4.5": 1,
          "5.1": 1,
          "5.2": 0,
          "5.3": 0,
          "5.4": 0,
          "5.5": 1,
          cellClassName: "",
          "1": 1,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 1
        },
        {
          country: "Philippines",
          "1.1": 1,
          "1.2": 1,
          "1.3": 0,
          "1.4": 1,
          "1.5": 0,
          "2.1": 1,
          "2.2": 0,
          "2.3": 1,
          "2.4": 1,
          "2.5": 0,
          "3.1": 0,
          "3.2": 1,
          "3.3": 0,
          "3.4": 0,
          "3.5": 1,
          "4.1": 1,
          "4.2": 0,
          "4.3": 1,
          "4.4": 1,
          "4.5": 0,
          "5.1": 1,
          "5.2": 1,
          "5.3": 1,
          "5.4": 1,
          "5.5": 1,
          cellClassName: "",
          "1": 0,
          "2": 0,
          "3": 1,
          "4": 0,
          "5": 0
        },
        {
          country: "Vietnam",
          "1.1": 0,
          "1.2": 1,
          "1.3": 1,
          "1.4": 0,
          "1.5": 1,
          "2.1": 0,
          "2.2": 0,
          "2.3": 1,
          "2.4": 1,
          "2.5": 0,
          "3.1": 0,
          "3.2": 1,
          "3.3": 1,
          "3.4": 0,
          "3.5": 0,
          "4.1": 1,
          "4.2": 1,
          "4.3": 1,
          "4.4": 0,
          "4.5": 1,
          "5.1": 0,
          "5.2": 1,
          "5.3": 1,
          "5.4": 0,
          "5.5": 1,
          cellClassName: "",
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 1
        },
        {
          country: "Ethiopia",
          "1.1": 1,
          "1.2": 0,
          "1.3": 1,
          "1.4": 1,
          "1.5": 0,
          "2.1": 0,
          "2.2": 0,
          "2.3": 1,
          "2.4": 1,
          "2.5": 1,
          "3.1": 0,
          "3.2": 1,
          "3.3": 1,
          "3.4": 1,
          "3.5": 1,
          "4.1": 1,
          "4.2": 1,
          "4.3": 0,
          "4.4": 0,
          "4.5": 1,
          "5.1": 1,
          "5.2": 1,
          "5.3": 1,
          "5.4": 1,
          "5.5": 1,
          cellClassName: "",
          "1": 0,
          "2": 1,
          "3": 0,
          "4": 0,
          "5": 1
        },
        {
          country: "Germany",
          "1.1": 0,
          "1.2": 1,
          "1.3": 1,
          "1.4": 0,
          "1.5": 1,
          "2.1": 1,
          "2.2": 0,
          "2.3": 1,
          "2.4": 0,
          "2.5": 1,
          "3.1": 1,
          "3.2": 1,
          "3.3": 0,
          "3.4": 1,
          "3.5": 0,
          "4.1": 0,
          "4.2": 0,
          "4.3": 1,
          "4.4": 1,
          "4.5": 1,
          "5.1": 0,
          "5.2": 0,
          "5.3": 1,
          "5.4": 1,
          "5.5": 1,
          cellClassName: "",
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 1,
          "5": 1
        },
        {
          country: "Egypt",
          "1.1": 1,
          "1.2": 0,
          "1.3": 0,
          "1.4": 1,
          "1.5": 0,
          "2.1": 1,
          "2.2": 0,
          "2.3": 0,
          "2.4": 0,
          "2.5": 1,
          "3.1": 0,
          "3.2": 1,
          "3.3": 1,
          "3.4": 0,
          "3.5": 1,
          "4.1": 0,
          "4.2": 0,
          "4.3": 0,
          "4.4": 0,
          "4.5": 1,
          "5.1": 0,
          "5.2": 1,
          "5.3": 0,
          "5.4": 0,
          "5.5": 1,
          cellClassName: "",
          "1": 1,
          "2": 0,
          "3": 1,
          "4": 1,
          "5": 0
        },
        {
          country: "Turkey",
          "1.1": 0,
          "1.2": 1,
          "1.3": 0,
          "1.4": 0,
          "1.5": 0,
          "2.1": 1,
          "2.2": 0,
          "2.3": 0,
          "2.4": 1,
          "2.5": 1,
          "3.1": 0,
          "3.2": 0,
          "3.3": 1,
          "3.4": 0,
          "3.5": 0,
          "4.1": 1,
          "4.2": 0,
          "4.3": 1,
          "4.4": 0,
          "4.5": 0,
          "5.1": 1,
          "5.2": 0,
          "5.3": 0,
          "5.4": 1,
          "5.5": 0,
          cellClassName: "",
          "1": 0,
          "2": 1,
          "3": 1,
          "4": 0,
          "5": 1
        }
      ]
    };
  }
};
</script>
</<style>
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
