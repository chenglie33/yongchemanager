<template>
  <div>
    <div id="nav" class='flexBox flex-row flex-middle'>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <div class='logo'>智行安途服务平台</div>
      <div class='flexBox flex-row navMu'>
        <div class='menuItem flexBox flex-col flex-middle flex-center posR' :class='{active:$route.meta.activeMenu==="Home"}' >
          <img class='imgmenu' src='@/assets/ssjk.png' @click="$router.push('/home/current')"/>
          监控
          <div class='dropDownPanel posA flexBox flex-col'>
            <div class='panel-item' @click="$router.push('/home/current')">实时监控</div>
            <div class='panel-item' @click="$router.push('/home/his')">历史监控</div>
          </div>
        </div>
        <div class='menuItem flexBox flex-col flex-middle flex-center' :class='{active:$route.meta.activeMenu==="OrderManage"}' @click="$router.push('/orderManage')">
          <img class='imgmenu' src='@/assets/ddgl.png'/>
          订单管理
        </div>
        <div class='menuItem flexBox flex-col flex-middle flex-center' :class='{active:$route.meta.activeMenu==="financialmanage"}' @click="$router.push('/financialmanage')">
          <img class='imgmenu' src='@/assets/cwgl.png'/>
          财务管理
        </div>
        <div class='menuItem flexBox flex-col flex-middle flex-center' :class='{active:$route.meta.activeMenu==="carmanage"}' @click="$router.push('/carmanage')">
          <img class='imgmenu' src='@/assets/clgl.png'/>
          车辆管理
        </div>
        <div class='menuItem flexBox flex-col flex-middle flex-center' :class='{active:$route.meta.activeMenu==="personmanage"}' >
          <img class='imgmenu' src='@/assets/rygl.png' @click.stop="$router.push('/personmanage')"/>
          人员管理
            <div class='dropDownPanel posA flexBox flex-col'>
            <div class='panel-item' @click="$router.push('/personmanage')">系统用户</div>
            <div class='panel-item' @click="$router.push('/personmanage/driver')">司机</div>
            <div class='panel-item' @click="$router.push('/personmanage/weixin')">会员管理</div>
          </div>
        </div>
        <div class='menuItem flexBox flex-col flex-middle flex-center' :class='{active:$route.meta.activeMenu==="configmanage"}' >
          <img class='imgmenu' src='@/assets/pzgl.png' @click="$router.push('/configmanage')"/>
          配置管理
<div class='dropDownPanel posA flexBox flex-col'>
            <div class='panel-item' @click="$router.push('/configmanage')">行政区</div>
            <div class='panel-item' @click="$router.push('/configmanage/dizhibu')">地址簿</div>
            <div class='panel-item' @click="$router.push('/configmanage/feiyong')">费用</div>
            <div class='panel-item' @click="$router.push('/configmanage/gongsi')">公司</div>
          </div>
        </div>
        <div class='menuItem flexBox flex-col flex-middle flex-center'>
          <img class='imgmenu'  @click="$router.push('/profile')" src='@/assets/tjfx.png'/>
          统计分析
        </div>
      </div>
      <div class='flexBox  flex-end flex-1 flex-middle flex-center' style="padding-right:58px"><div>欢迎您，{{userInfo.realName}}</div><div class='flexBox flex-row flex-middle flex-center curP' @click='loginout'> <img class='imgmenu' style="margin-top: 10px;margin-left:20px" src='@/assets/tc.png'/><span>退出</span></div></div>
    </div>
    <div class='flex-1 container'><router-view/></div>
  </div>
</template>
<script>
import { loginoutApi, getUserInfoApi } from '@/api/apilist'
import { mapState } from 'vuex'
export default {
  computed: mapState([
  // 映射 this.count 为 store.state.count
    'userInfo'
  ]),
  watch: {
    '$store.state.userInfo': {
      handler: function (v) {
        console.log(v)
      },
      deep: true
    }
  },
  methods: {
    loginout () {
      this.$confirm('您确定要退出操作系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        loginoutApi().then(() => {
          this.$router.push({ path: '/login' })
        })
      }).catch(() => {

      })
    }
  }

}
</script>
<style lang="scss" scoped>
#nav {
  height: 88px;
  background-image: url('../assets/header.png');
  color: #fff;
  .logo{
    padding-left: 83px;
    font-size: 24px;

  }
  .navMu{

  }
  .menuItem{
    cursor: pointer;
    width: 96px;
    height: 88px;
    font-size: 16px;
    margin: 0 20px;
    &.active{
      background-color: rgba(9, 52, 86, .4)

    }
    &:hover{
      background-color: rgba(9, 52, 86, .4);
      .dropDownPanel{
        display: flex;
      }
    }
  }
  .imgmenu{
    width: 32px;
    height: 32px;
    padding-bottom: 9px;

  }
  .tcimg{

  }
  .dropDownPanel{
    top: 88px;
    background: RGBA(4, 145, 255, 1);
    border-radius: 2px;
    display: none;
    z-index: 40;
    .panel-item{
      width: 150px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      // padding-left: 20px;
      text-align: center;
      &:hover {
        background-color: rgba(9, 52, 86, .4)
      }
    }
  }
}
</style>
