<template>
  <div class="info">
    <div class="wrap">
      <div class="home">
        <div class="team-flag">
          <img :src="info.Flag1" :alt="info.Team1" class="team-flag-img">
        </div>
        <div class="team-name">{{info.Team1}}</div>
      </div>
      <div class="vs">
        <div class="vs-top">
          <span class="vs-type">{{info.LeagueType_cn}}</span>
          <span class="vs-date">{{info.date}}</span>
          <span class="vs-time">{{info.time}}</span>
        </div>
        <div class="icon-vs" v-if="isPrev"></div>
        <div class="score" v-if="!isPrev">
          {{info.Score1 || 0}} <span class="score-split">:</span> {{info.Score2 || 0}}
        </div>
        <div class="vs-status vs-status1" v-if="isPrev">未开赛</div>
        <div class="vs-status vs-status2" v-if="isDuring">进行中</div>
        <div class="vs-status vs-status3" v-if="isNext">已完赛</div>
      </div>
      <div class="away">
        <div class="team-flag">
          <img :src="info.Flag2" :alt="info.Team2" class="team-flag-img">
        </div>
        <div class="team-name">{{info.Team2}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  let util = window.util || {}
  import {baseMixin} from 'common/js/mixin'

  export default {
    name: 'info',
    mixins: [baseMixin],
    props: {
      info: {
        type: Object,
        default: null
      }
    },
    computed: {
      isPrev() {
        let self = this
        let info = self.info
        if (info && info.status == 1) {
          return true
        } else {
          return false
        }
      },
      isDuring() {
        let self = this
        let info = self.info
        if (info && info.status == 2) {
          return true
        } else {
          return false
        }
      },
      isNext() {
        let self = this
        let info = self.info
        if (info && info.status == 3) {
          return true
        } else {
          return false
        }
      }
    },
    data() {
      return {
      }
    },
    created() {
      let self = this
    },
    mounted() {
      let self = this
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .info
    background: url(../../../static/img/pp_bg.png) no-repeat center top #fff
    height: 200px
    border-top: 1px solid #EBF0F1
    .wrap
      height: 100%
      overflow: hidden
  .team-flag
    position: absolute
    top: 30px
    left: 305px
    width: 48px
    height: 48px
    overflow: hidden
  .team-flag-img
    display: block
    width: 100%
    height: 100%
  .team-name
    position: absolute
    top: 93px
    left: 162px
    width: 336px
    height: 30px
    line-height: 30px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    color: #333333
    font-size: 20px
    font-weight: bold
    text-align: center
  .home
    display: block
  .away
    display: block
    .team-flag
      left: auto
      right: 305px
    .team-name
      left: auto
      right: 162px
  .vs
    display: block
    .vs-top
      position: absolute
      top: 20px
      left: 50%
      height: 24px
      line-height: 24px
      width: 206px
      margin-left: -103px
      white-space: nowrap
      color: #fff
      font-size: 12px
      text-align: center
      border-radius: 12px
      background: rgba(209, 209, 209, 0.3)
      .vs-type
        color: #4A4A4A
      .vs-date
        color: #9B9B9B
        padding: 0 5px
      .vs-time
        color: #9B9B9B
    .icon-vs
      background-image: url(../../../static/img/ic_vs.png)
      background-repeat: no-repeat
      background-size: 38px 19px
      width: 38px
      height: 19px
      position: absolute
      top: 64px
      left: 50%
      margin-left: -16px
    .score
      position: absolute
      top: 52px
      left: 458px
      right: 458px
      height: 42px
      line-height: 42px
      white-space: nowrap
      color: #fff
      font-size: 30px
      text-align: center
      font-weight: bold
      font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif
      .score-split
        padding: 0 12px
        font-size: 26px
        vertical-align: top
    .vs-status
      overflow: hidden
      width: 66px
      height: 21px
      line-height: 20px
      text-align: center
      font-size: 12px
      position: absolute
      left: 50%
      top: 97px
      margin-left: -33px
      border-radius: 11px
    .vs-status1
      border: 1px solid #9B9B9B
      color: #9B9B9B
    .vs-status2
      border: 1px solid #44F9A0
      color: #44F9A0
    .vs-status3
      border: 1px solid #EC2F37
      color: #EC2F37
</style>
