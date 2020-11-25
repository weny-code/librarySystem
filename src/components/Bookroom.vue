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
              ><i class="el-icon-ship"></i>图书库</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
      </div>
      <div class="select-container">
        <div class="select">
          <span class="desc">国家</span>
          <el-select
            v-model="value1"
            style="width: 150px"
            clearable
            placeholder="请选择"
            @change="currentBookNation($event)"
            @clear="noSelect(1)"
          >
            <el-option
              v-for="item in nationData"
              :key="item.id"
              :label="item.nation"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span class="desc">类型</span>
          <el-select
            v-model="value2"
            style="width: 150px"
            clearable
            placeholder="请选择"
            @change="currentBookType($event)"
            @clear="noSelect(2)"
          >
            <el-option
              v-for="item in typeData"
              :key="item.id"
              :label="item.type"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span class="desc">篇幅</span>
          <el-select
            v-model="value3"
            style="width: 150px"
            clearable
            placeholder="请选择"
            @change="currentBookLength($event)"
            @clear="noSelect(3)"
          >
            <el-option
              v-for="item in lengthData"
              :key="item.id"
              :label="item.length"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span class="desc">主题</span>
          <el-select
            v-model="value4"
            style="width: 150px"
            clearable
            placeholder="请先选择类型"
            @change="currentBookTheme($event)"
            @clear="noSelect(4)"
          >
            <el-option
              v-for="item in themeData"
              :key="item.id"
              :label="item.theme"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <div class="check">
            <el-button
              size="medium"
              icon="el-icon-search"
              type="primary"
              round
              v-on:click="queryBook"
              >查询</el-button
            >
          </div>
        </div>
      </div>
      <div class="search-container">
        <div class="item">
          <el-input v-model="book.bookName" placeholder="请输入书名/作者"
            ><i slot="prefix" class="el-input__icon el-icon-search"></i
          ></el-input>
        </div>
        <div class="search">
          <el-button type="primary" v-on:click="queryBook">搜索</el-button>
        </div>
      </div>
      <div class="show-container">
        <el-dialog :visible.sync="dialogTableVisible" top="10%">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>简介</span>
            </div>
            <div class="text item">
              {{ borrowBook.summary }}
            </div>
          </el-card>
          <el-button style="margin-top: 20px" type="success" @click="borrow"
            >借阅</el-button
          >
          <el-button
            style="margin-top: 20px"
            @click="dialogTableVisible = false"
            >取消</el-button
          >
        </el-dialog>
        <div class="booktable">
          <el-table v-model="tableData" :data="tableData" stripe border>
            <el-table-column
              prop="book.bookName"
              fixed
              label="书名"
              width="150"
              align="center"
            >
            </el-table-column>

            <el-table-column
              prop="book.nation"
              label="国家"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="book.type"
              label="类型"
              width="150"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="book.length"
              label="篇幅"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="book.theme"
              label="主题"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="book.author"
              label="作者"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="book.storeDate"
              label="上架时间"
              width="230"
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              prop="status"
              label="状态"
              width="100"
              header-align="center"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.status == '1'">
                  <el-button type="success" disabled>已借</el-button>
                </div>
                <div v-if="scope.row.book.leftAmount == '0'">
                  <el-button type="info" disabled>无货</el-button>
                </div>
                <div
                  v-if="
                    scope.row.status == '0' && scope.row.book.leftAmount != '0'
                  "
                >
                  <el-button
                    type="primary"
                    round
                    v-on:click="
                      showBook(scope.row), (dialogTableVisible = true)
                    "
                    >借阅</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="page-container">
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="prev, pager, next, jumper"
            :total="count"
          >
          </el-pagination>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Bookroom",
  data() {
    return {
      userName: sessionStorage.getItem("userName"),

      count: null,
      book: {
        bookId: null,
        bookName: null,
        nation: null,
        type: null,
        length: null,
        theme: null,
        status: null,
        summary: null,
        // storeDate: null,
        leftAmount: null,
        // uploadAmount: null,
        // downloadAmount: null,
        author: null,
      },
      currentPage: 1,
      currentType: null,
      pagesize: 5,
      dialogTableVisible: false,
      borrowBook: {},
      nationData: [],
      lengthData: [],
      themeData: [],
      typeData: [],
      tableData: [],
      value1: [],
      value2: [],
      value3: [],
      value4: [],
    };
  },
  methods: {
    getBookTable() {
      this.$axios({
        method: "post",
        url:
          "/BookType/" +
          sessionStorage.getItem("userId") +
          "/" +
          (this.currentPage - 1),
        data: this.book,
      })
        .then((res) => {
          this.tableData = res.data;
          console.log("后端初始传来的数据：" + res.data);
          console.log("有多少本书：" + this.count);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    searchBook() {
      console.log("------------" + this.book.bookName);
      this.count = this.getTypeCount();
      this.$axios({
        method: "post",
        url:
          "/BookType/" +
          sessionStorage.getItem("userId") +
          "/" +
          (this.currentPage - 1),
        data: { bookName: this.book.bookName },
      })
        .then((res) => {
          this.tableData = res.data;
          // console.log("传入的数据=" + JSON.stringify(this.book));
          console.log("下面的搜索得到的书籍总数" + this.tableData.length);
          // console.log("数据：" + this.$qs.stringify(this.book));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showBook(e) {
      this.borrowBook = e.book;
      // this.borrowBookSummary=
      // this.borrowBookSummary = e.book.summary;
      // console.log("----------" + typeof e.book.bookName);
      console.log("当前行的书籍名：" + this.borrowBook);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBookTable();
    },
    getBookCount() {
      this.$axios({
        method: "post",
        url: "/BookCount",
      })
        .then((res) => {
          this.count = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getTypeCount() {
      console.log("------------" + this.book.bookName);
      this.$axios({
        method: "post",
        url: "/BookTypeCount",
        data: this.book,
      })
        .then((res) => {
          this.count = res.data;
          console.log("用户查询书的数量：" + this.count);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getSelectNation() {
      this.$axios({
        method: "get",
        url: "/bookNation",
      })
        .then((res) => {
          this.nationData = res.data;
          console.log(this.nationData.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getSelectLength() {
      this.$axios({
        method: "get",
        url: "/bookLength",
      })
        .then((res) => {
          this.lengthData = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getSelectTheme() {
      this.$axios({
        method: "get",
        url: "/bookTheme/" + this.currentType,
      })
        .then((res) => {
          this.themeData = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getSelectType() {
      this.$axios({
        method: "get",
        url: "/bookType",
      })
        .then((res) => {
          this.typeData = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    currentBookType(e) {
      let obj = {};
      obj = this.typeData.find((item) => {
        return item.id === e;
      });
      this.currentType = obj.id;
      this.book.type = obj.type;
      console.log("传入后端的类型：" + this.book.type);
      console.log("当前书的类型ID：" + this.currentType);
      this.getSelectTheme();
    },
    currentBookNation(e) {
      let obj = {};
      obj = this.nationData.find((item) => {
        return item.id === e;
      });
      this.book.nation = obj.nation;
      console.log("传入后端的国家：" + this.book.nation);
    },
    currentBookLength(e) {
      let obj = {};
      obj = this.lengthData.find((item) => {
        return item.id === e;
      });
      this.book.length = obj.length;
      console.log("传入后端的篇幅：" + this.book.length);
    },
    currentBookTheme(e) {
      let obj = {};
      obj = this.themeData.find((item) => {
        return item.id === e;
      });
      this.book.theme = obj.theme;
      console.log("传入后端的主题：" + this.book.theme);
    },
    queryBook() {
      this.count = this.getTypeCount();
      this.$axios({
        method: "post",
        url:
          "/BookType/" +
          sessionStorage.getItem("userId") +
          "/" +
          (this.currentPage - 1),
        data: this.book,
      })
        .then((res) => {
          this.tableData = res.data;
          console.log("上面的查询查询得到的书籍总数" + this.tableData.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    noSelect(e) {
      if (e == "1") {
        this.book.nation = null;
      } else if (e == "2") {
        this.book.type = null;
        this.currentType = null;
        this.themeData = null;
        console.log("传入后端的类型：" + this.book.type);
        console.log("当前书的类型ID：" + this.currentType);
      } else if (e == "3") {
        this.book.length = null;
      } else if (e == "4") {
        this.book.theme = null;
      }
    },
    borrow() {
      console.log("书名：" + this.borrowBookName);
      console.log("简介：" + this.borrowBookSummary);
      this.$axios({
        method: "post",
        url: "/borrowBook",
        data: {
          userId: sessionStorage.getItem("userId"),
          bookId: this.borrowBook.bookId,
        },
      })
        .then((res) => {
          if (res.data == "1") {
            this.borrowSuccess();
          } else if (res.data == "0") {
            this.borrowFailed();
          } else if (res.data == "2") {
            this.reborrow();
          } else if (res.data == "3") {
            this.borrowEn();
          } else if (res.data == "4") {
            this.noBook();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    borrowSuccess() {
      this.$message({
        message: "恭喜你，借书成功",
        type: "success",
      });
      this.dialogTableVisible = false;
      this.getBookTable();
    },
    borrowFailed() {
      this.$message.error("借阅失败！");
    },
    borrowEn() {
      this.$message.error("你已经借了三本书了，不能再借了！");
    },
    reborrow() {
      this.$message({
        message: "你已经借了这本书了！",
        type: "warning",
      });
    },
    noBook() {
      this.$message("这本书库存不足！");
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
    this.getBookTable();
    this.getBookCount();
    this.getSelectNation();
    this.getSelectLength();
    this.getSelectType();
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

.select-container {
  margin-top: 15px;

  /* margin-left: 20px; */
}

.select-container .select {
  margin-left: 20%;
  display: flex;
  width: 1000px;
  justify-content: space-around;
}

.select-container .desc {
  color: black;
  font-size: 25px;
  margin-top: 5px;
  margin-right: -20px;
  letter-spacing: -5px;
  font-family: "FZZhaoMFXSJF";
}

.select-container .check {
  margin-left: -10px;
}

.search-container {
  margin-top: 80px;
  margin-left: 60%;
}

.search-container .item {
  width: 150px;
  margin-left: 30%;
}

.search-container .search {
  margin-top: -40px;
  margin-left: 130px;
}

.show-container {
  display: flex;
  margin-top: 10px;
  width: 100%;
  justify-content: center;
}

.show-container .booktable {
  width: 75%;
}

.page-container {
  margin-top: 10px;
  margin-left: 40%;
  margin-bottom: 0;
}

.bookinfo-container {
  margin-top: 50%;
}
</style>