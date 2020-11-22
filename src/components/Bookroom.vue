<template>
  <div class="main-container">
    <div class="desc">GBA图书管理系统</div>
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
        <div class="desc">国家</div>
        <el-select
          style="margin-left: 20px"
          v-model="value1"
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
        <div class="desc">类型</div>
        <el-select
          style="margin-left: 20px"
          v-model="value2"
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
        <div class="desc">篇幅</div>
        <el-select
          style="margin-left: 20px"
          v-model="value3"
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
        <div class="desc">主题</div>
        <el-select
          style="margin-left: 20px"
          v-model="value4"
          clearable
          placeholder="请选择"
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
      </div>
      <div class="check">
        <el-button type="success" v-on:click="queryBook">查询</el-button>
      </div>
    </div>
    <div class="search-container">
      <div class="item">
        <el-input v-model="book.bookName" placeholder="请输入关键字"></el-input>
      </div>
      <div class="search">
        <el-button type="success" round v-on:click="queryBook">搜索</el-button>
      </div>
    </div>
    <div class="show-container">
      <div class="booktable">
        <el-table v-model="tableData" :data="tableData" stripe>
          <el-table-column
            prop="book.bookName"
            label="书名"
            width="130"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="book.nation" label="国家" width="130">
          </el-table-column>
          <el-table-column prop="book.type" label="类型" width="130">
          </el-table-column>
          <el-table-column prop="book.length" label="篇幅" width="130">
          </el-table-column>
          <el-table-column prop="book.theme" label="主题" width="300">
          </el-table-column>
          <el-table-column prop="book.storeDate" label="上架时间" width="200">
          </el-table-column>
          <el-table-column
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
                  v-on:click="showBook(scope.row), (dialogTableVisible = true)"
                  >借阅</el-button
                >
              </div>
              <el-dialog :visible.sync="dialogTableVisible" top="10%">
                <el-table :data="borrowBook">
                  <el-table-column
                    prop="bookName"
                    label="书名"
                    width="150"
                  ></el-table-column>
                  <el-table-column prop="theme" label="简介"></el-table-column>
                </el-table>
                <el-button type="success" @click="borrow">借阅</el-button>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page-container">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bookroom",
  data() {
    return {
      count: null,
      userId: "1001",
      book: {
        bookId: null,
        bookName: null,
        nation: null,
        type: null,
        length: null,
        theme: null,
        status: null,
        // storeDate: null,
        leftAmount: null,
        // uploadAmount: null,
        // downloadAmount: null,
        // author: null,
      },
      currentPage: 1,
      currentType: null,
      pagesize: 5,
      dialogTableVisible: false,
      borrowBook: { bookId: null, bookName: null },
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
        url: "/BookType/" + this.userId + "/" + (this.currentPage - 1),
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
        url: "/BookType/" + this.userId + "/" + (this.currentPage - 1),
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
      this.borrowBook.bookName = e.bookName;
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
        url: "/BookType/" + this.userId + "/" + (this.currentPage - 1),
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
        console.log("传入后端的类型：" + this.book.type);
        console.log("当前书的类型ID：" + this.currentType);
      } else if (e == "3") {
        this.book.length = null;
      } else if (e == "4") {
        this.book.theme = null;
      }
    },
    borrow() {
      this.$axios({
        method: "post",
        url: "/BookType/" + this.userId + "/" + (this.currentPage - 1),
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
.main-container {
  position: absolute;
  width: 100%;
}

@font-face {
  font-family: "FZZhaoMFXSJF";
  src: url("../assets/font/FZZhaoMFXSJF.TTF");
}

.main-container .desc {
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

.el-breadcrumb__separator {
  margin: 0 9px;
  font-weight: 700;
  color: #031436;
}

.select-container {
  margin-top: 10px;
}

.select-container .select {
  display: flex;
  width: 80%;
  margin-left: 10%;
  justify-content: space-around;
}

.select-container .desc {
  color: black;
  font-size: 30px;
  margin-top: 2px;
  margin-right: -40px;
  letter-spacing: -5px;
  font-family: "FZZhaoMFXSJF";
}

.select-container .check {
  margin-left: 73%;
  margin-top: 5px;
}

.search-container {
  margin-top: 100px;
  margin-left: 60%;
}

.search-container .item {
  width: 200px;
  margin-left: 10%;
}

.search-container .search {
  margin-top: -40px;
  margin-left: -10px;
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
  margin-top: 5px;
  margin-bottom: 20px;
}

.bookinfo-container {
  margin-top: 50%;
}
</style>