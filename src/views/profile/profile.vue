<template>
  <div class="container-panel">
    <div class='panelSmall'></div>
    <div class='panelSmall'></div>
    <div class='panelSmall'></div>
    <div class='panelSmall'></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.container-panel{
  padding:10px;
  box-sizing: border-box;
  background: transparent;
  display: grid;
  grid-template-columns:  50% 50%;
  grid-template-rows:50% 50%;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
.panelSmall{
  background: #fff;
  border-radius: 4px;
}
</style>
