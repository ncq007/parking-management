<template>
  <div class="pd20">
    <el-card :body-style="{ padding: '20px' }">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="width: 500px;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" style="width: 100%;">
            <el-option label="状态一" value="1"></el-option>
            <el-option label="状态二" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单权限" prop="access">
          <el-checkbox-group v-model="form.access">
            <el-checkbox v-for="item in accessList" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="停车场" prop="park">
          <el-checkbox-group v-model="form.park">
            <el-checkbox v-for="item in parkList" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="tc">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="ok">确认</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      form: {
        name: '',
        account: '',
        password: '',
        status: '',
        access: [],
        park: []
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        access: [
          { required: true, type: 'array', min: 1, message: '请选择菜单权限', trigger: 'change' }
        ],
        park: [
          { required: true, type: 'array', min: 1, message: '请选择停车场', trigger: 'change' }
        ]
      },
      accessList: [
        { value: 1, label: '缴费详情' },
        { value: 2, label: '退款记录' },
        { value: 3, label: '用户管理' }
      ],
      parkList: [
        { value: 1, label: '中建大公馆' },
        { value: 2, label: '中建光谷之星' },
        { value: 3, label: '中建康城' }
      ]
    }
  },
  methods: {
    cancel () {},
    ok () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$message.success('新增用户成功！')
          this.$router.push('/user-management')
        } else {
          this.$message.error('请核对表单字段！')
        }
      })
    }
  }
}
</script>

<style lang="" scoped>
</style>
