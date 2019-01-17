<template>
  <div class="factor-filter">
    <div class="attr-has-box">
      <span class="attr-text">所有筛选：</span>
      <div class="attr-list">
        <div class="attr" v-for="(item, index) in algAttrs" :key="index">
          {{item.tag}}
          <span class="icon-attr-close" @click="closeTag(item)"></span>
        </div>
        <div class="btn-ok" @click="findAlgLaw">确认</div>
        <div class="btn-clear" @click="clearAttr">清空</div>
      </div>
    </div>
    <div class="factor-box-wrap">
      <div class="factor-box">
        <div class="factor-header">
          <div class="factor-type" :class="[HotFactorId == factorId?'selected': '']" @click="setFactorId(HotFactorId)">常用筛选</div>
          <div class="factor-type" :class="[IntelligenceFactorId == factorId?'selected': '']" @click="setFactorId(IntelligenceFactorId)">球队状态</div>
          <div class="factor-type" :class="[PopularFactorId == factorId?'selected': '']" @click="setFactorId(PopularFactorId)">市场人气</div>
          <div class="factor-type" :class="[BasicsFactorId == factorId?'selected': '']" @click="setFactorId(BasicsFactorId)">赛果表现</div>
          <div class="factor-type" :class="[TechnicalFactorId == factorId?'selected': '']" @click="setFactorId(TechnicalFactorId)">赔率变化</div>
        </div>
        <loading-alg v-if="loading_tagsconfig"></loading-alg>
        <div class="factor-content" v-if="!loading_tagsconfig && !isTechnicalFactor">
          <div class="attr-box clearfix" v-for="(item, index) in factorTags" :key="index">
            <span class="attr-header" :data-id="item.id">{{item.cn}}：</span>
            <div class="attr-main">
              <template v-if="item.childOptions">
                <div class="attr-select-box">
                  <el-select
                      v-model="selectObj[`value${item.id}`]"
                      placeholder="请选择"
                      size="mini"
                      @change="selectChange(item.id)"
                  >
                    <el-option
                        v-for="op in selectObj[`options${item.id}`]"
                        :key="op.value"
                        :label="op.label"
                        :value="op.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="attr-option" :class="getAttrClass(op.id)" v-for="(op, opi) in selectObj['child' + selectObj[`value${item.id}`]]" :key="opi" @click="selectOption(op)">
                  {{op.cn}}
                </div>
              </template>
              <template v-if="!item.childOptions">
                <div class="attr-option" :class="getAttrClass(op.id)" v-for="(op, opi) in item.child" :key="opi" @click="selectOption(op)" v-if="op.options != 2">
                  {{op.cn}}
                </div>
                <div class="attr-select-box-2" v-for="(child, ci) in item.child" :key="ci"  v-if="child.options == 2">
                  <div class="attr-type-name">{{child.cn}}</div>
                  <el-select
                      v-model="selectObj[`value${child.id}`]"
                      placeholder="请选择"
                      size="mini"
                      @change="selectChange2(child.id)"
                  >
                    <el-option
                        v-for="op in selectObj[`options${child.id}`]"
                        :key="op.value"
                        :label="op.label"
                        :value="op.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="factor-content" id="technical-factor-content" v-if="!loading_tagsconfig && isTechnicalFactor">
          <div class="attr-box-3 clearfix" v-for="(arr, arridx) in technicalfactorTags" :key="arridx">
            <div class="attr-box clearfix" v-for="(item, index) in arr" :key="index">
              <span class="attr-header" :data-id="item.id">{{item.cn}}：</span>
              <div class="attr-main">
                <template v-if="item.childOptions">
                  <div class="attr-select-box">
                    <el-select
                        v-model="selectObj[`value${item.id}`]"
                        placeholder="请选择"
                        size="mini"
                        @change="selectChange(item.id)"
                    >
                      <el-option
                          v-for="op in selectObj[`options${item.id}`]"
                          :key="op.value"
                          :label="op.label"
                          :value="op.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="attr-option" :class="getAttrClass(op.id)" v-for="(op, opi) in selectObj['child' + selectObj[`value${item.id}`]]" :key="opi" @click="selectOption(op)">
                    {{op.cn}}
                  </div>
                </template>
                <template v-if="!item.childOptions">
                  <div class="attr-option" :class="getAttrClass(op.id)" v-for="(op, opi) in item.child" :key="opi" @click="selectOption(op)" v-if="op.options != 2">
                    {{op.cn}}
                  </div>
                  <div class="attr-select-box-2" v-for="(child, ci) in item.child" :key="ci"  v-if="child.options == 2">
                    <div class="attr-type-name">{{child.cn}}</div>
                    <el-select
                        v-model="selectObj[`value${child.id}`]"
                        placeholder="请选择"
                        size="mini"
                        @change="selectChange2(child.id)"
                    >
                      <el-option
                          v-for="op in selectObj[`options${child.id}`]"
                          :key="op.value"
                          :label="op.label"
                          :value="op.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hot-attrs-box">
      <span class="hot-attrs-header">热门筛选：</span>
      <div class="hot-attrs">
        <div class="hot-attr" v-for="(item, index) in hotAttrs" :key="index" @click="selectHotAttr(item)">
          {{item.parent.cn}} : {{item.cn}}
        </div>
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
  import { getAlgMatchDate,getTagsConfig, getHotTagsConfig, algHotTags} from 'api/algorithm'
  import {ERR_OK, PAGEURLS} from 'common/const/config'
  import {baseMixin} from 'common/js/mixin'
  import {checkLocalLogin} from 'common/js/cache'
  import {loginToast,goLoginByUrl} from 'common/class/Payment'
  import LoadingAlg from 'base/loading/loading-alg'

  let algAttrsDefault = [{"id":"4","tag":"让方状态 : 良好", "type": "3", "parentId": "2"}]
  // 增加了一个type： 1球队状态 -- 状态因子（属于智能因子的子类） 4市场人气 -- 舆情因子  2赛果表现 -- 基础因子 3赔率变化 -- 技术因子
  // 获取标签配置: rootId   1智能因子  51基础因子  72技术因子  112舆论因子
  let HotFactorId = 'hot'
  let IntelligenceFactorId = '1'
  let PopularFactorId = '112'
  let BasicsFactorId = '51'
  let TechnicalFactorId = '72'

  export default {
    mixins: [baseMixin],
    data() {
      return {
        id: util.getQueryString('id'),
        date: util.dateFormatFmt( new Date(), "yyyy/MM/dd"),
        startDate: '2015/01/01',
        endDate: util.dateFormatFmt( new Date(), "yyyy/MM/dd"),

        algObj: '', //默认从本地筛选标签对象
        factorId: '', //显示默认 1智能因子  watch监听，在后面赋值
        factorTags: [],
        selectObj: {},
        loading_tagsconfig: false,
        loading_alghottags: false,
        hotAttrs: [],
      };
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
      },
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
      isIntelligenceFactor() {
        let self = this
        return self.factorId == IntelligenceFactorId
      },
      isBasicsFactor() {
        let self = this
        return self.factorId == BasicsFactorId
      },
      isTechnicalFactor() {
        let self = this
        return self.factorId == TechnicalFactorId
      },
      isPopularFactor() {
        let self = this
        return self.factorId == PopularFactorId
      },
      technicalfactorTags() {
        let self = this
        let arr = [], ypArr = [], opArr = [], dxArr = [], other = []

        self.factorTags.forEach(function (item, index) {
          if (item.id == '73' || item.id == '77' || item.id == '78') {
            ypArr.push(item)
          } else if (item.id == '74' || item.id == '89' || item.id == '90') {
            opArr.push(item)
          } else if (item.id == '75' || item.id == '92' || item.id == '93') {
            dxArr.push(item)
          } else {
            other.push(item)
          }
        })
        ypArr.length && arr.push(ypArr)
        opArr.length && arr.push(opArr)
        dxArr.length && arr.push(dxArr)
        other.length && arr.push(other)
        console.log('technicalArr:', arr)

        return arr
      },
      getFactorTips() {
        let self = this
        let text = ''
        if (self.isIntelligenceFactor) {
          text = '＊说明：让方，指对阵双方中初始赔率较低的一方，即强势方，受让方即弱势方。'
        } else if (self.isPopularFactor) {
          text = '* 说明：舆论因子仅支持查询2018年6与29日以后的比赛。'
        }
        return text
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
      self.HotFactorId = HotFactorId
      self.IntelligenceFactorId = IntelligenceFactorId
      self.BasicsFactorId = BasicsFactorId
      self.TechnicalFactorId = TechnicalFactorId
      self.PopularFactorId = PopularFactorId

      self.setAlgAttrs(algAttrsDefault)  //筛选标签集合
    },
    mounted() {
      let self = this
      self.getDefaultAlgTags()
      self.algHotTags()
    },
    methods: {
      getDefaultAlgTags() {
        let self = this
        cache.localforage.getItem('alg').then(function (value) {
          self.algObj = value

          if (self.algObj && self.algObj.typeId) {
            self.factorId = self.algObj.typeId
            let algAttrType = self.algObj.type
            if (!util.isArray(self.algObj.data)) {
              self.setAlgAttrs([])
              return
            }

            self.setAlgAttrs(self.algObj.data)
            console.log('self.algAttrs:', self.algAttrs)

            self.getAlgMatchDate()
          } else {
            self.factorId = HotFactorId
            self.getAlgMatchDate()
          }
        }).catch(function(err) {
          // 当出错时，此处代码运行
          console.log(err);
          self.factorId = HotFactorId
          self.getAlgMatchDate()
        });
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
      getAttrClass(id) {
        let self = this
        if (self.algAttrIds.indexOf(id) > -1) {
          return 'selected'
        }
        return ''
      },
      selectChange(val) {
        let self = this
        let selectVal = self.selectObj[`value${val}`]
        console.log('selectChange:', val, selectVal)
      },
      selectChange2(id) {
        let self = this
        let selectVal = self.selectObj[`value${id}`]
        console.log('selectChange:', selectVal)

        let val = self.selectObj[`child${selectVal}`]
        self.selectOption(val)
      },
      selectHotAttr(item) {
        let self = this
        let val = {
          cn: item.cn,
          id: item.id,
          level: "",
          options: "",
          parentId: item.parentId,
          pcn: item.parent.cn,
          type: ""
        }
        self.selectOption(val)
      },
      selectOption(val) {
        let self = this
        console.log('--------------------------------------selectOption:', val)
        let algAttrs = self.algAttrs.filter(function (item, i) {
          return item.parentId != val.parentId
        })

        if (algAttrs.length >= 10) {
          self.toastAlert({
            alertType: 'warning',
            alertShow: true,
            alertText: '最多可选择10个属性！'
          })
          return
        }

        algAttrs.push({
          id: val.id,
          tag: val.pcn+ ' : ' +val.cn,
          type: val.type,
          parentId: val.parentId
        })
        self.setAlgAttrs(algAttrs)

        if(self.factorId == self.IntelligenceFactorId) {
          _hmt.push(['_trackEvent', '/algorithm/intelligenceselecttag', 'click', '智能因子:'+val.pcn + ' : ' +val.cn]);
        } else if(self.factorId == self.BasicsFactorId) {
          _hmt.push(['_trackEvent', '/algorithm/basicsselecttag', 'click', '基础因子:'+val.pcn + ' : ' +val.cn]);
        } else if(self.factorId == self.TechnicalFactorId) {
          _hmt.push(['_trackEvent', '/algorithm/technicalselecttag', 'click', '技术因子:'+val.pcn + ' : ' +val.cn]);
        } else if(self.factorId == self.PopularFactorId) {
          _hmt.push(['_trackEvent', '/algorithm/popularselecttag', 'click', '舆情因子:'+val.pcn + ' : ' +val.cn]);
        }
      },
      closeTag(val) {
        let self = this
        console.log('closeTag:', val)
        let algAttrs = self.algAttrs.slice()
        algAttrs.splice($.inArray(val, algAttrs), 1);

        self.setAlgAttrs(algAttrs)

        self.selectObj['value'+val.parentId] = ''
      },
      setFactorId(val) {
        let self = this
        if (self.factorId == val) {
          return
        }
        self.factorId = val

        let factorName = ''
        if(self.factorId == self.HotFactorId) {
          factorName = '常用筛选'
        } else if(self.factorId == self.IntelligenceFactorId) {
          factorName = '球队状态'
        } else if(self.factorId == self.BasicsFactorId) {
          factorName = '赛果表现'
        } else if(self.factorId == self.TechnicalFactorId) {
          factorName = '赔率变化'
        } else if(self.factorId == self.PopularFactorId) {
          factorName = '市场人气'
        }
        _hmt.push(['_trackEvent', '/algorithm/setfactorid', 'click', factorName]);
      },
      getTagsConfigObj(data) {
        let self = this
        function handle(val, level) {
          let child = val.child
          if (child && child.length) {
            if (child[0].options == 1) {
              let options = []
              child.forEach(function (childVal) {
                options.push({
                  label: childVal.cn,
                  value: childVal.id
                })
              })
              val.childOptions = 1

              Vue.set(self.selectObj, 'options'+val.id, options)
              Vue.set(self.selectObj, 'value'+val.id, options[0].value)
              options.forEach(function (op, opi) {
                child[opi].child.forEach(function (cc, cci) {
                  cc.pcn = child[opi].cn
                })
                Vue.set(self.selectObj, 'child'+op.value, child[opi].child)
              })

              console.log('前置样式:', self.selectObj)
            } else {
              val.childOptions = 0
              child.forEach(function (item, i) {
                if (item.options == 2) {
                  let options = []
                  Vue.set(self.selectObj, 'value'+item.id, '')
                  item.child.forEach(function (childVal) {
                    options.push({
                      label: childVal.cn,
                      value: childVal.id
                    })
                    childVal.pcn = item.cn
                    Vue.set(self.selectObj, 'child'+childVal.id, childVal)
                    if (self.algAttrIds.indexOf(childVal.id) > -1) {
                      console.log('--------------:', 'value'+item.id,':' ,childVal.id)
                      Vue.set(self.selectObj, 'value'+item.id, childVal.id)
                    }
                  })

                  Vue.set(self.selectObj, 'options'+item.id, options)
                  console.log('后置样式:', item.child)
                } else {
                  item.pcn = val.cn
                }
              })
            }
          }
          return val
        }
        let arr = []
        data.forEach(function (val, i) {
          arr[i] = handle(val, 1)
        })

        return arr
      },
      getTagsConfig() {
        let self = this
        console.log('self.factorId:', self.factorId)
        if (self.loading_tagsconfig) {
          return
        }
        self.loading_tagsconfig = true

        getTagsConfig(self.factorId).then((res) => {
          self.loading_tagsconfig = false
          let result = self.resultHandler(res)

          let {status, data} = result
          let code = status.code
          if (code === ERR_OK && util.isArray(data)) {
            self.factorTags = self.getTagsConfigObj(data)
            // Vue.set(self.factorTags, self.factorId, data)
            console.log('self.factorTags:', self.factorTags)
          } else {
            self.factorTags = []
          }
        }, (error) => {
          self.loading_tagsconfig = false
          self.factorTags = []
        })
      },
      getHotTagsConfig() {
        let self = this
        console.log('self.factorId:', self.factorId)
        if (self.loading_tagsconfig) {
          return
        }
        self.loading_tagsconfig = true

        getHotTagsConfig().then((res) => {
          self.loading_tagsconfig = false
          let result = self.resultHandler(res)

          let {status, data} = result
          let code = status.code
          if (code === ERR_OK && util.isArray(data)) {
            self.factorTags = self.getTagsConfigObj(data)
            // Vue.set(self.factorTags, self.factorId, data)
            console.log('self.factorTags:', self.factorTags)
          } else {
            self.factorTags = []
          }
        }, (error) => {
          self.loading_tagsconfig = false
          self.factorTags = []
        })
      },
      algHotTags() {
        let self = this
        if (self.loading_alghottags) {
          return
        }
        self.loading_alghottags = true

        algHotTags().then((res) => {
          self.loading_alghottags = false
          let result = self.resultHandler(res)

          let {status, data} = result
          let code = status.code
          if (code === ERR_OK && util.isArray(data)) {
            self.hotAttrs = data
            console.log('self.hotAttrs:', self.hotAttrs)
          } else {
            self.hotAttrs = []
          }
        }, (error) => {
          self.loading_alghottags = false
          self.hotAttrs = []
        })
      },
      findAlgLaw() {
        let self = this
        if (!checkLocalLogin()) {
          loginToast()
          return
        }

        if (!self.algAttrs || !self.algAttrs.length) {
          cache.localforage.removeItem('alg').then(function() {
            // 当值被移除后，此处代码运行
          }).catch(function(err) {
            // 当出错时，此处代码运行
            console.log(err);
          });
          self.toastAlert({
            alertType: 'warning',
            alertShow: true,
            alertText: '最少选择1个属性！'
          })
          return
        }
        console.log('algAttrs:', JSON.stringify(self.algAttrs))
        let algObj = {
          data: self.algAttrs,
          type: 'filter',
          typeCn: '常用筛选',
          typeId: self.HotFactorId  //显示默认
        }
        cache.localforage.setItem('alg', algObj).then(function (value) {
          // 当值被存储后，可执行其他操作
        }).catch(function(err) {
          // 当出错时，此处代码运行
          console.log(err);
        });
        let top = $('.trial-box').eq(0).offset().top
        window.scrollTo(0, top);
        self.setFindLaw(true)

        _hmt.push(['_trackEvent', '/algorithm/findlaw', 'click', JSON.stringify(self.algAttrs)]);
      },
      clearAttr() {
        let self = this
        let algAttrs = self.algAttrs.slice()
        algAttrs.forEach((val) => {
          self.selectObj['value'+val.parentId] = ''
        })

        self.setAlgAttrs([])
        cache.localforage.removeItem('alg').then(function() {
          // 当值被移除后，此处代码运行
        }).catch(function(err) {
          // 当出错时，此处代码运行
          console.log(err);
        });
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
    },
    watch: {
      factorId(newVal, oldVal) {
        let self = this
        if (newVal !== oldVal) {
          if (newVal == self.HotFactorId) {
            self.getHotTagsConfig()
          } else {
            self.getTagsConfig()
          }
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .factor-filter
    overflow: hidden
  .attr-has-box
    overflow: hidden
    min-height: 30px
    position: relative
    padding-left: 111px
    padding-bottom: 10px
    .attr-text
      position: absolute
      left: 0px
      top: 0px
      height: 30px
      line-height: 30px
      font-size: 20px
      color: #1A1A1C
    .attr-list
      overflow: hidden
      .attr
        float: left
        height: 30px
        line-height: 30px
        padding: 0 27px 0 12px
        background: #F7F8F9
        border: 1px solid #EBF0F1
        border-radius: 2px
        font-size: 12px
        color: #8D9BA0
        margin-right: 20px
        margin-bottom: 10px
        position: relative
        .icon-attr-close
          position: absolute
          right: 8px
          top: 11px
          background: url(../../../static/img/icon_attr_close.png) no-repeat left top
          width: 7px
          height: 7px
          cursor: pointer
    .btn-ok
      float: left
      line-height: 30px
      font-size: 14px
      color: #1A1A1C
      cursor: pointer
      margin-left: 30px
      text-decoration: underline
      &:hover
        color: #F8271F
    .btn-clear
      float: left
      line-height: 30px
      font-size: 14px
      color: #1A1A1C
      cursor: pointer
      margin-left: 30px
      text-decoration: underline
      &:hover
        color: #F8271F
  .factor-box-wrap
    border: 1px solid #EBF0F1
    overflow: hidden
  .factor-box
    position: relative
    overflow: hidden
    height: 410px
    padding-left: 100px
    .factor-header
      position: absolute
      left: 0px
      top: 0px
      overflow: hidden
      height: 410px
      width: 100px
      background: #F7F8F9
      .factor-type
        height: 82px
        line-height:  82px
        text-align: center
        border-right: 1px solid #EBF0F1
        font-size: 14px
        color: #8D9BA0
        cursor: pointer
        &.selected
          color: #1A1A1C
          font-weight: bold
          background: #fff
          border-right: 0 none
          border-top: 1px solid #EBF0F1
          border-bottom: 1px solid #EBF0F1
        &:first-child
          border-top: 0 none
        &:first-child
          border-bottom: 0 none
    .factor-tips
      overflow: hidden
      height: 18px
      line-height: 18px
      text-align: center
      padding-top: 12px
      font-size: 12px
      color: #333
    .factor-content
      overflow: hidden
      padding: 10px 40px
      position: relative
      .attr-box
        min-height: 32px
        padding: 10px 0
        font-size: 12px
        color: #333333
        display: flex
        flex-direction: row
        flex-wrap: nowrap
        justify-content: space-between
        align-items: center
        border-top: 1px solid #EBF0F1
        &:first-child
          border: 0 none
        .attr-header
          flex: 0 0 106px
          padding-left: 8px
          color: #333333
        .attr-main
          flex: 1
          .attr-select-box
            padding: 7px 20px 0 30px
            display: inline-block
          .attr-select-box-2
            padding: 5px 0px 5px 30px
            display: inline-block
          .attr-type-name
            text-align: center
            font-size: 11px
            color: #1A1A1C
            height: 20px
            line-height: 20px
            margin-right: 10px
            display: inline-block
          .attr-option
            display: inline-block
            margin-right: 15px
            padding: 0 30px
            height: 28px
            line-height: 28px
            cursor: pointer
            color: #1A1A1C
            &.selected
              background: #EBF0F1
              border-radius: 3px
    #technical-factor-content
      overflow: hidden
      .attr-box-3
        overflow: hidden
        border-top: 1px solid #EBF0F1
        &:first-child
          border: 0 none
        .attr-box
          border-top: 0 none
          padding: 3px 0;
  .hot-attrs-box
    overflow: hidden
    margin-top: 20px
    padding: 8px 20px 8px 140px
    min-height: 36px
    line-height: 36px
    border: 1px solid #EBF0F1
    position: relative
    .hot-attrs-header
      position: absolute
      left: 30px
      top: 8px
      background: url(../../../static/img/v2_icon_hot.png) no-repeat left center
      padding-left: 22px
      font-size: 16px
      color: #1A1A1C
      height: 36px
    .hot-attrs
      overflow: hidden
      .hot-attr
        display: inline-block
        font-size: 13px
        color: #1A1A1C
        padding-right: 42px
        cursor: pointer
</style>