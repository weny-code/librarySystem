<template>
  <el-container>
    <el-header
      ><span class="desc">GBA图书管理系统</span>
      <!-- 头像 -->
      <div class="headImg">
        <el-avatar
          style="margin-top: 8px"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <!-- 用户名显示 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- 下拉选择 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人信息</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <div>
        <!-- 默认路由指向'/UserPage' -->
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  created() {
    // this.getParams()
    this.$axios({
      method: "get",
      url: "/showAnnouncement",
    })
      .then((res) => {
        console.log(res);
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
        Notice: "图书管理系统",
      },
      userName: sessionStorage.getItem("userName"),
    };
  },
  name: "UserPage",
  methods: {
    handleCommand(command) {
      if (command == "a") {
        this.$router.push({ path: "/infoModifyStudent" });
      } else if (command == "b") {
        this.alert();
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
  padding: 0;
  /* line-height: 200px; */
}

.router-link-active {
  text-decoration: none;
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
  font-size: 38px;
  font-weight: bold;
  letter-spacing: 5px;
  color: rgb(5, 53, 104);
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
  /* position: relative; */
  float: right;
  width: 200px;
  /* margin-left: 1200px; */
}

.name {
  position: absolute;
  font-family: "FZQuSJW";
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;
  letter-spacing: 1px;
}

@font-face {
  font-family: "FZZhaoMFXSJF";
  src: url("../assets/font/FZZhaoMFXSJF.TTF");
}
.el-dropdown-link {
  cursor: pointer;
  color: blue;
}
.el-icon-arrow-down {
  font-size: 15px;
  font-weight: bold;
}
</style>