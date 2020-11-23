<template>
  <div class="container">
    <!-- 选择器 -->
    <div class="multiSelector">
      <!-- 选择器1 -->
      <span class="pre1">国家</span>
      <el-select
        v-model="value1"
        placeholder="请选择"
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
        placeholder="请选择"
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
        placeholder="请选择"
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
        placeholder="请选择"
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
        v-model="input"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="primary" @click="search"> 搜索</el-button>
    </div>
    <!-- 借阅详情 -->
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
        <el-table-column width="150" label="借阅状态">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              title="提示"
              width="100"
              trigger="hover"
              content="点击查看借阅详情"
            >
              <el-button
                @click="handleClick(scope.row)"
                type="primary"
                size="small"
                slot="reference"
                >{{ boorowStatus }}</el-button
              >
            </el-popover>
          </template>
        </el-table-column>
      </el-table>

      <div class="dialog">
        <el-dialog
          title="用户借阅详情"
          :visible.sync="dialogVisible"
          width="50%"
        >
          <div>
            <el-row :gutter="20">
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  书名:{{ book.bookName }}
                </div></el-col
              >
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  剩余数量:{{ leftNum }}
                </div></el-col
              >
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  借出数量:{{ borrowNum }}
                </div></el-col
              >
            </el-row>

            <el-table :data="borrowInfo" style="width: 100%">
              <el-table-column prop="borrowName" label="借阅人" width="180">
              </el-table-column>
              <el-table-column prop="borrowDate" label="借阅日期" width="180">
              </el-table-column>
              <el-table-column prop="borrowValid" label="有效期">
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
      input: "",
      currentPage: 1,
      dialogVisible: false,
      leftNum: "6",
      borrowNum: "4",
      boorowStatus: "可借",
      total: 0,
      currentType: null,
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
      currentSelected: {
        nation: null,
        type: null,
        length: null,
        theme: null,
      },
      nation: [],
      type: [
        // {
        //   value: "选项1",
        //   label: "黄金糕",
        // },
        // {
        //   value: "选项2",
        //   label: "双皮奶",
        // },
        // {
        //   value: "选项3",
        //   label: "蚵仔煎",
        // },
        // {
        //   value: "选项4",
        //   label: "龙须面",
        // },
        // {
        //   value: "选项5",
        //   label: "北京烤鸭",
        // },
      ],
      length: [
        // {
        //   value: "选项1",
        //   label: "黄金糕",
        // },
        // {
        //   value: "选项2",
        //   label: "双皮奶",
        // },
        // {
        //   value: "选项3",
        //   label: "蚵仔煎",
        // },
        // {
        //   value: "选项4",
        //   label: "龙须面",
        // },
        // {
        //   value: "选项5",
        //   label: "北京烤鸭",
        // },
      ],
      theme: [
        // {
        //   value: "选项1",
        //   label: "黄金糕",
        // },
        // {
        //   value: "选项2",
        //   label: "双皮奶",
        // },
        // {
        //   value: "选项3",
        //   label: "蚵仔煎",
        // },
        // {
        //   value: "选项4",
        //   label: "龙须面",
        // },
        // {
        //   value: "选项5",
        //   label: "北京烤鸭",
        // },
      ],
      bookData: [
        // {
        //   date: "2016-05-02",
        //   bookName: "水浒传",
        //   type: "不知道",
        //   length:"长篇",
        //   theme:"不知道",
        //   nation:"中国"
        // },
        //  {
        //   date: "2016-05-02",
        //   bookName: "水浒传",
        //   type: "不知道",
        //   length:"长篇",
        //   theme:"不知道",
        //   nation:"中国"
        // },
        // {
        //   date: "2016-05-02",
        //   bookName: "水浒传",
        //   type: "不知道",
        //   length:"长篇",
        //   theme:"不知道",
        //   nation:"中国"
        // },
        // {
        //   date: "2016-05-02",
        //   bookName: "水浒传",
        //   type: "不知道",
        //   length:"长篇",
        //   theme:"不知道",
        //   nation:"中国"
        // },
      ],
      borrowInfo: [
        {
          borrowName: "黑旋风李逵",
          borrowDate: "2019-8-8",
          borrowValid: "30天",
        },
        {
          borrowName: "黑旋风李逵",
          borrowDate: "2019-8-8",
          borrowValid: "30天",
        },
        {
          borrowName: "黑旋风李逵",
          borrowDate: "2019-8-8",
          borrowValid: "30天",
        },
      ],
       value1: [],
      value2: [],
      value3: [],
      value4: [],
    };
  },

  methods: {
    //点击换页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getBookData();
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
        .catch(function(error) {
          console.log(error);
        });
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
        .catch(function(error) {
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
        .catch(function(error) {
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
        .catch(function(error) {
          console.log(error);
        });
    },

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
    //搜索
    search() {
      this.$axios
        .get("url/input")
        .then((res) => {
          this.tableData = res.data;
          console.log(this.tableData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //点击状态按钮
    handleClick(book) {
      console.log(book);
      this.book = book;
      this.dialogVisible = true;
    },
    // searchByType(){
    //   this.$axios({
    //     methods: 'post',
    //     url: 'url',
    //     data:{
    //       bookNation: this.value1,
    //       bookType: this.value2,
    //       bookLength: this.value3,
    //       bookTheme: this.value4,
    //     }
    //   }).then((res) => {
    //     this.tableData = res.data
    //     console.log(this.tableData)
    //   }).catch(error=>{
    //     console.log(error)
    //   })
    // },
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
  margin-top: 50px;
  margin-left: -10%;
}
.multiSelector .pre {
  margin-left: 5px;
  font-size: 30px;
  font-family: "FZZhaoMFXSJF";
}
.multiSelector .pre1 {
  font-size: 30px;
  font-family: "FZZhaoMFXSJF";
}
.searchButton {
  margin-left: 1%;
}
.inputText {
  width: 300px;
}
.keywordSearch {
  margin-left: 300px;
  margin-top: 20px;
}
.table {
  width: 1100px;
  margin-left: 10%;
  margin-top: 10px;
}
.block {
  margin-left: 12%;
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
