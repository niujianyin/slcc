<template>
  <div class="loading-circle-box">
    <div class="loading-circle"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      direction: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading-circle-box
    position: absolute
    top: 0px
    bottom: 0px
    left: 0
    right: 0
    z-index: 10
    .loading-circle
      position: absolute
      top: 50%
      left: 50%
      margin: -20px 0 0 -20px
      width: 40px
      height: 40px
      background: url(//n.sinaimg.cn/sports/sina_lotto/lotto/wap/i/loading.png) no-repeat
      background-size: 40px 40px
      animation: rotation 2s linear infinite
</style>
