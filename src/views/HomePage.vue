<template>
  <div class="main-container">
    <div class="theme-container">
      <div class="inner-img">
        <el-image
          :src="require('../assets/img/main.png')"
          class="theme-img"
        ></el-image>
      </div>
      <div class="desc">图书管理系统</div>
    </div>

    <div class="operation-container">
      <div class="login-item" v-on:click="loginSuccess()">
        <el-image
          :src="require('../assets/img/login.png')"
          class="login-img"
        ></el-image>
        <div class="desc">登录</div>
      </div>
      <div class="register-item" v-on:click="regiterSuccess()">
        <el-image
          :src="require('../assets/img/register.png')"
          class="login-img"
        ></el-image>
        <div class="desc">注册</div>
      </div>
    </div>

    <div class="notice-container">
      <el-card class="box-card">
        <div class="text item">IBM实训项目-图书管理系统</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  props: {},
  methods: {
    loginSuccess() {
      // this.$router.push("/UserPage");
      this.$router.push("/SignIn");
    },
    regiterSuccess() {
      // this.$router.push("/AdministratorPage");
      this.$router.push("/Register");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container {
  position: absolute;
  width: 100%;
}
.box-card {
  background-color: #c7faff;
}

.theme-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.notice-container {
  height: 100px;
  width: 100%;
  margin-top: 0px;
  display: flex;
  justify-content: center;
}

.inner-img {
  align-items: center;
}

.operation-container {
  display: flex;
  margin-top: 5%;
  width: 100%;
  height: 280px;
  justify-content: space-between;
}

.login-item {
  margin-left: 15%;
  width: 500px;
  transition: all 0.6s ease;
}

.login-item:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.register-item {
  margin-right: 15%;
  width: 400px;
  transition: all 0.6s ease;
}

.register-item:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.theme-img {
  width: 90%;
  height: 90%;
}

.login-img {
  width: 50%;
  height: 50%;
}

@font-face {
  font-family: "FZZhaoMFXSJF";
  src: url("../assets/font/FZZhaoMFXSJF.TTF");
}

@font-face {
  font-family: "FZQuSJW";
  src: url("../assets/font/FZQuSJW.TTF");
}

.theme-container .desc {
  display: inline-flex;
  font-family: "FZQuSJW";
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 10px;
  text-align: center;
  cursor: default;
}

.login-item .desc {
  font-family: "FZZhaoMFXSJF";
  font-size: 50px;
  font-weight: bold;
}

.register-item .desc {
  font-family: "FZZhaoMFXSJF";
  font-size: 50px;
  font-weight: bold;
  margin-top: 0px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
  text-align: center;
}

.box-card {
  width: 1000px;
  cursor: default;
}
</style>