<template>
<div class='paneldata' ref='chart'>

</div>

</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['jiChang'],
  watch: {
  },
  methods: {

    drawPie () {
      var myChart = echarts.init(this.$refs.chart)
      const option = {
        color: this.jiChang.color,
        series: [{
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: false,
            clip: false

          },
          axisLine: {

            lineStyle: {
              width: 20
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 0
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: [{
            value: this.jiChang.costRate,
            name: this.jiChang.costRate,

            detail: {
              fontSize: '50%',
              valueAnimation: true,
              offsetCenter: ['0%', '0%']
            }
          }

          ],
          title: {
            show: false,
            fontSize: '10%'
          },
          detail: {

            color: 'auto',

            formatter: '{value}%'
          }
        }]
      }
      myChart.setOption(option)
    }
  },
  mounted () {
    // this.drawPie()
  }

}
</script>

<style lang="scss" scoped>

</style>
