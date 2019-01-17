<template>
  <div class="search-box">
    <div class="search">
      <div class="search-input-box">
        <input type="text" class="search-input" :placeholder="searchPlaceholderText" v-model="searchVal" />
        <div class="search-team-box" v-if="algSearchTeam.length">
          <div class="team clearfix" v-for="(item, index) in algSearchTeam" :key="index" @click="getSearchVal(item)">
            {{item.name}}
          </div>
        </div>
      </div>
      <div class="search-btn" @click="searchResultList"></div>
    </div>
    <div class="hot-match-box" v-if="algHotMatchesLimit && algHotMatchesLimit.length">
      <div class="hot-match clearfix" v-for="(item, index) in algHotMatchesLimit" :key="index" @click="goResultPage(item.id)">
        {{item.Team1}} <span class="red">vs</span> {{item.Team2}}
      </div>
      <div class="hot-match-more" @click="goResultListPage">更多</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  let util = window.util || {}
  let cache = window.cache || {}
  let $ = window.$
  let echarts = window.echarts

  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import { getAlgHotMatches, getAlgSearchTeam } from 'api/algorithm'
  import {ERR_OK, PAGEURLS} from 'common/const/config'
  import {baseMixin} from 'common/js/mixin'

  export default {
    mixins: [baseMixin],
    data() {
      return {
        loading_alghotmatches: false,
        algHotMatches: [],
        searchPlaceholderText: '您输入球队全名或单字，我们匹配比赛。例，输入"曼"or"曼城',
        searchVal: util.getQueryString('tname'),

        loading_algsearchteam: false,
        algSearchTeam: [],
        teamid: ''
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
    },
    mounted() {
      let self = this
      self.getAlgHotMatches()
    },
    methods: {
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
            self.algHotMatches = data
            self.setAlgHotMatches(data)

            console.log('alghotmatches',data)
          }
        }, (error) => {
          self.loading_alghotmatches = false
        })
      },
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
      getSearchVal(item) {
        let self = this
        self.algSearchTeam = []
        self.teamid = item.id
        self.searchVal = item.name
        self.loading_algsearchteam = true
        setTimeout(function () {
          self.loading_algsearchteam = false
        }, 200)
      },
      goResultListPage() {
        let self = this
        //判断是否是会员
        if(self.member == 0 || self.member == 2 || self.member == 4) {
          self.$emit('openMember')
          return
        }
        let url = util.urlAddParams(PAGEURLS.ALGORITHM) + 'algpage=resultlist'
        util.openPage(url)
      },
      searchResultList() {
        let self = this
        //判断是否是会员
        if(self.member == 0 || self.member == 2 || self.member == 4) {
          self.$emit('openMember')
          return
        }
        if(!self.teamid) {
          self.toastAlert({
            alertType: 'warning',
            alertShow: true,
            alertText: '您输入的球队暂时未查找到相关比赛，试试依次输入球队名，点击下拉框匹配的球队，再进行搜索'
          })
          return
        }

        let url = util.urlAddParams(PAGEURLS.ALGORITHM) + 'algpage=resultlist&tid='+self.teamid+'&tname='+self.searchVal
        util.openPage(url)
      },
      inputSearchTeam() {
        let self = this
        let val = self.searchVal
        if (self.loading_algsearchteam) {
          return
        }
        self.loading_algsearchteam = true
        getAlgSearchTeam(val).then((res) => {
          self.loading_algsearchteam = false
          let result = self.resultHandler(res)

          let {status, data} = result
          let code = status.code
          if (code === ERR_OK && data && data.length) {
            self.algSearchTeam = data
            console.log('algSearchTeam:',data)
          } else {
            self.algSearchTeam = []
            self.toastAlert({
              alertType: 'warning',
              alertShow: true,
              alertText: '您输入的球队系统没有匹配到，试试依次输入球队名'
            })
          }
        }, (error) => {
          self.loading_algsearchteam = false
        })
      },
      ...mapMutations({
        setAlgHotMatches: 'SET_ALG_HOT_MATCHES'
      }),
      ...mapActions([
        'toastAlert'
      ])
    },
    watch: {
      searchVal(newVal, oldVal) {
        let self = this
        if (newVal !== oldVal && newVal !== '') {
          self.inputSearchTeam()
        } else if (newVal == '') {
          self.algSearchTeam = []
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    position: relative
    height: 158px
    z-index: 100
    .search
      background: url(../../../static/img/v2_search_bg.png) no-repeat center top
      width: 808px
      height: 72px
      position: relative
      margin: 0 auto
      .search-input-box
        position: absolute
        left: 74px
        top: 9px
        .search-input
          width: 575px
          height: 48px
          border: 0 none
          font-size: 13px
        .search-team-box
          position: absolute
          top: 54px
          left: -35px
          width: 626px
          max-height: 300px
          overflow-x: hidden
          overflow-y: auto
          background: #ffffff
          box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2)
          .team
            padding: 0px 10px 0px 36px
            font-size: 14px
            cursor: pointer
            height: 50px
            line-height: 50px
            overflow: hidden
            white-space: nowrap
      .search-btn
        position: absolute
        top: 5px
        right: 5px
        width: 138px
        height: 60px
        cursor: pointer
    .hot-match-box
      overflow: hidden
      height: 30px
      line-height: 30px
      text-align: center
      margin-top: 14px
      .hot-match
        display: inline-block
        padding: 0 10px
        font-size: 13px
        cursor: pointer
        &:hover
          color: #F8271F
          text-decoration: underline
      .hot-match-more
        display: inline-block
        padding: 0 10px
        font-size: 13px
        cursor: pointer
        text-decoration: underline
        &:hover
          color: #F8271F
          text-decoration: underline
</style>