<template>
  <div class="main-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">我是借阅者</a></el-breadcrumb-item>
      <el-breadcrumb-item><a>我的书架</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div v-for="(temp, index) in user" :key="index" class="book">
      <el-form :inline="true" :model="booksList" class="demo-form-inline">
        <el-form-item>
          <el-input
            class="shuming"
            :placeholder="booksList[index].bookName"
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
      <div class="info" >
        <el-card class="box-card">
        <div v-if="booksList[index].bookName">
        <div class="text item">
            {{ "书名:" + booksList[index].bookName }}
          </div>
          <div class="text item">
            {{ "国家:" + booksList[index].country }}
          </div>
          <div class="text item">
            {{ "类型:" + booksList[index].type }}
          </div>
          <div class="text item">
            {{ "篇幅:" + booksList[index].length }}
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
      show:"true",
      user: [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "",
        },
      ],

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
        {
          bookId: 11,
          bookName: "《水浒传》",
          country: "中国",
          type: "武侠",
          length: "这么长",
          theme: "情义",
        },
        {
          bookName: "《红楼梦》",
          country: "中国",
          type: "不知道",
          length: "这么长",
          theme: "情义",
        },
        {
          bookName: "",
          // country: "",
          // type: "",
          // length: "",
          // theme: "",
        },
      ],
    };
  },
  methods: {
    onSubmit(index) {
      console.log("submit!");
      this.jiazai[index].str = true;
      // this.$axios
      // .get("/returnBook/this.booksList[index].bookId")
      // .then((res) =>{
      //     if(res.status == 200){
      //       console.log("还书成功")
      //     }
      // });
    },
    getBooksList() {},
    bookStatus(index){
    let count = this.booksList[index].bookName;
    return count;
    }
  },
  created() {
    // this.getBooksList()
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
}
.fengexian {
  margin: 14px 0px;
}
.demo-form-inline {
  margin-left: 480px;
}
</style>
