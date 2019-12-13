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
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
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
import { userList, delUserById, resetPwd } from '@/api/user-management'
export default {
  name: '',
  data () {
    return {
      form: {
        user: '',
        name: '',
        status: ''
      },
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total: 200
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      userList({
        userName: this.form.user,
        realName: this.form.name,
        status: this.form.status
      }).then(response => {
        console.log('userList response', response)
        this.tableData = []
        response.info.list.forEach(e => {
          this.tableData.push({
            id: e.id,
            user: e.loginName,
            name: e.realName,
            status: e.statusCn,
            updateTime: this.moment(e.updateTime).format('YYYY-MM-DD HH:mm:ss')
          })
        })
        this.total = response.info.totalCount
      })
    },
    edit (item) {
      this.$router.push('/user-management/user-add?type=edit&id=' + item.id)
    },
    del (item) {
      this.$confirm('确定要删除该用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUserById({ id: item.id }).then(response => {
          this.$message.success('删除成功！')
          this.init()
        })
      }).catch(() => {})
    },
    resetPwd (item) {
      this.$confirm('确定要重置该用户登录密码？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetPwd({ id: item.id }).then(response => {
          this.$message.success('重置成功！')
          this.init()
        })
      }).catch(() => {})
    },
    query () {
      this.currentPage = 1
      this.init()
    },
    reset () {
      this.form = {
        user: '',
        name: '',
        status: ''
      }
      this.query()
    },
    add () {
      this.$router.push('/user-management/user-add?type=add')
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.query()
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
