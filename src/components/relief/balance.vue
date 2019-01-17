<template>
  <transition name="fade">
  <div class="relief-wrapper">
    <div class="mask"></div>
    <div class="relief-content" ref="reliefContent">
      <div class="relief-box">
        <div class="relief-header">《余额使用说明》</div>
        <div class="relief-main">
          <p class="relief-p"> 1、充值购买的炮弹可用于购买智能预测及新浪球通专家方案推荐；</p>
          <p class="relief-p"> 2、充值赠送炮弹仅限于智能预测消费；</p>
          <p class="relief-p"> 3、消费的优先级：先消费充值炮弹，充值余额消耗完之后购买小炮测智能预测产品可继续消费赠送炮弹。</p>
        </div>
        <div class="relief-bottom"></div>
      </div>

      <div class="btn-close" @click="_close()"><i class="el-message-box__close el-icon-close"></i></div>
    </div>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {baseMixin} from 'common/js/mixin'

  export default {
    mixins: [baseMixin],
    data() {
      return {
      }
    },
    created() {
    },
    mounted() {
      let self = this
    },
    methods: {
      _close() {
        let self = this
        self.$emit('close')
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .fade-enter-active, .fade-leave-active
    transition: opacity .3s
  .fade-enter, .fade-leave-to
    opacity: 0
  .relief-wrapper
    overflow: hidden
    .mask
      position: absolute
      position: fixed
      top: 0
      left: 0
      z-index: 1001
      width: 100%
      height: 100%
      background-color: #000
      opacity: .2
    .relief-content
      z-index: 1002
      background-color: #fff
      position: absolute
      top: 50%
      left: 50%
      width: 700px
      padding: 30px
      margin-left: -350px
      margin-top: -200px
      height: 200px
      border-radius: 8px
      overflow: hidden
      .relief-header
        font-size: 16px
        font-weight: 700
        line-height: 40px
        text-align: center
      .relief-main
        padding-top: 20px
        .relief-p
          font-size: 14px
          line-height: 30px
          text-align: justify
      .relief-bottom
        height: 50px
      .btn-close
        position: absolute
        right: 20px
        top: 20px
        width: 30px
        height: 30px
        cursor: pointer
        i
          position: absolute
          left: 50%
          top: 50%
          margin: -5px 0 0 -5px
</style>