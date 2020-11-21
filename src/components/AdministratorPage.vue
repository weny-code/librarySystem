<template>
  <div class="body-bg">
    <div class="navigation-container">
      <div class="desc">GBA图书管理系统</div>
      <div class="nav">
        <el-menu
          :default-active="pageIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#66cccc"
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
      <div class="bottom">
        <el-tooltip class="item" content="退出登录" placement="bottom-end">
          <i class="el-icon-switch-button" v-on:click="alert()"></i>
        </el-tooltip>
      </div>
    </div>
    <div class="operation-container" v-show="pageList.adminShow">
      <div class="item">
        <el-card class="box-card">
          <div class="card-inner" @click="showPage(2)">
            <el-image
              :src="require('../assets/img/yhlb.png')"
              class="img-inner"
            ></el-image>
            <span class="desc">用户列表</span>
          </div>
        </el-card>
      </div>
      <div class="item">
        <el-card class="box-card">
          <div class="card-inner" @click="showPage(3)">
            <el-image
              :src="require('../assets/img/tsjygh.png')"
              class="img-inner"
            ></el-image>
            <span class="desc">图书借阅与归还</span>
          </div>
        </el-card>
      </div>
      <div class="item">
        <el-card class="box-card">
          <div class="card-inner" @click="showPage(5)">
            <el-image
              :src="require('../assets/img/gggl.png')"
              class="img-inner"
            ></el-image>
            <span class="desc">首页公告管理</span>
          </div>
        </el-card>
      </div>
      <div class="item">
        <el-card class="box-card">
          <div class="card-inner" @click="showPage(4)">
            <el-image
              :src="require('../assets/img/sk.png')"
              class="img-inner"
            ></el-image>
            <span class="desc">书库</span>
          </div>
        </el-card>
      </div>
      <div class="item">
        <el-card class="box-card">
          <div class="card-inner" @click="showPage(6)">
            <el-image
              :src="require('../assets/img/tj.png')"
              class="img-inner"
            ></el-image>
            <span class="desc">图书借阅统计</span>
          </div>
        </el-card>
      </div>
      <div class="item2">
        <img src="../assets/img/Admin.png" class="image" />
      </div>
    </div>
    <bookStore v-show="pageList.bookRoomShow"></bookStore>
    <userList v-show="pageList.userShow"></userList>
  </div>
</template>

<script>
import BookStore from "@/views/BookStore";
import UserList from "@/views/UserList";
export default {
  components: { BookStore, UserList },
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
  },
  created() {},
};
</script>

<style scoped>
.body-bg {
  /* position: absolute; */
  width: 100%;
  height: 100%;
  min-width: 1500px;
  width: 100%;
  max-width: 100%;
  height: 100%;
  /* top: 0;
  left: 0;
  overflow-y: auto; */
  color: #c6ddff;
}

@font-face {
  font-family: "FZQuSJW";
  src: url("../assets/font/FZQuSJW.TTF");
}

.navigation-container {
  position: relative;
  display: flex;
  height: auto;
  width: auto;
  background-color: #66cccc;
  justify-content: space-between;
}

.navigation-container .desc {
  font-family: "FZQuSJW";
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 5px;
  color: white;
  padding-top: 10px;
  /* float: left; */
  padding-left: 10px;
  cursor: default;
}

.navigation-container .bottom {
  font-size: 40px;
  margin-right: 50px;
  padding-top: 10px;
  cursor: pointer;
  text-align: center;
}

.navigation-container .item {
  margin: 4px;
}

.navigation-container .nav {
  margin-left: -150px;
  /* margin-left: 100px; */
}

.operation-container {
  display: flex;
  margin-top: 5%;
  margin-left: 15%;
  width: 1000px;
  /* height: 450px; */
  /* flex-direction: column; */
  flex-wrap: wrap;
  justify-content: center;
}

.item {
  margin: 10px;
}

.item2 {
  width: 380px;
}

.box-card {
  width: 380px;
  height: 160px;
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