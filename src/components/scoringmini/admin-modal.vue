<template>
  <Modal v-if="type==='country'" v-model="modalOn" title="信息修改" @on-ok="modalOK" ok-text="保存">
    <Form :model="value" :label-width="80">
      <FormItem v-for="(field) in formFields" :key="field" :label="field">
        <template v-if="field === 'continent'">
          <Select v-model="value[field]" style="width:200px">
            <Option v-for="item in continents" :value="item" :key="item">{{item}}</Option>
          </Select>
        </template>
        <template v-else>
          <Input v-model="value[field]" placeholder="Enter something..."/>
        </template>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
export default {
  name: "AdminModal",
  props: {
    type: String,
    value: Object, // 要修改的某行数据
    modalOn: Boolean
  },
  computed: {
    // formValue: function() {
    //   this.formValueFilter(this.value);
    // },
    formFields: function() {
      var valueCopy = { ...this.value };
      delete valueCopy["id"];
      var fields = Object.keys(valueCopy);
      return fields;
    },
    modalSwitch: function() {
      return {};
    }
  },
  data() {
    return {
      continents: ["asia", "america", "africa", "europe"]
    };
  },
  methods: {
    modalOK() {}
    // formValueFilter(value) {
    //   var formValue = {...value};
    //   delete formValue["id"];
    //   return formValue;
    // }
    // modalControl() {
    //   // switch(this.type) {
    //   //     case 'country': bra
    //   // }
    //   return true;
    // }
  }
};
</script>

