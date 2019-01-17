<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc" :class="{'inline':direction}">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      },
      direction: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: 12px
      color: $color
    .inline
      display: inline-block
      padding-left: 3px
</style>
