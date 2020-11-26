<template>
  <div class="container">
    <!-- 选择器 -->
    <div class="multiSelector">
      <!-- 选择器1 -->
      <span class="pre1">国家</span>
      <el-select
        v-model="value1"
        placeholder="请选择国家"
        clearable
        filterable 
        @change="currentBookNation($event)"
        @clear="noSelect(1)"
      >
        <el-option
          v-for="item in nation"
          :key="item.id"
          :label="item.nation"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <!-- 选择器2 -->
      <span class="pre"> 类型</span>
      <el-select
        v-model="value2"
        placeholder="请选择类型"
        clearable
        filterable
        @change="currentBookType($event)"
        @clear="noSelect(2)"
      >
        <el-option
          v-for="item in type"
          :key="item.id"
          :label="item.type"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <!-- 选择器3 -->
      <span class="pre"> 篇幅</span>
      <el-select
        v-model="value3"
        placeholder="请选择篇幅"
        clearable
        @change="currentBookLength($event)"
        @clear="noSelect(3)"
      >
        <el-option
          v-for="item in length"
          :key="item.id"
          :label="item.length"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <!-- 选择器4 -->
      <span class="pre"> 主题</span>
      <el-select
        v-model="value4"
        placeholder="请选择主题"
        clearable
        filterable
        @change="currentBookTheme($event)"
        @clear="noSelect(4)"
      >
        <el-option
          v-for="item in theme"
          :key="item.id"
          :label="item.theme"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <!--搜索按钮 -->
      <el-button
        class="searchButton"
        type="primary"
        icon="el-icon-search"
        @click="searchByType"
        >搜索</el-button
      >
    </div>
    <!-- 关键字搜索 -->
    <div class="keywordSearch">
      <el-input
        class="inputText"
        v-model="book.bookName"
        placeholder="请输入书名"
      ></el-input>
      <el-button type="primary" @click="searchByType"> 搜索</el-button>
    </div>
    <!-- 书本详情表格 -->
    <div class="borrowInfo">
      <el-table
        :data="bookData"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
        class="table"
      >
        <el-table-column prop="bookName" label="书名" width="150">
        </el-table-column>
        <el-table-column prop="nation" label="国家" width="150">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="150">
        </el-table-column>

        <el-table-column prop="length" label="篇幅" width="150">
        </el-table-column>
        <el-table-column prop="theme" label="主题" width="150">
        </el-table-column>
        <el-table-column prop="storeDate" label="上架日期" width="200">
        </el-table-column>
        <!-- 按钮 -->
        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="primary"
                size="small"
                slot="reference"
                >{{ boorowStatus }}</el-button
              >
          </template>
        </el-table-column>
      </el-table>
      <!-- 对话框 -->
      <div class="dialog">
        <el-dialog
          title="书本借阅详情"
          :visible.sync="dialogVisible"
          width="50%"
          :close-on-click-modal="false"
        >
          <div>
            <el-row :gutter="20">
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  书名:{{ book1.bookName }}
                </div></el-col
              >
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  剩余数量:{{ book1.leftAmount }}
                </div></el-col
              >
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  借出数量:{{ book1.uploadAmount - book1.leftAmount }}
                </div></el-col
              >
            </el-row>

            <el-table :data="borrowInfo" style="width: 100%" 
            height="250" :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }">
              <el-table-column prop="name" label="借阅人" width="100">
              </el-table-column>
              <el-table-column prop="borrowTime" label="借阅日期" width="150">
              </el-table-column>

              <el-table-column prop="retTime" label="应归还日期" width="150">
              </el-table-column>
              <el-table-column prop="validTime" label="距归还还剩" width="150">
              </el-table-column>
            </el-table>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="5"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "", //绑定搜索输入框
      currentPage: 1, //当前页
      dialogVisible: false,  //对话框默认不显示
      boorowStatus: "借阅详情", //按钮显示的文字
      total: 0,  //信息总数
      currentType: null,   //当前书本类型
      
      book: {
        bookId: null,
        bookName: null,
        nation: null,
        type: null,
        length: null,
        theme: null,
        status: null,
        storeDate: null,
        leftAmount: null,
        uploadAmount: null,
        downloadAmount: null,
        author: null,
      },
      book1: {}, //本行书本信息
      nation: [], //所有的国家
      type: [],  //所有的类型
      length: [],  // 所有的篇幅
      theme: [],  //所有的主题
      bookData: [],  //当页书本信息
      borrowInfo: [],  //书本借阅详情
      value1: [],    //第一个搜索框选中的数据
      value2: [],
      value3: [],
      value4: [],
    };
  },

  methods: {
    //点击换页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      if (this.book == null && this.input==null) {
        this.getBookData();
      } else {
        this.searchByTypePage();
      }
    },
    //分页获取所有图书
    getBookData() {
      console.log("获得所有图书信息");
      console.log(this.currentPage);
      this.$axios
        .get("/managerBookByPage/" + (this.currentPage - 1))
        .then((res) => {
          this.bookData = res.data;
          console.log(this.bookData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取用户数量
    managerBookCount() {
      console.log("获取用户数量");
      this.$axios
        .get("/managerBookCount")
        .then((res) => {
          this.total = res.data;
          console.log(this.total);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取所有的国家数据
    getSelectNation() {
      this.$axios({
        method: "get",
        url: "/bookNation",
      })
        .then((res) => {
          this.nation = res.data;
          console.log(this.nation.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //根据类型搜索
    searchByType() {
      this.total = this.getTypeCount();
      this.searchByTypePage();
    },
    //对搜出来的数据进行分页
    searchByTypePage() {
      this.$axios({
        method: "post",
        url: "/managerFindBookByType/" + (this.currentPage - 1),
        data: this.book,
      })
        .then((res) => {
          this.bookData = res.data;
          console.log("上面的查询查询得到的书籍总数" + this.bookData.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //清空选择框
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
    //获取所有的篇幅信息
    getSelectLength() {
      this.$axios({
        method: "get",
        url: "/bookLength",
      })
        .then((res) => {
          this.length = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取总共的主题信息
    getSelectTheme() {
      this.$axios({
        method: "get",
        url: "/bookTheme/" + this.currentType,
      })
        .then((res) => {
          this.theme = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取所有的类型信息
    getSelectType() {
      this.$axios({
        method: "get",
        url: "/bookType",
      })
        .then((res) => {
          this.type = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //取得类型选择框当前信息
    currentBookType(e) {
      let obj = {};
      obj = this.type.find((item) => {
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
      obj = this.nation.find((item) => {
        return item.id === e;
      });
      this.book.nation = obj.nation;
      console.log("传入后端的国家：" + this.book.nation);
    },
    currentBookLength(e) {
      let obj = {};
      obj = this.length.find((item) => {
        return item.id === e;
      });
      this.book.length = obj.length;
      console.log("传入后端的篇幅：" + this.book.length);
    },
    currentBookTheme(e) {
      let obj = {};
      obj = this.theme.find((item) => {
        return item.id === e;
      });
      this.book.theme = obj.theme;
      console.log("传入后端的主题：" + this.book.theme);
    },
    //获取分类之后搜索得到的数据总数
    getTypeCount() {
      console.log("------------" + this.book.bookName);
      this.$axios({
        method: "post",
        url: "/BookTypeCount",
        data: this.book,
      })
        .then((res) => {
          this.total = res.data;
          console.log("用户查询书的数量：" + this.total);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //点击状态按钮
    handleClick(book) {
      console.log(book);
      this.book1 = book;
      this.dialogVisible = true;
      this.$axios
        .get("/managerBookUserList/" + book.bookId)
        .then((res) => {
          this.borrowInfo = res.data;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getSelectNation();
    this.managerBookCount();
    this.getBookData();
    this.getSelectLength();
    this.getSelectType();
  },
};
</script>

<style scoped>
.multiSelector {
  margin-top: 20px;
  margin-left: -10%;
}
.multiSelector .pre {
  margin-left: 5px;
  font-size: 30px;
  font-family: "FZZhaoMFXSJF";
  color: black;
}
.multiSelector .pre1 {
  font-size: 30px;
  font-family: "FZZhaoMFXSJF";
  color: black;
}
.el-select{
  width: 180px;
}
.searchButton {
  margin-left: 1%;
}
.inputText {
  width: 250px;
}
.keywordSearch {
  margin-left: 400px;
  margin-top: 20px;
}
.table {
  width: 1100px;
  margin-left: 10%;
  margin-top: 10px;
}
.block {
  margin-left: 15%;
  margin-top: 5px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
