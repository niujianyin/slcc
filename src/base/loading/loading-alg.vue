<template>
  <div class="loading-alg-box">
    <div class="loading-alg"></div>
    <div class="loading-alg-desc" v-if="title" :class="{'inline':direction}">{{title}}</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      direction: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading-alg-box
    position: absolute
    top: 0px
    bottom: 0px
    left: 0
    right: 0
    z-index: 10
    .loading-alg
      position: absolute
      top: 50%
      left: 50%
      margin: -14px 0 0 -14px
      width: 28px
      height: 28px
      background: url(./loading.png) no-repeat
      background-size: 28px 28px
      animation: rotation 1.5s linear infinite
    .loading-alg-desc
      position: absolute
      top: 50%
      left: 50%
      margin: 18px 0 0 -150px
      width: 300px
      height: 20px
      line-height: 20px
      font-size: 14px
      text-align: center
      color: $color
    .inline
      display: inline-block
      padding-left: 3px
</style>
