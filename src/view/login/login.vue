<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import { mapActions } from "vuex";
import { setToken, getToken } from "@/libs/util";
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["handleLogin", "getUserCacheInfo"]),
    handleSubmit({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        if (res.data.code == 0) {
          // 登录成功
          var role = res.data.data.role;
          setToken(role);
          this.getUserCacheInfo();
          // 跳转首页
          this.$router.push({
            name: this.$config.homeName
          });
        } else {
          // 登录失败
          var role = "0";
          setToken("");
          this.$Message.error("登录失败" + res.data.msg);
        }
      });
    }
  }
};
</script>

<style>
</style>
