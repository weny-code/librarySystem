<template>
  <div class="main-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">我是借阅者</a></el-breadcrumb-item>
      <el-breadcrumb-item><a>我的书架</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div v-for="(book, index) in booksList" :key="index" class="book">
      <el-form :inline="true" :model="booksList" class="demo-form-inline">
        <el-form-item>
          <el-input
            class="shuming"
            :placeholder="book.bookName"
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
          <div>
            <div class="text item">
              {{ "书名:" + book.bookName }}
            </div>
            <div class="text item">
              {{ "国家:" + book.nation }}
            </div>
            <div class="text item">
              {{ "类型:" + book.type }}
            </div>
            <div class="text item">
              {{ "篇幅:" + book.length }}
            </div>
            <div class="text item">
              {{ "主题:" + booksList[index].theme }}
            </div>
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
      booksList: [],
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
  },
  created() {
    this.getBooksList();
  },
};
</script>

<style scoped>
.book {
  margin-top: 20px;
}

.main-container {
  position: absolute;
  width: 100%;
}
.shuming {
  width: 350px;
}
.text {
  font-size: 13px;
  padding: 0 10;
}

.item {
  padding: 4px 0;
}

.box-card {
  width: 480px;
  margin-left: 430px;
  height: 150px;
  padding: 0 10px;
}
.info {
  margin-top: -15px;
  height: 150px;
  text-align: left;
  margin-left: 50px;
}
.fengexian {
  margin: 14px 0px;
}
.demo-form-inline {
  margin-left: 15%;
}
</style>
