<template>
  <div id="app">
    <m-header></m-header>
    <m-aside></m-aside>
    <div class="content clearfix" id="content">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  let util = window.util || {}
  let cache = window.cache || {}
  let $ = window.$
  import {baseMixin} from 'common/js/mixin'

  import Vue from 'vue'
  import MHeader from 'components/m-header/m-header'
  import MAside from 'components/m-aside/m-aside'
  import LoadingCircle from 'base/loading/loading-circle'

  import {ERR_OK, PAGEURLS} from 'common/const/config'
  import {getVisitor, getTabList, getCalNoMatchDates, getMatchByTag, getMatchType} from 'api/index'
  import Match from 'class/Match'
  import Payment from 'class/Payment'


  export default {
    name: 'App',
    mixins: [baseMixin],
    data() {
      return {
        totalVisitor: 0,
        todayVisitor: 0,
        tablist: [],
        tabidx: 0,
        type: 'all',
        date: util.dateFormatFmt( new Date(), "yyyy/MM/dd"),
        startDate: '2018/07/02',
        endDate: '2020/08/05',
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() < new Date(this.startDate) || time.getTime() > new Date(this.endDate) || this.disableDate.indexOf(util.dateFormatFmt( new Date(time), "yyyy/MM/dd"))>-1; //注意是||不是&&
          }
        },
        disableDate: [],
        page: 1,
        pdlist: [],
        showMatchFilter: false,
        filterMatchData: [],
        selectedFilterMatchData: [],
        isFirstLoading: false,
        isLoadingMoreNo: false,
        st: 0,
      }
    },
    computed: {
      matchTypeHasSelected() {
        let self = this
        let flag = false
        self.filterMatchData.forEach((val) => {
          if(val.selected) {
            flag = true
          }
        })
        return flag? '' : 'btn-ok-gray'
      }
    },
    created() {
      let self = this
      self.getVisitor()
      self.getTabList()
      self.getDefaultDate()
    },
    mounted() {
      let self = this
      self.calculate();
      self.firstBindEvent = true
    },
    methods: {
      getTagClass(idx) {
        return `tag${idx}`
      },
      getTag(val) {
        let tag = val.tagCn
        if (val.textRules == 1) {
          tag = val.parentCn + tag
        }
        return tag
      },
      isNoPay(switchFlag) {
        let self = this
        return switchFlag == 1
      },
      isUnPay(switchFlag) {
        let self = this
        return switchFlag == 2
      },
      isHasPay(switchFlag) {
        let self = this
        return switchFlag == 3 || switchFlag == 4
      },
      eventNoPay(match) {
        let self = this
        this.$message({
          showClose: true,
          message: '小炮AI还未出预测结果哦~',
          type: 'warning'
        });
      },
      eventUnPay(match) {
        let self = this
        console.log('unpay:',match.livecast_id)
        let data = {
          pdtIds: match.pdtIds,
          pdtType: match.pdtType,
          matchId: match.livecast_id
        }
        let payment = new Payment(data)
        payment.pay()
      },
      eventHasPay(match) {
        let self = this
        util.openPage(PAGEURLS.PERSPECTIVE + match.livecast_id)
      },
      getVisitor() {
        let self = this
        getVisitor().then((res) => {
          let result = self.resultHandler(res)

          let {status, data} = result
          let code = status.code
          if (code === ERR_OK) {
            self.totalVisitor = data.allCount
            self.todayVisitor = data.todayCount
          }
        }, (error) => {
        })
      },
      getTabList() {
        let self = this
        if (self.loading_tablist) {
          return
        }
        self.loading_tablist = true

        getTabList().then((res) => {
          self.loading_tablist = false
          let result = res

          let {status, data} = result
          let code = status.code
          if (code === ERR_OK && util.isArray(data)) {
            self.tablist = data
            console.log(data)
          } else {
            self.tablist = [{
              leagueType_CN: '全部',
              leagueType: 'all'
            }]
          }
        }, (error) => {
          self.loading_tablist = false
          self.tablist = [{
            leagueType_CN: '全部',
            leagueType: 'all'
          }]
        })
      },
      selectTab(item, index) {
        let self = this
        if (index === self.tabidx) {
          return
        }
        self.tabidx = index
        self.type = item.leagueType
        console.log('tab:', self.tabidx, item.leagueType_CN, self.type)
        self.selectedFilterMatchData = []
        self.getMatchByTag()
      },
      tabMore() {
        let self = this
        self.getMatchType()
        self.showMatchFilter = true
      },
      hideMatchFilter() {
        let self = this
        self.showMatchFilter = false
      },
      selectTypeFilterAll() {
        let self = this
        if (self.filterMatchData.length) {
          self.filterMatchData.forEach((val, i) => {
            val.selected = true

            // self.filterMatchData.splice(i, 1, val)
          })
        }
      },
      selectTypeFilterInverse() {
        let self = this
        if (self.filterMatchData.length) {
          self.filterMatchData.forEach((val) => {
            val.selected = !val.selected
          })
        }
      },
      selectTypeFilterClear() {
        let self = this
        if (self.filterMatchData.length) {
          self.filterMatchData.forEach((val) => {
            val.selected = false
          })
        }
      },
      toggleMatchType(item, index) {
        let slef = this
        item.selected = !item.selected
      },
      selectTypeFilterOk() {
        let self = this
        let types = []
        self.selectedFilterMatchData = []
        if (self.filterMatchData.length) {
          self.filterMatchData.forEach((val, i) => {
            if(val.selected) {
              types.push(val.type)
              self.selectedFilterMatchData.push(val)
            }
          })
          if (types.length){
            if (types.length === 1) {
              let tab
              for(let i=0,len=self.tablist.length; i<len; i++) {
                tab = self.tablist[i]
                if(tab.leagueType === types[0]) {
                  self.tabidx = i
                  self.selectedFilterMatchData = []
                }
              }
            } else if (types.length === self.filterMatchData.length) {
              self.tabidx = 0
              self.selectedFilterMatchData = []
            } else {
              self.tabidx = -1
            }
            console.log(types.join(','))
            self.type = types.join(',')
            self.getMatchByTag()
            self.showMatchFilter = false
          }
        }
      },
      getMatchType() {
        let self = this
        if (self.loading_type) {
          return
        }
        self.loading_type = true
        let params = {
          date: self.date.replace(/\//g,'-')
        }
        getMatchType(params).then((res) => {
          self.loading_type = false;
          self.filterMatchData = []
          let result = self.resultHandler(res)
          let {status, data} = result

          let code = status.code
          if (code === ERR_OK) {
            for(let key in data){
              if(data.hasOwnProperty(key)){
                data[key].selected = true
                Vue.set(self.filterMatchData, self.filterMatchData.length, data[key])
              }
            }
            self.showMatchFilter = true
            console.log('filterMatchType:',self.filterMatchData)
          } else {
            this.$message({
              showClose: true,
              message: '暂无赛事可以筛选哦~',
              type: 'warning'
            });
          }
        }, (error) => {
          self.loading_type = false
          this.$message({
            showClose: true,
            message: '暂无赛事可以筛选哦~',
            type: 'warning'
          });
        })
      },

      getDefaultDate() {
        let self = this
        var today = new Date();
        if(today.getHours() < 8){
          today = today.getTime() - 24*60*60*1000;
        }
        self.date = util.dateFormatFmt( new Date(today), "yyyy/MM/dd");
        // self.date = "2018/06/11";
        let year = util.dateFormatFmt( self.date, "yyyy");
        let month = util.dateFormatFmt( self.date, "MM");
        self.choicedate(year, month, true)
      },
      choicedate(year, month, firstLoad) {
        let self = this

        if (self.loading_date) {
          return
        }
        self.loading_date = true

        getCalNoMatchDates(year, month).then((res) => {
          self.loading_date = false
          let result = self.resultHandler(res)

          let {status, data} = result
          let code = status.code
          if (code === ERR_OK && util.isArray(data) && data.length) {

            let year0= util.dateFormatFmt( data[0], "yyyy");
            let month0 = util.dateFormatFmt( data[0], "MM");
            // console.log(year0,year,month0,month)
            if (year0 !== year || month0 !== month) {
              return
            }

            let curdate
            for(var i=0,len=data.length; i<len; i++){
              curdate = data[i].replace(/-/g,'/')
              self.disableDate.push(curdate);
            }

            self.disableDate = Array.from(new Set(self.disableDate))

            console.log('disableDate:', self.disableDate)
          }
          if (firstLoad) {
            // self.disableDate.push('2018/06/07', '2018/06/08', '2018/06/09')
            // 假如默认日期是没有比赛的，顺延到下一个比赛日
            while (self.disableDate.indexOf(self.date) > -1) {
              let nextday = util.nextDate(new Date(self.date), 1)
              self.date = util.dateFormatFmt( new Date(nextday), "yyyy/MM/dd")
            }

            self.getMatchByTag()
            self.beginMorePage()
          }
        }, (error) => {
          self.loading_date = false
          if (firstLoad) {
            self.getMatchByTag()
            self.beginMorePage()
          }
        })
      },
      dateChange(val) {
        let self = this
        self.date = util.dateFormatFmt( new Date(val), "yyyy/MM/dd")
        self.type = 'all'
        self.tabidx = 0
        self.selectedFilterMatchData = []

        self.getMatchByTag()
      },
      dateFocus() {
        let self = this
        setTimeout(function () {
          self.bindDateEvent()
        }, 30)
      },
      bindDateEvent() {
        let self = this
        let $el = $('.el-picker-panel')
        if ($el.length <= 0) {
          setTimeout(function () {
            self.bindDateEvent()
          }, 30)
          return
        }
        if (self.firstBindEvent) {
          self.firstBindEvent = false
          let label, year, month
          $el.on('click', '.el-date-picker__next-btn', function () {
            setTimeout(function () {
              label = $el.find('.el-date-picker__header-label:visible')
              if ($(label).length >= 2) {
                year = '' + parseInt($(label).eq(0).text())
                month = util.addPreZero(parseInt($(label).eq(1).text()), 2)
                self.choicedate(year, month)
              }
            }, 30)
          })
          $el.on('click', '.el-date-picker__prev-btn', function () {
            setTimeout(function () {
              label = $el.find('.el-date-picker__header-label:visible')
              if ($(label).length >= 2) {
                year = '' + parseInt($(label).eq(0).text())
                month = util.addPreZero(parseInt($(label).eq(1).text()), 2)
                self.choicedate(year, month)
              }
            }, 30)
          })
        }
      },
      beginMorePage() {
        let self = this;
        util.scrollEnd(function() {
          self.pullLoad()
        }, true);
      },
      pullLoad() {
        let self = this
        if (self.isFirstLoading) {
          return;
        }
        if (self.isLoadingMore) {
          return;
        }
        if (self.isLoadingMoreNo) {
          return;
        }
        let vd = util.viewData();
        if (vd.viewHeight + vd.scrollTop + 300 >= vd.documentHeight) {
          self.getMatchByTagMore()
        }
      },
      getMatchByTag() {
        let self = this
        if (self.isFirstLoading) {
          return
        }
        self.isFirstLoading = true
        self.pdlist = []
        self.noResult = false
        self.isLoadingMoreNo = false

        let type = self.type
        if (self.type == 'all') {
          type = ''
        }
        self.page = 1
        let params = {
          date: self.date.replace(/\//g,'-'),
          type: type,
          page: self.page,
        }
        getMatchByTag(params).then((res) => {
          self.isFirstLoading = false;
          self.pdlist = []
          let result = self.resultHandler(res)
          let {status, data, limit, dataSize, queryDate, page, type} = result
          console.log('response:',  queryDate, page, type)
          console.log('request:',  self.date.replace(/\//g,'-'), self.page, self.type)
          if (queryDate != self.date.replace(/\//g,'-')  || type != self.type) {
            return
          }

          let code = status.code
          if (code === ERR_OK && util.isArray(data) && data.length) {
            data.forEach((val) => {
              self.pdlist.push(new Match(val))
            })
            console.log(data)
            if (data.length <= dataSize) {
              self.isLoadingMoreNo = false
            } else {
              self.isLoadingMoreNo = true
            }

            self.page = (page-0+1)

            if (!self.isLoadingMoreNo && data.length < 10) {
               self.getMatchByTagMore()
            }
          } else {
            self.noResult = true;
            self.noResultText = '暂无比赛~'
            self.isLoadingMoreNo = true
          }
        }, (error) => {
          self.isFirstLoading = false
          self.pdlist = []
          self.noResult = true
          self.noResultText = error.message
          self.isLoadingMoreNo = true
        })
      },
      getMatchByTagMore() {
        let self = this
        if (self.isLoadingMore) {
          return
        }
        self.isLoadingMore = true;
        let type = self.type
        if (self.type == 'all') {
          type = ''
        }
        let params = {
          date: self.date.replace(/\//g,'-'),
          type: type,
          page: self.page,
        }
        getMatchByTag(params).then((res) => {
          self.isLoadingMore = false;
          let result = self.resultHandler(res)
          let {status, data, limit, queryDate, page, type} = result
          if (queryDate != self.date.replace(/\//g,'-') || type != self.type) {
            return
          }

          let code = status.code
          if (code === ERR_OK && util.isArray(data) && data.length) {
            data.forEach((val) => {
              self.pdlist.push(new Match(val))
            })
            console.log(self.pdlist)
            if (data.length < limit) {
              self.isLoadingMoreNo = true
            } else {
              self.isLoadingMoreNo = false
            }
            self.page = (page-0+1)

            self.isLoadingMore = true
            let vd = util.viewData();
            self.st = vd.scrollTop;
            console.log('st:', self.st)
            setTimeout(() => {
              window.scrollTo(0,self.st);
              self.isLoadingMore = false
            }, 20)
          } else {
            self.isLoadingMoreNo = true
          }
        }, (error) => {
          self.isLoadingMore = false
          self.isLoadingMoreNo = true
        })
      },

      goWelfare() {
        let slef = this
        util.openPage(PAGEURLS.WELFARE)
      },
      calculate: function() {
        let vd = util.viewData();
        let height = vd.viewHeight - 135 - 240 + 50;

        if (height > 0) {
          let $container = $('#content')
          $container.css({'minHeight': height + 'px'})
        }
      }
    },
    components: {
      MHeader,
      MAside,
      LoadingCircle
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  #app
    overflow: hidden
    .content
      position: relative
      padding-bottom: 40px
    .banner
      background: url(../../../static/img/banner_data.png) no-repeat center top #0A1384
      height: 235px
      .wrap
        height: 100%
        overflow: hidden
      .vistor-box
        position: absolute
        left: 212px
        bottom: 40px
        height: 40px
      .vistor
        float: left
        border: 1px solid #078DFF
        border-radius: 3px;
        padding: 0 14px
        padding-top: 5px
        height: 35px
        line-height: 35px
        font-size: 13px
        color: #fff
        margin-right:  12px
        em
          font-size: 30px
          font-weight: bolder
          padding: 0 8px
          font-family: 'DIN Condensed'

    .datalist-box
      overflow: hidden
      background: #fff
      margin-top: 40px
      min-height: 200px
      .tablist
        position: relative
        height: 68px
        padding: 0 200px 0 6px
        border: 1px solid #EBF0F1
        border-bottom: 0 none
        .tab
          float: left
          height: 68px
          line-height: 68px
          font-size: 18px
          color: #8D9BA0
          padding: 0 22px
          cursor: pointer
          &:hover
            color: $red
          &.selected
            color: $color
    .date-box
      position: absolute
      right: 30px
      top: 14px
      .el-input
        width: 200px
    .match-box
      position: relative
      .el-table
        color: $color
      /deep/ .team1
        float: left
        width: 108px
        text-align: right
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
      /deep/ .team2
        float: right
        width: 108px
        text-align: left
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
      /deep/ .vs
        float: left
        width: 72px
        text-align: center
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        font-weight: bold
      .ic-hot
        position: absolute
        left: 0px
        top: 0px
        background: url(../../../static/img/icon_hot.png) no-repeat center top
        height: 24px
        width: 24px
      .tags-analysis
        display: inline-block
        width: 313px
        height: 24px
        line-height: 24px
        text-align: center
        background: #F7F8F9
        color: #8D9BA0
        font-size: 12px
      .tags
        display: inline-block
        // width: 313px
        height: 24px
        line-height: 24px
        .tag
          display: inline-block
          width: 99px
          text-align: center
          font-size: 12px
        .tag0
          background: #FFEFEF
          color: #ED686C
        .tag1
          background: #FFF5E4
          color: #E7A050
          margin: 0 8px
        .tag2
          background: #E1F7FC
          color: #46C0F0
      .pay-placeholder
        height: 36px
        overflow: hidden
        width: 100%
      .nopay
        position: absolute
        left: 50%
        top: 50%
        margin:-16px 0 0 -71px
        background: url(../../../static/img/btn_purchase_no.png) no-repeat center top
        height: 32px
        line-height: 32px
        width: 142px
        text-align: left
        /deep/ .price
          font-size: 14px
          color: #8D9BA0
          padding-left: 20px
        /deep/ .old-price
          font-size: 12px
          color: #8D9BA0
          text-decoration: line-through;
          padding-left: 5px
      .unpay
        position: absolute
        left: 50%
        top: 50%
        margin:-23px 0 0 -78px
        background: url(../../../static/img/btn_purchase.png) no-repeat center top
        height: 46px
        width: 156px
        cursor: pointer
        line-height: 42px
        text-align: left
        /deep/ .price
          font-size: 14px
          color: #FFFFFF
          padding-left: 27px
        /deep/ .old-price
          font-size: 12px
          color: #FFFFFF
          text-decoration: line-through
          padding-left: 5px
      .haspay
        position: absolute
        left: 50%
        top: 50%
        margin:-23px 0 0 -78px
        background: url(../../../static/img/btn_purchase_look.png) no-repeat center top
        height: 46px
        width: 156px
        cursor: pointer
      .list-more
        background: #fff
        margin-bottom: 5px
        line-height: 40px
        height: 40px
        font-size: 13px
        text-align: center
        color: $cicon
        img
         display: inline-block
         width: 15px
         height: 15px
         vertical-align: 10px
         margin-right: 10px
         vertical-align: baseline
    .tips-price1
      overflow: hidden
      background: url(../../../static/img/tips-price1.png) no-repeat center top
      height: 119px
      width: 114px
      position: absolute
      position: fixed
      top: 415px
      left: 50%
      margin-left: 620px
      z-index: 100
      cursor: pointer
    .no-list-box
      position: relative
      min-height: 130px
      border: 1px solid #EBF0F1
    .mask
      position: absolute
      position: fixed
      left: 0px
      right: 0px
      top: 0px
      bottom: 0px
      background: rgba(0,0,0, 0.5)
      z-index: 999
    .match-filter-box
      position: absolute
      position: fixed
      left: 50%
      top: 50%
      margin: -180px 0 0 -300px
      width: 600px
      height: 352px
      box-shadow: 0 0 6px rgba(0,0,0, 0.3)
      background: $cwhite
      border-radius: 6px
      z-index: 1000
      .mf-header
        background: url(../../../static/img/match_header.png) no-repeat center top
        width: 600px
        height: 68px
        .mf-title
          line-height: 68px
          color: $cwhite
          font-size: 20px
          padding-left: 20px
        .mf-close
          background: url(../../../static/img/match_close.png) no-repeat center top
          width: 25px
          height: 25px
          position: absolute
          top: 22px
          right: 22px
          cursor: pointer
          &:hover
            background: url(../../../static/img/match_close_h.png) no-repeat center top
            width: 29px
            height: 29px
            top: 20px
            right: 20px
      .mf-main
        height: 200px
        overflow-x: hidden
        overflow-y: auto
        position: relative
        .mf-list
          overflow: hidden
          padding-bottom: 30px
          .mf-item
            float: left
            margin: 30px 0 0 30px
            width: 130px
            padding-left: 31px
            height: 22px
            line-height: 22px
            background: url(../../../static/img/match_checkout.png) no-repeat left center
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            font-size: 16px
            color: #333333
            cursor: pointer
            &.selected
              background: url(../../../static/img/match_checkout_select.png) no-repeat left center
              color: #F81E1E
      .mf-footer
        overflow: hidden
        height: 84px
        line-height: 84px
        border-top: 1px dashed #D1DCE0
        position: relative
        .mff-btn
          float: left
          color: #333333
          font-size: 16px
          margin-left: 36px
          cursor: pointer
          &:hover
            color: #F81E1E
        .btn-ok
          background: url(../../../static/img/match_ok.png) no-repeat center top
          width: 142px
          height: 58px
          position: absolute
          top: 50%
          right: 20px
          margin: -29px 0 0 0
          cursor: pointer
        .btn-ok-gray
          background: url(../../../static/img/match_ok_gray.png) no-repeat center top
          width: 128px
          height: 44px
          position: absolute
          top: 50%
          right: 20px
          margin: -22px 0 0 0
          cursor: pointer

    .match-more-types
      overflow: hidden
      border: 1px solid #eff0f1
      background: #fff
      width: 112px
      height: auto
      position: absolute
      position: fixed
      top: 538px
      left: 50%
      margin-left: 620px
      z-index: 100
      padding-bottom: 6px
      .types-title
        text-align: center
        line-height: 40px
        height: 40px
        font-size: 12px
        overflow: hidden
      .types-item
        line-height: 30px
        height: 30px
        overflow: hidden
        white-space: nowrap
        text-align: center
        font-size: 14px
        color: #c6282f
</style>
