<template>
  <div class="charts cbox">
    <Collapse :value="'1'">
      <Panel name="1">国家选择
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
                  <Checkbox v-for="c in object" :key="c" :label="c"></Checkbox>
                </CheckboxGroup>
              </i-col>
            </Row>
          </div>
          <div style="margin-bottom:-10px;">
            <Row type="flex" justify="center">
              <i-col span="6">
                <Button long @click="$emit('checked',checked)">确认</Button>
              </i-col>
            </Row>
          </div>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
export default {
  name: "Cbox",
  props: {},
  data() {
    return {
      checked: {},
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
          // "坦桑尼亚",
          // "乌干达",
          // "卢旺达",
          // "布隆迪",
          // "毛里塔尼亚",
          // "西撒哈拉",
          // "塞内加尔",
          // "冈比亚",
          // "马里",
          // "布基纳法索",
          // "几内亚",
          // "几内亚比绍",
          // "佛得角",
          // "塞拉利昂",
          // "利比里亚",
          // "科特迪瓦",
          // "加纳",
          // "多哥",
          // "贝宁",
          // "尼日尔",
          // "尼日利亚"
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
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.checked = this.copyObject(this.value);
    });
  },
  methods: {
    copyObject(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    handleCheckAll(continent) {
      if (this.checked[continent].length == this.value[continent].length) {
        this.checked[continent] = [];
      } else {
        this.checked[continent] = this.copyObject(this.value[continent]);
      }
    }
  }
};
</script>

