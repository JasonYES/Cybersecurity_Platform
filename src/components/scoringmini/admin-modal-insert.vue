<template>
  <div>
    <Modal
      v-if="type=='country'"
      v-model="modalOn.new"
      title="新建"
      @on-ok="modalOK"
      @on-cancel="modalCancel"
      ok-text="保存"
    >
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
    <Modal
      v-if="type=='index1'"
      v-model="modalOn.new"
      title="新建"
      @on-ok="modalOK"
      @on-cancel="modalCancel"
      ok-text="保存"
    >
      <Form ref="index1" :rules="validateRules.index1" :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :prop="field" :label="vname[field]">
          <template>
            <Input v-model="value[field]"/>
          </template>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-if="type=='index2'"
      v-model="modalOn.new"
      title="新建"
      @on-ok="modalOK"
      @on-cancel="modalCancel"
      ok-text="保存"
    >
      <Form ref="index2" :rules="validateRules.index2" :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :prop="field" :label="vname[field]">
          <template v-if="field === 'parent'">
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
    <Modal
      v-if="type=='index3'"
      v-model="modalOn.new"
      title="新建"
      @on-ok="modalOK"
      @on-cancel="modalCancel"
      ok-text="保存"
    >
      <Form ref="index3" :rules="validateRules.index3" :model="value" :label-width="80">
        <FormItem label="一级指标">
          <Select @on-query-change="index3SelectorHelper" style="width:200px">
            <Option
              v-for="index in index3.index1Selector"
              :value="index['id']"
              :key="index['id']"
            >{{index['nickname']}}</Option>
          </Select>
        </FormItem>
        <FormItem v-for="(field) in formFields" :key="field" :prop="field" :label="vname[field]">
          <template v-if="field === 'parent'">
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
    <Modal
      v-if="type=='orgs'"
      v-model="modalOn.new"
      title="新建"
      @on-ok="modalOK"
      @on-cancel="modalCancel"
      ok-text="保存"
    >
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
    <Modal
      v-if="type=='users'"
      v-model="modalOn.new"
      title="新建"
      @on-ok="modalOK"
      @on-cancel="modalCancel"
      ok-text="保存"
    >
      <Form ref="users" :rules="validateRules.users" :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :prop="field" :label="vname[field]">
          <template v-if="field === 'role'">
            <Select v-model="value[field]" style="width:200px">
              <Option v-for="item in users.roles" :value="item" :key="item">{{num2role[item]}}</Option>
            </Select>
          </template>
          <template v-else>
            <Input v-model="value[field]"/>
          </template>
        </FormItem>
      </Form>
    </Modal>

    <Modal
      v-if="type=='sets'"
      v-model="modalOn.new"
      title="新建"
      @on-ok="modalOK"
      @on-cancel="modalCancel"
      ok-text="保存"
    >
      <Form ref="sets" :rules="validateRules.sets" :model="value" :label-width="80">
        <FormItem v-for="(field) in formFields" :key="field" :prop="field" :label="vname[field]">
          <template>
            <Input v-model="value[field]"/>
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
import { getIndex3, getIndex2, getIndex1 } from "@/api/admin";
import { getSets, getOrgs, getUsers, getCountry } from "@/api/admin";
export default {
  name: "AdminModalInsert",
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
      vname,
      num2role,
      value: {},
      dataTemplate: {
        country: {
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
          parent: 0,
          name: "",
          nickname: "",
          weight: "",
          other: ""
        },
        index3: {
          parent: 0,
          name: "",
          nickname: "",
          weight: "",
          other: ""
        },
        orgs: {
          name: "",
          nickname: "",
          type: "",
          countries: []
        },
        users: {
          name: "",
          nickname: "",
          role: "",
          password: "",
          password2: ""
        },
        sets: {
          name: ""
        }
      },
      validateRules: {
        country: {
          name: [{ required: true, message: "不能为空", trigger: "blur" }],
          nickname: [{ required: true, message: "不能为空", trigger: "blur" }],
          continent: [
            { required: true, message: "不能为空", trigger: "change" }
          ],
          est: "",
          language: "",
          capital: "",
          population: "",
          area: "",
          economy: "",
          other: ""
        },
        index1: {
          name: [{ required: true, message: "不能为空", trigger: "blur" }],
          nickname: [{ required: true, message: "不能为空", trigger: "blur" }],
          weight: [{ required: true, message: "不能为空", trigger: "blur" }],
          other: ""
        },
        index2: {
          parent: 0,
          name: [{ required: true, message: "不能为空", trigger: "blur" }],
          nickname: [{ required: true, message: "不能为空", trigger: "blur" }],
          weight: [{ required: true, message: "不能为空", trigger: "blur" }],
          other: ""
        },
        index3: {
          parent: 0,
          name: [{ required: true, message: "不能为空", trigger: "blur" }],
          nickname: [{ required: true, message: "不能为空", trigger: "blur" }],
          weight: [{ required: true, message: "不能为空", trigger: "blur" }],
          other: ""
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
          ],
          password: [{ required: true, message: "不能为空", trigger: "blur" }],
          password2: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        sets: {
          name: [{ required: true, message: "不能为空", trigger: "blur" }]
        }
      },
      country: {
        continents: continents
      },
      index2: {
        index1Selector: []
      },
      index3: {
        index1Selector: [],
        index2Selector: [],
        index2SelectorOrigin: []
      },
      orgs: {
        countries: []
      },
      users: {
        roles: roleNums
      },
      api: ""
    };
  },
  methods: {
    initTypeData(type) {
      this.value = { ...this.dataTemplate[type] };
      switch (type) {
        case "country":
          break;
        case "index1":
          break;
        case "index2":
          getIndex1(0, 100, "")
            .then(res => {
              if (res.data.code == 0) {
                var data = res.data.data;
                this.index2.index1Selector = data.indexs;
              } else {
                alert("错误! " + res.data.msg);
              }
            })
            .catch(err => {
              alert("错误! " + err);
            });
          break;
        case "index3":
          getIndex1(0, 100, "") // 这里有magic number, 只适用于一级指标不多于100的情况, 否则得改.
            .then(res => {
              if (res.data.code == 0) {
                var data = res.data.data;
                this.index3.index1Selector = data.indexs;
              } else {
                alert("错误! " + res.data.msg);
              }
            })
            .catch(err => {
              alert("错误! " + err);
            });
          this.index3.index2Selector = [];
          getIndex2(0, 200, "") // 这里有magic number, 只适用于一级指标不多于200的情况, 否则得改.
            .then(res => {
              if (res.data.code == 0) {
                var data = res.data.data;
                this.index3.index2SelectorOrigin = data.index2List;
              } else {
                alert("错误! " + res.data.msg);
              }
            })
            .catch(err => {
              alert("错误! " + err);
            });
          break;
        case "orgs":
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
          break;
      }
    },
    index3SelectorHelper(chosen) {
      this.index3.index2Selector = [];
      this.dataTemplate.index3.parent = "";
      var origin = this.index3.index2SelectorOrigin;
      for (var i in origin) {
        if (origin[i]["nickname1"] === chosen) {
          this.index3.index2Selector.push({ ...origin[i] });
        }
      }
    },
    // 提交的统一处理接口
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
          this.$refs[this.type].validate(valid => {
            if (valid) {
              postIndex1(this.value)
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
          this.$refs[this.type].validate(valid => {
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
          this.$refs[this.type].validate(valid => {
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
          postData = { ...this.value };
          delete postData["password2"];
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
          this.$refs[this.type].validate(valid => {
            if (valid) {
              postSets(this.value)
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
    },
    modalCancel() {
      this.value = { ...this.dataTemplate[this.type] };
    }
  }
};
</script>

