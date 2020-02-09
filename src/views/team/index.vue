<template>
  <div class="app-container box">
    <div class="filter-container">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="search"
        style="width: 200px"
      ></el-input>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 10px;"
        @click="handleFilter"
      >Search</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >Add</el-button>
    </div>
    <el-table :data="tableData" stripe border style="width:100%;margin-top: 20px">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="名称" width="150"></el-table-column>
      <el-table-column prop="leader" label="发起人" width="150"></el-table-column>
      <el-table-column prop="num" label="成员数" width="150"></el-table-column>
      <el-table-column prop="match" label="所属比赛" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="团队信息" :visible.sync="dialogFormVisible">
      <el-form :model="info">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发起人" :label-width="formLabelWidth">
          <el-input v-model="info.leader" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="成员数" :label-width="formLabelWidth">
          <el-input v-model="info.num" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="所属比赛" :label-width="formLabelWidth">
          <el-input v-model="info.match" autocomplete="off"></el-input>
        </el-form-item>       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      background
      class="page"
      layout="prev, pager, next"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :pager-count="5"
      :total="totalNum"
    ></el-pagination>
  </div>
</template>

<script>
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle
} from "@/api/article";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    return {
      activeIndex: "1",
      totalNum: 12,
      pageSize: 6,
      currentPage: 1,
      search: "",
      dialogFormVisible:false,
      formLabelWidth:'100px',
      info:{},
      default:{
         id: undefined,
          name: "",
          leader: "",
          num: "",
          match: ""
      },
      tableData: [
        { 
        id:1,
        name: "团队1",
          leader: "张三",
          num: "3",
          match: "大夏杯"
        },
        {
            id:2,
          name: "团队2",
          leader: "张三",
          num: "3",
          match: "大夏杯"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.info = row;

    },
    handleCreate(){
      this.dialogFormVisible = true;
      this.info = this.default;

    }
  }
};
</script>
<style scoped>
.page {
  position: fixed;
  bottom: 30px;
  left: 50%;
}
</style>

