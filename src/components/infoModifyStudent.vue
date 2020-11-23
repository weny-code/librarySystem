<template>
<div class="flex">
         <el-form
        :model=" infoModeify"
        :rules="rules"
        class="signInForm"
        ref="signInForm"
        label-width="100px"
        id="modify"
      >
      <h2>个人信息</h2>
  <table  cellspacing="0"   class="tale" border="1">
<tr>
  <td>姓名</td>
  <td ><input type="text"  v-model="infoModeify.name" :readonly="readonly"></td>
  <td>性别</td>
  <td>
  <input type="text" v-model="infoModeify.gender"   :readonly="readonly">  
</td>
  <td>年龄</td>
  <td><input type="number"  v-model="infoModeify.age"  :readonly="readonly"></td>
</tr>
<tr>
  <td>邮箱</td>
  <td><input type="email"  v-model="infoModeify.email"  :readonly="readonly"></td>
  <td>出生年月</td>
  <td><input type="text"  v-model="infoModeify.birthday"  :readonly="readonly"></td>
  <td>借阅ID</td>
  <td>1012</td>
</tr>
<tr>
  <td>联系电话</td>
  <td><input type="number"  v-model="infoModeify.phone"  :readonly="readonly"></td>
  <td>暂住地址</td>
  <td colspan="3"><input type="text"  v-model="infoModeify.address" :readonly="readonly"></td>
</tr>
<tr>
  <th rowspan="2" style="padding:1em" >个人描述</th>
  <td colspan="5" rowspan="3"><textarea type="text" v-model="infoModeify.description" rows="5" :readonly="readonly"></textarea></td>
</tr>
</table>

<el-button type="success"   @click="edit"  v-if="flag==1">编辑</el-button>
<el-button type="success"   @click="Confirm()"  v-if="flag==0">确认</el-button>

 </el-form>
  
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
                userId:this.userId
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
            this.readonly=true;
      },
       props: {
      readonly: {
        default: false
      },
     flag:{
        default:1
      }
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
        phone: "",
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
         edit(){
         this.flag=0;
         this.readonly=false;
         alert("请修改");
         
       },
       Confirm(){
         this.flag=1;
         this.readonly=true;
         this.$axios({
                method: "post",
                url: "/updateMyInfo",
                data: this.passwordModeify,
              })
                .then((res) => {
                  console.log(res);
                  
                    alert("修改成功");
                 
                })
                .catch(function (error) {
                  console.log(error);
                });
       }
      },
};
</script>


<style scoped>

.passwordModeifyForm {
  width: 30%;
  margin:5% auto;
}

.signInForm .el-button{
  margin: 1%;
}



.tale {
  margin: 0 auto;
  border-collapse: collapse;
}

.juzhong {
  text-align: center;
  border: 0;
  margin-left: 50%;
}
table {
  background-color:  #ffffff;
  font-size: 1.2em;
}
td{
  padding: 0;
  margin: 0;
}
td input {
  outline: none;
 
  border: 0;
  width: 95%;
  height: 95%;

}
.signInForm {
  margin:3% 0;
}
.signInForm .el-input {
  width: 100%;
}
 td textarea{
width: 634px;
height: 80px;
line-height: 1em;
margin: 0;
padding:0;
outline: none;
border: 0;
}
</style>