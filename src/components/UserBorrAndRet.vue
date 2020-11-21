<template>
  <div class="container">
    <!-- 选择器 -->
    <div class="multiSelector">
      <!-- 选择器1 -->
      <span class="pre1">国家</span>
      <el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in nation"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 选择器2 -->
      <span class="pre"> 类型</span>
      <el-select v-model="value2" placeholder="请选择">
        <el-option
          v-for="item in type"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 选择器3 -->
      <span class="pre"> 篇幅</span>
      <el-select v-model="value3" placeholder="请选择">
        <el-option
          v-for="item in length"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 选择器4 -->
      <span class="pre"> 主题</span>
      <el-select v-model="value4" placeholder="请选择">
        <el-option
          v-for="item in theme"
          :key="item.value"
          :label="item.label"
          :value="item.value"
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
        :data="tableData"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
        class="table"
      >
        <el-table-column prop="date" label="书名" width="150">
        </el-table-column>
        <el-table-column prop="name" label="国家" width="150">
        </el-table-column>
        <el-table-column prop="address" label="类型" width="150">
        </el-table-column>

        <el-table-column prop="address" label="篇幅" width="150">
        </el-table-column>
        <el-table-column prop="address" label="主题" width="150">
        </el-table-column>
        <el-table-column prop="address" label="上架日期" width="200">
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
                >已借</el-button
              >
            </el-popover>
          </template>
        </el-table-column>
      </el-table>

      <div class="dialog">
        <el-dialog title="用户借阅详情" :visible.sync="dialogVisible" width="50%">
          <div>
            <el-row :gutter="20">
              <el-col :span="8"
                ><div class="grid-content bg-purple">13152</div></el-col
              >
              <el-col :span="8"
                ><div class="grid-content bg-purple">4542428</div></el-col
              >
              <el-col :span="8"
                ><div class="grid-content bg-purple">4272424</div></el-col
              >
            </el-row>

            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
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
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
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
      nation: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      type: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      length: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      theme: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      value1: "",
      value2: "",
      value3: "",
      value4: "",
    };
  },

  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    // search(){
    //   this.$axios
    //   .get("url/input")
    //   .then((res) => {
    //     this.tableData = res.data
    //     console.log(thsi.tableData)
    //   }).catch(error=>{
    //    console.log(error)
    //  })
    // },
    handleClick(book) {
      console.log(book);
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
