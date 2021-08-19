<template>
  <div>
    <div id="nav" class='flexBox flex-row flex-middle'>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <div class='logo'>智行安途服务平台</div>
      <div class='flexBox flex-row navMu'>
        <div class='menuItem flexBox flex-col flex-middle flex-center' :class='{active:$route.meta.activeMenu==="Home"}' @click="$router.push('/')">
          <img class='imgmenu' src='@/assets/ssjk.png'/>
          实时监控
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
        <div class='menuItem flexBox flex-col flex-middle flex-center' :class='{active:$route.meta.activeMenu==="personmanage"}' @click="$router.push('/personmanage')">
          <img class='imgmenu' src='@/assets/rygl.png'/>
          人员管理
        </div>
        <div class='menuItem flexBox flex-col flex-middle flex-center' :class='{active:$route.meta.activeMenu==="configmanage"}' @click="$router.push('/configmanage')">
          <img class='imgmenu' src='@/assets/pzgl.png'/>
          配置管理
        </div>
        <div class='menuItem flexBox flex-col flex-middle flex-center'>
          <img class='imgmenu' src='@/assets/tjfx.png'/>
          统计分析
        </div>
      </div>
      <div class='flexBox  flex-end flex-1 flex-middle flex-center' style="padding-right:58px"><div>欢迎您，admin</div><div class='flexBox flex-row flex-middle flex-center'> <img class='imgmenu' style="margin-top: 10px;margin-left:20px" src='@/assets/tc.png'/><span>退出</span></div></div>
    </div>
    <div class='flex-1 container'><router-view/></div>
  </div>
</template>
<script>
export default {

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
      background-color: rgba(9, 52, 86, .4)
    }
  }
  .imgmenu{
    width: 32px;
    height: 32px;
    padding-bottom: 9px;

  }
  .tcimg{

  }
}
</style>
