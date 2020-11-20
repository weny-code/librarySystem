<template>
  <div class="flex">
    <!-- <el-form
        :model="signIn"
        :rules="rules"
        class="signInForm"
        ref="signInForm"
        label-width="100px"
      >
  <table  cellspacing="0"   class="tale" border="1">
  <th colspan="6" class="juzhong">
      <td broder="0"  >个人资料</td>
  </th>

<tr>
  <td>姓名</td>
  <td><input type="text" id="#nameModifyStudent" v-model="infoModeify.name" ></td>
  <td>性别</td>
  <td>
  <input type="text" id="#nameModifyStudent" v-model="infoModeify.gender" >  
</td>
  <td>年龄</td>
  <td><input type="number" id="ageModifyStudent" v-model="infoModeify.age"></td>
</tr>
<tr>
  <td>邮箱</td>
  <td><input type="email" id="mailModifyStudent" v-model="infoModeify.email"></td>
  <td>出生年月</td>
  <td><input type="date" id="birthModifyStudent" v-model="infoModeify.birthday"></td>
  <td>借阅ID</td>
  <td><input type="text" id="borrrowModifyStudent" v-model="infoModeify.jieyu"></td>
</tr>
<tr>
  <td>联系电话</td>
  <td><input type="number" id="phoneModifyStudent" v-model="infoModeify.phone"></td>
  <td>暂住地址</td>
  <td colspan="3"><input type="text" id="temporary_addressModifyStudent" v-model="infoModeify.address"></td>
</tr>
<tr>
  <th rowspan="2">个人描述</th>
  <td colspan="5" rowspan="2" id="descriptionModifyStudent"><input type="text" v-model="infoModeify.description"></td>
</tr>
</table>

<el-button type="success" id="alterModifyStudent"  @click="modeifySubmit()">编辑</el-button>
 </el-form>
  <el-form-item label="活动名称" prop="name" width="10px">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>  
</div> -->

    <el-form
      :model="passwordModeify"
      :rules="passwdrules"
      class="signInForm passwordModeifyForm"
      ref="signInForm"
      label-width="100px"
    >
      <el-form-item label="修改密码" prop="userPassword">
        <el-input
          v-model="passwordModeify.userPassword"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="userPassword2">
        <el-input
          v-model="passwordModeify.userPassword2"
          placeholder="请确认密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="passwordModeifySubmit(signInForm)"
        >确认</el-button
      >
    </el-form>
  </div>
</template>                                                                发DVDDVD                                                                                                   
<script>
// import axios from 'axios'
export default {
  name: "infoModeify",
  data() {
    return {
      infoModeify: {
        userld: "",
        name: "",
        gender: "",
        age: "",
        email: "",
        birthday: "",
        phone: "",
        address: "",
        description: "",
        jieyu: "",
      },
      passwordModeify: {
        userPassword: "",
        userPassword2: "",
        userId: "",
      },
      passwdrules: {
        // 要以数组形式展示
        userPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 8,
            max: 30,
            message: "长度在 8 到 30 个字符",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              var userPassword = /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?])/;
              if (!userPassword.test(value)) {
                callback(
                  new Error("密码必须由大小写字母、特殊字符组合,请输入8-30位")
                );
              } else {
                callback();
              }
            },
          },
        ],
        userPassword2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 8,
            max: 40,
            message: "长度在 8 到 30 个字符",
            trigger: "blur",
          },
          {
            message: "密码必须一致",
            trigger: "blur",
            validatePass2: (rule, value, callback) => {
              if (value !== this.passwordModeify.userPassword) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
          },
        ],
      },

      methods: {
        passwordModeifySubmit(formName) {
          this.passwordModeify.userId = this.GLOBAL.userId;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios({
                method: "post",
                url: "/updatePassword",
                data: this.passwordModeify,
              })
                .then((res) => {
                  console.log(res);
                  if (res.data === 1) {
                    alert("注册成功");
                  } else if (res.data === 0) {
                    alert("账号已经存在");
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
        // editOrConfirm() {
        //      let states=document.getElementById("alterModifyStudent");
        //       let    statesValue=states.innerHTML;
        //           if(statesValue==="编辑"){
        //              states.innerHTML="确认";
        //              edituers();
        //           }
        //           else{
        //             states.innerHTML="编辑";
        //              Confirm();
        //           }
        //   },

        //   Confirm() {console.log(this.userPassword)},
        //   edituers() {console.log(this.userPassword)}
      },
    };
  },
};
</script>


<style scoped>
.passwordModeifyForm {
  width: 10em;
  margin-left: 50%;
}
#descriptionModifyStudent {
  margin-left: auto;
  margin-top: 2em;
}
#sexModifyStudent {
  text-align: right;
  margin-left: auto;
}

.tableDiv {
  height: 40%;
  flex: 1;
  margin-bottom: 15%;
}
.tale {
  margin: 0 auto;
  border-collapse: collapse;
}
.passwdModify {
  height: 40%;
}
.juzhong {
  text-align: center;
  border: 0;
  margin-left: 50%;
}
table {
  background-color: aliceblue;
  font-size: 1.2em;
}
td input {
  outline: none;
  text-align: right;
  border: 0;
  width: 95%;
}
.signInForm {
  width: 20em;
  padding-top: 15em;
  margin: 0;
}
.signInForm .el-input {
  width: 100%;
}
</style>