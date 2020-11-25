<template>
  <el-container>
    <el-header
      ><div class="desc">GBA图书管理系统</div>
      <div class="bottom">
        <el-tooltip class="item" content="退出登录" placement="bottom-end">
          <i class="el-icon-switch-button" v-on:click="alert()"></i>
        </el-tooltip>
      </div>
      <div class="headImg">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <span class="name">{{ userName }}</span>
      </div>
    </el-header>
    <el-main
      ><div class="navigator-container">
        <div class="item">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"
              ><el-link class="item-class"
                ><i class="el-icon-s-home"></i>首页</el-link
              ></el-breadcrumb-item
            >
            <el-breadcrumb-item class="item-class"
              ><i class="el-icon-ship"></i>个人主页</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
      </div>
      <div class="operation-container">
        <div class="myinfo" v-on:click="MyInfo()">
          <el-image
            :src="require('../assets/img/myinfo.png')"
            class="myinfo-img"
          ></el-image>
          <div class="desc">个人信息</div>
        </div>
        <div class="myinfo" v-on:click="MyBook()">
          <el-image
            :src="require('../assets/img/mybook.png')"
            class="myinfo-img"
          ></el-image>
          <div class="desc">个人书架</div>
        </div>
        <div class="bookroom" v-on:click="BookRoom()">
          <el-image
            :src="require('../assets/img/bookroom.png')"
            class="bookroom-img"
          ></el-image>
          <div class="desc">图书库</div>
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
    MyInfo() {
      this.$router.push({ path: "/MyInfo", query: { key: this.msg } });
    },

    MyBook() {
      this.$router.push({ path: "/Mybookshelf" });
    },

    BookRoom() {
      this.$router.push({ path: "/Bookroom" });
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
  height: 50px;
  align-items: center;
}

.navigator-container .item {
  margin-left: 50px;
}

.item-class {
  font-size: 20px;
  color: rgb(140, 197, 255);
}

.operation-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 100px;
  justify-content: space-around;
  /* align-items: center; */
}

.myinfo {
  width: 250px;
  height: 250px;
  transition: all 0.6s ease;
}

.myinfo:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.bookroom {
  width: 280px;
  height: 250px;
  transition: all 0.6s ease;
}

.bookroom:hover {
  transform: scale(1.2);
  cursor: pointer;
}

@font-face {
  font-family: "FZZhaoMFXSJF";
  src: url("../assets/font/FZZhaoMFXSJF.TTF");
}

.bookroom .desc {
  font-family: "FZZhaoMFXSJF";
  font-size: 30px;
  margin-top: 20px;
  color: black;
  font-weight: bold;
}

.myinfo .desc {
  font-family: "FZZhaoMFXSJF";
  font-size: 30px;
  color: black;
  font-weight: bold;
}

.myinfo-img {
  max-width: 80%;
  max-height: 80%;
}

.bookroom-img {
  max-width: 100%;
  max-height: 100%;
  margin-top: 20px;
}

.notice-container {
  height: 100px;
  display: flex;
  margin-top: 150px;
  justify-content: center;
}

.notice-container .text {
  font-size: 14px;
}

.notice-container .item {
  padding: 0;
  text-align: center;
}

.notice-container .box-card {
  width: 1000px;
  cursor: default;
  background-color: #c7faff;
}
</style>