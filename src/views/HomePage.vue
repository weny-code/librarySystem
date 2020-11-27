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
          <!--<input type="text" class="text item" v-model="text.Notice" >-->
          <div class="text item" v-html="text.Notice"></div>
          <el-button type="text" @click="dialogVisible = true"
            >公告详情</el-button
          >
        </el-card>
      </div>
      <!--提示框-->
      <el-dialog title="公告" :visible.sync="dialogVisible" class="details">
        <div class="textcontent" v-html="textconent"></div>
        <div style="height: 40px"></div>
      </el-dialog>
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
        console.log(res);
        console.log(res.data.content);
        this.textconent = res.data.content;
        if (res.data.title === "") {
          console.log("w");
        } else {
          this.text.Notice = res.data.title;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  data() {
    return {
      dialogVisible: false,
      textconent: "",
      text: {
        Notice: "公告标题",
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
  margin-top: 80px;
  justify-content: center;
}

.operation-container {
  display: flex;
  margin-top: 50px;
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
  margin-top: -20px;
  transition: all 0.6s ease;
}
.textcontent {
  font-size: 1.2em;
  margin-top: -2em;
  text-indent: 2em;
  padding: 20px 40px 10px;
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
  background-color: #ffffff;
}
.details {
  text-align: left;
  padding-bottom: 100px;
}
</style>