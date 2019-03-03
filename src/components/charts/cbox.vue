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
          "阿富汗",
          "奥兰群岛",
          "阿尔巴尼亚",
          "阿尔及利亚",
          "美属萨摩亚",
          "安道尔",
          "安哥拉",
          "安圭拉",
          "南极洲",
          "安提瓜和巴布达",
          "阿根廷",
          "亚美尼亚",
          "阿鲁巴",
          "澳大利亚",
          "奥地利",
          "阿塞拜疆"
        ],
        欧洲: [
          "巴哈马",
          "巴林",
          "孟加拉国",
          "巴巴多斯",
          "白俄罗斯",
          "比利时",
          "伯利兹",
          "贝宁",
          "百慕大",
          "不丹",
          "玻利维亚",
          "波黑",
          "博茨瓦纳",
          "布维岛",
          "巴西"
        ],
        非洲: [
          "柬埔寨",
          "喀麦隆",
          "加拿大",
          "佛得角",
          "开曼群岛",
          "中非",
          "乍得",
          "智利",
          "中国",
          "圣诞岛",
          "科科斯（基林）群岛",
          "哥伦比亚",
          "科摩罗",
          "刚果（布）",
          "刚果（金）",
          "库克群岛"
        ],
        拉美洲: [
          "加蓬",
          "冈比亚",
          "格鲁吉亚",
          "德国",
          "加纳",
          "直布罗陀",
          "希腊",
          "格陵兰",
          "格林纳达",
          "瓜德罗普",
          "关岛",
          "危地马拉",
          "格恩西岛",
          "几内亚",
          "几内亚比绍",
          "圭亚那"
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

