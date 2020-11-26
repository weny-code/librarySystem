<template>
  <el-container>
    <el-main>
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
            class="register-img"
          ></el-image>
          <div class="desc">注册</div>
        </div>
      </div>
      <div class="notice-container">
        <el-card class="box-card">
          <div class="text item">{{ text.Notice }}</div>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "HomePage",
  created() {
    // this.getParams()
    this.$axios({
      method: "get",
      url: "/showAnnouncement",
    })
      .then((res) => {
        console.log(res.data);
        this.text.Notice = res.data.content;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  data() {
    return {
      text: {
        Notice: "图书管理系统",
      },
    };
  },
  props: {},
  methods: {
    loginSuccess() {
      this.$router.push("/SignIn");
    },
    regiterSuccess() {
      this.$router.push("/Register");
    },
    getParams() {
      // 取到路由带过来的参数
      var routerParams = this.$route.params.Notice;
      // 将数据放在当前组件的数据内
      this.Notice = routerParams;
    },
  },
  watch: {
    $route: "getParams", // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-main {
  color: #333;
  text-align: center;
  padding: 0px;
  /* line-height: 200px; */
}

body > .el-container {
  margin: 0;
  padding: 0;
  width: 100%;
}

.theme-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
}

.notice-container {
  height: 100px;
  width: 100%;
  display: flex;
  margin-top: 50px;
  justify-content: center;
}

.operation-container {
  display: flex;
  margin-top: 5%;
  justify-content: space-around;
}

.login-item {
  width: 300px;
  height: 200px;
  transition: all 0.6s ease;
}

.login-item:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.register-item {
  width: 250px;
  height: 200px;
  margin-top: -30px;
  transition: all 0.6s ease;
}

.register-item:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.theme-img {
  width: auto;
  height: auto;
}

.login-img {
  width: 80%;
  height: 80%;
}
.register-img {
  width: 100%;
  height: 100%;
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
  left: 0;
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
  margin-top: -30px;
}

.text {
  font-size: 18px;
}

.item {
  padding: 0;
  text-align: center;
}

.box-card {
  width: 1000px;
  cursor: default;
  background-color: #c7faff;
}
</style>