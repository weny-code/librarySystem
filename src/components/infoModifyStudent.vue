<template>
<div class="flex">
        <table  cellspacing="0"   class="tale" border="1">
  <th colspan="6" class="juzhong">
      <td broder="0">个人资料</td>
  </th>
<tr>
  <td>姓名</td>
  <td> <input type="text"  v-model="infoModeify.name"> </td>
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

  
  
  
      <el-form
        :model="passwordModeify"
        :rules="rules"
        class="passwordModeifyForm"
        ref="passwordModeifyForm"
        label-width="100px"
      >
                <el-form-item label="修改密码" prop="userPassword">
                    <el-input v-model="passwordModeify.userPassword" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="userPassword2">
                    <el-input v-model="passwordModeify.userPassword2" placeholder="请确认密码" type="password"></el-input>
                </el-form-item>
   <el-button type="primary" @click="passwordModeifySubmit('  passwordModeifyForm')" >确认</el-button>
     </el-form>

</div>

</template>                                                                                                                                                 
<script>
// import axios from 'axios'
export default {
  name: "infoModeify",
  created() {
        //  window.addEventListener('beforeunload', e => this.tableInit(e))
          this.$axios({
              method:"post",
              url:"/showUser",
              data: {
                userId:this.userId.userId
              },
            }).then((res)=>{
              console.log(res);
              let a=this.infoModeify;
              let b=res.data;
              a.name=b.name;
              a.gender=b.gender;
              a.age=b.age;
              a.email=b.email;
              a.birthday=b.birthday;
              a.phone=b.phone;
              a.address=b.address;
              a.description=b.description; 
            })
            .catch(function(error){
              console.log(error);
            })   
      },
      
  data() {
    return {
      infoModeify: {
        userId: "",
        name: "",
        gender: "",
        age: "",
        email: "",
        birthday: "",
        phone: "s",
        address: "",
        description: "",
      },
      passwordModeify: {
        userPassword: "",
        userPassword2: "",
        userId: "",
      },
      rules: {
        // 要以数组形式展示
        userPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 8,
            max: 30,
            message: "长度在 8 到 30 个字符",
            trigger: "blur",
          }
          // {
          //   trigger: "blur",
          //   validator: (rule, value, callback) => {
          //     var userPassword = /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?])/;
          //     if (!userPassword.test(value)) {
          //       callback(
          //         new Error("密码必须由大小写字母、特殊字符组合,请输入8-30位")
          //       );
          //     } else {
          //       callback();
          //     }
          //   },
          // },
        ],
        userPassword2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 8,
            max: 30,
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
      }
    }
  },
  methods: {
        passwordModeifySubmit(formName) {
          // this.passwordModeify.userId = this.GLOBAL.userId;
          this.passwordModeify.userId=0;

          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios({
                method: "post",
                url: "/updatePassword",
                data: this.passwordModeify,
              })
                .then((res) => {
                  console.log(res);
                  
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
        tableInit() {
           
        },
      },
};
</script>


<style scoped>
.inputWidth .el-input__inner {
  width: 1em;
}

.passwordModeifyForm {
  width: 30em;
  margin-left: 35%;
  text-align: center;
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
  width: 60em;
  padding-top: 15em;
  margin: 0;
}
.signInForm .el-input {
  width: 100%;
}
</style>