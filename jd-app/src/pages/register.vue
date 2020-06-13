<template>
  <div>
    <!-- <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div> -->

    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form ref="form" :model="formData" :rules="formRules" inline label-width="80px">
      <el-form-item label="用户名" prop="userAcct">
        <el-input v-model="formData.userAcct"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input type="password" v-model="formData.userPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmUserPassword">
        <el-input type="password" v-model="formData.confirmUserPassword"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="formData.phone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard">
        <el-input v-model="formData.idCard"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="formData.mail"></el-input>
      </el-form-item>
      <el-form-item label="邀请码" prop="inviteCode">
        <el-input v-model="formData.inviteCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary" @click="submit">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
        <div>
          <el-button type="text" @click="toLogin">返回登录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
const qs = require('qs')

export default {
  name: 'register',
  data () {
    return {
      formData: {},
      formRules: {
        userAcct: [
          {required: true, message: '请输入用户账号', trigger: 'change'}
        ],
        userPassword: [
          {required: true, message: '请输入用户密码', trigger: 'change'}
        ],
        confirmUserPassword: [
          {required: true, message: '请确认密码', trigger: 'change'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'change'},
          // { type: 'number', message: '手机号必须为数字' },
          { validator: this.validatePhone, trigger: 'change' }
        ],
        userName: [
          {required: true, message: '请输入用户名称', trigger: 'change'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        idCard: [
          {required: true, message: '请输入身份证', trigger: 'change'},
          { validator: this.validateIdCard, trigger: 'change' }
        ],
        mail: [
          {required: true, message: '请输入用户邮箱', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    toLogin () {
      this.$router.push({path: '/login'})
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.formData.userPassword !== this.formData.confirmUserPassword) {
            this.$message.info('两次输入的密码不一致')

            return
          }

          axios({
            method: 'post',
            url: process.env.BASE_API + '/app/register/clientRegister',
            data: qs.stringify(this.formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }).then(data => {
            if (data.data.code === 0) {
              this.$message({
                type: 'success',
                message: data.data.msg
              })

              // this.getHeader(data.data.data.access_token)

              // sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))

              setTimeout(() => {
                this.$router.push({path: '/login'})
              })
            } else {
              this.$message({
                type: 'error',
                message: data.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    },
    validatePhone (rule, value, callback) {
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/

      //console.log(reg.test(value))

      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    },
    validateIdCard (rule, value, callback) {
      let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

      //console.log(reg.test(value))

      if (!reg.test(value)) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  background: #ddd;
  line-height: 50px;
  text-align: center;

  span.iconzuojiantou {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
    color: #409EFF;
  }
}

.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 20px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto 5px;

    /deep/ .el-form-item__error {
      padding-top: 0;
      top: 36px;
    }
  }
}

.register-btn {
  width: 150px;
  height: 40px;
  margin-top: 20px;
}
</style>
