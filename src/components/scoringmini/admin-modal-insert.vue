<template>
  <div>
    <Modal v-if="country.modalShow" v-model="modalOn.on" title="信息新建" @on-ok="modalOK" ok-text="保存">
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
    <Modal v-if="index.modalShow" v-model="modalOn.on" title="信息新建" @on-ok="modalOK" ok-text="保存">
      <Form :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :label="field">
          <template>
            <Input v-model="value[field]"/>
          </template>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
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
      for (var i in this.formFormatter.fieldsHidden) {
        delete valueCopy[this.formFormatter.fieldsHidden[i]];
      }
      var fields = Object.keys(valueCopy);
      return fields;
    }
  },
  data() {
    return {
      dataTemplate: {
        country: {
          country: "",
          id: "",
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
        index1: { id: "", name: "", nickname: "", weight: "", other: "" },
        index23: {
          id: "",
          name: "",
          nickname: "",
          weight: "",
          other: "",
          pid: 0
        }
      },
      formFormatter: {
        fieldsHidden: [],
        fieldsDisable: new Set()
      },
      country: {
        modalShow: false,
        continents: ["asia", "america", "africa", "europe"]
      },
      index: {
        modalShow: false
      },
      api: ""
    };
  },
  methods: {
    initTypeData(type) {
      switch (type) {
        case "country":
          this.value = dataTemplate["country"];
          this.country.modalShow = true;
          break;
        case "index1":
          this.value = dataTemplate["index1"];
          this.index.modalShow = true;
          break;
        case "index2":
          this.value = dataTemplate["index23"];
          this.index.modalShow = true;
          break;
        case "index3":
          this.value = dataTemplate["index23"];
          this.index.modalShow = true;
          break;
      }
    },
    modalOK() {}
  }
};
</script>

