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
            <el-breadcrumb-item class="item-class"
              ><i class="el-icon-ship"></i>个人书架</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
      </div>
      <div class="book" v-for="(temp, index) in booksList" :key="index">
        <el-form :inline="true" :model="booksList" class="demo-form-inline">
          <el-form-item>
            <el-input
              :class="inputNotice(index)"
              :placeholder="outputStatus(index)"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="jiazai[index].str"
              @click="onSubmit(index)"
              v-if="bookStatus(index)"
              >还书</el-button
            >
          </el-form-item>
        </el-form>
        <div class="info">
          <el-card class="box-card">
            <div v-if="booksList[index].bookName">
              <div class="text item">
                {{ "书名:" + booksList[index].bookName }}
              </div>
              <div class="text item">
                {{ "国家:" + booksList[index].nation }}
              </div>
              <div class="text item">
                {{ "类型:" + booksList[index].type }}
              </div>
              <div class="text item">
                {{ "篇幅:" + booksList[index].length }}
              </div>
              <div class="text item1">
                {{ "主题:" + booksList[index].theme }}
              </div>
              <div class="text item">
                {{ "借阅时间:" + booksList[index].borrowTime }}
              </div>
            </div>
            <div v-if="!booksList[index].bookName" class="noBorrow">
              <span>您还没有借入书籍</span>
            </div>
          </el-card>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
      userName: sessionStorage.getItem("userName"),

      show: "true",
      jiazai: [
        {
          str: false,
        },
        {
          str: false,
        },
        {
          str: false,
        },
      ],
      booksList: [],
    };
  },
  methods: {
    onSubmit(index) {
      console.log("submit!");
      this.jiazai[index].str = true;
      console.log(index);

      console.log(this.booksList[index].bookId);
      console.log(this.booksList[index].id);

      this.$confirm("是否要归还这本书", "还书", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            method: "post",
            url: "/borrowReturn",
            data: {
              id: this.booksList[index].id,
              bookId: this.booksList[index].bookId,
            },
          }).then((res) => {
            console.log("当前用户ID:" + sessionStorage.getItem("userId"));
            console.log(this.booksList[index].bookId);
            console.log(res.data);
            if (res.data == 1) {
              console.log("还书成功");
              this.$message("还书成功");
              this.getBooksList();
              this.jiazai[index].str = false;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消还书",
          });
          this.jiazai[index].str = false;
        });
    },
    getBooksList() {
      this.$axios
        .get("/borrowUserShelf/" + sessionStorage.getItem("userId"))
        .then((res) => {
          this.booksList = res.data;
          console.log("请求成功");
          console.log(this.booksList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    bookStatus(index) {
      let count = this.booksList[index].bookName;
      return count;
    },
    outputStatus(index) {
      if (this.booksList[index].bookName != null) {
        console.log(this.booksList[index]);
        return "已借入书籍";
      } else {
        return "未借入书籍";
      }
    },
    inputNotice(index) {
      if (this.booksList[index].bookName != null) {
        return "shuming";
      } else {
        return "notshuming";
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
  created() {
    this.getBooksList();
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
.shuming {
  width: 350px;
}
.notshuming {
  width: 350px;
  background-color: rgb(64, 77, 77);
  border-radius: 4px;
}
.book .text {
  font-size: 16px;
  padding: 0 10;
  width: 200px;
  float: left;
}
.book .item {
  padding: 4px 0;
}

.box-card {
  width: 480px;
  margin-left: 30%;
  height: 150px;
  padding: 0 10px;
}
.info {
  text-align: left;
  margin-left: 50px;
}
.fengexian {
  margin: 14px 0px;
}
.demo-form-inline {
  height: 45px;
  margin-left: 35%;
  margin-top: 5px;
  width: 450px;
}

.noBorrow {
  text-align: center;
  font-size: 20px;
  margin-top: 40px;
}
</style>
