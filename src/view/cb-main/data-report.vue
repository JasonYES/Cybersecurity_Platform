<template>
  <div>
    <Row>
      <Collapse :value="'1'" accordion>
        <Panel name="1">
          选项
          <div slot="content">
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

    <!-- 正文 -->

    <Row type="flex" justify="center" style="margin-top: 10px;">
      <i-col :md="12" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <div id="map">
            <chart-map style="height:600px;" :index="'score'"></chart-map>
          </div>
        </Card>
      </i-col>
    </Row>

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
              <img class="report" :src="win1" key="win1">
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
    <Row type="flex" justify="center">
      <i-col span="16">
        <Card>
          <div align="center" :style="height">
            <h2 align="left" style="padding-left:20px">{{reportText.title}} - 前言</h2>
            <Row type="flex" justify="center">
              <i-col span="18">
                <div align="left" style="font-size:18px">
                  <Row type="flex" justify="center">
                    <i-col span="10">
                      <Input
                        v-model="reportText.summary"
                        type="textarea"
                        rows="12"
                        placeholder="输入内容..."
                      />
                    </i-col>
                  </Row>
                </div>
              </i-col>
            </Row>
          </div>
        </Card>
      </i-col>
    </Row>
    <br>
    <Row type="flex" justify="center">
      <i-col span="16">
        <Card>
          <div align="center" :style="height">
            <h2 align="left" style="padding-left:20px">2019网络安全报告 - 图表</h2>
            <Row type="flex" justify="center">
              <i-col span="18">
                <br>
                <br>
                <br>
                <br>
                <br>
                <img class="report" :src="report1">
                <div align="left" style="font-size:18px">
                  <br>
                  <br>
                  <p>信息和通信技术（ICT）网络，设备和服务对于日常生活越来越重要。 2016年，全球几乎有一半使用互联网（35亿用户），据估计，到2020年将有超过120亿台机器对机器设备连接到互联网。 然而，就像在现实世界中一样，网络世界面临着各种可能造成巨大破坏的安全威胁。</p>
                  <br>
                  <p>有关计算机网络威胁的统计数据令人警醒，并反映出从过去相对真实的垃圾邮件转变为更恶意的威胁。 一家安全公司在2016年跟踪事件发现，恶意电子邮件成为各种网络攻击的首选武器，这些网络攻击在每年从国家赞助的网络间谍团体到大规模邮件勒索软件团伙使用。 发送的131封电子邮件是恶意的，是五年来最高的。</p>
                  <br>
                  <p>信息和通信技术（ICT）网络，设备和服务对于日常生活越来越重要。 2016年，全球几乎有一半使用互联网（35亿用户），据估计，到2020年将有超过120亿台机器对机器设备连接到互联网。 然而，就像在现实世界中一样，网络世界面临着各种可能造成巨大破坏的安全威胁。</p>
                </div>
              </i-col>
            </Row>
          </div>
        </Card>
      </i-col>
    </Row>
    <br>
    <Row type="flex" justify="center">
      <i-col span="16">
        <Card>
          <div align="center" :style="height">
            <h2 align="left" style="padding-left:20px">2019网络安全报告 - 图表</h2>
            <Row type="flex" justify="center">
              <i-col span="18">
                <br>
                <br>
                <br>
                <br>
                <br>
                <img class="report" :src="report2">
                <div align="left" style="font-size:18px">
                  <br>
                  <br>
                  <p>信息和通信技术（ICT）网络，设备和服务对于日常生活越来越重要。 2016年，全球几乎有一半使用互联网（35亿用户），据估计，到2020年将有超过120亿台机器对机器设备连接到互联网。 然而，就像在现实世界中一样，网络世界面临着各种可能造成巨大破坏的安全威胁。</p>
                  <br>
                  <p>有关计算机网络威胁的统计数据令人警醒，并反映出从过去相对真实的垃圾邮件转变为更恶意的威胁。 一家安全公司在2016年跟踪事件发现，恶意电子邮件成为各种网络攻击的首选武器，这些网络攻击在每年从国家赞助的网络间谍团体到大规模邮件勒索软件团伙使用。 发送的131封电子邮件是恶意的，是五年来最高的。</p>
                  <br>
                  <p>信息和通信技术（ICT）网络，设备和服务对于日常生活越来越重要。 2016年，全球几乎有一半使用互联网（35亿用户），据估计，到2020年将有超过120亿台机器对机器设备连接到互联网。 然而，就像在现实世界中一样，网络世界面临着各种可能造成巨大破坏的安全威胁。</p>
                </div>
              </i-col>
            </Row>
          </div>
        </Card>
      </i-col>
    </Row>
    <br>
    <Row type="flex" justify="center">
      <i-col span="16">
        <Card>
          <div align="center" :style="height">
            <h2 align="left" style="padding-left:20px">2019网络安全报告 - 图表</h2>
            <Row type="flex" justify="center">
              <i-col span="18">
                <br>
                <br>
                <br>
                <br>
                <br>
                <img class="report" :src="report3">
                <div align="left" style="font-size:18px">
                  <br>
                  <br>
                  <p>信息和通信技术（ICT）网络，设备和服务对于日常生活越来越重要。 2016年，全球几乎有一半使用互联网（35亿用户），据估计，到2020年将有超过120亿台机器对机器设备连接到互联网。 然而，就像在现实世界中一样，网络世界面临着各种可能造成巨大破坏的安全威胁。</p>
                  <br>
                  <p>有关计算机网络威胁的统计数据令人警醒，并反映出从过去相对真实的垃圾邮件转变为更恶意的威胁。 一家安全公司在2016年跟踪事件发现，恶意电子邮件成为各种网络攻击的首选武器，这些网络攻击在每年从国家赞助的网络间谍团体到大规模邮件勒索软件团伙使用。 发送的131封电子邮件是恶意的，是五年来最高的。</p>
                  <br>
                  <p>信息和通信技术（ICT）网络，设备和服务对于日常生活越来越重要。 2016年，全球几乎有一半使用互联网（35亿用户），据估计，到2020年将有超过120亿台机器对机器设备连接到互联网。 然而，就像在现实世界中一样，网络世界面临着各种可能造成巨大破坏的安全威胁。</p>
                </div>
              </i-col>
            </Row>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import win1 from "@/assets/images/win1.jpg";
import report1 from "@/assets/images/report1.jpg";
import report2 from "@/assets/images/report2.jpg";
import report3 from "@/assets/images/report3.jpg";
import report4 from "@/assets/images/report4.jpg";
import { Cbox, ChartMap } from "_c/charts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      win1,
      report1,
      report2,
      report3,
      report4,
      height: "height:1200px",
      reportText: {
        title: "",
        summary: "",
        map: "",
        table: ""
      }
    };
  },
  components: {
    ChartMap
  },
  mounted() {
    // this.drawFromHTML();
  },
  methods: {
    draw() {
      let pdfName = "test";
      var doc = new jsPDF();
      doc.text("Hello World", 10, 10);
      doc.save(pdfName + ".pdf");
    },
    drawFromHTML() {
      let pdfName = "test";
      var doc = new jsPDF({
        unit: "px",
        format: "a4"
      });
      var source = window.document.getElementById("map");
      console.log(source);
      doc.text("Hello World", 10, 10);

      html2canvas(source).then(canvas => {
        //返回图片dataURL，参数：图片格式和清晰度(0-1)
        var pageData = canvas.toDataURL("image/jpeg", 1.0);
        //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
        var pdf = new jsPDF("", "pt", "a4");
        //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
        pdf.addImage(
          pageData,
          "JPEG",
          0,
          0,
          595.28,
          (592.28 / canvas.width) * canvas.height
        );
        this.test();
        window.open(pdf.output("bloburl"));
        // pdf.save("stone.pdf");
      });

      // doc.fromHTML(
      //   source,
      //   15,
      //   15,
      //   {
      //     width: 180
      //   },
      //   () => doc.save("saveInCallback.pdf")
      // );
      // window.html2canvas = html2canvas;

      // doc.html(source, {
      //   callback: doc => window.open(doc.output("bloburl"))
      // });
    },
    reportDownload() {
      this.drawFromHTML();
    },
    test() {
      console.log("xx");
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

