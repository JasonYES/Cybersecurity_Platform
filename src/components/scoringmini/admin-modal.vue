<template>
  <div>
    <Modal v-if="country.modalShow" v-model="modalOn.on" title="信息修改" @on-ok="modalOK" ok-text="保存">
      <Form ref="country" :rules="validateRules.country" :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :prop="field" :label="vname[field]">
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
      <Form ref="index" :rules="validateRules.index" :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :prop="field" :label="vname[field]">
          <template v-if="field === 'weight'">
            <Input number v-model="value[field]" :disabled="formDisable(field)"/>
          </template>
          <template v-else>
            <Input v-model="value[field]" :disabled="formDisable(field)"/>
          </template>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-if="orgs.modalShow" v-model="modalOn.on" title="信息修改" @on-ok="modalOK" ok-text="保存">
      <Form ref="orgs" :rules="validateRules.orgs" :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :prop="field" :label="vname[field]">
          <template v-if="field === 'countries'">
            <Select v-model="value[field]" filterable multiple>
              <Option
                v-for="item in orgs.countries"
                :value="item.name"
                :key="item.id"
              >{{item.nickname}}</Option>
            </Select>
          </template>
          <template v-else>
            <Input v-model="value[field]" placeholder="Enter something..."/>
          </template>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-if="users.modalShow" v-model="modalOn.on" title="信息修改" @on-ok="modalOK" ok-text="保存">
      <Form
        ref="users"
        :rules="validateRules.users"
        :model="value"
        :label-width="80"
        style="margin-bottom: 8px;"
      >
        <FormItem v-for="(field) in formFields" :key="field" :prop="field" :label="vname[field]">
          <template v-if="field === 'role'">
            <Select v-model="value[field]" style="width:200px">
              <Option v-for="item in users.roles" :value="item" :key="item">{{num2role[item]}}</Option>
            </Select>
          </template>
          <template v-else>
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
                :label="vname[field]"
              >
                <template>
                  <Input type="password" v-model="value[field]" placeholder="不修改密码则无需输入"/>
                </template>
              </FormItem>
            </div>
          </Panel>
        </Collapse>
      </Form>
    </Modal>
    <Modal v-if="sets.modalShow" v-model="modalOn.on" title="信息修改" @on-ok="modalOK" ok-text="保存">
      <Form ref="sets" :rules="validateRules.sets" :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :prop="field" :label="vname[field]">
          <template v-if="field === 'countries'">
            <Select v-model="value[field]" filterable multiple>
              <Option
                v-for="item in orgs.countries"
                :value="item.nickname"
                :key="item.id"
              >{{item.nickname}}</Option>
            </Select>
          </template>
          <template v-else>
            <Input v-model="value[field]" placeholder="Enter something..."/>
          </template>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import tmpData from "@/store/module/tmp-data";
import { vname, continents, num2role, roleNums } from "@/config/properties";
import { postSets, postOrgs, postUsers, postCountry } from "@/api/admin";
import { postIndex3, postIndex2, postIndex1 } from "@/api/admin";
import { getCountry } from "@/api/admin";
import md5 from "js-md5";
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
      vname,
      num2role,
      formFormatter: {
        fieldsHidden: [],
        fieldsDisable: new Set(),
        fieldsInsert: {}
      },
      country: {
        modalShow: false,
        continents: continents
      },
      index: {
        modalShow: false
      },
      orgs: {
        modalShow: false,
        countries: []
      },
      users: {
        modalShow: false,
        roles: roleNums
      },
      sets: {
        modalShow: false
      },
      api: "",
      validateRules: {
        country: {
          name: [{ required: true, message: "不能为空", trigger: "blur" }],
          nickname: [{ required: true, message: "不能为空", trigger: "blur" }],
          continent: [{ required: true, message: "不能为空", trigger: "change" }],
          est: "",
          language: "",
          capital: "",
          population: "",
          area: "",
          economy: "",
          other: ""
        },
        index: {
          name: [{ required: true, message: "不能为空", trigger: "blur" }],
          nickname: [{ required: true, message: "不能为空", trigger: "blur" }],
          weight: [
            {
              required: true,
              message: "不能为空 / 只能为数字",
              trigger: "blur",
              type: "number"
            }
          ]
        },
        orgs: {
          name: [{ required: true, message: "不能为空", trigger: "blur" }],
          nickname: [{ required: true, message: "不能为空", trigger: "blur" }],
          type: "",
          countries: []
        },
        users: {
          name: [{ required: true, message: "不能为空", trigger: "blur" }],
          nickname: [{ required: true, message: "不能为空", trigger: "blur" }],
          role: [
            {
              required: true,
              message: "不能为空",
              trigger: "change",
              type: "number"
            }
          ]
        },
        sets: {
          name: [{ required: true, message: "不能为空", trigger: "blur" }]
        }
      }
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
          this.formFormatter.fieldsDisable = new Set(["name1", "nickname1", "parent"]);
          break;
        case "index3":
          this.index.modalShow = true;
          this.formFormatter.fieldsHidden = ["id", "id1", "id2"];
          this.formFormatter.fieldsDisable = new Set(["name1", "nickname1", "name2", "nickname2", "parent"]);
          break;
        case "orgs":
          this.orgs.modalShow = true;
          this.formFormatter.fieldsHidden = ["id"];
          getCountry(0, 300, "") // 这里有magic number, 只适用于一级指标不多于300的情况, 否则得改.
            .then(res => {
              if (res.data.code == 0) {
                var data = res.data.data;
                this.orgs.countries = data.countries;
              } else {
                alert("错误! " + res.data.msg);
              }
            })
            .catch(err => {
              alert("错误! " + err);
            });
          break;
        case "users":
          this.users.modalShow = true;
          this.formFormatter.fieldsHidden = ["id", "password", "password2", "adminValidate"];
          this.formFormatter.fieldsInsert = {
            password: "",
            password2: ""
            // adminValidate: ""
          };
          break;
        case "sets":
          this.sets.modalShow = true;
          this.formFormatter.fieldsHidden = ["id", "isactive", "date"];
          break;
      }
    },
    formDisable(field) {
      if (this.formFormatter.fieldsDisable.has(field)) {
        return true;
      }
      return false;
    },
    modalOK() {
      let postData;
      switch (this.type) {
        case "country":
          this.$refs[this.type].validate(valid => {
            if (valid) {
              postCountry(this.value)
                .then(res => {
                  if (res.data.code == 0) {
                    this.$emit("refresh");
                  } else {
                    alert("错误!" + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误!" + err);
                });
            } else {
              this.$Message.error("错误! 表单填写不规范!");
            }
          });
          break;
        case "index1":
          //  注意这里 index 是三级指标公用的
          postData = { ...this.value };
          delete postData["parent"]; // 删掉parent
          this.$refs["index"].validate(valid => {
            if (valid) {
              postIndex1(postData)
                .then(res => {
                  if (res.data.code == 0) {
                    this.$emit("refresh");
                  } else {
                    alert("错误!" + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误!" + err);
                });
            } else {
              this.$Message.error("错误! 表单填写不规范!");
            }
          });
          break;
        case "index2":
          postData = {
            id: this.value.id,
            name: this.value.name
          };
          this.$refs["index"].validate(valid => {
            if (valid) {
              postIndex2(this.value)
                .then(res => {
                  if (res.data.code == 0) {
                    this.$emit("refresh");
                  } else {
                    alert("错误!" + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误!" + err);
                });
            } else {
              this.$Message.error("错误! 表单填写不规范!");
            }
          });
          break;
        case "index3":
          postData = {
            id: this.value.id,
            name: this.value.name
          };
          this.$refs["index"].validate(valid => {
            if (valid) {
              postIndex3(this.value)
                .then(res => {
                  if (res.data.code == 0) {
                    this.$emit("refresh");
                  } else {
                    alert("错误!" + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误!" + err);
                });
            } else {
              this.$Message.error("错误! 表单填写不规范!");
            }
          });
          break;
        case "orgs":
          postData = {
            id: this.value.id,
            name: this.value.name
          };
          this.$refs[this.type].validate(valid => {
            if (valid) {
              postOrgs(this.value)
                .then(res => {
                  if (res.data.code == 0) {
                    this.$emit("refresh");
                  } else {
                    alert("错误!" + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误!" + err);
                });
            } else {
              this.$Message.error("错误! 表单填写不规范!");
            }
          });
          break;
        case "users":
          postData = {
            id: this.value.id,
            name: this.value.name,
            nickname: this.value.nickname,
            role: this.value.role
          };
          if (this.value.password != "") {
            if (this.value.password != this.value.password2) {
              alert("错误!" + "两次密码输入不一致!");
              return;
            }
            postData["password"] = md5(this.value.password);
          }
          this.$refs[this.type].validate(valid => {
            if (valid) {
              postUsers(postData)
                .then(res => {
                  if (res.data.code == 0) {
                    this.$emit("refresh");
                  } else {
                    alert("错误!" + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误!" + err);
                });
            } else {
              this.$Message.error("错误! 表单填写不规范!");
            }
          });
          break;
        case "sets":
          postData = {
            id: this.value.id,
            name: this.value.name
          };
          this.$refs[this.type].validate(valid => {
            if (valid) {
              postSets(postData)
                .then(res => {
                  if (res.data.code == 0) {
                    this.$emit("refresh");
                  } else {
                    alert("错误!" + res.data.msg);
                  }
                })
                .catch(err => {
                  alert("错误!" + err);
                });
            } else {
              this.$Message.error("错误! 表单填写不规范!");
            }
          });
          break;
      }
    }
  }
};
</script>

