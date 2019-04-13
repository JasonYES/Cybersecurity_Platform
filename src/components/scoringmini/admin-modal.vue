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
          <template v-if="field === 'countries'">
            <Select v-model="value[field]" filterable multiple>
              <Option
                v-for="item in orgs.countries"
                :value="item.country"
                :key="item.id"
              >{{item.country}}</Option>
            </Select>
          </template>
          <template v-else>
            <Input v-model="value[field]" placeholder="Enter something..."/>
          </template>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-if="users.modalShow" v-model="modalOn.on" title="信息修改" @on-ok="modalOK" ok-text="保存">
      <Form :model="value" :label-width="80" style="margin-bottom: 8px;">
        <FormItem v-for="(field) in formFields" :key="field" :label="field">
          <template>
            <Input v-model="value[field]" placeholder="Enter something..."/>
          </template>
        </FormItem>
        <Collapse simple>
          <Panel name="1">
            修改密码
            <div slot="content" style="margin-top: 20px;">
              <FormItem
                v-for="(field) in Object.keys(formFormatter.fieldsInsert)"
                :key="field"
                :label="field"
              >
                <template>
                  <Input v-model="value[field]" placeholder="不修改密码则无需输入"/>
                </template>
              </FormItem>
            </div>
          </Panel>
        </Collapse>
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
    value: Object, // 要修改的某行数据
    modalOn: Object
  },
  mounted() {
    this.initTypeData(this.type);
  },
  computed: {
    formFields: function() {
      for (var i in this.formFormatter.fieldsInsert) {
        // 每次都会board选中一行, value都会被赋值一次, 触发更新
        this.value[i] = this.formFormatter.fieldsInsert[i];
      }
      var valueCopy = { ...this.value };
      // this.valueBackup = { ...this.value }; // 进行值的备份, 使modal框cancel后数据复原
      for (var i in this.formFormatter.fieldsHidden) {
        delete valueCopy[this.formFormatter.fieldsHidden[i]];
      }
      var fields = Object.keys(valueCopy);
      return fields;
    }
  },
  data() {
    return {
      // valueBackup: {},
      formFormatter: {
        fieldsHidden: [],
        fieldsDisable: new Set(),
        fieldsInsert: {}
      },
      country: {
        modalShow: false,
        continents: ["asia", "america", "africa", "europe"]
      },
      index: {
        modalShow: false
      },
      orgs: {
        modalShow: false,
        countries: []
      },
      users: {
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
          this.formFormatter.fieldsHidden = ["id"];
          this.orgs.countries = tmpData["dbcountries"];
          break;
        case "users":
          this.users.modalShow = true;
          this.formFormatter.fieldsHidden = [
            "id",
            "password",
            "password2",
            "adminValidate"
          ];
          this.formFormatter.fieldsInsert = {
            password: "",
            password2: "",
            adminValidate: ""
          };
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

