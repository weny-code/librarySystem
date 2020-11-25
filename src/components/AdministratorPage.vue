<template>
  <el-container>
    <el-header>
      <div class="desc">GBA图书管理系统</div>
      <div class="bottom">
        <el-tooltip class="item" content="退出登录" placement="bottom-end">
          <i class="el-icon-switch-button" v-on:click="alert()"></i>
        </el-tooltip>
      </div>
      <div class="nav">
        <el-menu
          :default-active="pageIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="rgb(198, 226, 255)"
          text-color="#000099"
          active-text-color="black"
        >
          <el-menu-item index="1">管理员主页</el-menu-item>
          <el-menu-item index="2">用户列表</el-menu-item>
          <el-menu-item index="3">图书借阅与归还</el-menu-item>
          <el-menu-item index="4">书库</el-menu-item>
          <el-menu-item index="5">首页公告管理</el-menu-item>
          <el-menu-item index="6">图书借阅统计</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <div class="operation-container" v-show="pageList.adminShow">
        <el-card class="box-card">
          <div class="card-inner" @click="showPage(2)">
            <el-image
              :src="require('../assets/img/yhlb.png')"
              class="img-inner"
            ></el-image>

            <span class="desc">用户列表</span>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="card-inner" @click="showPage(3)">
            <el-image
              :src="require('../assets/img/tsjygh.png')"
              class="img-inner"
            ></el-image>
            <span class="desc">图书借阅与归还</span>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="card-inner" @click="showPage(5)">
            <el-image
              :src="require('../assets/img/gggl.png')"
              class="img-inner"
            ></el-image>

            <span class="desc">首页公告管理</span>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="card-inner" @click="showPage(4)">
            <el-image
              :src="require('../assets/img/sk.png')"
              class="img-inner"
            ></el-image>
            <span class="desc">书库</span>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="card-inner" @click="showPage(6)">
            <el-image
              :src="require('../assets/img/tj.png')"
              class="img-inner"
            ></el-image>
            <span class="desc">图书借阅统计</span>
          </div>
        </el-card>
        <div class="item2">
          <img src="../assets/img/Admin.png" class="image" />
        </div>
      </div>
      <bookStore v-show="pageList.bookRoomShow"></bookStore>
      <userList v-show="pageList.userShow"></userList>
      <BookStatic v-show="pageList.allShow"></BookStatic>
      <UserBorrAndRet v-show="pageList.bookShow"></UserBorrAndRet>
      <Announcement v-show="pageList.testShow"></Announcement>
    </el-main>
  </el-container>
</template>

<script>
import BookStore from "@/views/BookStore";
import UserList from "@/views/UserList";
import BookStatic from "@/views/BookStatic";
import UserBorrAndRet from "@/views/UserBorrAndRet";
import Announcement from "@/views/Announcement";

export default {
  components: { BookStore, UserList, BookStatic, UserBorrAndRet, Announcement },
  name: "AdministratorPage",
  data() {
    return {
      pageIndex: "1",
      pageList: {
        adminShow: true,
        userShow: false,
        bookShow: false,
        bookRoomShow: false,
        testShow: false,
        allShow: false,
      },
    };
  },
  methods: {
    handleSelect(key) {
      this.pageIndex = key;

      this.showPage(this.pageIndex);
    },
    showPage(index) {
      var pageName = "";
      this.pageIndex = index;
      if (index == "1") {
        pageName = "adminShow";
      } else if (index == "2") {
        pageName = "userShow";
      } else if (index == "3") {
        pageName = "bookShow";
      } else if (index == "4") {
        pageName = "bookRoomShow";
      } else if (index == "5") {
        pageName = "testShow";
      } else {
        pageName = "allShow";
      }
      console.log("当前页面:" + pageName);
      console.log("当前页面页数:" + this.pageIndex);
      for (var key in this.pageList) {
        console.log(key);
        if (key == pageName) {
          this.pageList[key] = true;
        } else {
          this.pageList[key] = false;
        }
        console.log(key + "状态为" + this.pageList[key]);
      }
    },
    alert() {
      this.$confirm("正在选择退出, 是否继续?", "退出登录......", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
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
  created() {},
};
</script>

<style scoped>
.el-header {
  background-color: rgb(198, 226, 255);
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

.el-header .nav {
  margin-left: 400px;
  width: 700px;
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
  margin-top: 10px;
}

@font-face {
  font-family: "FZQuSJW";
  src: url("../assets/font/FZQuSJW.TTF");
}

.operation-container {
  display: flex;
  margin-top: 40px;
  margin-left: 20%;
  width: 1000px;
  /* height: 450px; */
  /* flex-direction: column; */
  flex-wrap: wrap;
  /* justify-content: center; */
  align-content: flex-start;
}

.item2 {
  width: 380px;
}

.box-card {
  width: 40%;
  height: 160px;
  margin: 10px;
}

.box-card:last-child {
  width: 40%;
  height: 160px;
  margin: 10px;
}

.card-inner {
  width: 180px;
  height: 130px;
  margin-left: 70px;
}

.card-inner :hover {
  cursor: pointer;
}

.image {
  width: 100%;
  /* margin-left: 10px; */
  display: block;
}

.card-inner .img-inner {
  width: 60%;
  height: 80%;

  overflow: visible;
  transition: all 0.3s ease;
}

.card-inner .img-inner :hover {
  transform: scale(1.1);
}

.card-inner .desc {
  font-family: "FZZhaoMFXSJF";
  display: block;
  font-size: 25px;
  color: black;
  margin-left: 0px;
  font-weight: bold;
  margin-top: 0px;
}
</style>