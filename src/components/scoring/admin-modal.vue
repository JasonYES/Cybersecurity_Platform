<template>
  <Modal v-model="modalOn.country" title="Common Modal dialog box title">
    <Form :model="value" :label-width="80">
      <FormItem v-for="(field) in formFields" :key="field" :label="field">
        <Input v-model="value[field]" placeholder="Enter something..."/>
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
    modalOn: Object
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
    }
  },
  data() {
    return {
      open: true
    };
  },
  methods: {
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

