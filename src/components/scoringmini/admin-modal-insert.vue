<template>
  <div>
    <Modal v-if="country.modalShow" v-model="modalOn.new" title="新建" @on-ok="modalOK" ok-text="保存">
      <Form :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :label="field">
          <template v-if="field === 'continent'">
            <Select v-model="value[field]" style="width:200px">
              <Option v-for="item in country.continents" :value="item" :key="item">{{item}}</Option>
            </Select>
          </template>
          <template v-else>
            <Input v-model="value[field]" placeholder="Enter something..."/>
          </template>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-if="index1.modalShow" v-model="modalOn.new" title="新建" @on-ok="modalOK" ok-text="保存">
      <Form :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :label="field">
          <template>
            <Input v-model="value[field]"/>
          </template>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-if="index2.modalShow" v-model="modalOn.new" title="新建" @on-ok="modalOK" ok-text="保存">
      <Form :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :label="field">
          <template v-if="field === 'pid'">
            <Select v-model="value[field]" style="width:200px">
              <Option
                v-for="index in index2.index1Selector"
                :value="index['id']"
                :key="index['id']"
              >{{index['nickname']}}</Option>
            </Select>
          </template>
          <template v-else>
            <Input v-model="value[field]"/>
          </template>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-if="index3.modalShow" v-model="modalOn.new" title="新建" @on-ok="modalOK" ok-text="保存">
      <Form :model="value" :label-width="80">
        <FormItem label="index1">
          <Select @on-query-change="index3SelectorHelper" style="width:200px">
            <Option
              v-for="index in index3.index1Selector"
              :value="index['id']"
              :key="index['id']"
            >{{index['nickname']}}</Option>
          </Select>
        </FormItem>
        <FormItem v-for="(field) in formFields" :key="field" :label="field">
          <template v-if="field === 'pid'">
            <Select v-model="value[field]" style="width:200px">
              <Option
                v-for="index in index3.index2Selector"
                :value="index['id']"
                :key="index['id']"
              >{{index['nickname']}}</Option>
            </Select>
          </template>
          <template v-else>
            <Input v-model="value[field]"/>
          </template>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import tmpData from "@/store/module/tmp-data";
export default {
  name: "AdminModal",
  props: {
    type: String,
    modalOn: Object
  },
  mounted() {
    this.initTypeData(this.type);
  },
  computed: {
    formFields: function() {
      var valueCopy = { ...this.value };
      var fields = Object.keys(valueCopy);
      return fields;
    }
  },
  data() {
    return {
      dataTemplate: {
        country: {
          country: "",
          name: "",
          nickname: "",
          continent: "",
          est: "",
          language: "",
          capital: "",
          population: "",
          area: "",
          economy: "",
          other: ""
        },
        index1: { name: "", nickname: "", weight: "", other: "" },
        index2: {
          pid: 0,
          name: "",
          nickname: "",
          weight: "",
          other: ""
        },
        index3: {
          pid: 0,
          name: "",
          nickname: "",
          weight: "",
          other: ""
        }
      },
      country: {
        modalShow: false,
        continents: ["asia", "america", "africa", "europe"]
      },
      index1: {
        modalShow: false
      },
      index2: {
        modalShow: false,
        index1Selector: []
      },
      index3: {
        modalShow: false,
        index1Selector: [],
        index2Selector: [],
        index2SelectorOrigin: []
      },
      api: ""
    };
  },
  methods: {
    initTypeData(type) {
      switch (type) {
        case "country":
          this.value = this.dataTemplate["country"];
          this.country.modalShow = true;
          break;
        case "index1":
          this.value = this.dataTemplate["index1"];
          this.index1.modalShow = true;
          break;
        case "index2":
          this.value = this.dataTemplate["index2"];
          this.index2.modalShow = true;
          this.index2.index1Selector = tmpData["dbindex1"];
          break;
        case "index3":
          this.value = this.dataTemplate["index3"];
          this.index3.modalShow = true;
          this.index3.index1Selector = tmpData["dbindex1"];
          this.index3.index2Selector = [];
          this.index3.index2SelectorOrigin = tmpData["dbindex2"];
          break;
      }
    },
    index3SelectorHelper(chosen) {
      console.log(chosen);
      this.index3.index2Selector = [];
      this.dataTemplate.index3.pid = "";
      var origin = this.index3.index2SelectorOrigin;
      for (var i in origin) {
        if (origin[i]["nickname1"] === chosen) {
          this.index3.index2Selector.push({ ...origin[i] });
        }
      }
    },
    modalOK() {}
  }
};
</script>

