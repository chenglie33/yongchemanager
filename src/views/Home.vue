<template>
  <div class="home flexBox">
    <div id='map-baidu' class="flex-1">

    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',

  components: {

  },
  data () {
    return {
      height: document.body.clientHeight - 88
    }
  },
  mounted () {
    var map = new BMapGL.Map('map-baidu')
    // 创建地图实例
    var point = new BMapGL.Point(116.404, 39.915)
    // 创建点坐标
    map.centerAndZoom(point, 15)
  }
}
</script>
<style lang="scss" scoped>
#map-baidum,.home{
  width: 100%;
  height: 100%;
}
</style>
