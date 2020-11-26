<template>
  <el-container>
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
        <router-link to="/MyInfo">
          <div class="myinfo">
            <el-image
              :src="require('../assets/img/myinfo.png')"
              class="myinfo-img"
            ></el-image>
            <div class="desc">个人信息</div>
          </div>
        </router-link>
        <router-link to="/Mybookshelf">
          <div class="myinfo">
            <el-image
              :src="require('../assets/img/mybook.png')"
              class="myinfo-img"
            ></el-image>
            <div class="desc">个人书架</div>
          </div>
        </router-link>
        <router-link to="/Bookroom">
          <div class="bookroom">
            <el-image
              :src="require('../assets/img/bookroom.png')"
              class="bookroom-img"
            ></el-image>
            <div class="desc">图书库</div>
          </div>
        </router-link>
        <router-view></router-view>
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
      <el-dialog
        title="公告"
        :visible.sync="dialogVisible"
        style="text-align: left; padding-bottom: 100px"
      >
        <span
          style="font-size: 1em; margin-top: -2em"
          v-html="textconent"
        ></span>
        <div style="height: 40px"></div>
      </el-dialog>
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
        Notice: "图书管理系统",
      },
      userName: sessionStorage.getItem("userName"),
    };
  },
  name: "UserPage",
  methods: {
    MyInfo() {
      this.$router.push({ path: "/MyInfo" });
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

.navigator-container {
  /* display: flex; */
  height: 50px;
  align-items: center;
}

.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
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
  margin-top: 140px;
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
  background-color: #ffffff;
}
</style>