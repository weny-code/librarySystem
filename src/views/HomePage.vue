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
        <div class="text item" v-html="text.Notice" ></div>
        <el-button type="text" @click="dialogVisible = true">公告详情</el-button>
      </el-card>
    </div>
   <!--详情-->
    <el-dialog
  title="公告"
  :visible.sync="dialogVisible"
 class="details">
  
  <div  class="textcontent" v-html="textconent"></div> 
  <div style="height:40px"></div>

</el-dialog>

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
              console.log(res.data.content)               
              this.textconent=res.data.content;
                if(res.data.title===""){
                console.log("w")
              }
              else{
                   this.text.Notice=res.data.title;
              }
             
            })
            .catch(function (error) {
              console.log(error);
            });
  },
 data() {
   return{
     dialogVisible: false,
     textconent:"",
    text: {
        Notice:"公告标题"

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

  },

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
.textcontent{
  font-size: 1.2em;
  margin-top: -2em; 
  text-indent:2em;
   padding:20px 40px 10px
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
  font-size: 18px;
}

.item {
  padding: 0;
  text-align: center;
  
}

.box-card {
  width: 1000px;
  cursor: default;
   background-color: #fff;
}
.details{
text-align:left;
padding-bottom:100px;
}
</style>