<template>
  <div id="info">
    <banner v-if="isAlg"></banner>
    <div class="wrap algorithm-box">
      <div class="match-box">
        <search @openMember = "openMember"></search>
        <factor v-if="isAlg"></factor>
        <result v-if="isResult"></result>
        <trial-box v-if="isAlg || isResult"  @openMember = "openMember"></trial-box>
        <result-list v-if="isResultList"></result-list>
      </div>
    </div>
    <div class="tips-danger" v-if="isAlg || isResult">
      <span class="icon-danger"></span>
      <span class="tips-danger-text">风险提示 : 比赛透视结果通过智能模型加工客观数据而成，仅供参考，不构成绝对投资建议。</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  let util = window.util || {}
  let cache = window.cache || {}
  let $ = window.$
  let echarts = window.echarts

  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {baseMixin} from 'common/js/mixin'

  import Vue from 'vue'
  import Banner from 'components/algorithm/banner'
  import Search from 'components/algorithm/search'
  import Factor from 'components/algorithm/factor'
  import TrialBox from 'components/algorithm/trial-box'
  import Result from 'components/algorithm/result'
  import ResultList from 'components/algorithm/result-list'

  import {ERR_OK, PAGEURLS} from 'common/const/config'
  import {getMemberVipInfo} from 'api/algorithm'
  import {checkLocalLogin} from 'common/js/cache'
  import {loginToast,goLoginByUrl} from 'common/class/Payment'

  export default {
    name: 'Info',
    mixins: [baseMixin],
    data() {
      return {
        algpage: ''
      }
    },
    computed: {
      isAlg() {   // 算法选球页面
        let self = this
        return self.algpage === 'alg'
      },
      isResultList() {   // 搜索结果列表页面
        let self = this
        return self.algpage === 'resultlist'
      },
      isResult() {    // 搜索结果页面
        let self = this
        return self.algpage === 'result'
      },
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
      ...mapGetters([
        'member',  // 0 新用户，1试用 2 试用结束 3 会员 4到期
      ])
    },
    created() {
      let self = this
      self.getAlgPage()
    },
    mounted() {
      let self = this
    },
    methods: {
      getAlgPage() {
        let self = this
        let algpage = util.getQueryString('algpage')
        if (algpage != 'resultlist' && algpage != 'result') {
          algpage = 'alg'
        }
        self.algpage = algpage
        self.getMemberVipInfo()
      },
      getMemberVipInfo() {
        let self = this
        if (!checkLocalLogin()) {
          goLoginByUrl()
          return
        }
        if (self.loading_member) {
          return
        }
        self.loading_member = true
        getMemberVipInfo().then((res) => {
          self.loading_member = false
          let result = self.resultHandler(res)

          let {status, data} = result
          let code = status.code
          if (code === ERR_OK) {
            // 0 新用户，1试用 2 试用结束 3 会员 4到期
            // data.is_vip = '4'
            self.setMember(data.is_vip)
            if (self.isAlg) {
              if (data.is_vip === '1') {
                self.setMemberDay(data.freetrial_days)
              } else if (data.is_vip === '3') {
                self.setMemberDay(data.days)
              } else {
                self.setMemberDay('0')
              }
              console.log(data)
              if(self.member == 0 || self.member == 2 || self.member == 4) {
                self.openMember()
              }
            }
          } else {
            self.setMember('0')
            self.setMemberDay('0')
            self.toastAlert({
              alertType: 'warning',
              alertShow: true,
              alertText: status.msg
            })
          }
        }, (error) => {
          self.loading_member = false
          self.setMember('0')
          self.setMemberDay('0')
          self.toastAlert({
            alertType: 'warning',
            alertShow: true,
            alertText: '数据获取失败，刷新重试！'
          })
        })
      },
      openMember() {
        let self = this
        self.setVipShow(true)
      },
      ...mapMutations({
        setMember: 'SET_MEMBER',
        setMemberDay: 'SET_MEMBER_DAY',
        setVipShow: 'SET_VIP_SHOW',
      }),
      ...mapActions([
        'toastAlert'
      ])
    },
    components: {
      Banner,
      Search,
      Factor,
      TrialBox,
      Result,
      ResultList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  #info
    overflow: hidden
    .algorithm-box
      overflow: hidden
      background: #fff
      margin-top: 44px
      min-height: 200px
      .match-box
        position: relative
        min-height: 300px
    .tips-danger
      margin-top: 30px
      height: 18px
      line-height: 18px
      text-align: center
      font-size: 12px
      color: #5D6061
      vertical-align: top
      position: relative
      .icon-danger
        position: absolute
        top: 0px
        left: 50%
        margin-left: -258px
        background-image: url(../../../static/img/icon_danger.png)
        background-repeat: no-repeat
        width: 17px
        height: 18px
      .tips-danger-text
        padding-left: 27px

</style>
