<template>
  <div class="container">
    <div class="demo-input-suffix">
      <el-input
        placeholder="请输入关键字"
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
            <el-button
              type="primary"
              slot="reference"
              @click="withraw(scope.row)"
              >注销</el-button
            >
          </template>
          <!-- 取消 -->
          <el-button @click="dialogTableVisible = false">取 消</el-button>
        </div>
        <!-- 对话框内分页器 -->
        <div class="block">
          <el-pagination
            @current-change="diaHandleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="5"
            layout="prev, pager, next, jumper"
            :total="total1"
          >
          </el-pagination>
        </div>
      </el-dialog>

      <el-table
        :data="userData"
        border
        style="width: 95%"
        highlight-current-row="true"
      >
        <!-- 用户信息主体 -->
        <el-table-column
          fixed
          prop="name"
          label="姓名"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="userId" label="ID" width="100" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="120" align="center">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120" align="center">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="200" align="center">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="300"
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
      keyWord: "",
      currentPage: 1,
      total: 0,
      total1: 0,
      dialogTableVisible: false,
      currentPage1: 1,
      pageSize: 5,
      userName: "",
      userId: null,
      user: {
        name: null,
        index: null,
      },
      userData: [
        {
          userId: 0,
          name: "admin",
          gender: " 男",
          age: "22",
          email: "741478240@qq.com",
          birthday: "2000-10-01",
          phone: "1576707",
          address: "广东",
          description: "煞笔",
        },
      ],
      gridData: [
        {
          bookName: "三国演义",
          nation: "中国",
          type: "战争谋略",
          length: "30章",
          theme: "不知道",
        },
        {
          bookName: "三国演义",
          nation: "中国",
          type: "战争谋略",
          length: "30章",
          theme: "不知道",
        },
        {
          bookName: "三国演义",
          nation: "中国",
          type: "战争谋略",
          length: "30章",
          theme: "不知道",
        },
        {
          bookName: "三国演义",
          nation: "中国",
          type: "战争谋略",
          length: "30章",
          theme: "不知道",
        },
        {
          bookName: "三国演义",
          nation: "中国",
          type: "战争谋略",
          length: "30章",
          theme: "不知道",
        },
        {
          bookName: "三国演义",
          nation: "中国",
          type: "战争谋略",
          length: "30章",
          theme: "不知道",
        },
      ],
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.user.name != null) {
        this.search();
      } else {
        this.getUserData();
      }
    },
    diaHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage1 = val;
    },
    search() {
      console.log("点击了搜索");
      console.log(this.user.name);
      // this.getSearchUserCount()
      // this.$axios({
      //   methods:'post',
      //   url: '/findUserByExample/'+(this.currentPage-1),
      //   data:{
      //     name:  this.user.name,
      //     index:this.user.index
      //   }
      // })
      //   .then((res) => {
      //     this.userData = res.data;
      //     console.log("请求成功");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
    getSearchUserCount() {
      this.$axios({
        methods: "post",
        url: "/findUserByExampleCount",
        data: {
          name: this.user.name,
        },
      })
        .then((res) => {
          this.total = res.data;
          console.log(this.total);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getUserBorrCount() {
      this.$axios
        .get("/borrowCount/" + this.userId)
        .then((res) => {
          this.total1 = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    checkUser(user) {
      this.dialogTableVisible = true;
      this.userName = user.name;
      this.userId = user.userId;
      // this.getUserBorrCount()
      console.log(user);
      // this.$axios({
      //   methods: 'post',
      //   url: '/borrowPage',
      //   data: {
      //     userId: user.userId,
      //     index: this.currentPage1-1
      //   }
      // }).catch((error) => {
      //   console.log(error);
      // })
    },
    withraw(user) {
      this.open();
      console.log("111");
      this.dialogTableVisible = false;
      console.log(user);
      // this.$axios.get("/deleteUser/" + user.userId).then((res) => {
      //   if (res.data == 1) {
      //     this.$alert("删除成功", "删除用户", {
      //       confirmButtonText: "确定",
      //       callback: (action) => {
      //         this.$message({
      //           type: "info",
      //           message: `action: ${action}`,
      //         });
      //       },
      //     });
      //   } else if (res.data == 0) {
      //     this.$alert("删除失败!!", "删除用户", {
      //       confirmButtonText: "确定",
      //       callback: (action) => {
      //         this.$message({
      //           type: "info",
      //           message: `action: ${action}`,
      //         });
      //       },
      //     });
      //   }
      // }).catch((error) => {
      //   console.log(error)
      // });
    },
    // getUserData() {
    //   this.$axios
    //     .get("/showUserList/" + (this.currentPage - 1))
    //     .then((res) => {
    //       this.userData = res.data;
    //       console.log(this.userData);
    //       console.log("111");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // getAllUserCount(){
    //   this.$axios
    //   .post("/UserListCount")
    //   .then((res)=>{
    //     this.total = res.data
    //     console.log(this.total)
    //   })
    // },
    //  弹出框
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },

  created() {
    // this.getAllUserCount();
    // this.getUserData();
  },
};
</script>

<style scoped>
.searchInput {
  width: 300px;
}
.demo-input-suffix {
  margin-left: 600px;
  margin-top: 100px;
}
.list {
  margin-top: 20px;
}
.page {
  margin-left: 400px;
}
.user {
  font-size: 18px;
  margin-bottom: 5px;
}
</style>
