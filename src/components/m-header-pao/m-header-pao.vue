<template>
  <div class="m-header">
    <div class="wrap clearfix">
      <div class="logo-pao-ballbest">
        <span class="logo-pao" @click="_goPaoHome"></span>
        <span class="logo-ballbest" @click="_goHome"></span>
      </div>
      <div class="nav">
        <div class="item" :class="{'selected':navIdx===index}" v-for="(item, index) in navList" @click="_selectNav(index)">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {PAGEURLS}  from 'common/const/config'
  import {goPage}  from 'common/js/util'
  import {mapGetters,mapMutations} from 'vuex'

  export default {
    data() {
      return {
        navList: [{
          name:'小炮首页',
          url: PAGEURLS.PAOHOME
        }, {
          name:'球通首页',
          url: PAGEURLS.HOME
        },{
          name:'订单',
          url: PAGEURLS.ORDER
        }, {
          name:'个人中心',
          url: PAGEURLS.ACCOUNT
        }]
      };
    },
    computed: {
      ...mapGetters([
        'navIdx'
      ])
    },
    created() {
    },
    methods: {
      _selectNav(index) {
        let self = this
        if (index === self.navIdx) {
          return
        }
        goPage(self.navList[index].url)
      },
      _goPaoHome() {
        goPage(PAGEURLS.PAOHOME)
      },
      _goHome() {
        goPage(PAGEURLS.HOME)
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .m-header
    overflow: hidden
    height: 90px
    background-color: $cwhite
    .logo-pao-ballbest
      float: left
      background: url(img/logo_pao.png) no-repeat
      width: 262px
      height: 43px
      margin: 23px 0 0 2px
      cursor: pointer
      position: relative
      .logo-pao
        position: absolute
        left: 0px
        top: 0px
        width: 134px
        height: 43px
      .logo-ballbest
        position: absolute
        left: 134px
        top: 0px
        width: 128px
        height: 43px
    .nav
      float: right
      height: 90px
      line-height: 90px
      margin-right:20px
      overflow: hidden
      cursor: pointer
      .item
        float: left
        margin-left: 54px
        padding: 0 2px
        font-size: 18px
        &.selected
          background: url(img/nav_line.png) repeat-x left bottom
          color: $red
</style>