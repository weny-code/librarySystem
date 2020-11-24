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
        <!--<input type="text" class="text item" v-model="text.Notice" >-->
        <div class="text item" >{{text.Notice}}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",

  created(){
    // this.getParams()
    this.$axios({
            method: "get",
            url: "/showAnnouncement",
          })
            .then((res) => {
              console.log(res);
              this.text.Notice=res.data;
            })
            .catch(function (error) {
              console.log(error);
            });
  },
 data() {
   return{
    text: {
        Notice:"图书管理系统"
     }
     
   }
 },
  
  props: {
     
     },
  methods: {
    loginSuccess() {
      // this.$router.push("/UserPage");
      this.$router.push("/SignIn");
    },
    regiterSuccess() {
      // this.$router.push("/AdministratorPage");
      this.$router.push("/Register");
    },
  getParams () {
    // 取到路由带过来的参数
    var routerParams = this.$route.params.Notice
    // 将数据放在当前组件的数据内
    this.Notice = routerParams
}
  },
  watch: {
    '$route': 'getParams'// 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #c6ddff;
}
.box-card {
  background-color: #c7faff;
}

.theme-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  width: 100%;
}

.notice-container {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.inner-img {
  display: inline-flex;
  width: 400px;
  height: 300px;
  align-items: center;
}

.operation-container {
  display: flex;
  margin-top: 5%;
  width: 100%;
  height: 260px;
  justify-content: space-between;
}

.login-item {
  width: 350px;
  height: 200px;
  margin-left: 20%;
  transition: all 0.6s ease;
}

.login-item:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.register-item {
  width: 280px;
  height: 280px;
  margin-right: 20%;
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
  font-size: 25px;
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