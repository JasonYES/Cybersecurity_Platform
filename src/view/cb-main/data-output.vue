<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox @checked="checkedData" :type="'crawler'" :typeValue="typeValue"></Cbox>
        </Card>
      </i-col>
    </Row>
    <Row type="flex" justify="space-around" :gutter="20" style="margin-top: 10px;">
      <i-col span="24">
        <Card style="background:#eee;padding:20px">
          <Row type="flex" justify="center" :gutter="20" style="margin-top: 10px;">
            <i-col span="6">
              <Card>
                <p slot="title">导出批次</p>
                <div style="width:100px">
                  <CheckboxGroup>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>2017.5.4</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>2017.12.8</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>2018.6.4</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>2018.10.9</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>2019.2.1</span>
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              </Card>
            </i-col>
            <i-col span="6">
              <Card>
                <p slot="title">导出内容</p>
                <div style="width:140px">
                  <CheckboxGroup>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>原始数据</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>翻译数据</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>人工打分结果</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>审核结果</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>图表及报告</span>
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              </Card>
            </i-col>
          </Row>
          <br>
          <div style>
            <Row type="flex" justify="center">
              <i-col span="6">
                <Button long>确认</Button>
              </i-col>
            </Row>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import { Cbox } from "_c/charts";
import { ScoreBoard } from "_c/scoring";
import tmpData from "@/store/module/tmp-data";
export default {
  components: {
    Cbox
  },
  data() {
    return {
      typeValue: {}
    };
  },
  mounted() {
    this.getTypeValue();
  },
  methods: {
    getTypeValue() {
      this.typeValue = tmpData["countries"];
    },
    checkedData() {}
  }
};
</script>

