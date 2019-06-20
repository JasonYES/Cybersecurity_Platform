<template>
  <div>
    <div class="user-avator-dropdown">
      <Dropdown @on-click="handleClick">
        <!-- <Badge :dot="!!messageUnreadCount">
          <Avatar :src="userAvator"/>
        </Badge>
        <Icon :size="18" type="md-arrow-dropdown"></Icon>-->
        <a href="javascript:void(0)">
          {{username}}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <!-- <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
          </DropdownItem>-->
          <DropdownItem name="password">修改密码</DropdownItem>
          <DropdownItem name="logout">退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <Modal v-model="modal" title="修改密码" @on-ok="modalSubmit" @on-cancel="modalCancel">
      <Form :model="form" :label-width="80">
        <FormItem label="输入密码">
          <Input type="password" v-model="form.password" placeholder="请输入..."/>
        </FormItem>
        <FormItem label="再次输入">
          <Input type="password" v-model="form.password2" placeholder="请输入..."/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import "./user.less";
import { mapActions, mapState } from "vuex";
import { password } from "@/api/user";
import md5 from "js-md5";
export default {
  name: "User",
  props: {
    userAvator: {
      type: String,
      default: ""
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      form: {
        password: "",
        password2: ""
      },
      modal: false
    };
  },
  computed: {
    ...mapState({
      username: state => state.user.userName
    })
  },
  methods: {
    ...mapActions(["handleLogOut"]),
    logout() {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: "login"
        });
      });
    },
    message() {
      this.$router.push({
        name: "message_page"
      });
    },
    password() {
      this.modal = true;
    },
    handleClick(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "message":
          this.message();
          break;
        case "password":
          this.password();
          break;
      }
    },
    modalSubmit() {
      if (this.form.password == "" || this.form.password2 == "") {
        alert("密码不能为空");
        return;
      }
      if (this.form.password != this.form.password2) {
        alert("两次输入密码不一致");
        return;
      }
      if (this.form.password.length < 6) {
        alert("密码不能小于6位");
        return;
      }
      password({
        password: md5(this.form.password)
      })
        .then(res => {
          if (res.data.code == 0) {
            alert("修改成功, 请重新登录.");
            // 重新登录
            this.handleLogOut().then(() => {
              this.$router.push({
                name: "login"
              });
            });
          }
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
      // this.form.password = "";
      // this.form.password2 = "";
    },
    modalCancel() {
      this.form.password = "";
      this.form.password2 = "";
    }
  }
};
</script>
