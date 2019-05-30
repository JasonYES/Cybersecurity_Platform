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
                <p slot="title">采集类型</p>
                <div style="width:100px">
                  <CheckboxGroup>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>指标1</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>指标2</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>指标3</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>指标4</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>指标5</span>
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              </Card>
            </i-col>
            <i-col span="6">
              <Card>
                <p slot="title">采集来源</p>
                <div style="width:140px">
                  <CheckboxGroup>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>政府网站</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>国际组织</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>公开网域</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>媒体</span>
                    </Checkbox>
                    <Checkbox label="twitter">
                      <Icon type="md-flag"></Icon>
                      <span>院校和研究机构</span>
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
                <Button long @click="progress = !progress">确认</Button>
              </i-col>
            </Row>
          </div>
          <br>
          <Row type="flex" justify="center">
            <i-col span="10">
              <Progress v-if="progress" :percent="5" status="active"/>
            </i-col>
          </Row>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import { Cbox } from "_c/charts";
import { ScoreBoard } from "_c/scoring";
import { getCountries } from "@/api/visual";
import tmpData from "@/store/module/tmp-data";
export default {
  components: {
    Cbox
  },
  data() {
    return {
      typeValue: {},
      progress: false
    };
  },
  mounted() {
    this.getTypeValue();
  },
  methods: {
    getTypeValue() {
      getCountries()
        .then(res => {
          if (res.data.code == 0) {
            var data = res.data.data;
            this.typeValue = data;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    checkedData() {}
  }
};
</script>

