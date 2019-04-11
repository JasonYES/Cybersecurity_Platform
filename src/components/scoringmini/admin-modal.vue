<template>
  <div>
    <Modal v-if="country.modalShow" v-model="modalOn.on" title="信息修改" @on-ok="modalOK" ok-text="保存">
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
    <Modal v-if="index.modalShow" v-model="modalOn.on" title="信息修改" @on-ok="modalOK" ok-text="保存">
      <Form :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :label="field">
          <template>
            <Input v-model="value[field]" :disabled="formDisable(field)"/>
          </template>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-if="orgs.modalShow" v-model="modalOn.on" title="信息修改" @on-ok="modalOK" ok-text="保存">
      <Form :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :label="field">
          <!-- 放上多选的选择框 20190411-->
          <template>
            <Input v-model="value[field]" placeholder="Enter something..."/>
          </template>
        </FormItem>
      </Form>
      <Divider/>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "AdminModal",
  props: {
    type: String,
    value: Object, // 要修改的某行数据
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
      orgs: {
        modalShow: false
      },
      api: ""
    };
  },
  methods: {
    initTypeData(type) {
      switch (type) {
        case "country":
          this.country.modalShow = true;
          this.formFormatter.fieldsHidden = ["id"];
          break;
        case "index1":
          this.index.modalShow = true;
          this.formFormatter.fieldsHidden = ["id"];
          break;
        case "index2":
          this.index.modalShow = true;
          this.formFormatter.fieldsHidden = ["id", "id1"];
          this.formFormatter.fieldsDisable = new Set(["name1", "nickname1"]);
          break;
        case "index3":
          this.index.modalShow = true;
          this.formFormatter.fieldsHidden = ["id", "id1", "id2"];
          this.formFormatter.fieldsDisable = new Set([
            "name1",
            "nickname1",
            "name2",
            "nickname2"
          ]);
          break;
        case "orgs":
          this.orgs.modalShow = true;
          this.formFormatter.fieldsHidden = ["id", "countries"];
          break;
      }
    },
    formDisable(field) {
      if (this.formFormatter.fieldsDisable.has(field)) {
        return true;
      }
      return false;
    },
    modalOK() {}
  }
};
</script>

