<template>
  <div class="about">
  <div class="desc">GBA图书馆管理系统</div>
     <el-button type="primary" icon="el-icon-arrow-left" @click="backHome()" class="siginReturn">返回</el-button>
    <section class="form_container">
      <el-form
        :model="signIn"
        :rules="rules"
        class="signInForm"
        ref="signInForm"
        label-width="100px"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="signIn.account" placeholder="请输入ID" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="signIn.password"
            placeholder="请输入密码"
            type="password"
             maxlength="30"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit_btn"
            @click="submitForm('signInForm')"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
    </section>
    <div class="img">
      <img src="../assets/img/login.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  name: "signInStudent",
  data() {
    return {
      signIn: {
        account: "",
        password: "",
      },
      rules: {
        // 要以数组形式展示
        account: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          {
            min: 8,
            max: 30,
            message: "长度在 8 到 30 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 40,
            message: "长度在 1 到 40 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "/login",
            data: this.signIn,
          })
            .then((res) => {
              console.log(res);
              sessionStorage.setItem("userId",res.data.userId) 
              console.log(sessionStorage.getItem("userId"))
              if (res.data.userId < 1000 && res.data.resultCode==1) {
                console.log("用户ID:" + this.$userId.userId);
                this.$router.push("/AdministratorPage");
              } else if(res.data.resultCode==1){
                console.log("用户ID:" + this.$userId.userId);
                this.$router.push("/UserPage");
              }else{
                alert("账号密码错误");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          alert("提交失败");
          return false;
        }
      });
    },
     backHome(){
       this.$router.push("/");
    }
  },
};
</script>
<style scoped>
@font-face {
  font-family: "FZQuSJW";
  src: url("../assets/font/FZQuSJW.TTF");
}
@font-face {
  font-family: "FZZhaoMFXSJF";
  src: url("../assets/font/FZZhaoMFXSJF.TTF");
}
.desc {
  font-family: "FZQuSJW";
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 5px;
  color: cadetblue;
  margin-top: 10px;
  float: left;
  margin-left: 10px;
  cursor: default;
  position:absolute;
  top: 0.2em;
  left:0.2em;
}
.siginReturn{
  position: absolute;
  top: 2.5em;
  left: 1em;
  border: 0;
  background-color:#c6ddff ;
  color:#fff;
  font-size: 1.2em;
}
img {
  height: 60%;
  width: 60%;
}
.about {
  display: flex;
  justify-content: space-around;

  background-color: coral；;
}
.img {
  flex: 3;
  padding-top: 10%;
  height: 50%;
  width: 50%;
}
form {
  width: 60%;
  padding-right: 15%;
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  border: 1px #0000 solid;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  flex: 2;
}
.signInForm {
  flex: 3;
  width: 40em;
  padding-top: 15em;
  margin: 0;
}
.signInForm .el-input {
  width: 100%;
}
</style>