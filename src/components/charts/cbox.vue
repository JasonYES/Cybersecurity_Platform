<template>
  <div class="charts cbox">
    <Collapse :value="cboxFlag" accordion>
      <Panel name="countries">
        国家选择
        <div slot="content">
          <div v-for="(object, continent)  in value" :key="continent">
            <Row>
              <i-col span="2">
                <Button
                  size="small"
                  :key="continent"
                  @click="handleCheckAll(continent)"
                >全选:{{continent}}</Button>
              </i-col>
              <i-col
                span="22"
                style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;"
              >
                <CheckboxGroup v-model="checked[continent]">
                  <Checkbox v-for="c in object" :key="c" :label="c">{{dname[c]}}</Checkbox>
                </CheckboxGroup>
              </i-col>
            </Row>
          </div>
          <div style="margin-bottom:-10px;">
            <Row type="flex" justify="center">
              <i-col span="6">
                <Button long @click="confirmHander">确认</Button>
              </i-col>
            </Row>
          </div>
        </div>
      </Panel>
      <Panel name="orgs" v-if="type == null">
        组织选择
        <div slot="content">
          <div v-for="(object, continent)  in orgsValue" :key="continent">
            <Row>
              <i-col span="2">
                <Button
                  size="small"
                  :key="continent"
                  @click="handleCheckAllOrgs(continent)"
                >全选:{{continent}}</Button>
              </i-col>
              <i-col
                span="22"
                style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;"
              >
                <CheckboxGroup v-model="checkedOrgs[continent]">
                  <Checkbox v-for="c in object" :key="c" :label="c">{{c}}</Checkbox>
                </CheckboxGroup>
              </i-col>
            </Row>
          </div>
          <div style="margin-bottom:-10px;">
            <Row type="flex" justify="center">
              <i-col span="6">
                <Button long @click="confirmHanderOrgs">确认</Button>
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
export default {
  name: "Cbox",
  props: {
    type: String,
    typeValue: Object
  },
  computed: {
    ...mapState({
      cbox: state => state.cbdata.cbox,
      dname: state => state.cbdata.dynamicName,
      cboxFlag: state => state.cbdata.cbox.cboxFlag
    })
  },
  watch: {
    // 这是为了typeValue异步加载的实时更新
    typeValue: function() {
      if (this.type == null || this.type == "") {
        return;
      }
      this.value = this.typeValue;
      this.checked = this.copyEmptyObject(this.value);
    }
  },
  data() {
    return {
      checked: {},
      checkedOrgs: {
        大洲: ["亚洲", "非洲", "欧洲", "北美洲", "拉丁美洲", "大洋洲"],
        联盟: ["欧盟", "东盟", "亚太经合组织", "上合组织", "G20", "G8"]
      },
      confirmAction: "",
      value: {
        亚洲: [
          "中国",
          "朝鲜",
          "韩国",
          "蒙古",
          "日本",
          "越南",
          "老挝",
          "柬埔寨",
          "缅甸",
          "泰国",
          "马来西亚",
          "新加坡",
          "印度尼西亚",
          "菲律宾",
          "文莱",
          "东帝汶",
          "斯里兰卡",
          "马尔代夫",
          "巴基斯坦",
          "印度"
        ],
        欧洲: [
          "芬兰",
          "瑞典",
          "挪威",
          "冰岛",
          "丹麦",
          "法罗群岛",
          "爱沙尼亚",
          "拉脱维亚",
          "立陶宛",
          "白俄罗斯",
          "俄罗斯",
          "乌克兰",
          "摩尔多瓦",
          "波兰",
          "捷克",
          "斯洛伐克",
          "匈牙利",
          "德国",
          "奥地利",
          "瑞士"
        ],
        非洲: [
          "埃及",
          "苏丹",
          "利比亚",
          "突尼斯",
          "阿尔及利亚",
          "摩洛哥",
          "亚速尔群岛",
          "马德拉群岛",
          "埃塞俄比亚",
          "厄立特里亚",
          "索马里",
          "吉布提",
          "肯尼亚"
        ],
        北美洲: [
          "巴哈马",
          "伯利兹",
          "美国",
          "巴巴多斯",
          "加拿大",
          "哥斯达黎加",
          "古巴",
          "萨尔瓦多",
          "格林纳达",
          "危地马拉",
          "洪都拉斯",
          "海地",
          "牙买加",
          "圣卢西亚",
          "墨西哥",
          "尼加拉瓜",
          "巴拿马",
          "多米尼加",
          "多米尼克"
        ]
      },
      orgsValue: {
        大洲: ["亚洲", "非洲", "欧洲", "北美洲", "拉丁美洲", "大洋洲"],
        联盟: ["欧盟", "东盟", "亚太经合组织", "上合组织", "G20", "G8"]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initByType();
    });
  },
  methods: {
    initByType() {
      switch (this.type) {
        case "orgs": // XXX deprecated
          this.value = this.cbox.orgs;
          this.checked = this.cbox.chosenOrgs;
          this.confirmAction = "innerOrgs";
          break;
        case "scoring":
          this.value = this.typeValue;
          this.checked = this.copyEmptyObject(this.value);
          this.confirmAction = "outer";
          break;
        case "history":
          this.value = { ...this.cbox.countries };
          this.checked = this.copyEmptyObject(this.value);
          this.confirmAction = "outer";
          break;
        case "crawler":
          this.value = this.typeValue;
          this.checked = this.copyObject(this.value);
          this.confirmAction = "outer";
          break;
        default:
          // 默认为visual部分的大多数情况
          this.value = { ...this.cbox.countries };
          this.orgsValue = { ...this.cbox.orgs };
          this.checked = { ...this.cbox.chosenCountries };
          this.checkedOrgs = { ...this.cbox.chosenOrgs };
          this.confirmAction = "inner";
          break;
      }
    },
    confirmHander() {
      if (this.confirmAction === "inner") {
        this.$store.commit("setCbox", { chosenCountries: this.checked });
        this.$store.commit("updateChosenScores", "countries");
      } else if (this.confirmAction === "outer") {
        this.$emit("checked", this.checked);
      } else if (this.confirmAction === "innerOrgs") {
        this.$store.commit("setCbox", { chosenOrgs: this.checked });
      }
    },
    confirmHanderOrgs() {
      if (this.confirmAction === "inner") {
        this.$store.commit("setCbox", { chosenOrgs: this.checkedOrgs });
        this.$store.commit("updateChosenScores", "orgs");
      }
    },
    copyObject(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    copyEmptyObject(obj) {
      var keys = Object.keys(obj);
      var resObj = {};
      for (var i in keys) {
        resObj[keys[i]] = [];
      }
      return resObj;
    },
    handleCheckAll(continent) {
      if (this.checked[continent].length == this.value[continent].length) {
        this.checked[continent] = [];
      } else {
        this.checked[continent] = this.copyObject(this.value[continent]);
      }
    },
    handleCheckAllOrgs(continent) {
      if (this.checkedOrgs[continent].length == this.orgsValue[continent].length) {
        this.checkedOrgs[continent] = [];
      } else {
        this.checkedOrgs[continent] = this.copyObject(this.orgsValue[continent]);
      }
    }
  }
};
</script>

