<template>
  <div id="app">
    <router-view/>

  </div>
</template>
<script>
import { getUserInfoApi } from '@/api/apilist'
export default {
  mounted () {
    getUserInfoApi().then(data => {
      this.$store.commit('SET_USERINFO', data.content)
    }).catch(() => {
      this.$router.replace({ path: '/login/current' })
    })
  }

}
</script>

<style lang="scss">

body,html{
height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;
  &>div{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}

</style>
