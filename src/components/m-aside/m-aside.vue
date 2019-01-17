<template>
  <transition name="slide-fade">
  <div class="m-aside" v-if="showAside">
    <div class="nav-list">
      <div class="nav-item" :class="[navIdx===0? 'selected':'']" @click="selectNavItem(0)">
        <span class="icon-index"></span>
        <div class="nav-text">首页</div>
      </div>
      <div class="nav-item" :class="[navIdx===1? 'selected':'']" @click="selectNavItem(1)">
        <span class="icon-follow"></span>
        <div class="nav-text">我的关注</div>
      </div>
      <div class="nav-item" :class="[navIdx===2? 'selected':'']" @click="selectNavItem(2)">
        <span class="icon-library"></span>
        <div class="nav-text">赛事库</div>
      </div>
      <div class="nav-item" :class="[navIdx===3? 'selected':'']" @click="selectNavItem(3)">
        <span class="icon-schedule"></span>
        <div class="nav-text">每日赛程</div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {PAGEURLS, env}  from 'common/const/config'
  import {goPage}  from 'common/js/util'
  import {mapGetters,mapMutations} from 'vuex'

  export default {
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters([
        'showAside',
        'navIdx',
      ])
    },
    created() {
    },
    methods: {
      selectNavItem(idx) {
        let self = this
        self.setNavIdx(idx)
      },
      ...mapMutations({
        setNavIdx: 'SET_NAV_IDX',
      }),
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  /* 进入和离开动画可以分别 */
  /* 设置不同的持续时间(duration)和动画函数(timing function) */
  .slide-fade-enter-active
    transition: all .3s ease
  .slide-fade-leave-active
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  .slide-fade-enter, .slide-fade-leave-to
    transform: translateX(-270px)
    opacity: 0
  .m-aside
    background: url(../../../static/img/ccaside_shadow.png) repeat-y right center
    position: fixed
    top: 80px
    bottom: 0px
    left: 0px
    z-index: 3
    width: 268px
    .nav-list
      background: $cwhite
      width: 178px
      padding: 20px 0 0px 82px
      .nav-item
        height: 40px
        line-height: 40px
        position: relative
        margin-bottom: 8px
        cursor: pointer
        .icon-index
          background: url(../../../static/img/ccicon_index.png) no-repeat left center
          position: absolute
          left: 0px
          top: 50%
          width: 14px
          height: 14px
          margin-top: -7px
          &.selected
            background: url(../../../static/img/ccicon_index_s.png) no-repeat left center
        .icon-follow
          background: url(../../../static/img/ccicon_follow.png) no-repeat left center
          position: absolute
          left: 0px
          top: 50%
          width: 15px
          height: 14px
          margin-top: -7px
          &.selected
            background: url(../../../static/img/ccicon_follow_s.png) no-repeat left center
        .icon-library
          background: url(../../../static/img/ccicon_library.png) no-repeat left center
          position: absolute
          left: 0px
          top: 50%
          width: 12px
          height: 12px
          margin-top: -6px
          &.selected
            background: url(../../../static/img/ccicon_library_s.png) no-repeat left center
        .icon-schedule
          background: url(../../../static/img/ccicon_schedule.png) no-repeat left center
          position: absolute
          left: 0px
          top: 50%
          width: 12px
          height: 12px
          margin-top: -6px
          &.selected
            background: url(../../../static/img/ccicon_schedule_s.png) no-repeat left center
        .nav-text
          padding-left: 35px
          font-size: 12px
          color: $color
      .nav-item:hover,.nav-item.selected
        .icon-index
          background: url(../../../static/img/ccicon_index_s.png) no-repeat left center
        .icon-follow
          background: url(../../../static/img/ccicon_follow_s.png) no-repeat left center
        .icon-library
          background: url(../../../static/img/ccicon_library_s.png) no-repeat left center
        .icon-schedule
          background: url(../../../static/img/ccicon_schedule_s.png) no-repeat left center
        .nav-text
          font-size: 14px
          color: $hred
</style>