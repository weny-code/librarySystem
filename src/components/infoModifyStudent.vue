<template>
  <el-container>
    <el-main>
      <div class="navigator-container">
        <div class="item">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"
              ><el-link class="item-class"
                ><i class="el-icon-s-home"></i>首页</el-link
              ></el-breadcrumb-item
            >
            <el-breadcrumb-item :to="{ path: '/UserPage' }"
              ><el-link class="item-class"
                ><i class="el-icon-s-custom"></i>个人主页</el-link
              ></el-breadcrumb-item
            >
            <el-breadcrumb-item :to="{ path: '/MyInfo' }"
              ><el-link class="item-class"
                ><i class="el-icon-s-custom"></i>个人信息</el-link
              ></el-breadcrumb-item
            >
            <el-breadcrumb-item class="item-class"
              ><i class="el-icon-ship"></i>修改信息</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
      </div>
      <el-form
        :model="infoModeify"
        class="signInForm"
        ref="signInForm"
        label-width="100px"
        id="modify"
      >
        <h2>个人信息</h2>
        <table cellspacing="5" class="tale" border="1" @click="editingTips()">
          <tr>
            <td class="changdu">姓名</td>
            <td>
              <input
                type="text"
                v-model="infoModeify.name"
                :readonly="readonly"
                maxlength="20"
              />
            </td>
            <td>性别</td>
            <td>
              <input
                type="text"
                v-model="infoModeify.gender"
                :readonly="readonly"
                maxlength="5"
              />
            </td>
            <td>年龄</td>
            <td>
              <input
                type="number"
                v-model="infoModeify.age"
                :readonly="readonly"
                onKeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
                oninput="if(value.length>5)value=value.slice(0,5)"
              />
            </td>
          </tr>
          <tr>
            <td>邮箱</td>
            <td>
              <input
                type="email"
                v-model="infoModeify.email"
                :readonly="readonly"
                maxlength="30"
              />
            </td>
            <td class="changdu">出生年月</td>
            <td>
              <input
                type="date"
                v-model="infoModeify.birthday"
                :readonly="readonly"
                maxlength="30"
                style="font-size: 1.2em"
              />
            </td>
            <td class="changdu">借阅ID</td>
            <td>
              <input
                type="text"
                readonly="readonly"
                v-model="infoModeify.userId"
              />
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td>
              <input
                type="number"
                v-model="infoModeify.phone"
                :readonly="readonly"
                onKeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
                oninput="if(value.length>5)value=value.slice(0,30)"
              />
            </td>
            <td>暂住地址</td>
            <td colspan="3">
              <input
                type="text"
                v-model="infoModeify.address"
                :readonly="readonly"
                maxlength="100"
              />
            </td>
          </tr>
          <tr>
            <th rowspan="2" style="padding: 1em">个人描述</th>
            <td colspan="5" rowspan="3">
              <textarea
                type="text"
                v-model="infoModeify.description"
                rows="5"
                :readonly="readonly"
                maxlength="100"
              ></textarea>
            </td>
          </tr>
        </table>

        <el-button type="success" @click="edit" v-if="flag == 1"
          >编辑</el-button
        >
        <el-button type="success" @click="Confirm()" v-if="flag == 0"
          >确认</el-button
        >
      </el-form>

      <el-form
        :model="passwordModeify"
        :rules="rules"
        class="passwordModeifyForm"
        ref="passwordModeifyForm"
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
        <el-button
          type="primary"
          @click="passwordModeifySubmit('passwordModeifyForm')"
          >确认</el-button
        >
      </el-form>
    </el-main>
  </el-container>
</template>                                                                                                                                                 
<script>
// import axios from 'axios'
export default {
  name: "infoModeify",
  created() {
    //  window.addEventListener('beforeunload', e => this.tableInit(e))
    this.$axios({
      method: "post",
      url: "/showUser",
      data: {
        userId: sessionStorage.getItem("userId"),
      },
    })
      .then((res) => {
        let a = this.infoModeify;
        let b = res.data;
        a.name = b.name;
        a.gender = b.gender;
        a.age = b.age;
        a.email = b.email;
        a.birthday = b.birthday;
        a.phone = b.phone;
        a.address = b.address;
        a.description = b.description;
        a.userId = sessionStorage.getItem("userId");
      })
      .catch(function (error) {
        console.log(error);
      });
    this.readonly = true;
  },
  props: {
    readonly: {
      default: false,
    },
    flag: {
      default: 1,
    },
  },
  data() {
    return {
      userName: sessionStorage.getItem("userName"),

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
          },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              var passwordreg = /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?.。])/;
              if (!passwordreg.test(value)) {
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
            max: 30,
            message: "长度在 8 到 30 个字符",
            trigger: "blur",
          },
          // {

          //   trigger: "blur",
          //   validateor: (rule, value, callback) => {
          //     if (
          //      value !==  this.passwordModeify.userPassword
          //     ) {
          //       callback(new Error("两次输入密码不一致!"));

          //     } else {
          //       callback();
          //       console.log("密码一致");

          //     }
          //   },
          // },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              var passwordreg = this.passwordModeify.userPassword;
              console.log(passwordreg);
              if (value !== passwordreg) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
          },
        ],
      },
    };
  },
  methods: {
    passwordModeifySubmit(formName) {
      // this.passwordModeify.userId = this.GLOBAL.userId;
      this.passwordModeify.userId = sessionStorage.getItem("userId");

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "/updatePassword",
            data: this.passwordModeify,
          })
            .then((res) => {
              if (res.data == 1) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
              } else {
                this.$message.error("修改失败");
              }
              this.passwordModeify.userPassword = "";
              this.passwordModeify.userPassword2 = "";
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          // console.log("error submit!!");
          this.$message.error("修改失败");
          return false;
        }
      });
    },

    tableInit() {},
    edit() {
      this.flag = 0;
      this.readonly = false;
    },
    Confirm() {
      console.log(this.infoModeify);
      this.flag = 1;
      this.readonly = true;
      this.$axios({
        method: "post",
        url: "/updateMyInfo",
        data: this.infoModeify,
      })
        .then(() => {
          // console.log(res)
          // alert("修改成功");
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          // this.flag=0;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    modifyReturn() {
      this.$router.push("/MyInfo");
    },
    editingTips() {
      if (this.flag == 1) {
        this.$message.error("请按编辑按钮进行修改");
      }
    },
    alert() {
      this.$confirm("正在选择退出当前用户, 是否继续?", "退出登录......", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("userId");
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出操作",
          });
        });
    },
  },
};
</script>
<style scoped>
.el-header {
  background-color: rgb(198, 226, 255);
  /* color: rgb(160, 207, 255); */
  text-align: center;
  line-height: 50px;
}

.el-main {
  background-color: rgb(217, 236, 255);
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

body > .el-container {
  margin: 0;
  padding: 0;
  width: 100%;
}

@font-face {
  font-family: "FZQuSJW";
  src: url("../assets/font/FZQuSJW.TTF");
}

.el-header .desc {
  font-family: "FZQuSJW";
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 5px;
  color: rgb(102, 177, 255);
  margin-top: 10px;
  float: left;
  margin-left: 10px;
  cursor: default;
}

.el-header .bottom {
  float: right;
  margin-top: 5px;
  font-size: 40px;
  cursor: pointer;
  /* text-align: center; */
}

.el-header .item {
  margin: 4px;
}

.headImg {
  position: relative;
  width: 200px;
  height: 50px;
  margin-left: 1200px;
  margin-top: 10px;
}

.name {
  position: absolute;
  font-family: "FZQuSJW";
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;
  letter-spacing: 1px;
}

.navigator-container {
  /* display: flex; */
  align-items: center;
}

.navigator-container .item {
  margin-left: 50px;
}

.item-class {
  font-size: 20px;
  color: rgb(140, 197, 255);
}

.changdu {
  width: 120px;
}
td {
  height: 40px;
  font-size: 1.2em;
}
.modifyReturn {
  background-color: #ffffff;
  color: black;
  border: 0;
  position: absolute;
  top: 0.2em;
  left: 0.2em;
}
.passwordModeifyForm {
  width: 30%;
  margin: 2% auto;
}
label {
  font-size: 1em;
}
.signInForm .el-button {
  margin: 1%;
}

.tale {
  margin: 0 auto;
  border-collapse: collapse;
  background-color: #ffffff;
}

.juzhong {
  text-align: center;
  border: 0;
  margin-left: 50%;
}

table th:nth-child(even) {
  background-color: burlywood;
}
table th:nth-child(odd) {
  background-color: #ffffff;
}
td {
  padding: 0;
  margin: 0;
  font-size: 1.2em;
}
td input {
  outline: none;
  font-size: 1em;
  border: 0;
  width: 95%;
  height: 95%;
}

.signInForm {
  margin: 3% 0;
}
.signInForm .el-input {
  width: 100%;
}
td textarea {
  width: 973px;
  height: 91px;
  line-height: 1em;
  margin: 0;
  padding: 4px;
  outline: none;
  border: 0;
  font-size: 1.2em;
}
td input {
  text-align: center;
}
/*去除上下箭头*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>