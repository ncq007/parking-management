<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">停车缴费后台管理系统</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          class="pl20"
          prefix-icon="el-icon-user-solid"
          v-model="loginForm.username"
          placeholder="账号"
          type="text"
          tabindex="1"
          auto-complete="on"
          @change="usernameChange"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="pl20"
          prefix-icon="el-icon-lock"
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getPublicKey } from '@/api/user'
import JSEncrypt from 'jsencrypt'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'super_admin',
        password: 'admin@park'
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      redirect: undefined,
      flag: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    usernameChange () {
      this.flag = true
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
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 登录前要先获取公钥，用于登录时账号和密码的加密
          getPublicKey({
            loginName: this.loginForm.username
          }).then(response => {
            if (response.code === '100') {
              // 将用户名以及密码进行加密
              const pk = response.info
              let username = this.loginForm.username
              let usernameEn = this.encryption(this.loginForm.username, pk)
              let passwordEn = this.encryption(this.loginForm.password, pk)
              this.$store.dispatch('user/login', { username, usernameEn, passwordEn, pk }).then(() => {
                // 如果不进行以下判断的话，切换用户之后会跳到上一个用户用的路由，会造成第一次登录就 404 的情况
                if (this.flag) this.$router.push('/')
                else this.$router.push({ path: this.redirect || '/' })
                this.loading = false
              }).catch(() => {
                this.loading = false
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
