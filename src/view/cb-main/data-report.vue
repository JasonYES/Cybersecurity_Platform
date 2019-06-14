<template>
  <div>
    <Row>
      <Collapse :value="'1'" accordion>
        <Panel name="1">
          选项
          <div slot="content">
            <div style="margin-bottom:0px;">
              <Row type="flex" justify="center">
                <i-col span="4">
                  <CheckboxGroup v-model="reportChosen" @on-change="reportDIY">
                    <!-- <Checkbox label="cover">封面</Checkbox> -->
                    <Checkbox label="preview">前言</Checkbox>
                    <Checkbox label="map">地图</Checkbox>
                    <Checkbox label="pie">饼图</Checkbox>
                    <Checkbox label="table">表格</Checkbox>
                    <Checkbox label="sum">总结</Checkbox>
                  </CheckboxGroup>
                </i-col>
              </Row>
            </div>
            <br>
            <div style="margin-bottom:0px;">
              <Row type="flex" justify="center">
                <i-col span="6">
                  <Button long @click="reportDownload">预览及下载</Button>
                </i-col>
              </Row>
            </div>
          </div>
        </Panel>
      </Collapse>
    </Row>
    <br>
    <Row></Row>
    <!-- 正文 -->

    <!-- 1 -->

    <Row type="flex" justify="center">
      <i-col span="16">
        <Card>
          <div id="cover" align="center" :style="height">
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <Row>
              <img id="reportCover" class="report" :src="win1" key="win1">
            </Row>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <Row type="flex" justify="end">
              <i-col span="10">
                <Input v-model="reportText.title" type="textarea" placeholder="输入标题..."/>
              </i-col>
            </Row>
            <!-- <p align="right" style="font-size:65px;padding-right:50px">dfasfdsaf</p> -->
          </div>
        </Card>
      </i-col>
    </Row>
    <br>
    <Row v-if="reportFlag.preview" type="flex" justify="center">
      <i-col span="16">
        <Card>
          <div align="center" :style="height">
            <h2 align="left" style="padding-left:20px">{{reportText.title}} - 前言</h2>
            <br>
            <br>
            <br>
            <br>
            <br>
            <Row type="flex" justify="center">
              <i-col span="18">
                <Input
                  v-model="reportText.summary"
                  type="textarea"
                  :rows="40"
                  placeholder="输入内容..."
                />
              </i-col>
            </Row>
          </div>
        </Card>
      </i-col>
    </Row>
    <br>
    <Row v-if="reportFlag.map" type="flex" justify="center">
      <i-col span="16">
        <Card>
          <div align="center" :style="height">
            <h2 align="left" style="padding-left:20px">{{reportText.title}} - 全球概览</h2>
            <br>
            <br>
            <Card shadow>
              <div id="reportMap">
                <chart-map style="height:600px;" :index="'score'"></chart-map>
              </div>
            </Card>
            <br>
            <br>
            <Row type="flex" justify="center">
              <i-col span="18">
                <Input v-model="reportText.map" type="textarea" :rows="15" placeholder="输入内容..."/>
              </i-col>
            </Row>
          </div>
        </Card>
      </i-col>
    </Row>
    <br>
    <Row v-if="reportFlag.pie" type="flex" justify="center">
      <i-col span="16">
        <Card>
          <div align="center">
            <h2 align="left" style="padding-left:20px">{{reportText.title}} - 显著性分析</h2>
            <br>
            <br>
            <Card shadow>
              <div id="reportPie">
                <chart-pie style="height: 1000px;" :value="dataCombined"/>
              </div>
            </Card>
            <br>
            <br>
            <Row type="flex" justify="center">
              <i-col span="18">
                <Input v-model="reportText.pie" type="textarea" :rows="15" placeholder="输入内容..."/>
              </i-col>
            </Row>
            <br>
          </div>
        </Card>
      </i-col>
    </Row>
    <br>
    <Row v-if="reportFlag.table" type="flex" justify="center">
      <i-col span="16">
        <Card>
          <div align="center">
            <h2 align="left" style="padding-left:20px">{{reportText.title}} - 分数列表</h2>
            <br>
            <br>
            <Card shadow>
              <Tablex id="reportTable" :value="dataCombined"/>
            </Card>
            <br>
          </div>
        </Card>
      </i-col>
    </Row>
    <br>
    <Row v-if="reportFlag.sum" type="flex" justify="center">
      <i-col span="16">
        <Card>
          <div align="center">
            <h2 align="left" style="padding-left:20px">{{reportText.title}} - 总结报告</h2>
            <br>
            <br>
            <br>
            <Row type="flex" justify="center">
              <i-col span="18">
                <Input v-model="reportText.final" type="textarea" :rows="40" placeholder="输入内容..."/>
              </i-col>
            </Row>
            <br>
          </div>
        </Card>
      </i-col>
    </Row>
    <br>
  </div>
</template>
<script>
import win1 from "@/assets/images/win1.jpg";
import { Cbox, ChartMap, Tablex, ChartPie } from "_c/charts";
import html2canvas from "html2canvas";
import { divideScoresBy } from "@/libs/tools";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { font } from "@/assets/fonts/Alibaba-3500.js";
import { mapState } from "vuex";
import { resolve } from "q";
import { vname, reportText } from "@/config/properties";
export default {
  data() {
    return {
      win1,
      height: "height:1200px",
      reportText: reportText,
      reportPage: {
        width: 595.28,
        height: 841.89,
        margin: 30
      },
      pdf: null,
      reportFlag: {
        cover: true,
        preview: true,
        map: true,
        pie: true,
        table: true,
        sum: true
      },
      reportChosen: ["cover", "preview", "map", "pie", "table", "sum"]
    };
  },
  computed: {
    ...mapState({
      dname: state => state.cbdata.dynamicName,
      dataCombined: state => [...state.cbdata.cbox.chosenScores], // 防止被更改
      dataDivided: state => divideScoresBy(state.cbdata.cbox.chosenScores, "continent") // 防止被更改 方法内已做处理
    })
  },
  components: {
    ChartMap,
    Tablex,
    ChartPie
  },
  mounted() {},
  methods: {
    drawFromHTML() {
      this.pdf = new jsPDF("", "pt", "a4");

      // fonts support
      this.pdf.addFileToVFS("font.ttf", font);
      this.pdf.addFont("font.ttf", "ali", "normal");
      this.pdf.addFont("font.ttf", "ali", "bold");
      this.pdf.setFont("ali");
      var windoc = window.document;
      var text = this.reportText;

      var reportAddPic = this.reportAddPic;
      var reportAddLine = this.reportAddLine;
      var reportAddTitle = this.reportAddTitle;
      var reportAddParagraph = this.reportAddParagraph;

      // 以下是报告的编排和生成过程
      reportAddPic(windoc.getElementById("reportCover"), 0, 1 / 5, true)
        .then(() => {
          return reportAddLine(text.title, 560, 600, 23, "r", true);
        })
        .then(() => {
          return reportAddTitle("前言", this.reportFlag.preview);
        })
        .then(() => {
          return reportAddParagraph(text.summary, 1 / 5, this.reportFlag.preview);
        })
        .then(() => {
          return reportAddTitle("全球概览", this.reportFlag.map);
        })
        .then(() => {
          return reportAddPic(windoc.getElementById("reportMap"), 0, 1 / 10, this.reportFlag.map);
        })
        .then(() => {
          return reportAddParagraph(text.map, 3 / 5, this.reportFlag.map);
        })
        .then(() => {
          return reportAddTitle("显著性分析", this.reportFlag.pie);
        })
        .then(() => {
          return reportAddPic(windoc.getElementById("reportPie"), 0, 1 / 10, this.reportFlag.pie);
        })
        .then(() => {
          return reportAddTitle("显著性分析-续", this.reportFlag.pie);
        })
        .then(() => {
          return reportAddParagraph(text.pie, 1 / 7, this.reportFlag.pie);
        })
        .then(() => {
          return reportAddTitle("分数列表", this.reportFlag.table);
        })
        .then(() => {
          return this.reportAddTable(this.reportFlag.table);
        })
        .then(() => {
          return reportAddTitle("总结报告", this.reportFlag.sum);
        })
        .then(() => {
          return reportAddParagraph(text.final, 1 / 7, this.reportFlag.sum);
        })
        .then(() => {
          window.open(this.pdf.output("bloburl"));
        });
    },
    reportAddPic(source, x, y, flag) {
      return new Promise((resolve, reject) => {
        if (flag == false) {
          resolve(1);
        } else {
          html2canvas(source).then(canvas => {
            var pic = canvas.toDataURL("image/jpeg", 1.0);
            var picMargin = this.reportPage.margin - 15;
            var picWidth = this.reportPage.width - 2 * picMargin;
            this.pdf.addImage(
              pic,
              "JPEG",
              picMargin,
              y * this.reportPage.height,
              picWidth,
              (picWidth / canvas.width) * canvas.height
            );
            resolve(1);
          });
        }
      });
    },
    reportAddLine(text, x, y, size, align, flag) {
      return new Promise((resolve, reject) => {
        if (flag == false) {
          resolve(1);
        } else {
          this.pdf.setFontSize(size);
          switch (align) {
            case "r":
              this.pdf.text(text, x, y, null, null, "right");
              break;
            default:
              this.pdf.text(text, x, y);
              break;
          }
          resolve(1);
        }
      });
    },
    reportAddParagraph(text, y, flag) {
      if (flag == false) {
        return;
      }
      let page = this.reportPage;
      let textLines = this.pdf.setFontSize(14).splitTextToSize(text, page.width - 2 * page.margin);
      // 将字符串中的空格消除（因为有未知的显示问题，应该是有字体引起）
      for (var line in textLines) {
        textLines[line] = textLines[line].replace(/ /g, "");
      }
      this.pdf.text(textLines, page.margin, y * page.height);
    },
    reportAddTitle(text, flag) {
      return new Promise((resolve, reject) => {
        if (flag == false) {
          resolve(1);
        } else {
          let page = this.reportPage;
          this.pdf.addPage();
          this.pdf.setFontSize(16);
          this.pdf.text(text, page.margin, page.margin);
          resolve(1);
        }
      });
    },
    reportAddTable(flag) {
      return new Promise((resolve, reject) => {
        if (flag == false) {
          resolve(1);
        } else {
          let page = this.reportPage;
          var headers = this.reportTableHeader();
          var databody = [];
          for (var i in this.dataCombined) {
            var objCopy = { ...this.dataCombined[i] };
            objCopy["country"] = this.dname[this.dataCombined[i]["country"]];
            databody.push(objCopy);
          }
          this.pdf.autoTable({
            startY: page.margin + 20,
            head: headers,
            body: databody,
            styles: { font: "ali" }
          });
          resolve(1);
        }
      });
    },
    reportDownload() {
      this.drawFromHTML();
      // this.reportDownloadX();
    },
    reportDIY() {
      var chosenSet = new Set(this.reportChosen);
      for (var i in this.reportFlag) {
        if (chosenSet.has(i)) {
          this.reportFlag[i] = true;
        } else {
          this.reportFlag[i] = false;
        }
      }
    },
    XXXreportDownloadX() {
      this.pdf = new jsPDF("", "pt", "a4");

      // fonts support
      this.pdf.addFileToVFS("font.ttf", font);
      this.pdf.addFont("font.ttf", "ali", "normal");
      this.pdf.addFont("font.ttf", "ali", "bold");
      this.pdf.setFont("ali");
      var windoc = window.document;
      var text = this.reportText;

      var reportAddPic = this.reportAddPic;
      var reportAddLine = this.reportAddLine;
      var reportAddTitle = this.reportAddTitle;
      var reportAddParagraph = this.reportAddParagraph;

      // console.log(this.dataDivided);
      // 以下是报告的编排和生成过程
      reportAddTitle("全球概览")
        .then(() => {
          return this.reportAddTable();
        })
        .then(() => {
          window.open(this.pdf.output("bloburl"));
        });
    },
    reportTableHeader() {
      if (this.dataCombined.length != 0) {
        var tmpHeader = this.dataCombined[0];
      }
      var header = {};
      for (var i in tmpHeader) {
        if (this.dname[i] != null) {
          header[i] = this.dname[i];
        } else if (vname[i] != null) {
          header[i] = vname[i];
        } else {
          header[i] = i;
        }
      }
      return [header];
    }
  }
};
</script>
<style>
.report {
  width: 100%;
  height: auto;
}
</style>


