<template>
  <div class="pd20">
    <el-card :body-style="{ 'padding-top': '20px' }">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="form.user" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="form.status" style="width: 100%;">
                <el-option label="状态一" value="1"></el-option>
                <el-option label="状态二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="mt20">
        <el-col :span="12">
          <el-button type="primary" @click="add">新 增</el-button>
        </el-col>
        <el-col :span="12" class="tr">
          <el-button type="primary" @click="query">查 询</el-button>
          <el-button @click="reset">重 置</el-button>
        </el-col>
      </el-row>
      <el-table class="mt20" :data="tableData" :header-cell-style="{ 'background-color': '#ebeef5' }" style="width: 100%">
        <el-table-column prop="user" label="用户名" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="resetPwd(scope.row)" type="text" size="small">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt20 tr">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      form: {
        user: '',
        name: '',
        status: ''
      },
      tableData: [
        { user: 'admin1', name: '郑醒', status: '启用', updateTime: '2019-12-03 12:46:58' },
        { user: 'admin1', name: '郑醒', status: '启用', updateTime: '2019-12-03 12:46:58' },
        { user: 'admin1', name: '郑醒', status: '启用', updateTime: '2019-12-03 12:46:58' },
        { user: 'admin1', name: '郑醒', status: '启用', updateTime: '2019-12-03 12:46:58' },
        { user: 'admin1', name: '郑醒', status: '启用', updateTime: '2019-12-03 12:46:58' }
      ],
      currentPage: 1,
      pageSize: 20,
      total: 200
    }
  },
  methods: {
    edit (item) {},
    del (item) {},
    resetPwd (item) {},
    query () {},
    reset () {},
    add () {
      this.$router.push('/user-management/user-add')
    },
    handleSizeChange () {},
    handleCurrentChange () {}
  }
}
</script>

<style lang="scss" scoped>
</style>
