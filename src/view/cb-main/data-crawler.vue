<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <Cbox @checked="checkedData" :type="'crawler'" :typeValue="typeValue"></Cbox>
        </Card>
      </i-col>
    </Row>
    <Tabs>
      <TabPane :label="'数据爬取'">
        <Row type="flex" justify="space-around" :gutter="20" style="margin-top: 10px;">
          <i-col span="12">
            <Card>
              <Row :gutter="20" style="margin-top: 10px;">
                <i-col span="3" offset="1">
                  <p>当前状态:</p>
                </i-col>
                <i-col span="10">
                  <p>{{processData.pause}}</p>
                </i-col>
              </Row>
              <Row :gutter="20" style="margin-top: 10px;">
                <i-col span="3" offset="1">
                  <p>详细信息:</p>
                </i-col>
                <i-col span="10">
                  <p>{{processData.message}}</p>
                </i-col>
              </Row>
              <br>
              <Row type="flex" justify="center">
                <i-col span="10">
                  <Progress :percent="processData.percentage" status="active"/>
                </i-col>
              </Row>
              <br>
              <div style>
                <Row type="flex" justify="center">
                  <i-col span="6">
                    <Button long @click="crawlControl">开始 / 暂停</Button>
                  </i-col>
                </Row>
              </div>
            </Card>
          </i-col>
        </Row>
      </TabPane>
      <!-- <TabPane :label="'文档解析'">
        <Row type="flex" justify="center">
          <i-col span="12">
            <Card>
              <Row type="flex" justify="center">
                <i-col span="10">
                  <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>上次PDF文件并解析</p>
                    </div>
                  </Upload>
                </i-col>
              </Row>
              <div style>
                <Row type="flex" justify="center">
                  <i-col span="6">
                    <Button long @click="progress = !progress">确认</Button>
                  </i-col>
                </Row>
              </div>
            </Card>
          </i-col>
        </Row>
      </TabPane>-->
    </Tabs>
  </div>
</template>
<script>
import { Cbox } from "_c/charts";
import { ScoreBoard } from "_c/scoring";
import { getCountries } from "@/api/visual";
import tmpData from "@/store/module/tmp-data";
import { cbstart, cbpause, cbprogress } from "@/api/cbdata";
export default {
  components: {
    Cbox
  },
  data() {
    return {
      typeValue: {},
      progress: false,
      intervalObj: "",
      processData: {
        pause: "",
        percentage: 0,
        message: "",
        pausecode: ""
      }
    };
  },
  mounted() {
    this.getTypeValue();
    this.getProgress();
    this.intervalProcess();
  },
  beforeDestroy() {
    clearInterval(this.intervalObj);
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
    getProgress() {
      cbprogress()
        .then(res => {
          if (res.data.code == 0) {
            var data = res.data.data;
            this.processData.message = data.data;
            this.processData.pause = data.pause;
            this.processData.percentage = data.percent;
            this.processData.pausecode = data.pausecode;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    intervalProcess() {
      this.intervalObj = setInterval(() => {
        this.getProgress;
      }, 10000); //10s刷新一次
    },
    crawlControl() {
      if (this.processData.pausecode == "no") {
        // 运行中, 所以暂停
        cbpause()
          .then(res => {
            if (res.data.code == 0) {
              this.$Message.success("暂停成功");
              this.getProgress();
            } else {
              alert(res.data.msg);
            }
          })
          .catch(err => {
            alert(err);
          });
      } else {
        // 现在已暂停, 所以开始
        cbstart()
          .then(res => {
            if (res.data.code == 0) {
              this.$Message.success("开始成功");
              this.getProgress();
            } else {
              alert(res.data.msg);
            }
          })
          .catch(err => {
            alert(err);
          });
      }
    },
    checkedData() {}
  }
};
</script>

