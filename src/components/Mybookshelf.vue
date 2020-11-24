<template>
  <div class="main-container">
    <div class="desc">GBA图书管理系统</div>
    <div class="bottom">
      <el-tooltip class="item" content="退出登录" placement="bottom-end">
        <i class="el-icon-switch-button" v-on:click="alert()"></i>
      </el-tooltip>
    </div>
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
            ><i class="el-icon-coffee-cup"></i>我的书架</el-breadcrumb-item
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
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      show: "true",
      userId: 1001,
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
      booksList: [
      //   {
      //     bookName: " ",
      //     bookId: null,
      //     borrowTime: null,
      //     id: null,
      //     length: null,
      //     nation: null,
      //     theme: null,
      //     type: null,
      //   },
      //  {
      //     bookName: " ",
      //     bookId: null,
      //     borrowTime: null,
      //     id: null,
      //     length: "长篇",
      //     nation: "中国",
      //     theme: null,
      //     type: null,
      //   },
      //   {
      //    bookName: " ",
      //     bookId: null,
      //     borrowTime: null,
      //     id: null,
      //     length: "长篇",
      //     nation: "中国",
      //     theme: null,
      //     type: null,
      //   },
      ],
    };
  },
  methods: {
    onSubmit(index) {
      console.log("submit!");
      this.jiazai[index].str = true;
      console.log(index);
      console.log(this.userId);
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
            console.log(this.userId);
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
        .get("/borrowUserShelf/" + this.userId)
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
  },
  created() {
    this.getBooksList();
  },
};
</script>

<style scoped>
.main-container {
  position: absolute;
  width: 100%;
}
.shuming {
  width: 350px;
}
.notshuming {
  width: 350px;
  background-color: rgb(64, 77, 77);
  border-radius: 4px;
}
.text {
  font-size: 16px;
  padding: 0 10;
  width: 200px;
  float: left;
}

.item {
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
.desc {
  font-family: "FZQuSJW";
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 5px;
  color: cadetblue;
  margin-top: 10px;
  float: left;
  margin-left: 10px;
  cursor: default;
}
.bottom {
  float: right;
  font-size: 40px;
  margin-right: 50px;
  margin-top: 10px;
  cursor: pointer;
  text-align: center;
}
.navigator-container {
  display: flex;
  height: 50px;
  margin-top: 60px;
  align-items: center;
}
.navigator-container .item {
  margin-left: 50px;
}
.item-class {
  font-size: 20px;
  color: black;
}
.noBorrow {
  text-align: center;
  font-size: 20px;
  margin-top: 40px;
}
</style>
