<template>
  <div class='posA panelwrap flexBox flex-row carPanel' :class='{isexpend:isexpend}'>
    <div v-if='isexpend'>
      <i class="el-icon-caret-right buttonBig curP" @click="expend"></i>
    </div>
    <div v-else>
      <i class="el-icon-caret-left buttonBig curP" @click="expend"></i>
    </div>
    <div class='panel-left flexBox flex-col'>
      <div class='panel-btn flexBox flex-middle flex-center flex-col curP'  v-for='item in carTypeList' :key='item.id' @mouseleave="mouseleave" @mouseenter="mouseenter(item.id)" @click='clickBtn(item.id)' :class="{active: checkedBtn.includes(item.id)}">
        <img class='carimg' src='../assets/bigCar_g.png' v-if='item.id == 1 && hoverIndex !== 1&& !checkedBtn.includes(item.id)'/>
        <img class='carimg' src='../assets/bigCar.png' v-if='item.id == 1 && hoverIndex == 1 || (item.id == 1&&hoverIndex !== 1 &&checkedBtn.includes(item.id))'/>
        <img class='carimg' src='../assets/middleCar_g.png' v-if='item.id == 2 && hoverIndex !== 2 && !checkedBtn.includes(item.id)'/>
        <img class='carimg' src='../assets/middleCar.png' v-if='item.id == 2 && hoverIndex == 2 || (item.id == 2&&hoverIndex !== 2 &&checkedBtn.includes(item.id))'/>
         <img class='carimg' src='../assets/middleCar_g.png' v-if='item.id == 3&& hoverIndex !== 3&& !checkedBtn.includes(item.id)'/>
         <img class='carimg' src='../assets/middleCar.png' v-if='item.id == 3&& hoverIndex == 3|| (item.id == 3&&hoverIndex !== 3 &&checkedBtn.includes(item.id))'/>
         <img class='carimg' src='../assets/smallCar_g.png' v-if='item.id == 4&& hoverIndex !== 4&& !checkedBtn.includes(item.id)'/>
         <img class='carimg' src='../assets/smallCar.png' v-if='item.id == 4&& hoverIndex == 4|| (item.id == 4&&hoverIndex !== 4 &&checkedBtn.includes(item.id))'/>
        {{item.carType}}
      </div>
    </div>
    <div class='pane-right'>
      <div class='childPanel' v-if='checkedBtn.includes(1)'>
        <div class='title'>大巴车列表</div>
        <div class='content niceScroller'>
          <div class='items curP flexBox flex-row' v-for='item in bigCar' :key='item.id' @click='selectCar(item)'>
            <div class='flex-1'>{{item.carNum}}</div>
            <div class='iconImg' v-if='selectIds.includes(item.id)'><i class='el-icon-check'></i></div>
          </div>
        </div>
      </div>
      <div class='childPanel' v-if='checkedBtn.includes(2)'>
        <div class='title'>中巴车列表</div>
        <div class='content'>
           <div class='items curP flexBox flex-row' v-for='item in smallCar' :key='item.id' @click='selectCar(item)'>
             <div class='flex-1'>{{item.carNum}}</div>
              <div class='iconImg' v-if='selectIds.includes(item.id)'><i class='el-icon-check'></i></div>
           </div>
        </div>
      </div>
      <div class='childPanel' v-if='checkedBtn.includes(3)'>
        <div class='title'>商务车列表</div>
        <div class='content'>
           <div class='items curP flexBox flex-row' v-for='item in shangwuCar' :key='item.id' @click='selectCar(item)'>
             <div class='flex-1'>{{item.carNum}}</div>
             <div class='iconImg' v-if='selectIds.includes(item.id)'><i class='el-icon-check'></i></div>
           </div>
        </div>
      </div>
      <div class='childPanel' v-if='checkedBtn.includes(4)'>
        <div class='title'>小巴车列表</div>
        <div class='content'>
           <div class='items curP flexBox flex-row' v-for='item in smallCar' :key='item.id' @click='selectCar(item)'>
             <div class='flex-1'>{{item.carNum}}</div>
             <div class='iconImg' v-if='selectIds.includes(item.id)'><i class='el-icon-check'></i></div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCarTypeApi, getCarListApi } from '@/api/apilist'
export default {
  name: 'carselect',
  props: {
    single: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      carTypeList: [],
      hoverIndex: null,
      checkedBtn: [],
      bigCar: [],
      middleCar: [],
      shangwuCar: [],
      smallCar: [],
      selectCarArr: [],
      selectIds: [],
      isexpend: true,
      setTime: null
    }
  },
  methods: {
    expend () {
      this.isexpend = !this.isexpend
    },
    mouseenter (index) {
      this.hoverIndex = index
    },
    mouseleave () {
      this.hoverIndex = null
    },
    selectCar (data) {
      let flag = true
      let indexs = -1
      this.selectCarArr.forEach((item, index) => {
        if (item.id === data.id) {
          flag = false
          indexs = index
        }
      })
      if (flag) {
        if (this.single) {
          this.selectIds = [data.id]
          this.selectCarArr = [data]
        } else {
          this.selectIds.push(data.id)
          this.selectCarArr.push(data)
        }
      } else {
        if (this.single) {
          this.selectIds = []
          this.selectCarArr = []
        } else {
          this.selectIds.splice(indexs, 1)
          this.selectCarArr.splice(indexs, 1)
        }
      }
      this.$emit('selectChange', this.selectCarArr)
    },
    clickBtn (index) {
      const arr = new Set(this.checkedBtn)
      if (!arr.has(index)) {
        arr.add(index)

        this.getCarList(index)
      } else { arr.delete(index) }
      this.checkedBtn = Array.from(arr)
    },
    getcartype () {
      getCarTypeApi().then(data => {
        // console.log(data)
        this.carTypeList = data.content
      })
    },
    getCarList (carType) {
      getCarListApi({ carType }).then(data => {
        if (carType === 1) {
          this.bigCar = data.content
        } else if (carType === 2) {
          this.middleCar = data.content
        } else if (carType === 3) {
          this.shangwuCar = data.content
        } else if (carType === 4) {
          this.smallCar = data.content
        }
      })
    }
  },
  mounted () {
    this.getcartype()

    if (this.$route.params.data) {
      // this.selectIds.push(this.$route.params.data.id)
      // this.selectCarArr.push(this.$route.params.data)
      this.$emit('selectChangef', this.$route.params.data)
    }
    this.setTime = setInterval(() => {
      if (this.selectCarArr.length > 0) {
        this.$emit('selectChange', this.selectCarArr)
      }
    }, 2000)
    // this.selectIds.push()
  }
}
</script>
<style lang="scss" scoped>
.panelwrap{
  width: 400px;

  max-height: 600px;

  z-index: 30;
  right: 0;
  font-size: 12px;
  .panel-btn{
    width: 80px;
    height: 80px;
    margin-bottom: 17px;
    background: #fff;
     box-shadow: 0px 3px 10px 2px rgba(41, 125, 236, 0.2);
     border-radius: 4px;
     &:hover {
       background:rgba(4, 145, 255, 1) ;
       color: #fff;
     }
     &.active {
       background:rgba(4, 145, 255, 1) !important;
       color: #fff;
     }
  }
  .carimg{
    width: 60px;
    height: 40px;
  }
}
.pane-right{
  width: 240px;
  background: #FFFFFF;
  box-shadow: 0px 0px 10px 0px rgba(7, 24, 39, 0.15);
  margin-left: 16px;
  box-sizing: border-box;
  overflow: auto;
  .childPanel{
    width: 100%;
    box-sizing: border-box;
    .title {
      box-sizing: border-box;
       width: 100%;
    height: 50px;
    background-color: rgba(241, 241, 241, 1);
    color: rgba(4, 145, 255, 1);
    line-height: 50px;
    padding-left: 12px;
    }
    .content{
       width: 100%;
      box-sizing: border-box;
      max-height: 200px;
      overflow: auto;
      .items{
         width: 100%;
        padding-left: 12px;
        line-height: 40px;
        height: 40px;
        border-bottom: 1px solid #dfdfdf;
        box-sizing: border-box;
        &:hover {
          background-color: #dfdfdf;
        }
      }
    }
  }
  .iconImg{
    width: 20px;
    height: 20px;
  }

}
.buttonBig{
    font-size: 50px;
    color: rgba(4, 145, 255, 1);

}

.carPanel{
  right:-350px;
  transition: right .2s linear;
}

.carPanel.isexpend{
  right: 0;
}
</style>
