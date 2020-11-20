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
    <div class="operation-container" v-show="adminShow">
      <div class="item">
        <el-card class="box-card">
          <div class="card-inner" @click="showPage(2)">
            <el-image
              :src="require('../assets/img/yhlb.png')"
              class="img-inner"
            ></el-image>
            <div class="desc">用户列表</div>
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
            <div class="desc">图书借阅与归还</div>
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
            <div class="desc">首页公告管理</div>
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
            <div class="desc">书库</div>
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
            <div class="desc">图书借阅统计</div>
          </div>
        </el-card>
      </div>
      <div class="item2">
        <img src="../assets/img/Admin.png" class="image" />
      </div>
    </div>
    <bookStore v-show="!adminShow"></bookStore>
    <userList v-show="!adminShow"></userList>
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
      adminShow: true,
      pageIndex: "1",
    };
  },
  methods: {
    handleSelect(key) {
      this.pageIndex = key;
      if (key == "1") {
        this.adminShow = true;
      } else {
        this.showPage(this.pageIndex);
      }
    },
    showPage(index) {
      console.log(index);
      this.adminShow = false;
      this.pageIndex = index;
    },
  },
};
</script>

<style scoped>
.body-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  color: #c6ddff;
}

@font-face {
  font-family: "FZQuSJW";
  src: url("../assets/font/FZQuSJW.TTF");
}

.navigation-container {
  position: absolute;
  display: flex;
  width: 100%;
  background-color: #66cccc;
  justify-content: space-between;
}

.navigation-container .desc {
  font-family: "FZQuSJW";
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 5px;
  color: white;
  margin-top: 10px;
  float: left;
  margin-left: 10px;
  cursor: default;
}

.navigation-container .bottom {
  float: right;
  font-size: 40px;
  margin-right: 50px;
  margin-top: 10px;
  cursor: pointer;
  text-align: center;
}

.navigation-container .item {
  margin: 4px;
}

.navigation-container .nav {
  margin-left: -150px;
}

.operation-container {
  display: flex;
  margin-top: 10%;
  margin-left: 15%;
  width: 1000px;
  /* height: 450px; */
  /* flex-direction: column; */
  flex-wrap: wrap;
  justify-content: center;
}

.item {
  margin: 10px 10px 10px 10px;
}

.item2 {
  width: 380px;
}

.box-card {
  width: 380px;
  height: 160px;
}

.card-inner {
  width: 110px;
  height: 110px;
  margin-left: 100px;
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
  width: 100%;
  height: 100%;
  overflow: visible;
  transition: all 0.3s ease;
}

.card-inner .img-inner :hover {
  transform: scale(1.1);
}

.card-inner .desc {
  font-family: "FZZhaoMFXSJF";
  font-size: 25px;
  color: black;
  margin-left: -10px;
  font-weight: bold;
  margin-top: -2px;
}
</style>