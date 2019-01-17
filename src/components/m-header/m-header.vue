<template>
  <div class="m-header clearfix">
    <div @click="toggleShowAside" class="logo" :class="[showAside?'logo-selected':'']"></div>
    <div class="m-header-date">2017-09-14  16:00</div>
    <div class="recharge" @click="goRecharge">充值</div>
    <div class="user-avatar" @click="goAccount">
      <img :src="userInfo.img" :alt="userInfo.nickname" class="user-avatar-img">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  let util = window.util || {}
  let cache = window.cache || {}
  let $ = window.$

  import Vue from 'vue'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {baseMixin} from 'common/js/mixin'
  import {goPage}  from 'common/js/util'

  import {PAGEURLS} from 'common/const/config'

  export default {
    mixins: [baseMixin],
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters([
        'userInfo',
        'showAside',
      ])
    },
    created() {
      let self = this
    },
    mounted() {
      let self = this
      self.bindEvent()
    },
    methods: {
      bindEvent() {
        let self = this
      },
      toggleShowAside() {
        let self = this
        let showAsideState = self.showAside
        self.setShowAside(!showAsideState)
      },
      goRecharge() {
        goPage(PAGEURLS.RECHARGE)
      },
      goAccount() {
        goPage(PAGEURLS.ACCOUNT)
      },
      ...mapMutations({
        setShowAside: 'SET_SHOW_ASIDE',
      }),
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .m-header
    height: 87px
    background: url(../../../static/img/ccheader_shadow.png) repeat-x center bottom $cwhite
    position: fixed
    left: 0px
    right: 0px
    top: 0px
    z-index: 2
    .logo
      float: left
      background: url(../../../static/img/cclogo.png) no-repeat
      width: 260px
      height: 80px
      cursor: pointer
      &.logo-selected
        background: url(../../../static/img/cclogo_s.png) no-repeat
    .m-header-date
      position: absolute
      left: 290px
      top: 30px
      font-size: 14px
      line-height: 20px
      color: #333333
    .recharge
      position: absolute
      right: 126px
      top: 30px
      padding-left: 26px
      font-size: 14px
      line-height: 20px
      color: #333333
      font-weight: bold
      background: url(../../../static/img/ccicon_recharge.png) no-repeat left center
      height: 20px
      cursor: pointer
      &:hover
        background: url(../../../static/img/ccicon_recharge_s.png) no-repeat left center
        color: #C6282F
    .user-avatar
      position: absolute
      right: 50px
      top: 22px
      width: 36px
      height: 36px
      border-radius: 50%
      overflow: hidden
      .user-avatar-img
        display: block
        width: 100%
        height: 100%
        cursor: pointer
</style>
