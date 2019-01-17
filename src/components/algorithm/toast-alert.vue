<template>
  <div class="alert-toast-box" v-if="alertShow">
    <div class="atb-mask"></div>
    <div class="atb-toast">
      <!--<div class="atb-close" @click="atbClose"></div>-->
      <!--<div class="atb-content">-->
        <!--{{alertText}}-->
      <!--</div>-->
      <el-alert
          :title="alertText"
          :type="alertType"
          center
          show-icon
          @close="atbClose"
      >
      </el-alert>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from 'vuex'

  export default {
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters([
        'alertType',
        'alertShow',
        'alertText',
      ])
    },
    created() {
    },
    methods: {
      atbClose() {
        let self = this
        self.setAlertShow(false)
      },
      ...mapMutations({
        setAlertShow: 'SET_ALERT_SHOW',
        setAlertText: 'SET_ALERT_TEXT',
      })
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .alert-toast-box
    .atb-mask
      position: absolute
      position: fixed
      left: 0px
      right: 0px
      top: 0px
      bottom: 0px
      background: rgba(0, 0, 0, 0.3)
      z-index: 1000
    .atb-toast
      position: absolute
      position: fixed
      left: 50%
      top: 50%
      width: 800px
      min-height: 34px
      margin: -17px 0 0 -400px
      /*background: #ffffff*/
      /*border-radius: 6px*/
      z-index: 1000
      /*padding: 50px 0px 30px 0px*/
    .atb-close
      background: url(../../../static/img/icon_close.png) no-repeat center center
      width: 25px
      height: 25px
      position: absolute
      top: 16px
      right: 16px
      cursor: pointer
    .atb-content
      line-height: 24px
      font-size: 14px
      text-align: center

</style>