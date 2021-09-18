<template>
  <div class="container-panel flexBox flex-row">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="飞机" name="first">
      <plant :orderType='1'/>
    </el-tab-pane>
    <el-tab-pane label="火车" name="second">
      <plant :orderType='2'/>
    </el-tab-pane>
    <el-tab-pane label="包车" name="third">
      <plant :orderType='3'/>
    </el-tab-pane>

  </el-tabs>
  </div>
</template>

<script>
import plant from './plant.vue'
export default {
  components: { plant },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick () {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
