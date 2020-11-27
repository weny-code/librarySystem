<template>
  <div class="container">
    <!--搜索框-->
    <div class="demo-input-suffix">
      <el-input
        placeholder="请输入用户名或者账号"
        class="searchInput"
        v-model="user.name"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button
        class="button"
        type="primary"
        icon="el-icon-search"
        @click="search"
        >搜索</el-button
      >
    </div>
    <div class="list">
    <!-- 对话框 -->
      <el-dialog title="借阅详情" :visible.sync="dialogTableVisible">
        <div class="user">用户名:{{ userName }}</div>
        <!-- 弹出框中的表格 -->
        <el-table :data="gridData">
          <el-table-column
            property="bookName"
            label="书名"
            width="150"
          ></el-table-column>
          <el-table-column
            property="nation"
            label="国家"
            width="100"
          ></el-table-column>
          <el-table-column property="type" label="类型"></el-table-column>
          <el-table-column property="length" label="篇幅"></el-table-column>
          <el-table-column property="theme" label="主题"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <!-- 删除确认 -->
          <template>
            <el-button type="primary" slot="reference" @click="diaWithraw"
              >注销</el-button
            >
          </template>
          <!-- 取消 -->
          <el-button @click="dialogTableVisible = false">取 消</el-button>
        </div>
        <!-- 对话框内分页器 -->
          <el-pagination
            @current-change="diaHandleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="5"
            background
            layout="prev, pager, next, jumper"
            :total="total1"
          >
          </el-pagination>
      </el-dialog>
      <!-- 用户信息主体 -->
      <el-table
        class="userInfor"
        :data="userData"
        border
        style="width: 82%"
        :highlight-current-row="true"
      >
        <el-table-column
          fixed
          prop="name"
          label="姓名"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="userAccount" label="账号" width="100" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="150" align="center">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120" align="center">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="150" align="center">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="250"
          align="center"
        >
        </el-table-column>
        <!-- 按钮 -->
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="checkUser(scope.row)" type="primary" size="mini"
              >查看</el-button
            >
            <el-button
              slot="reference"
              type="primary"
              size="mini"
              @click="withraw(scope.row)"
              >注销</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
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
      keyWord: "", //搜索关键字
      currentPage: 1, 
      total: 0,  //用户信息总数
      total1: 0,  //对话框内的数据总数
      dialogTableVisible: false,
      currentPage1: 1,  //对话框内的当前页
      pageSize: 5,  
      userName: "",
      userId: sessionStorage.getItem("userId"),
      userAccount:"",
      user: {
        name: null,
        index: null,
      },
      user1: {},  //暂存当前行的用户信息
      userData: [],
      gridData: [],
    };
  },
  methods: {
    //换页方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.user.name != null) {
        this.getSearchResultPage()
      } else {
        this.getUserData();
      }
    },
    //对话框内的换页
    diaHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage1 = val;
      this.getInforByPage();
    },

    getSearchResultPage(){
       this.$axios({
        method: "post",
        url: "/findUserByExample/" + (this.currentPage - 1),
        data: {
          name: this.user.name,
          index: this.user.index,
        },
      })
        .then((res) => {
          this.userData = res.data;
          console.log("请求成功");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 点击搜索
    search() {
      this.currentPage = 1;
      console.log("点击了搜索");
      console.log(this.user.name);
      this.getSearchUserCount();
      this.getSearchResultPage();
    },
    // 得到搜索结果的总数
    getSearchUserCount() {
      this.$axios({
        method: "post",
        url: "/findUserByExampleCount",
        data: {
          name: this.user.name,
        },
      })
        .then((res) => {
          console.log("得到搜索总数");
          this.total = res.data;
          console.log(this.total);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //得到用户借阅历史总条数
    getUserBorrCount() {
      this.$axios
        .get("/borrowCount/" + this.userId)
        .then((res) => {
          this.total1 = res.data.num;
          console.log("得到用户借阅历史总数")
          console.log(this.total1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //点击查看用户信息按钮
    checkUser(user) {
      this.gridData =null;
      this.currentPage1 = 1;
      this.dialogTableVisible = true;
      this.userName = user.name;
      this.user1 = user;
      this.userId = user.userId;
      console.log(user);
      this.getUserBorrCount();
      this.getInforByPage();
    },
    //用户借阅记录分页
    getInforByPage(){
      this.$axios({
        method: "post",
        url: "/borrowPage",
        data: {
          userId: this.userId,
          index: this.currentPage1 - 1,
        },
      })
        .then((res) => {
          this.gridData = res.data;
          console.log("得到用户借阅详情");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //注销用户
    withraw(user) {
      console.log("111");
      console.log(user);
      //  弹出框
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .get("/managerDeleteUser/" + user.userId)
            .then((res) => {
              if (res.data == 1) {
                this.$alert("删除成功", "删除用户", {
                  confirmButtonText: "确定",
                });
                this.total = this.total - 1;
                this.getUserData();
              } else if (res.data == 0) {
                this.$alert("用户还有书没还，注销失败!!", "删除用户", {
                  confirmButtonText: "确定",
                });
              } else {
                this.$alert("注销失败!!", "删除用户", {
                  confirmButtonText: "确定",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

      this.dialogTableVisible = false;
    },
    //对话框里面的注销方法
    diaWithraw() {
      console.log("111");
      console.log(this.user1);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .get("/managerDeleteUser/" + this.user1.userId)
            .then((res) => {
              if (res.data == 1) {
                this.total = this.total - 1;
                this.getUserData();
                this.dialogTableVisible = false;
                this.$alert("删除成功", "删除用户", {
                  confirmButtonText: "确定",
                });
              } else if (res.data == 0) {
                this.$alert("用户还有书没还，注销失败!!", "删除用户", {
                  confirmButtonText: "确定",
                });
              } else {
                this.$alert("注销失败!!", "删除用户", {
                  confirmButtonText: "确定",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //得到所有用户的信息
    getUserData() {
      this.$axios
        .get("/ManagerShowUserList/" + (this.currentPage - 1))
        .then((res) => {
          this.userData = res.data;
          console.log("获取用户信息")
          console.log(this.userData);
          console.log("111");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //得到所有用户数
    getAllUserCount() {
      this.$axios.post("/UserListCount").then((res) => {
        this.total = res.data;
        console.log(this.total);
      });
    },
  },

  created() {
    this.getAllUserCount();
    this.getUserData();
  },
};
</script>

<style scoped>
.searchInput {
  width: 300px;
}
.demo-input-suffix {
  margin-left: 600px;
  margin-top: 50px;
}

.page {
  margin-left: 400px;
}
.user {
  font-size: 18px;
  margin-bottom: 5px;
}
.userInfor {
  margin-left: 100px;
  border-radius: 4px;
}
.list{
  margin-top: 20px;
}
</style>
