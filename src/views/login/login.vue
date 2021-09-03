<template>
  <div class='flexBox flex-middle flex-center home'>
    <div class='panel-login flexBox flex-row'>
      <div class='panel-left'></div>
      <div class='flex-1 flexBox flex-col flex-middle flex-center'>
        <div class='titlelogin'>登录系统</div>
          <el-input
            class='inputlogon'
            placeholder="请输入内容"
            prefix-icon="el-icon-mobile-phone"
            v-model="loginNumber">
          </el-input>
          <el-input
            class='inputlogon'
            placeholder="请输入内容"
            prefix-icon="el-icon-lock"
            type="password"
            v-model="password">
          </el-input>
          <el-button type="primary" class='loginbtn' @click="logins" :loading="loading">登录</el-button>

      </div>
    </div>
  </div>
</template>
<script>
import { loginApi, getUserInfoApi } from '@/api/apilist'
import { getCommonData } from '@/utils/lib'
export default {
  name: 'login',
  data () {
    return {
      name: '',
      loading: false,
      loginNumber: '',
      password: ''
    }
  },
  methods: {
    logins () {
      loginApi({
        loginNumber: this.loginNumber,
        password: this.password
      }).then(data => {
        if (data.msg === 'OK') {
          getUserInfoApi().then((data) => {
            this.$store.commit('SET_USERINFO', data.content)
            this.$router.push({ path: '/home' })
            getCommonData()
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  height: 100%;
  .panel-login{
    width: 1122px;
    height: 596px;
    box-shadow: 0px 3px 25px 2px rgba(41, 125, 236, 0.2);
    .panel-left{
      width: 446px;
      height: 596px;
      background-image: url('../../assets/pic_1.png');
      background-size: cover;
    }
  }
  .titlelogin{
    color: rgba(72, 72, 72, 1);
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 43px;
  }
  .loginbtn{
    width: 546px;
    height: 64px;
    border-radius: 64px;
    margin-top: 135px;
  }

}
</style>
