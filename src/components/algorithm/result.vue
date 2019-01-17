<template>
  <div class="result" v-if="baseInfo">
    <div class="icon-hot" v-if="baseInfo.IfHot"></div>
    <div class="result-line"></div>
    <div class="team-info">
      <div class="team team1">
        <div class="flag">
          <img :src="baseInfo.Flag1" :alt="baseInfo.Team1">
        </div>
        <div class="team-name">{{baseInfo.Team1}}</div>
      </div>
      <div class="team-ct">
        <span class="team-type">{{baseInfo.LeagueType_cn}}</span>
        <span class="team-date" v-html="baseInfo.datetime"></span>
      </div>
      <div class="team-cc">
        <div class="team-score" v-html="baseInfo.score"></div>
      </div>
      <div class="team-cb" v-html="baseInfo.statusM"></div>
      <div class="team team2">
        <div class="flag">
          <img :src="baseInfo.Flag2" :alt="baseInfo.Team2">
        </div>
        <div class="team-name">{{baseInfo.Team2}}</div>
      </div>
    </div>
    <div class="match-tags-box">
      <div class="match-tags-text">比赛标签：</div>
      <div class="tag-list">
        <div class="tag" :class="['tag'+ item.type]" v-for="(item, index) in algAttrs" :key="index" >{{getTag(item)}}</div>
        <div class="tag" v-if="!algAttrs.length">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  let util = window.util || {}
  let cache = window.cache || {}
  let $ = window.$

  import Vue from 'vue'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import { getAlgMatchDate, getAlgMatchBaseInfo} from 'api/algorithm'
  import {ERR_OK, PAGEURLS} from 'common/const/config'
  import {baseMixin} from 'common/js/mixin'
  import {checkLocalLogin} from 'common/js/cache'
  import {loginToast,goLoginByUrl} from 'common/class/Payment'
  import LoadingAlg from 'base/loading/loading-alg'
  import MatchHot from 'class/MatchHot'

  let algAttrsDefault = [{"id":"4","tag":"让方状态 : 良好", "type": "3", "parentId": "2"}]

  export default {
    mixins: [baseMixin],
    data() {
      return {
        id: util.getQueryString('id'),
        date: util.dateFormatFmt( new Date(), "yyyy/MM/dd"),
        startDate: '2015/01/01',
        endDate: util.dateFormatFmt( new Date(), "yyyy/MM/dd"),
        loading_match_base_info: false,
        baseInfo: '',
      };
    },
    computed: {
      algAttrIds() {
        let self = this
        let arr = [], hash = {}
        self.algAttrs.forEach(function (item, i) {
          if (!hash[item.id]) {
            arr.push(item.id)
            hash[item.id] = true
          }
        })
        return arr
      },
      ...mapGetters([
        'loadingFindLaw',
        'loadingFindLawSx',
        'loadingFindLawDx',
        'type',
        'dateRange',
        'algAttrs',
        'findLaw'
      ])
    },
    created() {
      let self = this
      self.setAlgAttrs(algAttrsDefault)  //筛选标签集合
    },
    mounted() {
      let self = this
      self.getAlgMatchBaseInfo()
    },
    methods: {
      getAlgMatchBaseInfo() {
        let self = this
        if (!self.id) {
          util.goReplace(PAGEURLS.ALGORITHM)
          return
        }

        if (self.loading_match_base_info) {
          return
        }
        self.loading_match_base_info = true
        getAlgMatchBaseInfo(self.id).then((res) => {
          self.loading_match_base_info = false
          let result = self.resultHandler(res)

          let {status, data} = result
          let code = status.code
          if (code === ERR_OK) {
            self.baseInfo = new MatchHot(data)
            if (!util.isArray(data.tags)) {
              self.setAlgAttrs([])
              return
            }

            data.tags.forEach(function (item, i) {
              item.id = item.tagId
            })
            self.setAlgAttrs(data.tags)
            console.log('self.algAttrs:', self.algAttrs)
          }
          self.getAlgMatchDate()
        }, (error) => {
          self.loading_match_base_info = false
          self.getAlgMatchDate()
        })
      },
      getAlgMatchDate() {
        let self = this
        if (self.loading_algmatchdate) {
          return
        }
        self.loading_algmatchdate = true
        getAlgMatchDate().then((res) => {
          self.loading_algmatchdate = false
          let result = self.resultHandler(res)

          let {status, data} = result
          let code = status.code
          if (code === ERR_OK) {
            self.startDate = util.dateFormatFmt( data.beginDate, "yyyy/MM/dd")
            self.endDate = util.dateFormatFmt( data.endDate, "yyyy/MM/dd")
            self.date = util.dateFormatFmt( data.endDate, "yyyy/MM/dd")
            console.log(data)
          }
          self.getDefaultDate()
        }, (error) => {
          self.loading_algmatchdate = false
          self.getDefaultDate()
        })
      },
      getDefaultDate() {
        let self = this
        self.setDateRange(self.getDateRange())
        self.setFindLaw(true)
      },
      getDateRange() {
        let self = this
        const end = new Date(self.date);
        const start = new Date(self.date);
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);

        return [start, end]
      },
      findAlgLaw() {
        let self = this
        if (!checkLocalLogin()) {
          loginToast()
          return
        }

        if (!self.algAttrs || !self.algAttrs.length) {
          self.toastAlert({
            alertType: 'warning',
            alertShow: true,
            alertText: '最少1个属性！'
          })
          return
        }
        self.setFindLaw(true)
      },
      getTag(val) {
        let tag = val.tagCn
        if (val.textRules == 1) {
          tag = val.parentCn + tag
        } else {
          tag = val.parentCn + ' : ' +tag
        }
        return tag
      },
      ...mapMutations({
        setType: 'SET_TYPE',
        setDateRange: 'SET_DATE_RANGE',
        setAlgAttrs: 'SET_ALG_ATTRS',
        setFindLaw: 'SET_FIND_LAW'
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
  .result
    border: 1px solid #EBF0F1
    height: 160px
    position: relative
    .icon-hot
      position: absolute
      left: -1px
      top: -1px
      background: url(../../../static/img/v2_icon_alg_hot.png) no-repeat
      width: 24px
      height: 24px
    .result-line
      position: absolute
      left: 480px
      top: 20px
      background: #EBF0F1
      width: 1px
      height: 120px
      font-size: 0px
    .team-info
      overflow: hidden
      position: relative
      height: 160px
      width: 480px
      float: left
      .team
        position: absolute
        top: 30px
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
          width: 168px
          text-align: center
          font-size: 20px
          height: 30px
          line-height: 30px
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
        &.team1
          left: 0px
          .flag
            left: 59px
          .team-name
            left: 0px
        &.team2
          right: 0px
          .flag
            right: 59px
          .team-name
            right: 0px
      .team-ct
        overflow: hidden
        position: absolute
        top: 35px
        left: 0px
        right: 0px
        text-align: center
        line-height: 18px
        .team-type
          font-size: 12px
          color: #4A4A4A
          padding-right: 5px
        .team-date
          font-size: 12px
          color: #9B9B9B
      .team-cc
        position: absolute
        top: 60px
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
        top: 110px
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
    .match-tags-box
      overflow: hidden
      position: relative
      height: 160px
      padding-left: 118px
      .match-tags-text
        position: absolute
        left: 50px
        top: 30px
        line-height: 24px
        height: 24px
        color: #9B9B9B
        font-size: 12px
      .tag-list
        line-height: 24px
        margin: 30px 0px 0px 0px
        .tag
          float: left
          padding: 0 12px
          text-align: center
          font-size: 12px
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          background: #FFEFEF
          color: #ED686C
          margin: 0px 10px 12px 0px
          &.no-left
            float: none
            display: inline-block
</style>