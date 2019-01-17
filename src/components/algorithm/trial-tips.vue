<template>
  <div class="trial-tips">
    <div class="trial-msg" :class="[type=='timeout'?'timeout':'']" @click="refresh">{{tipsMsg}}</div>
    <div class="hot-match-box">
      热门比赛推荐：
      <div class="hot-match clearfix" v-for="(item, index) in algHotMatchesLimit" :key="index" @click="goResultPage(item.id)">
        {{item.Team1}} <span class="red">vs</span> {{item.Team2}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  let util = window.util || {}

  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {ERR_OK, PAGEURLS} from 'common/const/config'

  export default {
    data() {
      return {
      };
    },
    props: {
      msg: {
        type: String,
        default: '抱歉，未找到相关的历史比赛。不妨试试热门筛选条件或热门比赛吧！'
      },
      type: {
        timeout: String,
        default: ''
      },
    },
    computed: {
      isMember() {
        // 0 新用户，1试用 2 试用结束 3 会员 4到期
        let self = this
        return self.member === '3'
      },
      trialMember() {
        let self = this
        return self.member === '1'
      },
      unMember() {
        let self = this
        return self.member === '0'
      },
      unMemberHasTrial() {
        let self = this
        return self.member === '2'
      },
      unMemberHasMember() {
        let self = this
        return self.member === '4'
      },
      algHotMatchesLimit() {
        let self = this
        return self.algHotMatches.slice(0, 3)
      },
      tipsMsg() {
        let self = this
        let msg = self.msg
        //判断是否是会员
        if(self.member == 0 || self.member == 2 || self.member == 4) {
          msg = '很抱歉，此模块内容仅对会员开放，请购买会员!'
        }
        return msg
      },
      ...mapGetters([
        'member',  // 0 新用户，1试用 2 试用结束 3 会员 4到期
        'algHotMatches',
      ])
    },
    created() {
    },
    methods: {
      goResultPage(id) {
        let self = this
        //判断是否是会员
        if(self.member == 0 || self.member == 2 || self.member == 4) {
          self.$emit('openMember')
          return
        }
        let url = util.urlAddParams(PAGEURLS.ALGORITHM) + 'algpage=result&id='+id
        util.openPage(url)
      },
      refresh() {
        let self = this
        if (self.type=== 'timeout') {
          self.$emit('refresh')
        }
      },
      ...mapMutations({
        setVipShow: 'SET_VIP_SHOW'
      })
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .trial-tips
    overflow: hidden
    .trial-msg
      color: #8D9BA0
      line-height: 30px
      font-size: 12px
      font-weight: normal
      text-align: center
    .timeout
      cursor: pointer
    .hot-match-box
      margin-top: 16px
      overflow: hidden
      height: 30px
      line-height: 30px
      text-align: center
      font-size: 12px
      color: #1A1A1C
      .hot-match
        display: inline-block
        padding: 0 10px
        font-size: 13px
        cursor: pointer
        &:hover
          color: #F8271F
          text-decoration: underline
</style>