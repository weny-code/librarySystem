<template>
  <el-container>
    <el-main>
      <div class="select-container">
        <div class="select">
          <div class="desc">国家</div>
          <el-select
            v-model="value1"
            style="width: 150px"
            clearable
            filterable
            placeholder="请选择国家"
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
            filterable
            placeholder="请选择类型"
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
            placeholder="请选择篇幅"
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
            no-data-text="请先选择书籍类型"
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
            <el-button type="primary" v-on:click="queryBook">查询</el-button>
            <el-button
              type="primary"
              icon="el-icon-plus"
              v-on:click="addBook(ruleForm)"
            ></el-button>
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
              align="center"
              prop="book.nation"
              label="国家"
              width="100"
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
              align="center"
              prop="book.theme"
              label="主题"
              width="100"
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
              prop="book.leftAmount"
              label="剩余数量"
              width="100"
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
              prop="status"
              label="操作"
              width="100"
              header-align="center"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  round
                  v-on:click="showBook(scope.row), (dialogTableVisible = true)"
                  >编辑</el-button
                >
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
      <!-- 添加书籍 -->
      <div class="dialog-container">
        <el-dialog
          :visible.sync="dialogTableVisible2"
          :close-on-click-modal="false"
        >
          <el-form
            label-width="80px"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            inline="true"
          >
            <el-form-item label="书名" prop="bookName">
              <el-input
                style="width: 500px"
                v-model="ruleForm.bookName"
              ></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input
                v-model="ruleForm.author"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select
                v-model="ruleForm.type"
                placeholder="请选择书籍类型"
                @change="currentBookType2($event)"
                clearable
                filterable
                style="width: 200px"
              >
                <el-option
                  v-for="item in typeData"
                  :key="item.id"
                  :label="item.type"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="国家" prop="nation">
              <el-select
                v-model="ruleForm.nation"
                placeholder="请选择书籍国家"
                clearable
                filterable
                style="width: 200px"
              >
                <el-option
                  v-for="item in nationData"
                  :key="item.id"
                  :label="item.nation"
                  :value="item.nation"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主题" prop="theme">
              <el-select
                v-model="ruleForm.theme"
                placeholder="请先选择书籍类型"
                clearable
                no-data-text="请先选择书籍类型"
                style="width: 200px"
              >
                <el-option
                  v-for="item in themeData"
                  :key="item.id"
                  :label="item.theme"
                  :value="item.theme"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上架数量" prop="uploadAmount">
              <el-input
                v-model.number="ruleForm.uploadAmount"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="篇幅" prop="length">
              <el-select
                v-model="ruleForm.length"
                placeholder="请选择书籍篇幅"
                clearable
                style="width: 200px"
              >
                <el-option
                  v-for="item in lengthData"
                  :key="item.id"
                  :label="item.length"
                  :value="item.length"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="简介" prop="summary">
              <el-input
                type="textarea"
                v-model="ruleForm.summary"
                style="width: 500px"
                :rows="4"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('ruleForm')"
                >添加</el-button
              >
              <el-button @click="dialogTableVisible2 = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <!-- 编辑书籍 -->
      <div class="dialog-container">
        <el-dialog
          :visible.sync="dialogTableVisible"
          :close-on-click-modal="false"
        >
          <el-form
            label-width="80px"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            inline="true"
          >
            <el-form-item label="书名" prop="bookName">
              <el-input
                style="width: 500px"
                v-model="ruleForm.bookName"
              ></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input
                v-model="ruleForm.author"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select
                v-model="ruleForm.type"
                placeholder="请选择书籍类型"
                @change="currentBookType2($event)"
                clearable
                filterable
                style="width: 200px"
              >
                <el-option
                  v-for="item in typeData"
                  :key="item.id"
                  :label="item.type"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="国家" prop="nation">
              <el-select
                v-model="ruleForm.nation"
                placeholder="请选择书籍国家"
                clearable
                filterable
                style="width: 200px"
              >
                <el-option
                  v-for="item in nationData"
                  :key="item.id"
                  :label="item.nation"
                  :value="item.nation"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主题" prop="theme">
              <el-select
                v-model="ruleForm.theme"
                placeholder="请先选择书籍类型"
                clearable
                no-data-text="请先选择书籍类型"
                style="width: 200px"
              >
                <el-option
                  v-for="item in themeData"
                  :key="item.id"
                  :label="item.theme"
                  :value="item.theme"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上架数量" prop="uploadAmount">
              <el-input
                v-model.number="ruleForm.uploadAmount"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="篇幅" prop="length">
              <el-select
                v-model="ruleForm.length"
                placeholder="请选择书籍篇幅"
                clearable
                style="width: 200px"
              >
                <el-option
                  v-for="item in lengthData"
                  :key="item.id"
                  :label="item.length"
                  :value="item.length"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="简介" prop="summary">
              <el-input
                type="textarea"
                v-model="ruleForm.summary"
                style="width: 500px"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit2(ruleForm)"
                >保存</el-button
              >
              <el-button @click="dialogTableVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "bookstore",
  data() {
    var checkUploadAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value <= 0) {
            callback(new Error("上架数量必须大于0！"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      count: null,
      userId: sessionStorage.getItem("userId"),
      book: {
        bookId: null,
        bookName: null,
        nation: null,
        type: null,
        length: null,
        theme: null,
        status: null,
        leftAmount: null,
        summary: null,
        uploadAmount: null,
        author: null,
      },
      currentPage: 1,
      currentType: null,
      pagesize: 5,
      dialogTableVisible: false,
      dialogTableVisible2: false,
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
      ruleForm: {
        bookId: "",
        bookName: "",
        nation: "",
        type: "",
        length: "",
        theme: "",
        status: "",
        leftAmount: "",
        summary: "",
        uploadAmount: "",
        author: "",
      },
      rules: {
        bookName: [
          { required: true, message: "请输入书籍名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        nation: [
          { required: true, message: "请选择书籍国家", trigger: "change" },
        ],
        type: [
          { required: true, message: "请选择书籍类型", trigger: "change" },
        ],
        length: [
          { required: true, message: "请选择书籍篇幅", trigger: "change" },
        ],
        theme: [
          { required: true, message: "请选择书籍主题", trigger: "change" },
        ],
        uploadAmount: [
          { required: true, message: "请输入上架数量", trigger: "blur" },
          { validator: checkUploadAmount, trigger: "blur" },
        ],
        author: [
          { required: true, message: "请输入书籍作者", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        summary: [
          { required: true, message: "请输入书籍简介", trigger: "blur" },
          {
            min: 1,
            max: 500,
            message: "长度在 1 到 500 个字符",
            trigger: "blur",
          },
        ],
      },
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
      this.count = this.getTypeCount();
      this.currentPage = 1;
      this.$axios({
        method: "post",
        url: "/BookType/" + this.userId + "/" + (this.currentPage - 1),
        data: { bookName: this.book.bookName },
      })
        .then((res) => {
          this.tableData = res.data;
          console.log("下面的搜索得到的书籍总数" + this.tableData.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showBook(e) {
      this.ruleForm = Object.assign({}, e.book);
      console.log("类型为：" + typeof this.ruleForm);
      console.log("当前行的书名：" + this.ruleForm.bookName);
      console.log("当前行的国家：" + this.ruleForm.nation);
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
    getSelectTheme2() {
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
      this.themeData = null;
      this.getSelectTheme();
    },
    currentBookType2(e) {
      let obj = {};
      obj = this.typeData.find((item) => {
        return item.id === e;
      });
      this.currentType = obj.id;
      this.ruleForm.type = obj.type;
      this.themeData = null;
      console.log("当前书的类型ID：" + this.currentType);
      this.getSelectTheme2();
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
      this.currentPage = 1;
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
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "/BookInsert",
            data: this.ruleForm,
          })
            .then((res) => {
              if (res.data == "1") {
                this.$message({
                  message: "添加成功！",
                  type: "success",
                });
                this.getBookTable();
                this.dialogTableVisible = false;
              } else if (res.data == "-1") {
                this.$message.error("添加失败！已存在重名书籍！");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmit2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "/BookInfoUpdate",
            data: this.ruleForm,
          })
            .then((res) => {
              if (res.data == "1") {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
                this.getBookTable();
                this.dialogTableVisible = false;
              } else {
                this.$message.error("修改失败，不能超过剩余数量！");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addBook(formName) {
      for (let key in this.ruleForm) {
        this.ruleForm[key] = "";
      }
      setTimeout(() => {
        this.$nextTick(function () {
          this.$refs[formName].resetFields();
          this.$refs.ruleForm.resetFields();
        });
      }, 100);
      this.themeData = null;
      this.dialogTableVisible2 = true;
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
.el-main {
  background-color: rgb(217, 236, 255);
  color: #333;
  text-align: center;
  padding: 0px;
  /* line-height: 200px; */
}

body > .el-container {
  margin: 0;
  padding: 0;
  width: 100%;
}

.select-container {
  margin-top: 20px;
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
  margin-right: -10px;
  letter-spacing: -5px;
  font-family: "FZZhaoMFXSJF";
}

.select-container .check {
  margin-left: 5px;
}

.search-container {
  margin-top: 70px;
  margin-left: 63%;
}

.search-container .item {
  width: 150px;
  margin-left: 30%;
}

.search-container .search {
  margin-top: -40px;
  margin-left: 160px;
}

.show-container {
  display: flex;
  margin-top: 10px;
  width: 100%;
  justify-content: center;
}

.show-container .booktable {
  width: auto;
}

.page-container {
  margin-top: 10px;
  margin-left: 40%;
}

.dialog-container {
  margin-top: 5%;
  width: 500px;
}
</style>