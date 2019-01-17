<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text" v-html="title"></p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '暂无数据'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .no-result
    text-align: center
    padding: 30px 0 20px
    .no-result-icon
      display: inline-block
      background: url(//n.sinaimg.cn/sports/lottery/2018worldcup/wap/img/nodata.png) no-repeat
      background-size: 40px 38px
      width: 40px
      height: 38px
    .no-result-text
      font-size: 14px
      line-height: 24px
      color: $cgray3
</style>