<template>
  <div class="result-list">
    <loading-alg v-if="loading_alghotmatches"></loading-alg>
    <div class="no-match" v-if="!loading_alghotmatches && noMatch">
      <div class="no-match-msg">
        未匹配到任何包含“<span class="red">{{tname}}</span>”的相关比赛，你可以输入其他球队试试
      </div>
      <div class="other">
        <span class="other-ll"></span>
        <span class="other-lr"></span>
        其他推荐
      </div>
    </div>
    <div class="result-item clearfix" :class="[index%2===1?'ml30':'']" v-for="(item, index) in algHotMatches" :key="index" v-if="!loading_alghotmatches">
      <div class="team-info">
        <div class="team team1">
          <div class="flag">
            <img :src="item.Flag1" :alt="item.Team1">
          </div>
          <div class="team-name">{{item.Team1}}</div>
        </div>
        <div class="team-ct">
           <span class="team-type">{{item.LeagueType_cn}}</span>
           <span class="team-date" v-html="item.datetime"></span>
        </div>
        <div class="team-cc">
           <div class="team-score" v-html="item.score"></div>
        </div>
        <div class="team-cb" v-html="item.statusM"></div>
        <div class="team team2">
          <div class="flag">
            <img :src="item.Flag2" :alt="item.Team2">
          </div>
          <div class="team-name">{{item.Team2}}</div>
        </div>
      </div>
      <div class="btn-vip" @click="openMember(item.id)"></div>
      <div class="hot-stars" v-html="item.starsM"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  let util = window.util || {}
  let cache = window.cache || {}
  let $ = window.$

  import Vue from 'vue'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import { getAlgHotMatches,getMatchByTeamId } from 'api/algorithm'
  import {ERR_OK, PAGEURLS} from 'common/const/config'
  import {baseMixin} from 'common/js/mixin'
  import LoadingAlg from 'base/loading/loading-alg'
  import MatchHot from 'class/MatchHot'

  export default {
    mixins: [baseMixin],
    data() {
      return {
        loading_alghotmatches: false,
        algHotMatches: [],
        loading_algsearchmatches: false,
        tid: '',
        tname: '',
        noMatch: false,
      };
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
        return self.algHotMatches.slice(0, 5)
      },
      ...mapGetters([
        'member',  // 0 新用户，1试用 2 试用结束 3 会员 4到期
      ])
    },
    created() {
      let self = this
      self.tid = util.getQueryString('tid')
      self.tname = util.getQueryString('tname')
    },
    mounted() {
      let self = this
      if (self.tid) {
        self.getMatchByTeamId()
      } else {
        self.getAlgHotMatches()
      }
    },
    methods: {
      getMatchByTeamId() {
        let self = this
        if (self.loading_algsearchmatches) {
          return
        }
        self.loading_algsearchmatches = true
        getMatchByTeamId(self.tid).then((res) => {
          self.loading_algsearchmatches = false
          let result = self.resultHandler(res)

          let {status, data} = result
          let code = status.code
          if (code === ERR_OK && data && data.length) {
            self.noMatch = false
            data.forEach((val) => {
              self.algHotMatches.push(new MatchHot(val))
            })
            console.log('getMatchByTeamId:',data)
          } else {
            self.noMatch = true
            self.getAlgHotMatches()
          }
        }, (error) => {
          self.loading_algsearchmatches = false
        })
      },
      getAlgHotMatches() {
        let self = this
        if (self.loading_alghotmatches) {
          return
        }
        self.loading_alghotmatches = true
        getAlgHotMatches().then((res) => {
          self.loading_alghotmatches = false
          let result = self.resultHandler(res)

          let {status, data} = result
          let code = status.code
          if (code === ERR_OK) {
            data.forEach((val) => {
              self.algHotMatches.push(new MatchHot(val))
            })

            self.setAlgHotMatches(data)

            console.log('alghotmatches:',data)
          }
        }, (error) => {
          self.loading_alghotmatches = false
        })
      },
      openMember(id) {
        let self = this
        if (self.isMember || self.trialMember) {
          let url = util.urlAddParams(PAGEURLS.ALGORITHM) + 'algpage=result&id='+id
          util.openPage(url)
        } else {
          self.setVipShow(true)
        }
      },
      ...mapMutations({
        setAlgHotMatches: 'SET_ALG_HOT_MATCHES',
        setVipShow: 'SET_VIP_SHOW'
      }),
      ...mapActions([
        'toastAlert'
      ])
    },
    components: {
      LoadingAlg
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .result-list
    overflow: hidden
    padding-top: 20px
    min-height: 280px
    position: relative
    .ml30
      margin-left: 30px
    .result-item
      overflow: hidden
      float: left
      height: 280px
      width: 583px
      border: 1px solid #EBF0F1
      margin-bottom: 30px
      position: relative
      .team-info
        overflow: hidden
        position: relative
        height: 176px
        .team
          position: absolute
          top: 40px
          .flag
            position: absolute
            width: 48px
            height: 48px
            overflow: hidden
            img
              display: block
              width: 100%
              height: 100%
          .team-name
            position: absolute
            top: 64px
            width: 257px
            text-align: center
            font-size: 20px
            height: 30px
            line-height: 30px
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
          &.team1
            left: 2px
            .flag
              left: 105px
            .team-name
              left: 0px
          &.team2
            right: 2px
            .flag
              right: 105px
            .team-name
              right: 0px
        .team-ct
          overflow: hidden
          position: absolute
          top: 40px
          left: 0px
          right: 0px
          text-align: center
          .team-type
            font-size: 12px
            color: #4A4A4A
            padding-right: 5px
          .team-date
            font-size: 12px
            color: #9B9B9B
        .team-cc
          position: absolute
          top: 65px
          left: 0px
          right: 0px
          height: 42px
          line-height: 42px
          text-align: center
          font-size: 30px
          font-weight: bold
          .team-score
            overflow: hidden
            .score-line
              overflow: hidden
              padding: 0 5px
        .team-status
          overflow: hidden
          width: 66px
          height: 21px
          line-height: 20px
          text-align: center
          font-size: 12px
          position: absolute
          left: 50%
          top: 115px
          margin-left: -33px
          border-radius: 11px
          &.team-status1
            border: 1px solid #9B9B9B
            color: #9B9B9B
          &.team-status2
            border: 1px solid #44F9A0
            color: #44F9A0
          &.team-status3
            border: 1px solid #EC2F37
            color: #EC2F37
      .btn-vip
        overflow: hidden
        position: absolute
        left: 50%
        top: 176px
        margin-left: -90px
        background: url(../../../static/img/v2_alg_vip_btn.png) no-repeat
        width: 180px
        height: 39px
        cursor: pointer
      .hot-stars
        position: absolute
        left: 0px
        right: 0px
        bottom: 30px
        height: 18px
        line-height:  18px
        text-align: center
        .star-text
          display: inline-block
          color: #1A1A1C
          font-size: 12px
          height: 18px
        .star-s
          display: inline-block
          background: url(../../../static/img/v2_icon_star_s.png) no-repeat left center
          width: 12px
          height: 18px
          margin-left: 3px
        .star
          display: inline-block
          background: url(../../../static/img/v2_icon_star.png) no-repeat left center
          width: 12px
          height: 18px
          margin-left: 3px
    .no-match
      overflow: hidden
      padding-bottom: 24px
      .no-match-msg
        overflow: hidden
        text-align: center
        font-size: 13px
        line-height: 18px
        color: #7B7B7B
        .red
          color: #F8271F
      .other
        text-align: center
        margin-top: 70px
        position: relative
        color: #7C7C7C
        font-size: 16px
        line-height: 30px
        height: 30px
        .other-ll
          position: absolute
          left: 50%
          top: 14px
          width: 45px
          height: 1px
          font-size: 0px
          background: #7C7C7C
          margin-left: -92px
        .other-lr
          position: absolute
          left: 50%
          top: 14px
          width: 45px
          height: 1px
          font-size: 0px
          background: #7C7C7C
          margin-left: 47px
</style>