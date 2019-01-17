<template>
  <div id="app">
    <m-header navIdx="-1"></m-header>
    <div class="content clearfix" id="content">
      <loading-circle v-if="!info && !noResult"></loading-circle>
      <div class="no-data-box wrap" v-if="!info&& noResult">
        <no-result :title="noResultText"></no-result>
      </div>
      <info :info="info" v-if="info"></info>
      <template v-if="isHasPayCom">
      <div class="box text-box" v-if="infoText">
        <div class="text-header">
          <div class="text-title">透视结果</div>
          <!--<div class="text-riskactor" v-if="infoText && infoText.riskactor" :class="getTextRiskactor(infoText.riskactor)">风险系数：{{infoText.riskactor}}</div>-->
          <div class="text-sub-xp">利用大数据透视的因子特征，小炮算法2.0建模分析</div>
        </div>
        <no-result :title="infoText.nodata" v-if="infoText && infoText.nodata"></no-result>
        <div class="box-content" v-if="infoText && !infoText.nodata">
          <div class="text-main">
            <div class="tm-txt" v-html="infoText.fluoroscopyDesc"></div>
            <div class="box-content" v-if="infoTag && !infoTag.nodata">
              <div class="tag-list">
                <div class="tag" :class="['tag'+ item.type]" v-for="(item, index) in infoTag" :key="index">{{getTag(item)}}</div>
              </div>
            </div>
            <div class="tm-item">
              <div class="tm-item-tag tm-item-tag0">市场舆情</div>
              {{infoText.surportValueDesc}}
            </div>
            <div class="tm-item">
              <div class="tm-item-tag tm-item-tag1">状态走势</div>
              {{infoText.teamStatusDesc}}
            </div>
            <div class="tm-item">
              <div class="tm-item-tag tm-item-tag2">技术风向</div>
              {{infoText.technicalAnalystsDesc}}
            </div>
          </div>
        </div>
      </div>
      <div class="box popular-box">
        <div class="box-header">
          <div class="box-icon"></div>
          <div class="box-title">市场舆情</div>
          <div class="layout-time" v-if="infoPopular.time">更新时间：{{getDateHours(infoPopular.time)}}</div>
        </div>

        <no-result :title="infoPopular.nodata" v-if="infoPopular.nodata"></no-result>
        <div class="box-content layout-600-600" v-if="infoPopular.desc">
          <div class="layout-title" v-html="infoPopular.desc.fluoroscopyDesc">
          </div>
          <div class="layout-main">
            <div class="team-popular left">
              <div class="tp-text"><span class="tp-tag">【球队人气】</span>{{infoPopular.desc.teamHotValueDesc}}</div>
              <div class="tp-echart-box" v-if="existInfo(infoPopular.data[0])">
                <div class="tp-team-home">
                  <span class="tp-team-line"></span>
                  {{hostTeam}}
                </div>
                <div class="tp-team-guest">
                  <span class="tp-team-line"></span>
                  {{awayTeam}}
                </div>
                <div class="tpe-name">球队人气走势</div>
                <div class="tpe-name-y">球队人气指数</div>
                <div class="tpe-name-x">时间</div>
                <div class="tp-echart" id="tp-echarts-line">
                   <!--球队近10场比赛状态走势-->
                </div>
              </div>
              <div class="text-no-data-box" v-if="!existInfo(infoPopular.data[0])">
                <div class="text-no-data">{{textNoData}}</div>
              </div>
            </div>
            <div class="market-feeling right">
              <div class="tp-text"><span class="tp-tag">【市场情感】</span>{{infoPopular.desc.matchSurportDesc}}</div>
              <div class="mf-bar-box" v-if="existInfo(infoPopular.desc.winSurportValue)">
                <div class="per-win"><span class="f18">{{infoPopular.desc.winSurportValue}}</span>%</div>
                <div class="per-pin"><span class="f18">{{infoPopular.desc.pinSurportValue}}</span>%</div>
                <div class="per-lose"><span class="f18">{{infoPopular.desc.loseSurportValue}}</span>%</div>
                <div class="bar">
                  <div class="bar-pin" :style="{width: getPinWidth(infoPopular.desc.pinSurportValue, infoPopular.desc.loseSurportValue)}"></div>
                  <div class="bar-lose" :style="{width: infoPopular.desc.loseSurportValue +'%'}"></div>
                </div>
                <div class="mfb-win">
                  <span class="mfb-win-icon"></span>胜
                </div>
                <div class="mfb-pin">
                  <span class="mfb-pin-icon"></span>平
                </div>
                <div class="mfb-lose">
                  <span class="mfb-lose-icon"></span>负
                </div>
              </div>
              <div class="text-no-data-box" v-if="!existInfo(infoPopular.desc.winSurportValue)">
                 <div class="text-no-data">{{textNoData}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box1 team-status-box">
        <div class="box-header">
          <div class="box-icon"></div>
          <div class="box-title">球队状态</div>
          <!--<div class="btn-algorithm-small" @click="goAlgorithmTeamStatus"></div>-->
        </div>
        <no-result :title="infoTeamStatus.nodata" v-if="infoTeamStatus.nodata"></no-result>
        <div class="box-content layout-600-600" v-if="infoTeamStatus.desc">
          <div class="layout-title">
            <span v-html="infoTeamStatus.desc.fluoroscopyDesc1"></span>
            <span v-html="infoTeamStatus.desc.fluoroscopyDesc2"></span>
          </div>
          <div class="layout-main">
            <div class="ts-trend left">
              <div class="tp-text"><span class="tp-tag">【状态走势】</span>{{infoTeamStatus.desc.teamStatusDesc}}</div>
              <div class="tp-echart-box" v-if="existInfo(infoTeamStatus.data.host)">
                <div class="tp-team-home">
                  <span class="tp-team-line"></span>
                  {{hostTeam}}
                </div>
                <div class="tp-team-guest">
                  <span class="tp-team-line"></span>
                  {{awayTeam}}
                </div>
                <div class="tpe-name">球队近10场比赛状态走势</div>
                <div class="tpe-name-y">球队状态值</div>
                <div class="tpe-name-x">近10场<br/>(右边为最近一场)</div>
                <div class="tp-echart" id="ts-echarts-line">
                  <!--球队近10场比赛状态走势-->
                </div>
              </div>
              <div class="text-no-data-box" v-if="!existInfo(infoTeamStatus.data.host)">
                <div class="text-no-data">{{textNoData}}</div>
              </div>
            </div>
            <div class="ts-range right">
              <div class="tp-text"><span class="tp-tag">【状态波动】</span>{{infoTeamStatus.desc.teamStatusRangeDesc}}</div>
              <div class="gauge" v-if="existInfo(infoTeamStatus.desc.strongPerformanceFlag)">
                <div class="gauge-red" :style="infoTeamStatus.desc.gaugePer1"></div>
                <div class="gauge-blue" :style="infoTeamStatus.desc.gaugePer2"></div>
                <div class="gauge-circle"></div>
                <div class="gauge-home">
                  <span class="gauge-home-icon"></span>
                  {{hostTeam}}
                </div>
                <div class="gauge-guest">
                  <span class="gauge-guest-icon"></span>
                  {{awayTeam}}
                </div>
              </div>
              <div class="text-no-data-box" v-if="!existInfo(infoTeamStatus.desc.strongPerformanceFlag)">
                <div class="text-no-data">{{textNoData}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box1 technical-box">
        <div class="box-header">
          <div class="box-icon"></div>
          <div class="box-title">赔率变化</div>
          <!--<div class="btn-algorithm-small" @click="goAlgorithmTechnical"></div>-->
          <div class="layout-time" v-if="infoTechnical.time">更新时间：{{getDateHours(infoTechnical.time)}}</div>
        </div>

        <no-result :title="infoTechnical.nodata" v-if="infoTechnical.nodata"></no-result>
        <div class="box-content layout-600-600" v-if="infoTechnical.desc">
          <div class="layout-title">
            <p v-html="infoTechnical.desc.fluoroscopyDesc"></p>
          </div>
          <div class="layout-main">
            <div class="ta-trend left">
              <div class="tp-text"><span class="tp-tag">【赔率走势】</span>{{infoTechnical.desc.oddsChangeDesc}}</div>
              <div class="tp-echart-box" v-if="existInfo(infoTechnical.data[0])">
                <div class="ta-odds">
                  <span class="win-line"></span>
                  <span class="pin-line"></span>
                  <span class="lose-line"></span>
                  <div class="odds-item">胜赔</div>
                  <div class="odds-item">平赔</div>
                  <div class="odds-item">负赔</div>
                </div>
                <div class="tpe-name">赔率走势</div>
                <div class="tpe-name-y">赔率</div>
                <div class="tpe-name-x">时间</div>
                <div class="tp-echart" id="ta-echarts-line">
                  <!--球队近10场比赛状态走势-->
                </div>
              </div>
              <div class="text-no-data-box" v-if="!existInfo(infoTechnical.data[0])">
                <div class="text-no-data">{{textNoData}}</div>
              </div>
            </div>
            <div class="ta-range right">
              <div class="tp-text"><span class="tp-tag">【变赔幅度】</span>{{infoTechnical.desc.changeRangeDesc}}</div>
              <div class="gauge" v-if="existInfo(infoTechnical.desc.winChangeRangeFlag)">
                <div class="gauge-red" :style="infoTechnical.desc.gaugePer1"></div>
                <div class="gauge-yellow" :style="infoTechnical.desc.gaugePer2"></div>
                <div class="gauge-blue" :style="infoTechnical.desc.gaugePer3"></div>

                <div class="gauge-circle"></div>
                <div class="gauge-win">
                  <span class="gauge-win-icon"></span>
                  胜赔
                </div>
                <div class="gauge-pin">
                  <span class="gauge-pin-icon"></span>
                  平赔
                </div>
                <div class="gauge-lose">
                  <span class="gauge-lose-icon"></span>
                  负赔
                </div>
              </div>
              <div class="text-no-data-box" v-if="!existInfo(infoTechnical.desc.winChangeRangeFlag)">
                <div class="text-no-data">{{textNoData}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box2 similar-box">
        <div class="box-header">
          <div class="box-icon"></div>
          <div class="box-title">比赛推荐</div>
          <div class="btn-algorithm-match" @click="goAlgorithmTag"></div>
        </div>
        <!--recent-->
        <div class="trial-content" v-if="loading_relationMatches">
          <loading-alg :title="loadingTextMatchRecent" v-if="loading_relationMatches"></loading-alg>
        </div>
        <div class="trial-content" v-if="!loading_relationMatches && !pdlist.length">
          <div class="trial-text">暂时没有相似比赛推荐！</div>
        </div>
        <div class="recent-table-box" v-if="!loading_relationMatches && pdlist.length">
          <el-table
              :data="pdlist"
              border
              style="width: 100%">
            <el-table-column
                label="赛事"
                align="center"
                width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.LeagueType_cn }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="时间"
                align="center"
                width="200">
              <template slot-scope="scope">
                <span v-html="scope.row.datetime"></span>
              </template>
            </el-table-column>
            <el-table-column
                label="对阵"
                align="center"
                width="400">
              <template slot-scope="scope">
                <span v-html="scope.row.vs"></span>
                <span class="ic-hot" v-if="scope.row.IfHot"></span>
              </template>
            </el-table-column>
            <el-table-column
                label="相似度"
                align="center"
                width="165">
              <template slot-scope="scope">
                    <span class="relation">
                      {{ scope.row.relation_m }}
                    </span>
              </template>
            </el-table-column>
            <el-table-column
                label="结果预测"
                align="center">
              <template slot-scope="scope">
                <div class="pay-placeholder"></div>
                <span class="look" @click="eventNoPayMessage(scope.row)" v-if="isNoPay(scope.row.switchFlag)">查看</span>
                <span class="look" @click="eventUnPay(scope.row)" v-if="isUnPay(scope.row.switchFlag)">查看</span>
                <span class="look" @click="eventHasPay(scope.row)" v-if="isHasPay(scope.row.switchFlag)">查看</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>
      <div class="tips-danger">
        <span class="icon-danger"></span>
        <span class="tips-danger-text">风险提示 : 比赛透视结果通过智能模型加工客观数据而成，仅供参考，不构成绝对投资建议。</span>
      </div>
      </template>

      <template v-if="isHasPayAnalysis">
        <div class="box text-box">
          <div class="analysis"></div>
        </div>
      </template>
      <template v-if="isNoPayCom">
        <div class="box text-box">
          <div class="btn-no-pay" @click="eventNoPay">该场比赛暂未开售，点击购买其他比赛</div>
        </div>
      </template>
      <template v-if="isUnPayCom">
        <div class="box text-box">
          <div class="btn-no-pay" @click="eventNoPay">还未购买该场预测，点击去购买</div>
        </div>
      </template>
      <template v-if="isUnLogin">
        <div class="box text-box">
          <div class="btn-no-pay" @click="eventGoLogin">登录后才可查看该场预测，点击去登录</div>
        </div>
      </template>
    </div>

    <div class="alert-toast-box" v-if="algAlertShow">
      <div class="atb-mask"></div>
      <div class="atb-toast">
        <div class="atb-close" @click="atbClose"></div>
        <div class="atb-content">
          {{algAlertText}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  let util = window.util || {}
  let cache = window.cache || {}
  let $ = window.$
  let echarts = window.echarts

  import {baseMixin} from 'common/js/mixin'

  import Vue from 'vue'
  import MHeader from 'components/m-header/m-header'
  import LoadingCircle from 'base/loading/loading-circle'
  import Info from 'components/perspective/info'
  import LoadingAlg from 'base/loading/loading-alg'
  import Payment from 'class/Payment'
  import MatchAlg from 'class/MatchAlg'

  import {ERR_OK, PAGEURLS} from 'common/const/config'
  import {getMatchInfo, algCheckCanBuy, getTextByMatchId, getTagByMatchId, getPopularOptions, getTeamStatus, getTechnical} from 'api/perspective'
  import {relationMatches} from 'api/algorithm'
  import {checkLocalLogin}  from 'common/js/cache'

  export default {
    name: 'App',
    mixins: [baseMixin],
    data() {
      return {
        id: util.getQueryString('id'),
        info: null,
        infoText: null,
        infoTag: null,
        infoPopular: {
          desc: null,
          data: null,
          nodata: null
        },
        infoTeamStatus: {
          desc: null,
          data: null,
          nodata: null
        },
        infoTechnical:  {
          desc: null,
          data: null,
          nodata: null
        },
        switchFlag: '',  // 1 不可购买, 2 可购买, 3已买, 4已买并且无预测,-1未登录
        textNoData: '暂无数据',
        pdlist: [],
        loading_relationMatches: false,
        loadingTextMatchRecent: '正在匹配近期比赛...',
        algAlertText: '',
        algAlertShow: false,
      }
    },
    computed: {
      isUnLogin() {
        let self = this
        return self.switchFlag == '-1'
      },
      isNoPayCom() {
        let self = this
        return self.switchFlag == '1'
      },
      isUnPayCom() {
        let self = this
        return self.switchFlag == '2'
      },
      isHasPayCom() {
        let self = this
        return self.switchFlag == '3'
      },
      isHasPayAnalysis() {
        let self = this
        return self.switchFlag == '4'
      },
      tagPopular() {
        // 增加了一个type：4舆情因子 1状态因子 3技术因子 2基础因子
        let self = this
        if( !self.infoTag ) { return}
        let tags = self.infoTag.filter(function (item) {
           return item.type == 4
        })
        return tags
      },
      tagTeamStatus() {
        // 增加了一个type：4舆情因子 1状态因子 3技术因子 2基础因子
        let self = this
        if( !self.infoTag ) { return}
        let tags = self.infoTag.filter(function (item) {
          return item.type == 1
        })
        return tags
      },
      tagTechnical() {
        // 增加了一个type：4舆情因子 1状态因子 3技术因子 2基础因子
        let self = this
        if( !self.infoTag ) { return}
        let tags = self.infoTag.filter(function (item) {
          return item.type == 3
        })
        return tags
      },
      hostTeam() {
        let self = this
        if( !self.info ) { return}
        let name = self.info.Team1
        return name
      },
      awayTeam() {
        let self = this
        if( !self.info ) { return}
        let name = self.info.Team2
        return name
      },
    },
    created() {
      let self = this
    },
    mounted() {
      let self = this
      self.getMatchInfo()
      self.calculate()
    },
    methods: {
      eventGoLogin() {
        let self = this
        util.goLoginIsBack()
      },
      eventNoPay() {
        let self = this
        util.goPage(PAGEURLS.DATALIST)
      },
      getDateHours(val) {
        let self = this
        return util.dateFormatFmt( val, "yyyy-MM-dd hh:mm")
      },
      existInfo(val) {
        let self = this
        let exist = true
        if(val === undefined || val === null) {
          exist = false
        }
        return exist
      },
      getPinWidth(per1, per2) {
        let self = this
        return parseInt(per1) + parseInt(per2) + '%'
      },
      getTag(val) {
        let tag = val.tagCn
        if (val.textRules == 1) {
          tag = val.parentCn + tag
        }
        return tag
      },
      getMatchInfo() {
        let self = this
        let id = self.id
        if (!id) {
          self.noResult = true;
          self.noResultText = '暂无赛事信息~'
          self.isLoadingMoreNo = true
          return
        }

        if (self.loading_matchinfo) {
          return
        }
        self.loading_matchinfo = true
        getMatchInfo(id).then((res) => {
          self.loading_matchinfo = false
          let result = self.resultHandler(res)
          let {status, data} = result

          let code = status.code
          if (code === ERR_OK) {
            self.info = data[0]
            // self.info.status = 3
            console.log('matchInfo:',self.info)
            if( checkLocalLogin() ) {
              self.algCheckCanBuy()
            } else {
              self.switchFlag = '-1'
            }
          } else {
            self.noResult = true;
            self.noResultText = '暂无赛事信息~'
          }
        }, (error) => {
          self.loading_matchinfo = false
          self.noResult = true
          self.noResultText = error.message
        })
      },
      algCheckCanBuy() {
        let self = this
        let id = self.id
        if (self.loading_algcheckcanbuy) {
          return
        }
        self.loading_algcheckcanbuy = true
        algCheckCanBuy(id).then((res) => {
          self.loading_algcheckcanbuy = false
          let result = self.resultHandler(res)
          let {status, data} = result

          let code = status.code
          if (code === ERR_OK) {
            // 1 不可购买, 2 可购买, 3已买, 4已买并且无预测
            self.switchFlag = data.switchFlag

            console.log('algCheckCanBuy:', data.switchFlag)
            if (self.switchFlag == 3) {
              self.getTextByMatchId()
              self.getTagByMatchId()
              self.getPopularOptions()
              self.getTeamStatus()
              self.getTechnical()
            }
          } else {
            self.noResult = true;
            self.noResultText = '查询比赛授权状态失败~'
          }
        }, (error) => {
          self.loading_algcheckcanbuy = false
          self.noResult = true
          self.noResultText = error.message
        })
      },
      getTextByMatchId() {
        let self = this
        let id = self.id
        if (!id) {
          return
        }

        if (self.loading_text) {
          return
        }
        self.loading_text = true
        getTextByMatchId(id).then((res) => {
          self.loading_text = false
          let result = self.resultHandler(res)
          let {status, data} = result

          let code = status.code
          if (code === ERR_OK) {
            self.infoText = data
            console.log('infoText:',self.infoText)
          } else {
            self.infoText = {
              nodata: '暂无数据'
            }
          }
        }, (error) => {
          self.loading_text = false
          self.infoText = {
            nodata: error.message
          }
        })
      },
      getTagByMatchId() {
        let self = this
        let id = self.id
        if (!id) {
          return
        }

        if (self.loading_tag) {
          return
        }
        self.loading_tag = true
        getTagByMatchId(id).then((res) => {
          self.loading_tag = false
          let result = self.resultHandler(res)
          let {status, data} = result

          let code = status.code
          if (code === ERR_OK) {
            self.infoTag = data
            console.log('infoTag:',self.infoTag)

            self.relationMatches()
          } else {
            self.infoTag = {
              nodata: '暂无数据'
            }
          }
        }, (error) => {
          self.loading_tag = false
          self.infoTag = {
            nodata: error.message
          }
        })
      },
      getPopularOptions() {
        let self = this
        let id = self.id
        if (!id) {
          return
        }

        if (self.loading_popular) {
          return
        }
        self.loading_popular = true
        getPopularOptions(id).then((res) => {
          self.loading_popular = false
          let result = self.resultHandler(res)
          let {status, data, desc} = result

          let code = status.code
          if (code === ERR_OK) {
            self.infoPopular.data = data
            if (data && data[0] && data[0].create_time) {
              self.infoPopular.time = data[0].create_time
            }
            self.infoPopular.desc = desc
            console.log('infoPopular:',self.infoPopular.data)
            setTimeout(function () {
              self.tpEchartsLine()
            }, 20)
          } else {
            self.infoPopular.nodata = '暂无数据'
          }
        }, (error) => {
          self.loading_popular = false
          self.infoPopular.nodata = error.message
        })
      },
      tpEchartsLine() {
        let self = this
        let data = self.infoPopular.data
        if(!data || !util.isArray(data)) {
           return
        }
        data.reverse()
        let arr1 = [], arr2 = [], timeArr1 = [], timeArr2 = [];
        data.forEach(function(val, idx){
          arr1.push(val.hostHotValue-0)
          arr2.push(val.guestHotValue-0)
          timeArr1.push(util.dateFormatFmt( val.create_time, "MM-dd"))
          timeArr2.push(util.dateFormatFmt( val.create_time, "MM-dd hh:mm"))
        })

        let arrMerge = arr1.concat(arr2).concat([0, 100])
        let min =  Math.min.apply(null, arrMerge)
        let max =  Math.max.apply(null, arrMerge)

        let myChart = echarts.init(document.getElementById('tp-echarts-line'), 'xp');
        let option = {
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return `${timeArr2[params[0].dataIndex]}<br/>${params[0].marker} ${params[0].seriesName}:${params[0].value}<br/>${params[1].marker} ${params[1].seriesName}:${params[1].value}`
            },
            backgroundColor: 'rgba(0,0,0,0.7)'
          },
          xAxis: {
            type: 'category',
            data: timeArr1,
          },
          yAxis: {
            type: 'value',
            min: min,
            max: max
          },
          dataZoom: [
            {
              id: 'tpEchartsLine',
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty',
              start: 0,
              end: 100,
              minSpan: 10,
              maxSpan: 100,
            }
          ],
          series: [{
            name: self.hostTeam,
            data: arr1,
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: 'rgba(242,61,32,0.5)',
                shadowBlur: 3,
                shadowOffsetY: 1
              }
            }
          },{
            name: self.awayTeam,
            data: arr2,
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: 'rgba(85,179,255,0.5)',
                shadowBlur: 3,
                shadowOffsetY: 1
              }
            }
          }]
        };
        myChart.setOption(option);
      },
      getTeamStatus() {
        let self = this
        let id = self.id
        if (!id) {
          return
        }

        if (self.loading_team_status) {
          return
        }
        self.loading_team_status = true
        getTeamStatus(id).then((res) => {
          self.loading_team_status = false
          let result = self.resultHandler(res)
          let {status, data, desc} = result

          let code = status.code
          if (code === ERR_OK) {
            self.infoTeamStatus.data = data
            self.infoTeamStatus.desc = desc
            console.log('infoTeamStatus:',self.infoTeamStatus.data)
            setTimeout(function () {
              self.tsEchartsLine()
              self.tsGauge()
            }, 20)
          } else {
            self.infoTeamStatus.nodata = '暂无数据'
          }
        }, (error) => {
          self.loading_team_status = false
          self.infoTeamStatus.nodata = error.message
        })
      },
      tsEchartsLine() {
        let self = this
        let data = self.infoTeamStatus.data
        if(!data) {
          return
        }
        let arr1 = [], arr2 = [], arr3 = [];
        data.host.forEach(function(val, idx){
          arr1.push(val-0)
          arr3.push(idx+1)
        })
        data.guest.forEach(function(val, idx){
          arr2.push(val-0)
        })
        arr3.reverse()

        let arrMerge = arr1.concat(arr2).concat([0, 100])
        let min =  Math.min.apply(null, arrMerge)
        let max =  Math.max.apply(null, arrMerge)

        let myChart = echarts.init(document.getElementById('ts-echarts-line'), 'xp');
        let option = {
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return `${params[0].marker} ${params[0].seriesName}:${params[0].value}<br/>${params[1].marker} ${params[1].seriesName}:${params[1].value}`
            },
            backgroundColor: 'rgba(0,0,0,0.7)'
          },
          xAxis: {
            type: 'category',
            data: arr3,
          },
          yAxis: {
            type: 'value',
            min: min,
            max: max
          },
          dataZoom: [
            {
              id: 'tsEchartsLine',
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty',
              start: 0,
              end: 100,
              minSpan: 50,
              maxSpan: 100,
            }
          ],
          series: [{
            name: self.hostTeam,
            data: arr1,
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: 'rgba(242,61,32,0.5)',
                shadowBlur: 3,
                shadowOffsetY: 1
              }
            }
          },{
            name: self.awayTeam,
            data: arr2,
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: 'rgba(85,179,255,0.5)',
                shadowBlur: 3,
                shadowOffsetY: 1
              }
            }
          }]
        };
        myChart.setOption(option);
      },
      tsGauge() {
        let self = this
        let data = self.infoTeamStatus.desc
        if(!data) {
          return
        }
        let st = data.strongTeam
        let wt = data.weekTeam
        let sp = data.strongPerformanceFlag - 0
        let wp = data.weekPerformanceFlag - 0

        if ( self.hostTeam == wt ) {
          sp = data.weekPerformanceFlag - 0
          wp = data.strongPerformanceFlag -0
        }

        let spSty
        let wpSty
        if (sp == 0) {
          spSty = {
            display: 'none'
          }
        } else if (sp == wp) {
          // 返回1-5挡，仪表盘划分为15个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*sp - 24 - 90
          spSty = {
            transform: `rotate(${deg}deg)`
          }
        } else {
          // 返回1-5挡，仪表盘划分为10个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*sp - 18 -90
          spSty = {
            transform: `rotate(${deg}deg)`
          }
        }
        if (wp == 0) {
          wpSty = {
            display: 'none'
          }
        } else if (sp == wp) {
          // 返回1-5挡，仪表盘划分为20个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*wp - 12 - 90
          wpSty = {
            transform: `rotate(${deg}deg)`
          }
        } else {
          // 返回1-5挡，仪表盘划分为10个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*wp - 18 -90
          wpSty = {
            transform: `rotate(${deg}deg)`
          }
        }

        Vue.set(self.infoTeamStatus.desc, 'gaugePer1', spSty)
        Vue.set(self.infoTeamStatus.desc, 'gaugePer2', wpSty)

      },
      getTechnical() {
        let self = this
        let id = self.id
        let oddsId = self.info.odds_id
        if (!id || !oddsId) {
          return
        }

        if (self.loading_technical) {
          return
        }
        self.loading_technical = true
        getTechnical(id, oddsId).then((res) => {
          self.loading_technical = false
          let result = self.resultHandler(res)
          let {status, data, desc} = result

          let code = status.code
          if (code === ERR_OK) {
            self.infoTechnical.data = data
            if (data && data[0] && data[0].otime) {
              self.infoTechnical.time = data[0].otime
            }
            self.infoTechnical.desc = desc
            console.log('infoTechnical:',self.infoTechnical.data)
            setTimeout(function () {
              self.taEchartsLine()
              self.taGauge()
            }, 20)
          } else {
            self.infoTechnical.nodata = '暂无数据'
          }
        }, (error) => {
          self.loading_technical = false
          self.infoTechnical.nodata = error.message
        })
      },
      taEchartsLine() {
        let self = this
        let data = self.infoTechnical.data
        if(!data || !util.isArray(data)) {
          return
        }

        data.reverse()
        let arr1=[]
        let arr2=[]
        let arr3=[]
        let timeArr1=[]
        let timeArr2=[]

        data.forEach(function(val){
          arr1.push(val.o1)
          arr2.push(val.o2)
          arr3.push(val.o3)
          timeArr1.push(util.dateFormatFmt( val.otime, "MM-dd"))
          timeArr2.push(util.dateFormatFmt( val.otime, "MM-dd hh:mm"))
        })

        let arrMerge = arr1.concat(arr2).concat(arr3)
        let min =  Math.min.apply(null, arrMerge)
        let max =  Math.max.apply(null, arrMerge)

        let myChart = echarts.init(document.getElementById('ta-echarts-line'), 'xp1');

        let option = {
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return `${timeArr2[params[0].dataIndex]}<br/>${params[0].marker} ${params[0].seriesName}:${params[0].value}<br/>${params[1].marker} ${params[1].seriesName}:${params[1].value}<br/>${params[2].marker} ${params[2].seriesName}:${params[2].value}`
            },
            backgroundColor: 'rgba(0,0,0,0.7)'
          },
          xAxis: {
            type: 'category',
            data: timeArr1,
          },
          yAxis: {
            type: 'value',
//            min: 0,
//            max: 100
          },
          dataZoom: [
            {
              id: 'taEchartsLine',
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty',
              start: 0,
              end: 100,
              minSpan: 10,
              maxSpan: 100,
            }
          ],
          series: [{
            name: '胜赔',
            data: arr1,
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: 'rgba(242,61,32,0.5)',
                shadowBlur: 3,
                shadowOffsetY: 1
              }
            }
          },{
            name: '平赔',
            data: arr2,
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: 'rgba(255,229,152,0.5)',
                shadowBlur: 3,
                shadowOffsetY: 1
              }
            }
          },{
            name: '负赔',
            data: arr3,
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: 'rgba(85,179,255,0.5)',
                shadowBlur: 3,
                shadowOffsetY: 1
              }
            }
          }]
        };
        myChart.setOption(option);
      },
      taGauge() {
        let self = this
        let data = self.infoTechnical.desc
        if(!data) {
          return
        }
        let winPer = data.winChangeRangeFlag - 0
        let pinPer = data.pinChangeRangeFlag - 0
        let losePer = data.loseChangeRangeFlag - 0


        let winSty
        let pinSty
        let loseSty
        if (winPer == 0) {
          winSty = {
            display: 'none'
          }
        } else if (winPer == pinPer && winPer == losePer) {
          // 返回1-5挡，仪表盘划分为20个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*winPer - 27 - 90
          winSty = {
            transform: `rotate(${deg}deg)`
          }
        } else if (winPer == pinPer || winPer == losePer) {
          // 返回1-5挡，仪表盘划分为15个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*winPer - 24 - 90
          winSty = {
            transform: `rotate(${deg}deg)`
          }
        } else {
          // 返回1-5挡，仪表盘划分为10个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*winPer - 18 - 90
          winSty = {
            transform: `rotate(${deg}deg)`
          }
        }

        if (pinPer == 0) {
          pinSty = {
            display: 'none'
          }
        } else if (pinPer == winPer && pinPer == losePer) {
          // 返回1-5挡，仪表盘划分为20个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*pinPer - 18 - 90
          pinSty = {
            transform: `rotate(${deg}deg)`
          }
        } else if (pinPer == winPer) {
          // 返回1-5挡，仪表盘划分为15个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*pinPer - 12 - 90
          pinSty = {
            transform: `rotate(${deg}deg)`
          }
        } else if (pinPer == losePer) {
          // 返回1-5挡，仪表盘划分为15个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*pinPer - 24 - 90
          pinSty = {
            transform: `rotate(${deg}deg)`
          }
        } else {
          // 返回1-5挡，仪表盘划分为10个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*pinPer - 18 - 90
          pinSty = {
            transform: `rotate(${deg}deg)`
          }
        }

        if (losePer == 0) {
          loseSty = {
            display: 'none'
          }
        } else if (losePer == winPer && losePer == pinPer) {
          // 返回1-5挡，仪表盘划分为20个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*losePer - 9 - 90
          loseSty = {
            transform: `rotate(${deg}deg)`
          }
        } else if (losePer == winPer || losePer == pinPer) {
          // 返回1-5挡，仪表盘划分为15个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*losePer - 12 - 90
          loseSty = {
            transform: `rotate(${deg}deg)`
          }
        } else {
          // 返回1-5挡，仪表盘划分为10个刻度，总刻度180，居中为0，左边为-90，右边为90
          let deg = 36*losePer - 18 - 90
          loseSty = {
            transform: `rotate(${deg}deg)`
          }
        }

        Vue.set(self.infoTechnical.desc, 'gaugePer1', winSty)
        Vue.set(self.infoTechnical.desc, 'gaugePer2', pinSty)
        Vue.set(self.infoTechnical.desc, 'gaugePer3', loseSty)

      },
      calculate: function() {
        let vd = util.viewData();
        let height = vd.viewHeight - 135 - 240;

        if (height > 0) {
          let $container = $('#content')
          $container.css({'minHeight': height + 'px'})
        }
      },
      getTextRiskactor(riskactor) {
        let self = this
        if (riskactor == '中') {
          return 'riskactor'
        }
      },
      goAlgorithmTag() {
        let self = this
        let url = `${PAGEURLS.ALGORITHMBYID}${self.id}`
        // 增加了一个type：4舆情因子 1状态因子（属于智能因子的子类） 3技术因子 2基础因子
        // 获取标签配置: rootId   1智能因子  51基础因子  72技术因子  112舆论因子
//        let factorArr = [], tag = ''
//        self.infoTag.forEach(function (item) {
//          tag = item.tagCn
//          if (item.textRules == 1) {
//            tag = item.parentCn + tag
//          }
//          if (item.type != 4) {
//            factorArr.push({
//              id: item.tagId,
//              tag: tag,
//              type: item.type,
//              parentId: item.parentId
//            })
//          }
//        })

//        let algObj = {
//           data: factorArr,
//           type: 'all',
//           typeCn: '全部因子',
//           typeId: '1'  //显示默认 1智能因子
//        }

        let factorArr = [], tag = ''
        self.tagTeamStatus.forEach(function (item) {
          tag = item.tagCn
          if (item.textRules == 1) {
            tag = item.parentCn + tag
          }
          if (item.type != 4) {
            factorArr.push({
              id: item.tagId,
              tag: tag,
              type: item.type,
              parentId: item.parentId
            })
          }
        })

        let algObj = {
          data: factorArr,
          type: '1',
          typeCn: '状态因子',
          typeId: '1'  //显示默认 1智能因子    状态因子属于智能因子的子类
        }
        cache.localforage.setItem('alg', algObj).then(function (value) {
          // 当值被存储后，可执行其他操作
          util.goPage(url)
        }).catch(function(err) {
          // 当出错时，此处代码运行
          console.log(err);
          util.goPage(url)
        });

        _hmt.push(['_trackEvent', '/perspective/alg', 'click', '开启算法试炼']);
      },
      goAlgorithmTeamStatus() {
        let self = this
        let url = `${PAGEURLS.ALGORITHMBYID}${self.id}`
        // 增加了一个type：4舆情因子 1状态因子（属于智能因子的子类） 3技术因子 2基础因子
        // 获取标签配置: rootId   1智能因子  51基础因子  72技术因子  112舆论因子
        let factorArr = [], tag = ''
        self.tagTeamStatus.forEach(function (item) {
          tag = item.tagCn
          if (item.textRules == 1) {
            tag = item.parentCn + tag
          }
          if (item.type != 4) {
            factorArr.push({
              id: item.tagId,
              tag: tag,
              type: item.type,
              parentId: item.parentId
            })
          }
        })

        let algObj = {
          data: factorArr,
          type: '1',
          typeCn: '状态因子',
          typeId: '1'  //显示默认 1智能因子    状态因子属于智能因子的子类
        }
        cache.localforage.setItem('alg', algObj).then(function (value) {
          // 当值被存储后，可执行其他操作
          util.goPage(url)
        }).catch(function(err) {
          // 当出错时，此处代码运行
          console.log(err);
          util.goPage(url)
        });
        _hmt.push(['_trackEvent', '/perspective/alg', 'click', '状态因子']);
      },
      goAlgorithmTechnical() {
        let self = this
        let url = `${PAGEURLS.ALGORITHMBYID}${self.id}`
        // 增加了一个type：4舆情因子 1状态因子（属于智能因子的子类） 3技术因子 2基础因子
        // 获取标签配置: rootId   1智能因子  51基础因子  72技术因子  112舆论因子
        let factorArr = [], tag = ''
        self.tagTechnical.forEach(function (item) {
          tag = item.tagCn
          if (item.textRules == 1) {
            tag = item.parentCn + tag
          }
          if (item.type != 4) {
            factorArr.push({
              id: item.tagId,
              tag: tag,
              type: item.type,
              parentId: item.parentId
            })
          }
        })

        let algObj = {
          data: factorArr,
          type: '3',
          typeCn: '技术因子',
          typeId: '72'  //显示72技术因子
        }
        cache.localforage.setItem('alg', algObj).then(function (value) {
          // 当值被存储后，可执行其他操作
          util.goPage(url)
        }).catch(function(err) {
          // 当出错时，此处代码运行
          console.log(err);
          util.goPage(url)
        });
        _hmt.push(['_trackEvent', '/perspective/alg', 'click', '技术因子']);
      },
      questionMatch() {
        let self = this
        self.algAlertText = '即根据您搜索的标签，未来3天内比赛的标签与其匹配的程度。'
        self.algAlertShow = true
      },
      questionPanRouter() {
        let self = this
        self.algAlertText = '亚盘盘路中“上盘”是指让球方赢盘，“下盘”是指受让方赢盘。'
        self.algAlertShow = true
      },
      atbClose() {
        let self = this
        self.algAlertShow = false
      },
      relationMatches() {
        let self = this
        if (self.loading_relationMatches) {
          return
        }
        self.loading_relationMatches = true
        self.pdlist = []
        let tagIdsArr = []
        self.infoTag.forEach(function (item) {
          tagIdsArr.push(item.tagId)
        })
        let tagIds = tagIdsArr.join(',')
        console.log('---------tagIds:'+tagIds)
        let params = {
          tagIds: tagIds,
          isBd: '1'
        }
        relationMatches(params).then((res) => {
          self.loading_relationMatches = false
          self.pdlist = []
          let result = self.resultHandler(res)
          let {status, data} = result
          let code = status.code
          if (code === ERR_OK && util.isArray(data) && data.length) {
            data.forEach((val) => {
              self.pdlist.push(new MatchAlg(val))
            })
            console.log('relationMatches:',data)
          }
        }, (error) => {
          self.loading_relationMatches = false
        })
      },
      getTagClass(idx) {
        let i = idx%3
        return `tag${i}`
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
      eventNoPayMessage(match) {
        let self = this
        this.$message({
          showClose: true,
          message: '小炮AI还未出预测结果哦~',
          type: 'warning'
        });
      },
      eventUnPay(match) {
        let self = this
        console.log('unpay:',match.id)
        let data = {
          pdtIds: match.pdtIds,
          pdtType: match.pdtType,
          matchId: match.id
        }
        let payment = new Payment(data)
        payment.pay()

        _hmt.push(['_trackEvent', '/algorithm/recentmatch', 'click', '大数据透视购买']);
      },
      eventHasPay(match) {
        let self = this
        util.openPage(PAGEURLS.PERSPECTIVE + match.id)
      },
    },
    components: {
      MHeader,
      LoadingCircle,
      Info,
      LoadingAlg
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
    .no-data-box
      position: relative
      min-height: 130px
      border: 1px solid #EBF0F1
    .box
      width: 1200px
      margin: 0 auto
      position: relative
      border: 1px solid #EBF0F1
      border-radius: 3px
      margin-top: 30px
      background: #fff
    .box1
      width: 1200px
      margin: 0 auto
      position: relative
      border: 1px solid #EBF0F1
      border-top: 0 none
      border-radius: 3px
      background: #fff
    .box2
      width: 1200px
      margin: 0 auto
      position: relative
      background: #fff
      .box-header
        border-left: 1px solid #EBF0F1
        border-right: 1px solid #EBF0F1
        padding-bottom: 30px
      .trial-content
        border: 1px solid #EBF0F1
        border-top: 0 none
    .text-box
      min-height: 285px
      margin-top: -50px
      padding-bottom: 28px
      .text-header
        overflow: hidden
        height: 74px
        line-height: 74px
        border-bottom: 1px solid #EBF0F1
        text-align: center
        font-size: 20px
        background: url(../../../static/img/pp_line.png) no-repeat center 65px
        position: relative
      .text-riskactor
        overflow: hidden
        position: absolute
        top: 0px
        right: 30px
        line-height: 74px
        font-size: 14px
        color: #0FBD73
      .riskactor
        color: #FFBD01
      .text-sub-xp
        overflow: hidden
        position: absolute
        top: 0px
        right: 30px
        line-height: 74px
        font-size: 14px
        color: #67696A
      .text-main
        overflow: hidden
        padding: 35px 30px 0
      .tm-txt
        overflow: hidden
        height: 40px
        line-height: 40px
        font-size: 28px
        font-weight: bold
        white-space: nowrap
        text-overflow: ellipsis
        text-align: left
        margin-bottom: 12px
        color: #F43F20
        /deep/ em
          font-weight: bold
          color: #F43F20
      .tm-item
        overflow: hidden
        height: 22px
        line-height: 22px
        padding-top: 8px
        padding-left:  106px
        position: relative
        font-size: 15px
        color: #5D6061
      .tm-item-tag
        overflow: hidden
        position: absolute
        left: 0px
        top: 8px
        width: 90px
        height: 20px
        line-height: 20px
        text-align: center
        font-size: 14px
        border-radius: 3px
      .tm-item-tag0
        color: #ED686C
        border: 1px solid #ED686C
      .tm-item-tag1
        color: #E7A050
        border: 1px solid #E7A050
      .tm-item-tag2
        color: #46C0F0
        border: 1px solid #46C0F0
    .popular-box
      min-height: 200px
      .mf-bar-box
        overflow: hidden
        position: relative
        margin: 90px 0 0 88px
        width: 420px
        height: 150px
        font-size: 12px
        .f18
          font-size: 18px
        .per-win
          position: absolute
          left: 5px
          height: 25px
          line-height: 25px
        .per-pin
          position: absolute
          left: 100px
          right: 100px
          height: 25px
          line-height: 25px
          text-align: center
        .per-lose
          position: absolute
          right: 5px
          height: 25px
          line-height: 25px
        .bar
          overflow: hidden
          position: absolute
          left: 0px
          right: 0px
          top: 45px
          height: 30px
          background: #FD755C
          border-radius: 15px
          .bar-pin
            overflow: hidden
            position: absolute
            right: 0px
            top: 0px
            height: 30px
            background: #FFE598
          .bar-lose
            overflow: hidden
            position: absolute
            right: 0px
            top: 0px
            height: 30px
            background: #80D0FF
            border-radius: 0px 15px 15px 0px
        .mfb-win
          overflow: hidden
          position: absolute
          bottom: 0px
          left: 50%
          height: 20px
          line-height: 20px
          width: 40px
          padding-left: 16px
          margin-left: -86px
          .mfb-win-icon
            overflow: hidden
            position: absolute
            left: 0px
            top: 5px
            width: 10px
            height: 10px
            background: #FD755C
            border-radius: 3px
        .mfb-pin
          overflow: hidden
          position: absolute
          bottom: 0px
          left: 50%
          height: 20px
          line-height: 20px
          width: 40px
          padding-left: 16px
          margin-left: -14px
          .mfb-pin-icon
            overflow: hidden
            position: absolute
            left: 0px
            top: 5px
            width: 10px
            height: 10px
            background: #FFE598
            border-radius: 3px
        .mfb-lose
          overflow: hidden
          position: absolute
          bottom: 0px
          left: 50%
          height: 20px
          line-height: 20px
          width: 40px
          padding-left: 16px
          margin-left: 60px
          .mfb-lose-icon
            overflow: hidden
            position: absolute
            left: 0px
            top: 5px
            width: 10px
            height: 10px
            background: #80D0FF
            border-radius: 3px
    .team-status-box
      min-height: 200px
      .tag-list
        float: left
        padding-left: 20px
    .technical-box
      min-height: 285px
      .ta-odds
        position: absolute
        top: 72px
        right: 30px
        width: 95px
        text-align: center
        height: 84px
        padding: 7px 0
        font-size: 12px
        border: 1px solid #eee
        border-radius: 3px
        white-space: nowrap
        overflow: hidden
        .odds-item
          line-height: 28px
          height: 28px
          white-space: nowrap
          padding-left: 44px
        .win-line
          position: absolute
          top: 21px
          left: 17px
          width: 25px
          height: 2px
          font-size: 0px
          background-color: #FD755C
        .pin-line
          position: absolute
          top: 48px
          left: 17px
          width: 25px
          height: 2px
          font-size: 0px
          background-color: #fccc45
        .lose-line
          position: absolute
          top: 76px
          left: 17px
          width: 25px
          height: 2px
          font-size: 0px
          background-color: #80D0FF

    .similar-box
      min-height: 165px
    .box-header
      height: 28px
      padding-top: 28px
      position: relative
      .box-icon
        position: absolute
        top: 32px
        left: 0px
        width: 6px
        height: 20px
        background: #F8271F
        border-radius: 0px 3px 3px 0px
      .box-title
        float: left
        padding-left: 34px
        font-weight: bold
        font-size: 20px
        height 28px
        line-height: 26px
      .box-subtitle
        float: left
        padding-left: 15px
        color: #8D9BA0
        font-size: 12px
        height 28px
        line-height: 28px
        .box-header-split
          padding: 0 10px 0 30px
    .tag-list
      overflow: hidden
      height: 28px
      padding: 16px 0
      .tag
        float: left
        height: 28px
        line-height: 28px
        margin-right: 15px
        min-width: 80px
        padding: 0 10px
        text-align: center
        font-size: 12px
        border-radius: 3px
      .tag4
        background: #FFEFEF
        color: #ED686C
      .tag1
        background: #FFF5E4
        color: #E7A050
      .tag3
        background: #E1F7FC
        color: #46C0F0
      .tag2
        background: #EFFFEF
        color: #68ED7A
    .btn-algorithm-small
      position: absolute
      right: 30px
      top: 22px
      width: 194px
      height: 53px
      background: url(../../../static/img/btn_algorithm_small.png) no-repeat left center
      cursor: pointer
      /*display: none*/
    .btn-algorithm-match
      position: absolute
      right: 30px
      top: 22px
      width: 240px
      height: 53px
      background: url(../../../static/img/v2_btn_algorithm_match.png) no-repeat left center
      cursor: pointer
    .tp-text
      font-size: 14px
      line-height: 27px
      height: 54px
      overflow: hidden
      padding-right: 30px
      .tp-tag
        font-weight: bold
    .tp-echart-box
      position: relative
      font-size: 12px
      width: 100%
      min-height: 270px
      .tpe-name
        position: absolute
        left: 165px
        top: 22px
        font-size: 13px
        font-weight: bold
        line-height: 20px
      .tpe-name-x
        position: absolute
        right: 0px
        bottom: 37px
        line-height: 20px
        width: 140px
        text-align: left
      .tpe-name-y
        position: absolute
        left: 0px
        top: 22px
        line-height: 20px
      .tp-echart
        width: 460px
        height: 270px
      .tp-team-home
        position: absolute
        top: 77px
        right: 30px
        width: 95px
        text-align: center
        padding-top: 16px
        height: 30px
        line-height: 30px
        font-size: 12px
        border: 1px solid #EEEEEE
        border-radius: 3px
        white-space: nowrap
        overflow: hidden
        .tp-team-line
          position: absolute
          top: 12px
          left: 50%
          margin-left: -12px
          background: #F23B1E
          width: 25px
          height: 2px
          border-radius:3px
          font-size: 0px
      .tp-team-guest
        position: absolute
        top: 135px
        right: 30px
        width: 95px
        text-align: center
        padding-top: 16px
        height: 30px
        line-height: 30px
        font-size: 12px
        border: 1px solid #EEEEEE
        border-radius: 3px
        white-space: nowrap
        overflow: hidden
        .tp-team-line
          position: absolute
          top: 12px
          left: 50%
          margin-left: -12px
          background: #49A6F1
          width: 25px
          height: 2px
          border-radius:3px
          font-size: 0px
    .gauge
      overflow: hidden
      width: 100%
      height: 270px
      position: relative
      background-image: url(../../../static/img/gauge_bg.png)
      background-repeat: no-repeat
      background-position: 117px 50px
      .gauge-red
        position: absolute
        left: 50%
        top: 114px
        background-image: url(../../../static/img/gauge_red.png)
        background-repeat: no-repeat
        width: 10px
        height: 104px
        margin-left: 5px
        transform:rotate(0deg)
        transform-origin: center bottom
      .gauge-blue
        position: absolute
        left: 50%
        top: 114px
        background-image: url(../../../static/img/gauge_blue.png)
        background-repeat: no-repeat
        width: 10px
        height: 104px
        margin-left: 5px
        transform:rotate(0deg)
        transform-origin: center bottom
      .gauge-yellow
        position: absolute
        left: 50%
        top: 114px
        background-image: url(../../../static/img/gauge_yellow.png)
        background-repeat: no-repeat
        width: 10px
        height: 104px
        margin-left: 5px
        transform:rotate(0deg)
        transform-origin: center bottom
      .gauge-circle
        position: absolute
        left: 50%
        top: 213px
        background-image: url(../../../static/img/gauge_circle.png)
        background-repeat: no-repeat
        width: 18px
        height: 9px
        margin-left: 1px
      .gauge-home
        overflow: hidden
        position: absolute
        bottom: 10px
        left: 50%
        height: 20px
        line-height: 20px
        width: 40px
        padding-left: 16px
        margin-left: -88px
        .gauge-home-icon
          overflow: hidden
          position: absolute
          left: 0px
          top: 5px
          width: 10px
          height: 10px
          background: #F23B1E
          border-radius: 3px
      .gauge-guest
        overflow: hidden
        position: absolute
        bottom: 10px
        left: 50%
        height: 20px
        line-height: 20px
        width: 40px
        padding-left: 16px
        margin-left: 48px
        .gauge-guest-icon
          overflow: hidden
          position: absolute
          left: 0px
          top: 5px
          width: 10px
          height: 10px
          background: #49A6F1
          border-radius: 3px
      .gauge-win
        overflow: hidden
        position: absolute
        bottom: 10px
        left: 50%
        height: 20px
        line-height: 20px
        width: 40px
        padding-left: 16px
        margin-left: -88px
        .gauge-win-icon
          overflow: hidden
          position: absolute
          left: 0px
          top: 5px
          width: 10px
          height: 10px
          background: #F23B1E
          border-radius: 3px
      .gauge-pin
        overflow: hidden
        position: absolute
        bottom: 10px
        left: 50%
        height: 20px
        line-height: 20px
        width: 40px
        padding-left: 16px
        margin-left: -14px
        .gauge-pin-icon
          overflow: hidden
          position: absolute
          left: 0px
          top: 5px
          width: 10px
          height: 10px
          background: #FFE598
          border-radius: 3px
      .gauge-lose
        overflow: hidden
        position: absolute
        bottom: 10px
        left: 50%
        height: 20px
        line-height: 20px
        width: 40px
        padding-left: 16px
        margin-left: 58px
        .gauge-lose-icon
          overflow: hidden
          position: absolute
          left: 0px
          top: 5px
          width: 10px
          height: 10px
          background: #49A6F1
          border-radius: 3px
  .layout-time
    overflow: hidden
    position: absolute
    right: 30px
    top: 28px
    height: 28px
    line-height: 28px
    font-size: 12px
    color: #5D6061
  .layout-600-600
    overflow: hidden
    .layout-title
      overflow: hidden
      padding: 15px 32px
      min-height: 30px
      line-height: 30px
      text-align: left
      white-space: nowrap
      margin: 24px 30px 0
      text-overflow: ellipsis
      background: #F7F8F9
      font-size: 14px
      /deep/ em
        color: #F43F20
    .layout-main
      overflow: hidden
      margin: 22px 30px
      position: relative
      .left
        overflow: hidden
        float: left
        width: 569px
        border-right: 1px solid #EBF0F1
        min-height: 324px
      .right
        overflow: hidden
        float: right
        width: 569px
        min-height: 324px
        .tp-text
          padding-left: 30px
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
  .analysis
    overflow: hidden
    position: absolute
    top: 105px
    left: 50%
    margin-left: -65px
    background-image: url(../../../static/img/analysis.png)
    background-repeat: no-repeat
    width: 130px
    height: 75px
  .text-no-data-box
    position: relative
    min-height: 270px
    width: 100%
    overflow: hidden
  .text-no-data
    position: absolute
    left: 50%
    top: 50%
    height: 30px
    line-height: 30px
    width: 100px
    margin: -15px 0 0 -50px
    text-align: center
    font-size: 12px
    color: #8d9ba0
  .btn-no-pay
    overflow: hidden
    position: absolute
    top: 115px
    left: 50%
    margin-left: -150px
    width: 300px
    height: 40px
    line-height:  40px
    background: #F15C21
    font-size: 14px
    text-align: center
    color: #fff
    border-radius: 3px
    cursor: pointer
  .trial-content
    overflow: hidden
    position: relative
    min-height: 127px
    .trial-text
      overflow: hidden
      border-radius: 3px
      background: #F7F8F9
      height: 67px
      line-height: 67px
      text-align: center
      margin: 30px
      font-size: 18px
      color: #333333
      font-weight: bold
  .alert-toast-box
    .atb-mask
      position: absolute
      position: fixed
      left: 0px
      right: 0px
      top: 0px
      bottom: 0px
      background: rgba(0, 0, 0, 0.3)
      z-index: 1000
    .atb-toast
      position: absolute
      position: fixed
      left: 50%
      top: 50%
      width: 600px
      min-height: 32px
      margin: -56px 0 0 -300px
      background: #ffffff
      border-radius: 6px
      z-index: 1000
      padding: 50px 0px 30px 25px
    .atb-close
      background: url(../../../static/img/icon_close.png) no-repeat center center
      width: 25px
      height: 25px
      position: absolute
      top: 16px
      right: 16px
      cursor: pointer
    .atb-content
      line-height: 24px
      font-size: 14px
      text-align: center
  .recent-table-box
    position: relative
    .icon_question
      position: absolute
      top: 16px
      right: 272px
      background-image: url(../../../static/img/icon_question.png)
      background-repeat: no-repeat
      width: 16px
      height: 16px
      z-index: 100
      cursor: pointer
    .relation-val
      position: absolute
      left: 0px
      top: 15px
      width: 55px
      height: 30px
      line-height: 30px
      text-align: right
      font-size: 12px
    .relation-percent
      position: absolute
      top: 28px
      left: 65px
      background: #EBF0F1
      border-radius: 2px
      width: 120px
      height: 4px
      overflow: hidden
      .relation-per
        float: left
        background: #F8231F
        height: 4px
        border-radius: 2px
    .el-table
      color: $color
    .ic-hot
      position: absolute
      left: 0px
      top: 0px
      background: url(../../../static/img/icon_hot.png) no-repeat center top
      height: 24px
      width: 24px
    .tags
      height: 24px
      line-height: 24px
      .tag
        float: left
        padding: 0 8px
        width: 180px
        text-align: center
        font-size: 12px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        &.no-left
          float: none
          display: inline-block
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
      .tag-more
        float: left
        cursor: pointer
        margin-left: 12px
        width: 40px
        text-align: center
        color: #333333
        font-size: 12px
        text-decoration: underline
    .pay-placeholder
      height: 36px
      overflow: hidden
      width: 100%
    .look
      position: absolute
      left: 50%
      top: 50%
      margin:-16px 0 0 -71px
      height: 32px
      line-height: 32px
      width: 142px
      text-align: center
      text-decoration: underline
      cursor: pointer
</style>
