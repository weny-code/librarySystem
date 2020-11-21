<template>
  <div class="container">
    <div class="demo-input-suffix">
      <el-input
        placeholder="请输入关键字"
        class="searchInput"
        v-model="keyWord"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button class="button" type="primary" icon="el-icon-search"
        >搜索</el-button
      >
    </div>
    <div class="list">
       <el-dialog
              title="收货地址"
              :visible.sync="dialogTableVisible"
            >
              <!-- 弹出框中的表格 -->
              <el-table :data="gridData">
                <el-table-column
                  property="date"
                  label="日期"
                  width="150"
                ></el-table-column>
                <el-table-column
                  property="name"
                  label="姓名"
                  width="200"
                ></el-table-column>
                <el-table-column
                  property="address"
                  label="地址"
                ></el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <!-- 删除确认 -->
                <template>
                  <el-popconfirm title="这是一段内容确定删除吗？">
                    <el-button
                      type="primary"
                      slot="reference"
                      @click="withraw(scope.row)"
                      >注销</el-button
                    >
                  </el-popconfirm>
                </template>
                <!-- 取消 -->
                <el-button @click="dialogTableVisible = false">取 消</el-button>
              </div>
            </el-dialog>

      <el-table
        :data="userData"
        border
        style="width: 100%"
        highlight-current-row=true
      >
        <!-- 用户信息主体 -->
        <el-table-column
          fixed
          prop="userName"
          label="姓名"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="userId" label="ID" width="100" align="center">
        </el-table-column>
        <el-table-column prop="mail" label="邮箱" width="120" align="center">
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
        <el-table-column prop="tel" label="电话" width="120" align="center">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="200" align="center">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="50" align="center">
        </el-table-column>
        <el-table-column prop="describ" label="描述" width="300" align="center">
        </el-table-column>
        <!-- 按钮 -->
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="checkUser(scope.row)" type="primary" size="mini"
              >查看</el-button
            >
            <el-popconfirm title="这是一段内容确定删除吗？">
              <el-button
                slot="reference"
                type="primary"
                size="mini"
                @click="withraw(scope.row)"
                >注销</el-button
              >
            </el-popconfirm>
            <!-- 弹出框 -->
           
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
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
      dialogTableVisible: false,
      userData: [
        {
          userName: "xiaoming",
          userId: "1234",
          mail: "163.com",
          age: "18",
          birthday: "19990808",
          tel: "1234585322",
          address: "江门市五邑大学",
          sex: "男",
          describ: "神秘的美男子",
        },
        {
          userName: "xiaoming",
          userId: "1234",
          mail: "163.com",
          age: "18",
          birthday: "19990808",
          tel: "1234585322",
          address: "江门市五邑大学",
          sex: "男",
          describ: "神秘的美男子",
        },
        {
          userName: "xiaoming",
          userId: "1234",
          mail: "163.com",
          age: "18",
          birthday: "19990808",
          tel: "1234585322",
          address: "江门市五邑大学",
          sex: "男",
          describ: "神秘的美男子",
        },
        {
          userName: "xiaoming",
          userId: "1234",
          mail: "163.com",
          age: "18",
          birthday: "19990808",
          tel: "1234585322",
          address: "江门市五邑大学",
          sex: "男",
          describ: "神秘的美男子",
        },
        {
          userName: "xiaoming",
          userId: "1234",
          mail: "163.com",
          age: "18",
          birthday: "19990808",
          tel: "1234585322",
          address: "江门市五邑大学",
          sex: "男",
          describ: "神秘的美男子",
        },
        {
          userName: "xiaoming",
          userId: "1234",
          mail: "163.com",
          age: "18",
          birthday: "19990808",
          tel: "1234585322",
          address: "江门市五邑大学",
          sex: "男",
          describ: "神秘的美男子",
        },
        {
          userName: "xiaoming",
          userId: "1234",
          mail: "163.com",
          age: "18",
          birthday: "19990808",
          tel: "1234585322",
          address: "江门市五邑大学",
          sex: "男",
          describ: "神秘的美男子",
        },
      ],
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    checkUser(user) {
      this.dialogTableVisible = true;
      console.log(user);
    },
    withraw(user) {
      this.dialogTableVisible = false;
      console.log(user);
    },
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
</style>
