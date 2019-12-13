<template>
  <div class="pd20">
    <el-card :body-style="{ padding: '20px' }">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="width: 500px;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入" :disabled="$route.query.type === 'edit'"></el-input>
        </el-form-item>
        <el-form-item label="密码" :prop="$route.query.type === 'add' ? 'password' : ''">
          <el-input v-model="form.password" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" style="width: 100%;">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单权限" prop="access">
          <el-checkbox-group v-model="form.access">
            <el-checkbox v-for="item in accessList" :key="item.id" :label="item.id">{{ item.resourceName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="停车场" prop="park">
          <el-checkbox-group v-model="form.park">
            <el-checkbox v-for="item in parkList" :key="item.parkId" :label="item.parkId">{{ item.parkName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="tc">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="ok" :loading="loading">确认</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { userSave, userListResource, userListPark, findUserById, isUserExist } from '@/api/user-management'
import JSEncrypt from 'jsencrypt'
export default {
  name: '',
  data () {
    return {
      loading: false,
      form: {
        id: '',
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
      accessList: [],
      parkList: []
    }
  },
  created () {
    this.getAccessList()
    this.getParkList()
    // 编辑先回显
    if (this.$route.query.type === 'edit') this.init()
  },
  methods: {
    init () {
      findUserById({
        id: this.$route.query.id
      }).then(response => {
        console.log('findUserById', response)
        const { info } = response
        this.form.id = info.id
        this.form.name = info.realName
        this.form.account = info.loginName
        this.form.status = info.status
        this.form.access = info.resourceIds.map(e => e.resourceId)
        this.form.park = info.parkIds.map(e => e.parkId)
      })
    },
    getParkList () {
      userListPark({ parkName: '' }).then(response => {
        console.log('getParkList response', response)
        this.parkList = response.info
      })
    },
    getAccessList () {
      userListResource({ resourceName: '' }).then(response => {
        console.log('userListResource response', response)
        // resourceType 为 0 的才是侧边菜单栏目
        this.accessList = response.info.filter(e => e.resourceType === '0')
      })
    },
    cancel () {
      this.$router.push('/user-management')
    },
    // RSA 加密
    encryption (str, pk) {
      let pubKey = `-----BEGIN PUBLIC KEY-----
      ${pk}
      -----END PUBLIC KEY-----` // ES6 模板字符串 引用 rsa 公钥
      let encryptStr = new JSEncrypt()
      encryptStr.setPublicKey(pubKey) // 设置 加密公钥
      let data = encryptStr.encrypt(str.toString())  // 进行加密
      return data
    },
    ok () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 新增时需要判断用户是否存在，编辑时不能修改用户名，所以不需要判断
          if (this.$route.query.type === 'add') {
            // 先判断用户是否存在
            isUserExist({ userName: this.form.account }).then(response => {
              console.log('isUserExist response', response)
              const { info } = response
              if (info.exist) {
                this.$message.info(info.remark)
              } else {
                this.add()
              }
            })
          } else {
            this.add()
          }
        } else {
          this.$message.error('请核对表单字段！')
        }
      })
    },
    // 新增或编辑用户
    add () {
      const pk = sessionStorage.getItem('pk')
      let passwordEn = this.encryption(this.form.password, pk)
      this.loading = true
      // 新增用户
      userSave({
        id: this.form.id,
        userName: this.form.account,
        realName: this.form.name,
        password: passwordEn,
        status: this.form.status,
        resourceIds: this.form.access,
        parkIds: this.form.park
      }).then(response => {
        this.loading = false
        this.$message.success(`${this.$route.query.type === 'add' ? '新增' : '编辑'}用户成功！`)
        this.$router.push('/user-management')
      })
    }
  }
}
</script>

<style lang="" scoped>
</style>
