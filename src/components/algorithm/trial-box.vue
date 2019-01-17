<template>
  <div class="trial-wrap">
    <div class="trial-box" v-if="unMember || unMemberHasTrial || unMemberHasMember">
      <div class="filter-result">筛选结果：</div>
      <div class="trial">
        <div class="trial-header">
          <div class="trial-title">盈利模拟分析</div>
        </div>
        <div class="trial-content trial-content-spf" v-if="isSpf">
          <div class="trial-not-match">
            <trial-tips :msg="trialNoMember" @openMember = "openMember"></trial-tips>
          </div>
        </div>
      </div>

      <!--similar-match-->
      <div class="trial similar-match">
        <div class="trial-header">
          <div class="trial-title">相似比赛推荐</div>
        </div>
        <div class="trial-content">
          <div class="trial-not-match">
            <trial-tips :msg="trialNoMember" @openMember = "openMember"></trial-tips>
          </div>
        </div>
      </div>

      <div class="history-data-detail">
        <div class="trial-header1">
          <div class="trial-title1">试炼明细</div>
        </div>
        <div class="trial-content trial-content-spf" v-if="isSpf">
          <loading-alg :title="loadingTextFindLaw" v-if="loading_findmatchesbytag"></loading-alg>
          <div class="trial-not-match" v-if="!loading_findmatchesbytag && trialNoMatch">
            <trial-tips :msg="trialNoMatchText" @openMember = "openMember"></trial-tips>
          </div>
          <div class="trial-time-out" v-if="!loading_findmatchesbytag && trialTimeout">
            <trial-tips :msg="trialTimeoutText" type="timeout" @refresh="findMatchesByTagSpf" @openMember = "openMember"></trial-tips>
          </div>
          <div class="trial-list" v-if="isSpf && !loading_findmatchesbytag && trialList.length">
            <div class="trial-list-table">
              <el-table
                  :data="trialListByPage"
                  @row-click="rowClickMethod"
                  :row-class-name="rowClassNameMethod"
                  border
                  style="width: 100%">
                <el-table-column
                    label="赛事"
                    align="center"
                    width="160">
                  <template slot-scope="scope">
                    <span>{{ scope.row.LeagueType_cn }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="时间"
                    align="center"
                    width="320">
                  <template slot-scope="scope">
                    <span>{{ scope.row.datetime_m }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="对阵"
                    align="center"
                    width="420">
                  <template slot-scope="scope">
                    <span v-html="scope.row.vs"></span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="比分"
                    align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.score_m }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination" v-if="pageTotal>1">
              <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  layout="prev, pager, next, jumper"
                  :page-count="pageTotal"
                  prev-text="上一页"
                  next-text="下一页"
              >
              </el-pagination>
            </div>
          </div>
        </div>

        <div class="trial-content trial-content-sx" v-if="isSx">
          <loading-alg :title="loadingTextFindLaw" v-if="loading_findmatchesbytag_sx"></loading-alg>
          <div class="trial-not-match" v-if="!loading_findmatchesbytag_sx && trialNoMatchSx">
            {{trialNoMatchText}}
          </div>
          <div class="trial-time-out" v-if="!loading_findmatchesbytag_sx && trialTimeoutSx" @click="findMatchesByTagSx">
            {{trialTimeoutText}}
          </div>
          <div class="trial-list" v-if="isSx && !loading_findmatchesbytag_sx && trialListSx.length">
            <div class="icon_question" @click="questionPanRouter"></div>
            <div class="trial-list-table">
              <el-table
                  :data="trialListByPageSx"
                  @row-click="rowClickMethod"
                  :row-class-name="rowClassNameMethod"
                  border
                  style="width: 100%">
                <el-table-column
                    label="赛事"
                    align="center"
                    width="130">
                  <template slot-scope="scope">
                    <span>{{ scope.row.LeagueType_cn }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="时间"
                    align="center"
                    width="230">
                  <template slot-scope="scope">
                    <span>{{ scope.row.datetime_m }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="对阵"
                    align="center"
                    width="280">
                  <template slot-scope="scope">
                    <span v-html="scope.row.vs"></span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="比分"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.score_m }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="盘口"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.o3_cn }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="盘路"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.panRouteCN }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="投注建议"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.adviceCN }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="回报率"
                    align="center"
                >
                  <template slot-scope="scope">
                    <span v-html="scope.row.odds_m"></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination" v-if="pageTotalSx>1">
              <el-pagination
                  @current-change="handleCurrentChangeSx"
                  :current-page.sync="currentPageSx"
                  layout="prev, pager, next, jumper"
                  :page-count="pageTotalSx"
                  prev-text="上一页"
                  next-text="下一页"
              >
              </el-pagination>
            </div>
          </div>
        </div>

        <div class="trial-content trial-content-dx" v-if="isDx">
          <loading-alg :title="loadingTextFindLaw" v-if="loading_findmatchesbytag_dx"></loading-alg>
          <div class="trial-not-match" v-if="!loading_findmatchesbytag_dx && trialNoMatchDx">
            {{trialNoMatchText}}
          </div>
          <div class="trial-time-out" v-if="!loading_findmatchesbytag_dx && trialTimeoutDx" @click="findMatchesByTagDx">
            {{trialTimeoutText}}
          </div>
          <div class="trial-list" v-if="isDx && !loading_findmatchesbytag_dx && trialListDx.length">
            <div class="trial-list-table">
              <el-table
                  :data="trialListByPageDx"
                  @row-click="rowClickMethod"
                  :row-class-name="rowClassNameMethod"
                  border
                  style="width: 100%">
                <el-table-column
                    label="赛事"
                    align="center"
                    width="130">
                  <template slot-scope="scope">
                    <span>{{ scope.row.LeagueType_cn }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="时间"
                    align="center"
                    width="230">
                  <template slot-scope="scope">
                    <span>{{ scope.row.datetime_m }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="对阵"
                    align="center"
                    width="280">
                  <template slot-scope="scope">
                    <span v-html="scope.row.vs"></span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="比分"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.score_m }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="盘口"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.o3_cn }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="盘路"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.panRouteCN }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="投注建议"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.adviceCN }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="回报率"
                    align="center"
                >
                  <template slot-scope="scope">
                    <span v-html="scope.row.odds_m"></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination" v-if="pageTotalDx>1">
              <el-pagination
                  @current-change="handleCurrentChangeDx"
                  :current-page.sync="currentPageDx"
                  layout="prev, pager, next, jumper"
                  :page-count="pageTotalDx"
                  prev-text="上一页"
                  next-text="下一页"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="trial-box trial-box-member" :class="[!loading_trialSimilarMatches && pdlist.length?'no-border-bottom':'']" v-if="trialMember || isMember">
      <div class="filter-result">筛选结果：</div>
      <div class="trial">
        <div class="trial-header">
          <div class="trial-title">盈利模拟分析</div>
        </div>
        <!--<div class="trial-tabs">-->
          <!--<div class="trial-tab" :class="[gameType == item.type?'selected':'']" v-for="(item, index) in gameTypeList" :key="index" @click="selectTrialTab(item.type, item.name)">-->
            <!--{{item.name}}-->
          <!--</div>-->
        <!--</div>-->
        <div class="trial-content trial-content-spf" v-if="isSpf">
          <loading-alg :title="loadingTextFindLaw" v-if="loading_findmatchesbytag"></loading-alg>
          <div class="trial-content-main" v-if="!loading_findmatchesbytag && !trialNoMatch && !trialTimeout">
            <div class="trial-result">
              <div class="trial-result-p" v-html="trialObj.desc1"></div>
              <div class="trial-result-p" v-html="trialObj.desc2"></div>
            </div>
            <div class="trial-fruit">
              <div class="trial-fruit-line"></div>
              <div class="trial-fruit-left">
                <div class="trial-fruit-header">
                  <em class="trial-fruit-type">【盈亏模拟-累计回报率】</em>针对匹配场次进行模拟投注，全部投注让方胜，回报率为{{getPercent(trialObj.strongBackOddsSum)}}；全部投注平局，回报率为{{getPercent(trialObj.pinBackOddsSum)}}；全部投注让方负，回报率为{{getPercent(trialObj.weakBackOddsSum)}}。
                </div>
                <div class="trial-fruit-content">
                  <!--<div class="trial-rate-title">累计回报率</div>-->
                  <div class="trial-rate-circle-box trial-rate-circle-red" :class="[trialObj.adviceFlag==1?'trial-rate-circle-selected':'']">
                    <div class="icon_money" v-if="trialObj.strongBackOddsSum > 0"></div>
                    <div class="trial-rate-circle">
                      <div class="trial-rate-per">
                        <em class="trial-rate-per-val">{{trialObj.strongBackOddsSum}}</em>%
                      </div>
                      <div class="trial-rate-text">
                        全押让方胜
                      </div>
                    </div>
                  </div>
                  <div class="trial-rate-circle-box trial-rate-circle-green" :class="[trialObj.adviceFlag==2?'trial-rate-circle-selected':'']">
                    <div class="icon_money" v-if="trialObj.pinBackOddsSum > 0"></div>
                    <div class="trial-rate-circle">
                      <div class="trial-rate-per">
                        <em class="trial-rate-per-val">{{trialObj.pinBackOddsSum}}</em>%
                      </div>
                      <div class="trial-rate-text">
                        全押平局
                      </div>
                    </div>
                  </div>
                  <div class="trial-rate-circle-box trial-rate-circle-blue" :class="[trialObj.adviceFlag==3?'trial-rate-circle-selected':'']">
                    <div class="icon_money" v-if="trialObj.weakBackOddsSum > 0"></div>
                    <div class="trial-rate-circle">
                      <div class="trial-rate-per">
                        <em class="trial-rate-per-val">{{trialObj.weakBackOddsSum}}</em>%
                      </div>
                      <div class="trial-rate-text">
                        全押让方负
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tep-tips">注释：让方，指对阵双方中初始赔率较低的一方，即强势方。</div>
              </div>
              <div class="trial-fruit-right">
                <div class="trial-fruit-header">
                  <em class="trial-fruit-type">【赛果分布】</em>根据您选择的条件，小炮大数据匹配出{{trialObj.allCount}}场历史比赛，赛果分布为让方胜{{getPercent(trialObj.leftPro)}}，平局{{getPercent(trialObj.centerPro)}}，让方负{{getPercent(trialObj.rightPro)}}。
                </div>
                <div class="trial-fruit-content">
                  <div class="trial-echarts-pie" id="echarts-pie-spf">
                    <!--echarts图表-->
                  </div>
                  <div class="tep tep-red">
                    <span class="tep-icon"></span>
                    <span class="tep-label">让方胜：</span>
                    <span class="tep-value"><em class="tep-per">{{trialObj.leftPro}}</em>%</span>
                  </div>
                  <div class="tep tep-green">
                    <span class="tep-icon"></span>
                    <span class="tep-label">平局：</span>
                    <span class="tep-value"><em class="tep-per">{{trialObj.centerPro}}</em>%</span>
                  </div>
                  <div class="tep tep-blue">
                    <span class="tep-icon"></span>
                    <span class="tep-label">让方负：</span>
                    <span class="tep-value"><em class="tep-per">{{trialObj.rightPro}}</em>%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="trial-not-match" v-if="!loading_findmatchesbytag && trialNoMatch">
            <trial-tips :msg="trialNoMatchText" @openMember = "openMember"></trial-tips>
          </div>
          <div class="trial-time-out" v-if="!loading_findmatchesbytag && trialTimeout">
            <trial-tips :msg="trialTimeoutText" type="timeout" @refresh="findMatchesByTagSpf" @openMember = "openMember"></trial-tips>
          </div>
        </div>
        <div class="trial-content trial-content-sx" v-if="isSx">
          <loading-alg :title="loadingTextFindLaw" v-if="loading_findmatchesbytag_sx"></loading-alg>
          <div class="trial-content-main" v-if="!loading_findmatchesbytag_sx && !trialNoMatchSx && !trialTimeoutSx">
            <div class="trial-result">
              <div class="trial-result-p">{{trialObjSx.desc1}}</div>
              <div class="trial-result-p">{{trialObjSx.desc2}}</div>
            </div>
            <div class="trial-fruit">
              <div class="trial-fruit-line"></div>
              <div class="trial-fruit-left">
                <div class="trial-fruit-header">
                  <em class="trial-fruit-type">【盈亏模拟】</em>针对匹配场次进行模拟投注，全部投注上盘，回报率为{{getPercent(trialObjSx.strongBackOddsSum)}}；全部投注下盘，回报率为{{getPercent(trialObjSx.weakBackOddsSum)}}。
                </div>
                <div class="trial-fruit-content">
                  <!--<div class="trial-rate-title">累计回报率</div>-->
                  <div class="trial-rate-circle-box trial-rate-circle-red" :class="[trialObjSx.adviceFlag==1?'trial-rate-circle-selected':'']">
                    <div class="icon_money" v-if="trialObjSx.strongBackOddsSum > 0"></div>
                    <div class="trial-rate-circle">
                      <div class="trial-rate-per">
                        <em class="trial-rate-per-val">{{trialObjSx.strongBackOddsSum}}</em>%
                      </div>
                      <div class="trial-rate-text">
                        全押上盘
                      </div>
                    </div>
                  </div>
                  <div class="trial-rate-circle-box trial-rate-circle-blue" :class="[trialObjSx.adviceFlag==3?'trial-rate-circle-selected':'']">
                    <div class="icon_money" v-if="trialObjSx.weakBackOddsSum > 0"></div>
                    <div class="trial-rate-circle">
                      <div class="trial-rate-per">
                        <em class="trial-rate-per-val">{{trialObjSx.weakBackOddsSum}}</em>%
                      </div>
                      <div class="trial-rate-text">
                        全押下盘
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tep-tips"></div>
              </div>
              <div class="trial-fruit-right">
                <div class="trial-fruit-header">
                  <em class="trial-fruit-type">【赛果分布】</em>根据您选择的条件，小炮大数据匹配出{{trialObjSx.allCount}}场历史比赛，赛果分布为上盘{{getPercent(trialObjSx.leftPro)}}，走{{getPercent(trialObjSx.centerPro)}}，下盘{{getPercent(trialObjSx.rightPro)}}。
                </div>
                <div class="trial-fruit-content">
                  <div class="trial-echarts-pie" id="echarts-pie-sx">
                    <!--echarts图表-->
                  </div>
                  <div class="tep tep-red">
                    <span class="tep-icon"></span>
                    <span class="tep-label">上盘：</span>
                    <span class="tep-value"><em class="tep-per">{{trialObjSx.leftPro}}</em>%</span>
                  </div>
                  <div class="tep tep-green">
                    <span class="tep-icon"></span>
                    <span class="tep-label">走：</span>
                    <span class="tep-value"><em class="tep-per">{{trialObjSx.centerPro}}</em>%</span>
                  </div>
                  <div class="tep tep-blue">
                    <span class="tep-icon"></span>
                    <span class="tep-label">下盘：</span>
                    <span class="tep-value"><em class="tep-per">{{trialObjSx.rightPro}}</em>%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="trial-not-match" v-if="!loading_findmatchesbytag_sx && trialNoMatchSx">
            {{trialNoMatchText}}
          </div>
          <div class="trial-time-out" v-if="!loading_findmatchesbytag_sx && trialTimeoutSx" @click="findMatchesByTagSx">
            {{trialTimeoutText}}
          </div>
        </div>
        <div class="trial-content trial-content-dx" v-if="isDx">
          <loading-alg :title="loadingTextFindLaw" v-if="loading_findmatchesbytag_dx"></loading-alg>
          <div class="trial-content-main" v-if="!loading_findmatchesbytag_dx && !trialNoMatchDx && !trialTimeoutDx">
            <div class="trial-result">
              <div class="trial-result-p">{{trialObjDx.desc1}}</div>
              <div class="trial-result-p">{{trialObjDx.desc2}}</div>
            </div>
            <div class="trial-fruit">
              <div class="trial-fruit-line"></div>
              <div class="trial-fruit-left">
                <div class="trial-fruit-header">
                  <em class="trial-fruit-type">【盈亏模拟-累计回报率】</em>针对匹配场次进行模拟投注，全部投注大球，回报率为{{getPercent(trialObjDx.strongBackOddsSum)}}；全部投注小球，回报率为{{getPercent(trialObjDx.weakBackOddsSum)}}。
                </div>
                <div class="trial-fruit-content">
                  <!--<div class="trial-rate-title">累计回报率</div>-->
                  <div class="trial-rate-circle-box trial-rate-circle-red" :class="[trialObjDx.adviceFlag==1?'trial-rate-circle-selected':'']">
                    <div class="icon_money" v-if="trialObjDx.strongBackOddsSum > 0"></div>
                    <div class="trial-rate-circle">
                      <div class="trial-rate-per">
                        <em class="trial-rate-per-val">{{trialObjDx.strongBackOddsSum}}</em>%
                      </div>
                      <div class="trial-rate-text">
                        全押大球
                      </div>
                    </div>
                  </div>
                  <div class="trial-rate-circle-box trial-rate-circle-blue" :class="[trialObjDx.adviceFlag==3?'trial-rate-circle-selected':'']">
                    <div class="icon_money" v-if="trialObjDx.weakBackOddsSum > 0"></div>
                    <div class="trial-rate-circle">
                      <div class="trial-rate-per">
                        <em class="trial-rate-per-val">{{trialObjDx.weakBackOddsSum}}</em>%
                      </div>
                      <div class="trial-rate-text">
                        全押小球
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tep-tips"></div>
              </div>
              <div class="trial-fruit-right">
                <div class="trial-fruit-header">
                  <em class="trial-fruit-type">【赛果分布】</em>根据您选择的条件，小炮大数据匹配出{{trialObjDx.allCount}}场历史比赛，赛果分布为大球{{getPercent(trialObjDx.leftPro)}}，走{{getPercent(trialObjDx.centerPro)}}，小球{{getPercent(trialObjDx.rightPro)}}。
                </div>
                <div class="trial-fruit-content">
                  <div class="trial-echarts-pie" id="echarts-pie-dx">
                    <!--echarts图表-->
                  </div>
                  <div class="tep tep-red">
                    <span class="tep-icon"></span>
                    <span class="tep-label">大球：</span>
                    <span class="tep-value"><em class="tep-per">{{trialObjDx.leftPro}}</em>%</span>
                  </div>
                  <div class="tep tep-green">
                    <span class="tep-icon"></span>
                    <span class="tep-label">走：</span>
                    <span class="tep-value"><em class="tep-per">{{trialObjDx.centerPro}}</em>%</span>
                  </div>
                  <div class="tep tep-blue">
                    <span class="tep-icon"></span>
                    <span class="tep-label">小球：</span>
                    <span class="tep-value"><em class="tep-per">{{trialObjDx.rightPro}}</em>%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="trial-not-match" v-if="!loading_findmatchesbytag_dx && trialNoMatchDx">
            {{trialNoMatchText}}
          </div>
          <div class="trial-time-out" v-if="!loading_findmatchesbytag_dx && trialTimeoutDx" @click="findMatchesByTagDx">
            {{trialTimeoutText}}
          </div>
        </div>
      </div>

      <!--similar-match-->
      <div class="trial similar-match">
        <div class="trial-header">
          <div class="trial-title">相似比赛推荐</div>
        </div>
        <div class="trial-content">
          <loading-alg :title="loadingTextMatchRecent" v-if="loading_trialSimilarMatches"></loading-alg>
          <div class="trial-not-match" v-if="!loading_trialSimilarMatches && trialSimilarNoMatch">
            <trial-tips :msg="trialNoSimilarMatchText" @openMember = "openMember"></trial-tips>
          </div>
          <div class="trial-time-out" v-if="!loading_trialSimilarMatches && trialSimilarTimeout">
            <trial-tips :msg="trialTimeoutText" type="timeout" @refresh="relationMatches" @openMember = "openMember"></trial-tips>
          </div>
          <div class="similar-match-table-box" v-if="!loading_trialSimilarMatches && pdlist.length">
            <div class="similar-match-result">推荐投注：<span class="red">{{adviceFlagText}}</span></div>
            <!--<div class="icon_question" @click="questionMatch"></div>-->
            <el-table
                :data="pdlist"
                border
                style="width: 100%">
              <el-table-column
                  label="预期回报率"
                  align="center"
                  width="100">
                <template slot-scope="scope">
                  <span v-html="scope.row.odds"></span>
                </template>
              </el-table-column>
              <el-table-column
                  label="推荐赛果"
                  align="center"
                  width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.adviceCN }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="赛事"
                  align="center"
                  width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.LeagueType_cn }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="时间"
                  align="center"
                  width="152">
                <template slot-scope="scope">
                  <span v-html="scope.row.datetime"></span>
                </template>
              </el-table-column>
              <el-table-column
                  label="对阵"
                  align="center"
                  width="300">
                <template slot-scope="scope">
                  <span v-html="scope.row.vs"></span>
                </template>
              </el-table-column>
              <el-table-column
                  label="匹配标签"
                  align="center"
                  width="272">
                <template slot-scope="scope">
                    <span class="tags">
                      <span class="tag" :class="[getTagClass(tagidx),scope.row.tagmore?'':'no-left']" v-for="(tag, tagidx) in scope.row.tagslimit" :key="tagidx">
                      {{getTag(tag)}}
                      </span>
                      <span class="tag-more" v-if="scope.row.tagmore" @click="setTagsShow(scope.row.tags)">更多</span>
                    </span>
                </template>
              </el-table-column>
              <el-table-column
                  label="匹配度"
                  align="center">
                <template slot-scope="scope">
                    <span class="relation">
                      {{ scope.row.relation_m }}
                    </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <div class="history-data-detail">
        <div class="trial-header1">
          <div class="trial-title1">试炼明细</div>
        </div>
        <div class="trial-content trial-content-spf" v-if="isSpf">
          <loading-alg :title="loadingTextFindLaw" v-if="loading_findmatchesbytag"></loading-alg>
          <div class="trial-not-match" v-if="!loading_findmatchesbytag && trialNoMatch">
            <trial-tips :msg="trialNoMatchText" @openMember = "openMember"></trial-tips>
          </div>
          <div class="trial-time-out" v-if="!loading_findmatchesbytag && trialTimeout">
            <trial-tips :msg="trialTimeoutText" type="timeout" @refresh="findMatchesByTagSpf" @openMember = "openMember"></trial-tips>
          </div>
          <div class="trial-list" v-if="isSpf && !loading_findmatchesbytag && trialList.length">
            <div class="trial-list-table">
              <el-table
                  :data="trialListByPage"
                  @row-click="rowClickMethod"
                  :row-class-name="rowClassNameMethod"
                  border
                  style="width: 100%">
                <el-table-column
                    label="赛事"
                    align="center"
                    width="130">
                  <template slot-scope="scope">
                    <span>{{ scope.row.LeagueType_cn }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="时间"
                    align="center"
                    width="220">
                  <template slot-scope="scope">
                    <span>{{ scope.row.datetime_m }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="对阵"
                    align="center"
                    width="320">
                  <template slot-scope="scope">
                    <span v-html="scope.row.vs"></span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="比分"
                    align="center"
                    width="110">
                  <template slot-scope="scope">
                    <span>{{ scope.row.score_m }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="让方赛果"
                    align="center"
                    width="110">
                  <template slot-scope="scope">
                    <span>{{ scope.row.panRouteCN }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="投注建议"
                    align="center"
                    width="110">
                  <template slot-scope="scope">
                    <span>{{ scope.row.adviceCN }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="回报率"
                    align="center"
                >
                  <template slot-scope="scope">
                    <span v-html="scope.row.odds_m"></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination" v-if="pageTotal>1">
              <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  layout="prev, pager, next, jumper"
                  :page-count="pageTotal"
                  prev-text="上一页"
                  next-text="下一页"
              >
              </el-pagination>
            </div>
          </div>
        </div>

        <div class="trial-content trial-content-sx" v-if="isSx">
          <loading-alg :title="loadingTextFindLaw" v-if="loading_findmatchesbytag_sx"></loading-alg>
          <div class="trial-not-match" v-if="!loading_findmatchesbytag_sx && trialNoMatchSx">
            {{trialNoMatchText}}
          </div>
          <div class="trial-time-out" v-if="!loading_findmatchesbytag_sx && trialTimeoutSx" @click="findMatchesByTagSx">
            {{trialTimeoutText}}
          </div>
          <div class="trial-list" v-if="isSx && !loading_findmatchesbytag_sx && trialListSx.length">
            <div class="icon_question" @click="questionPanRouter"></div>
            <div class="trial-list-table">
              <el-table
                  :data="trialListByPageSx"
                  @row-click="rowClickMethod"
                  :row-class-name="rowClassNameMethod"
                  border
                  style="width: 100%">
                <el-table-column
                    label="赛事"
                    align="center"
                    width="130">
                  <template slot-scope="scope">
                    <span>{{ scope.row.LeagueType_cn }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="时间"
                    align="center"
                    width="230">
                  <template slot-scope="scope">
                    <span>{{ scope.row.datetime_m }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="对阵"
                    align="center"
                    width="280">
                  <template slot-scope="scope">
                    <span v-html="scope.row.vs"></span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="比分"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.score_m }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="盘口"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.o3_cn }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="盘路"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.panRouteCN }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="投注建议"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.adviceCN }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="回报率"
                    align="center"
                >
                  <template slot-scope="scope">
                    <span v-html="scope.row.odds_m"></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination" v-if="pageTotalSx>1">
              <el-pagination
                  @current-change="handleCurrentChangeSx"
                  :current-page.sync="currentPageSx"
                  layout="prev, pager, next, jumper"
                  :page-count="pageTotalSx"
                  prev-text="上一页"
                  next-text="下一页"
              >
              </el-pagination>
            </div>
          </div>
        </div>

        <div class="trial-content trial-content-dx" v-if="isDx">
          <loading-alg :title="loadingTextFindLaw" v-if="loading_findmatchesbytag_dx"></loading-alg>
          <div class="trial-not-match" v-if="!loading_findmatchesbytag_dx && trialNoMatchDx">
            {{trialNoMatchText}}
          </div>
          <div class="trial-time-out" v-if="!loading_findmatchesbytag_dx && trialTimeoutDx" @click="findMatchesByTagDx">
            {{trialTimeoutText}}
          </div>
          <div class="trial-list" v-if="isDx && !loading_findmatchesbytag_dx && trialListDx.length">
            <div class="trial-list-table">
              <el-table
                  :data="trialListByPageDx"
                  @row-click="rowClickMethod"
                  :row-class-name="rowClassNameMethod"
                  border
                  style="width: 100%">
                <el-table-column
                    label="赛事"
                    align="center"
                    width="130">
                  <template slot-scope="scope">
                    <span>{{ scope.row.LeagueType_cn }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="时间"
                    align="center"
                    width="230">
                  <template slot-scope="scope">
                    <span>{{ scope.row.datetime_m }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="对阵"
                    align="center"
                    width="280">
                  <template slot-scope="scope">
                    <span v-html="scope.row.vs"></span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="比分"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.score_m }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="盘口"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.o3_cn }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="盘路"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.panRouteCN }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="投注建议"
                    align="center"
                    width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.adviceCN }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="回报率"
                    align="center"
                >
                  <template slot-scope="scope">
                    <span v-html="scope.row.odds_m"></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination" v-if="pageTotalDx>1">
              <el-pagination
                  @current-change="handleCurrentChangeDx"
                  :current-page.sync="currentPageDx"
                  layout="prev, pager, next, jumper"
                  :page-count="pageTotalDx"
                  prev-text="上一页"
                  next-text="下一页"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tags-toast-box" v-if="tagsShow">
      <div class="ttb-mask"></div>
      <div class="ttb-toast" :class="getTtbLH(singleMatchTags)">
        <div class="ttb-close" @click="ttbClose"></div>
        <div class="tags">
          <div class="tag clearfix" :class="getTagClass(tagidx)" v-for="(tag, tagidx) in singleMatchTags" :key="tagidx">
            {{getTag(tag)}}
          </div>
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

  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {baseMixin} from 'common/js/mixin'

  import Vue from 'vue'
  import LoadingCircle from 'base/loading/loading-circle'
  import LoadingAlg from 'base/loading/loading-alg'
  import TrialTips from 'components/algorithm/trial-tips'
  import Trial from 'common/class/Trial'
  import MatchAlg from 'class/MatchAlg'

  import {ERR_OK, PAGEURLS} from 'common/const/config'
  import {findMatchesByTag, relationMatches} from 'api/algorithm'
  import {checkLocalLogin} from 'common/js/cache'
  import {loginToast,goLoginByUrl} from 'common/class/Payment'

  export default {
    mixins: [baseMixin],
    data() {
      return {
        loadingTextFindLaw: '正在寻找规律...',
        loadingTextMatchRecent: '正在匹配相似比赛...',
        pageSize: 10,
        trialNoMatchText: '抱歉，未找到相关的历史比赛。不妨试试热门筛选条件或热门比赛吧！',
        trialNoSimilarMatchText: '抱歉，未找到未来3天相似的比赛。不妨试试热门筛选条件或热门比赛吧！',
        trialNoMember: '算法试炼，帮你选出最佳投注选择，精确匹配近期赛事',
        trialTimeoutText: '网络请求超时，请重试。',
        gameType: 'z5_spf',
        gameTypeList: [{
          name: '胜平负',
          type: 'z5_spf'
        },{
          name: '亚盘',
          type: 'z5_sx'
        },{
          name: '大小球',
          type: 'z5_dx'
        }],

        loading_findmatchesbytag: false,
        trialNoMatch: false,
        trialTimeout: false,
        trialList: [],
        trialObj: {},
        currentPage: 1,
        pageTotal: 1,

        loading_findmatchesbytag_sx: false,
        trialNoMatchSx: false,
        trialTimeoutSx: false,
        trialListSx: [],
        trialObjSx: {},
        currentPageSx: 1,
        pageTotalSx: 1,

        loading_findmatchesbytag_dx: false,
        trialNoMatchDx: false,
        trialTimeoutDx: false,
        trialListDx: [],
        trialObjDx: {},
        currentPageDx: 1,
        pageTotalDx: 1,

        pdlist: [],
        loading_trialSimilarMatches: false,
        tagsShow: false,
        singleMatchTags: '',
        trialSimilarNoMatch: false,
        trialSimilarTimeout: false,
        adviceFlag: 0
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
      trialListByPage() {
        let self = this
        let currentPage = self.currentPage
        let pageSize = self.pageSize
        let arr = self.trialList.filter(function (item, idx) {
          return (idx >= (currentPage-1)*pageSize) &&(idx < currentPage*pageSize)
        })
        return arr
      },
      trialListByPageSx() {
        let self = this
        let currentPage = self.currentPageSx
        let pageSize = self.pageSize
        let arr = self.trialListSx.filter(function (item, idx) {
          return (idx >= (currentPage-1)*pageSize) &&(idx < currentPage*pageSize)
        })
        return arr
      },
      trialListByPageDx() {
        let self = this
        let currentPage = self.currentPageDx
        let pageSize = self.pageSize
        let arr = self.trialListDx.filter(function (item, idx) {
          return (idx >= (currentPage-1)*pageSize) &&(idx < currentPage*pageSize)
        })
        return arr
      },
      tags() {
        let self = this
        let arr = self.algAttrs.filter(function (item, i) {
          return i < 3
        })
        return arr
      },
      isSpf() {
        let self = this
        return self.gameType == 'z5_spf'
      },
      isSx() {
        let self = this
        return self.gameType == 'z5_sx'
      },
      isDx() {
        let self = this
        return self.gameType == 'z5_dx'
      },
      adviceFlagText() {
        let self = this
        let arr = ['', '让方胜', '平局', '让方负']
        return arr[self.adviceFlag]
      },
      ...mapGetters([
        'member',  // 0 新用户，1试用 2 试用结束 3 会员 4到期
        'type',
        'dateRange',
        'algAttrs',
        'findLaw'
      ])
    },
    created() {
    },
    methods: {
      algorithmInit() {
        let self = this
        if (!self.algAttrIds.length) {
          self.trialNoMatch = true
          self.trialTimeout = false
          self.trialSimilarNoMatch = true
          self.trialSimilarTimeout = false
          return
        }
        console.log('algorithmInit-date:', self.dateRange)
        console.log('algorithmInit-type:', self.type)
        console.log('algorithmInit-ids:', self.algAttrIds.join(','))
        self.gameType = self.gameTypeList[0].type
        self.findMatchesByTagSpf()

        if (self.trialMember || self.isMember) {
          self.findMatchesByTagSx()
          self.findMatchesByTagDx()
        }
      },
      findMatchesByTagSpf() {
        let self = this
        if (self.loading_findmatchesbytag) {
          return
        }
        self.trialList = []
        if (!self.algAttrIds || !self.algAttrIds.length) {
          self.trialNoMatch = true
          self.trialTimeout = false
          self.loading_findmatchesbytag = false
          return
        }
        self.loading_findmatchesbytag = true
        let tagIds = self.algAttrIds.join(',')
        let dateBegin = util.dateFormatFmt( self.dateRange[0], "yyyy-MM-dd")
        let dateEnd = util.dateFormatFmt( self.dateRange[1], "yyyy-MM-dd")
        let leagueTypes = self.type == 'all'? '': self.type
        let gameType = self.gameType
        let params = {
          tagIds: tagIds,
          dateBegin: dateBegin,
          dateEnd: dateEnd,
          gameType: gameType,
          leagueTypes: leagueTypes
        }
        findMatchesByTag(params).then((res) => {
          self.loading_findmatchesbytag = false
          let result = self.resultHandler(res)
          let {status, data, params, adviceFlag} = result
          if (!params || !params.tagIds) {
            self.trialNoMatch = true
            self.trialTimeout = false
            self.adviceFlag = false
            self.relationMatches()
            return
          }
//          if (params.tagIds == tagIds && params.dateBegin == dateBegin && params.dateEnd == dateEnd && params.gameType == gameType && params.leagueTypes == leagueTypes) {
            let code = status.code
            if (code === ERR_OK && util.isArray(data) && data.length) {
              self.trialNoMatch = false
              self.trialTimeout = false

              self.trialObj.leftPro = result.leftPro
              self.trialObj.rightPro = result.rightPro
              self.trialObj.centerPro = result.centerPro
              self.trialObj.weakBackOddsSum = result.weakBackOddsSum
              self.trialObj.strongBackOddsSum = result.strongBackOddsSum
              self.trialObj.pinBackOddsSum = result.pinBackOddsSum
              self.trialObj.adviceCN = result.adviceCN
              self.trialObj.adviceFlag = result.adviceFlag
              self.trialObj.desc1 = result.desc1
              self.trialObj.desc2 = result.desc2
              self.trialObj.allCount = result.allCount

              data.forEach(function (item) {
                item.adviceCN = result.adviceCN
                item.adviceFlag = result.adviceFlag
                item.tags = self.tags
                self.trialList.push(new Trial(item))
              })
              self.pageTotal = Math.ceil(self.trialList.length/ self.pageSize)
              self.currentPage = 1
              setTimeout(function () {
                self.trialEhartsPie()
              }, 50)
              console.log('trialList:',self.trialList)

              self.adviceFlag = adviceFlag
              self.relationMatches()
            } else {
              self.trialNoMatch = true
              self.trialTimeout = false
              self.adviceFlag = false
              self.relationMatches()
            }
//          }
        }, (error) => {
          self.trialNoMatch = false
          self.trialTimeout = true
          self.loading_findmatchesbytag = false
          self.adviceFlag = false
          self.relationMatches()
        })
      },
      trialEhartsPie() {
        let self = this
        if (!$('#echarts-pie-spf').length) {
          return
        }
        let per1 = self.trialObj.leftPro
        let per2 = self.trialObj.centerPro
        let per3 = self.trialObj.rightPro
        let per1text = '让方胜'
        let per2text = '平局'
        let per3text = '让方负'

        let myChart = echarts.init($('#echarts-pie-spf')[0], 'xp2');
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c}%",
            backgroundColor: 'rgba(0,0,0,0.7)'
          },
          series: [{
            name: '赛果分布',
            type:'pie',
            selectedMode: 'single',
            selectedOffset: 2,
            startAngle: 180,
            radius: ['43%', '63%'],
            center: ['50%', '50%'],
            data:[
              {value:per1, name:per1text, selected:true},
              {value:per2, name:per2text, selected:true},
              {value:per3, name:per3text, selected:true}
            ]
          }]
        };
        myChart.setOption(option);
      },
      findMatchesByTagSx() {
        let self = this
        if (self.loading_findmatchesbytag_sx) {
          return
        }
        self.trialListSx = []
        if (!self.algAttrIds || !self.algAttrIds.length) {
          self.trialNoMatchSx = true
          self.trialTimeoutSx = false
          self.loading_findmatchesbytag_sx = false
          return
        }
        self.loading_findmatchesbytag_sx = true
        let tagIds = self.algAttrIds.join(',')
        let dateBegin = util.dateFormatFmt( self.dateRange[0], "yyyy-MM-dd")
        let dateEnd = util.dateFormatFmt( self.dateRange[1], "yyyy-MM-dd")
        let leagueTypes = self.type == 'all'? '': self.type
        let gameType = 'z5_sx'
        let params = {
          tagIds: tagIds,
          dateBegin: dateBegin,
          dateEnd: dateEnd,
          gameType: gameType,
          leagueTypes: leagueTypes
        }
        findMatchesByTag(params).then((res) => {
          self.loading_findmatchesbytag_sx = false;
          let result = self.resultHandler(res)
          let {status, data, params} = result
          if (!params || !params.tagIds) {
            self.trialNoMatchSx = true
            self.trialTimeoutSx = false
            return
          }

          if (params.tagIds == tagIds && params.dateBegin == dateBegin && params.dateEnd == dateEnd && params.gameType == gameType && params.leagueTypes == leagueTypes) {
            let code = status.code
            if (code === ERR_OK && data.length) {
              self.trialNoMatchSx = false
              self.trialTimeoutSx = false

              self.trialObjSx.leftPro = result.leftPro
              self.trialObjSx.rightPro = result.rightPro
              self.trialObjSx.centerPro = result.centerPro
              self.trialObjSx.weakBackOddsSum = result.weakBackOddsSum
              self.trialObjSx.strongBackOddsSum = result.strongBackOddsSum
              self.trialObjSx.pinBackOddsSum = result.pinBackOddsSum
              self.trialObjSx.adviceCN = result.adviceCN
              self.trialObjSx.adviceFlag = result.adviceFlag
              self.trialObjSx.desc1 = result.desc1
              self.trialObjSx.desc2 = result.desc2
              self.trialObjSx.allCount = result.allCount

              data.forEach(function (item) {
                item.adviceCN = result.adviceCN
                item.adviceFlag = result.adviceFlag
                item.tags = self.tags
                self.trialListSx.push(new Trial(item))
              })
              self.pageTotalSx = Math.ceil(self.trialListSx.length/ self.pageSize)
              self.currentPageSx = 1
              setTimeout(function () {
                self.trialEhartsPieSx()
              }, 50)
              console.log('trialListSx:',self.trialListSx)
            } else {
              self.trialNoMatchSx = true
              self.trialTimeoutSx = false
            }
          }
        }, (error) => {
          self.trialNoMatchSx = false
          self.trialTimeoutSx = true
          self.loading_findmatchesbytag_sx = false
        })
      },
      trialEhartsPieSx() {
        let self = this
        if (!$('#echarts-pie-sx').length) {
          return
        }
        let per1 = self.trialObjSx.leftPro
        let per2 = self.trialObjSx.centerPro
        let per3 = self.trialObjSx.rightPro
        let per1text = '上盘'
        let per2text = '走'
        let per3text = '下盘'

        let myChart = echarts.init($('#echarts-pie-sx')[0], 'xp2');
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c}%",
            backgroundColor: 'rgba(0,0,0,0.7)'
          },
          series: [{
            name: '赛果分布',
            type:'pie',
            selectedMode: 'single',
            selectedOffset: 2,
            startAngle: 180,
            radius: ['43%', '63%'],
            center: ['50%', '50%'],
            data:[
              {value:per1, name:per1text, selected:true},
              {value:per2, name:per2text, selected:true},
              {value:per3, name:per3text, selected:true}
            ]
          }]
        };
        myChart.setOption(option);
      },
      findMatchesByTagDx() {
        let self = this
        if (self.loading_findmatchesbytag_dx) {
          return
        }
        self.trialListDx = []
        if (!self.algAttrIds || !self.algAttrIds.length) {
          self.trialNoMatchDx = true
          self.trialTimeoutDx = false
          self.loading_findmatchesbytag_dx = false
          return
        }
        self.loading_findmatchesbytag_dx = true
        let tagIds = self.algAttrIds.join(',')
        let dateBegin = util.dateFormatFmt( self.dateRange[0], "yyyy-MM-dd")
        let dateEnd = util.dateFormatFmt( self.dateRange[1], "yyyy-MM-dd")
        let leagueTypes = self.type == 'all'? '': self.type
        let gameType = 'z5_dx'
        let params = {
          tagIds: tagIds,
          dateBegin: dateBegin,
          dateEnd: dateEnd,
          gameType: gameType,
          leagueTypes: leagueTypes
        }
        findMatchesByTag(params).then((res) => {
          self.loading_findmatchesbytag_dx = false;
          let result = self.resultHandler(res)
          let {status, data, params} = result
          if (!params || !params.tagIds) {
            self.trialNoMatchDx = true
            self.trialTimeoutDx = false
            return
          }

          if (params.tagIds == tagIds && params.dateBegin == dateBegin && params.dateEnd == dateEnd && params.gameType == gameType && params.leagueTypes == leagueTypes) {
            let code = status.code
            if (code === ERR_OK && data.length) {
              self.trialNoMatchDx = false
              self.trialTimeoutDx = false

              self.trialObjDx.leftPro = result.leftPro
              self.trialObjDx.rightPro = result.rightPro
              self.trialObjDx.centerPro = result.centerPro
              self.trialObjDx.weakBackOddsSum = result.weakBackOddsSum
              self.trialObjDx.strongBackOddsSum = result.strongBackOddsSum
              self.trialObjDx.pinBackOddsSum = result.pinBackOddsSum
              self.trialObjDx.adviceCN = result.adviceCN
              self.trialObjDx.adviceFlag = result.adviceFlag
              self.trialObjDx.desc1 = result.desc1
              self.trialObjDx.desc2 = result.desc2
              self.trialObjDx.allCount = result.allCount

              data.forEach(function (item) {
                item.adviceCN = result.adviceCN
                item.adviceFlag = result.adviceFlag
                item.tags = self.tags
                self.trialListDx.push(new Trial(item))
              })
              self.pageTotalDx = Math.ceil(self.trialListDx.length/ self.pageSize)
              self.currentPageDx = 1
              setTimeout(function () {
                self.trialEhartsPieDx()
              }, 50)
              console.log('trialListDx:',self.trialListDx)
            } else {
              self.trialNoMatchDx = true
              self.trialTimeoutDx = false
            }
          }
        }, (error) => {
          self.trialNoMatchDx = false
          self.trialTimeoutDx = true
          self.loading_findmatchesbytag_dx = false
        })
      },
      trialEhartsPieDx() {
        let self = this
        if (!$('#echarts-pie-dx').length) {
          return
        }
        let per1 = self.trialObjDx.leftPro
        let per2 = self.trialObjDx.centerPro
        let per3 = self.trialObjDx.rightPro
        let per1text = '大球'
        let per2text = '走'
        let per3text = '小球'

        let myChart = echarts.init($('#echarts-pie-dx')[0], 'xp2');
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c}%",
            backgroundColor: 'rgba(0,0,0,0.7)'
          },
          series: [{
            name: '赛果分布',
            type:'pie',
            selectedMode: 'single',
            selectedOffset: 2,
            startAngle: 180,
            radius: ['43%', '63%'],
            center: ['50%', '50%'],
            data:[
              {value:per1, name:per1text, selected:true},
              {value:per2, name:per2text, selected:true},
              {value:per3, name:per3text, selected:true}
            ]
          }]
        };
        myChart.setOption(option);
      },
      handleCurrentChange(val) {
        let self = this
        console.log(`胜平负当前页: ${val}`);
        self.currentPage = val;
      },
      handleCurrentChangeSx(val) {
        let self = this
        console.log(`亚盘当前页: ${val}`);
        self.currentPageSx = val;
      },
      handleCurrentChangeDx(val) {
        let self = this
        console.log(`大小球当前页: ${val}`);
        self.currentPageDx = val;
      },
      rowClickMethod(row, event, column){
        let self = this
      },
      rowClassNameMethod({row, index}){
        let self = this
      },
      getTagClass(idx) {
        let i = idx%3
        return `tag${i}`
      },
      selectTrialTab(type, name) {
        let self = this
        setTimeout(function () {
          self.trialEhartsPie()
          self.trialEhartsPieSx()
          self.trialEhartsPieDx()
        }, 50)

        if (self.gameType == type) {
          return
        }
        self.gameType = type

        _hmt.push(['_trackEvent', '/algorithm/trialtab', 'click', name]);
      },
      getPercent(val) {
        return val + '%'
      },
      getTag(val) {
        let tag = val.parentCn + ' : ' +val.tagCn
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
      relationMatches() {
        let self = this
        if(!self.adviceFlag) {
          self.pdlist = []
          self.trialSimilarNoMatch = true
          self.trialSimilarTimeout = false
          self.loading_trialSimilarMatches = false
          return
        }
        if (self.loading_trialSimilarMatches) {
          return
        }
        self.loading_trialSimilarMatches = true
        self.pdlist = []
        let tagIds = self.algAttrIds.join(',')
        let params = {
          tagIds: tagIds,
          adviceFlag: self.adviceFlag,
          isAlg: 1
        }
        relationMatches(params).then((res) => {
          self.trialSimilarNoMatch = false
          self.trialSimilarTimeout = false
          self.loading_trialSimilarMatches = false
          self.pdlist = []
          let result = self.resultHandler(res)
          let {status, data} = result
          let code = status.code
          if (code === ERR_OK && util.isArray(data) && data.length) {
            data.forEach((val) => {
              self.pdlist.push(new MatchAlg(val))
            })
            console.log('relationMatches:',data)
          } else {
            self.trialSimilarNoMatch = true
          }
        }, (error) => {
          self.trialSimilarNoMatch = false
          self.trialSimilarTimeout = true
          self.loading_trialSimilarMatches = false
        })
      },
      setTagsShow(tags) {
        let self = this
        self.singleMatchTags = tags
        self.tagsShow = true
      },
      ttbClose() {
        let self = this
        self.tagsShow = false
      },
      getTtbLH(tags) {
        let self = this
        if (!tags || !tags.length) {
          return ''
        }
        let num = Math.ceil(tags.length/3)
        return 'ttb-toast-l' + num
      },
      questionMatch() {
        let self = this
        self.toastAlert({
          alertType: 'info',
          alertShow: true,
          alertText: '即根据您搜索的标签，未来3天内比赛的标签与其匹配的程度。'
        })
      },
      questionPanRouter() {
        let self = this
        self.toastAlert({
          alertType: 'info',
          alertShow: true,
          alertText: '亚盘盘路中“上盘”是指让球方赢盘，“下盘”是指受让方赢盘。'
        })
      },
      openMember() {
        let self = this
        self.$emit('openMember')
      },
      ...mapMutations({
        setFindLaw: 'SET_FIND_LAW'
      }),
      ...mapActions([
        'toastAlert'
      ])
    },
    components: {
      LoadingCircle,
      LoadingAlg,
      TrialTips
    },
    watch: {
      findLaw(newVal, oldVal) {
        let self = this
        if (newVal) {
          self.setFindLaw(false)
          self.algorithmInit()
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .trial-wrap
    overflow: hidden
    .trial-box
      overflow: hidden
    .no-border
      border: 0 none!important
    .no-border-bottom
      border-bottom: 0 none!important
    .no-border-top-bottom
      border-top: 0 none!important
      border-bottom: 0 none!important
    .filter-result
      font-size: 20px
      color: #1A1A1C
      font-weight: bold
      line-height: 30px
      padding-top: 30px
      padding-bottom: 15px
    .trial
      position: relative
      overflow: hidden
      border: 1px solid #ebf0f1
    .trial-header
      overflow: hidden
      border-bottom: 1px solid #ebf0f1
      height: 60px
      line-height: 60px
      position: relative
      .trial-title
        float: left
        font-size: 16px
        color: #333333
        padding-left: 30px
    .trial-content
      overflow: hidden
      position: relative
      min-height: 127px
      .trial-content-main
        position: relative
        width: 100%
        min-height: 296px
        overflow: hidden
        padding-top: 24px
      .trial-result
        overflow: hidden
        min-height: 32px
        margin: 0 30px
        background: #F7F8F9
        padding: 14px 30px
        .trial-result-p
          line-height: 32px
          height: 32px
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          font-size: 14px
          color: #333333
      .trial-fruit
        height: 350px
        overflow: hidden
        margin: 23px 30px 0
        position: relative
        color: #333
        .trial-fruit-left
          float: left
          width: 539px
          height: 350px
          padding-right: 30px
          position: relative
        .trial-fruit-right
          float: right
          width: 539px
          height: 350px
          margin-left: 30px
          position: relative
        .trial-fruit-line
          position: absolute
          left: 50%
          top: 0px
          width: 1px
          background: #EBF0F1
          height: 324px
          font-size: 0px
          overflow: hidden
        .trial-fruit-header
          line-height: 27px
          color: #333333
          font-size: 14px
          .trial-fruit-type
            font-weight: bold
        .trial-echarts-pie
          overflow: hidden
          height: 260px
          width: 300px
        .tep
          position: absolute
          left: 312px
          border: 1px solid #EEEEEE
          border-radius: 3px
          width: 180px
          height: 46px
          line-height: 46px
          .tep-icon
            position: absolute
            left: 15px
            top: 50%
            margin-top: -4px
            width: 8px
            height: 8px
            border-radius: 4px
            background: #F23B1E
          .tep-label
            position: absolute
            left: 0px
            top: 0px
            width: 100px
            text-align: right
            font-size: 16px
            color: #333333
          .tep-value
            position: absolute
            left: 100px
            top: 0px
            text-align: right
            font-size: 12px
            color: #333333
            width: 40px
          .tep-per
            font-size: 18px
        .tep-red
          top: 106px
        .tep-green
          top: 161px
          .tep-icon
            background: #37EDB5
        .tep-blue
          top: 216px
          .tep-icon
            background: #49A6F1
        .tep-tips
          overflow: hidden
          position: absolute
          left: 0px
          right: 0px
          bottom: 10px
          height: 20px
          line-height: 20px
          white-space: nowrap
          overflow: hidden
          font-size: 12px
          color: #333
          text-align: center
        .trial-rate-title
          position: absolute
          left: 0px
          right: 0px
          top: 99px
          height; 20px
          line-height: 20px
          text-align: center
          font-size: 12px
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
    .trial-tabs
      margin-top: 24px
      height: 50px
      text-align: center
      .trial-tab
        display: inline-block
        width: 130px
        height: 50px
        line-height: 50px
        text-align: center
        color: #8D9BA0
        font-size: 16px
        cursor: pointer
        &.selected
          background: #F7F8F9
    .trial-not-match
      overflow: hidden
      margin: 50px 30px
    .trial-time-out
      overflow: hidden
      margin: 50px 30px
    .similar-match
      overflow: hidden
      margin-top: 16px
      .el-table td, .el-table th
        padding: 7px 0
        font-size: 12px
    .history-data-detail
      overflow: hidden
      margin-top: 16px
      border: 1px solid #EBF0F1
      .trial-header1
        overflow: hidden
        border-bottom: 1px solid #ebf0f1
        height: 60px
        line-height: 60px
        position: relative
        .trial-title1
          float: left
          font-size: 16px
          color: #333
          padding-left: 30px
      .trial-list
        position: relative
        padding: 30px 30px 20px 30px
        .icon_question
          position: absolute
          top: 41px
          right: 245px
          background-image: url(../../../static/img/icon_question.png)
          background-repeat: no-repeat
          width: 16px
          height: 16px
          z-index: 100
          cursor: pointer
        .tag
          display: inline-block!important
          width: 130px
          padding: 0 5px
          text-align: center
          font-size: 12px
          height: 24px
          line-height: 24px
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
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
      .el-table td, .el-table th
        padding: 7px 0
        font-size: 12px
  //min-height: 598px
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
          width: 78px
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
    top: 410px
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

  .el-table
    color: $color
  .el-table td, .el-table th.is-leaf
    border-color: $bgray
  .el-table__row:hover
    cursor: default
  .no-link:hover
    cursor: default
  .pagination
    padding: 16px 0
    text-align: center
    .el-pagination
      overflow: hidden
    .el-pager li.active,.el-pager li:hover
      color: $red!important
    .el-pagination button
      border: 1px solid $bgray
      height: 30px
      line-height: 30px
      border-radius: 3px
    .el-pagination .btn-prev
      padding-left: 12px
      padding-right: 12px
      margin-right: 12px
    .el-pagination .btn-next
      padding-left: 12px
      padding-right: 12px
      margin-left: 12px
    .el-pagination button.active, .el-pagination button:hover
      color: $red
    .el-pagination button.disabled, .el-pagination button.disabled:hover
      color: #c0c4cc
  .trial-rate-circle-box
    position: absolute
    top: 119px
    left: 50%
    width: 150px
    height: 150px
  .trial-rate-circle
    position: absolute
    top: 12px
    left: 50%
    width: 110px
    height: 110px
    border-radius: 100%
    margin-left: -63px
  .trial-rate-circle-red
    margin-left: -255px
    color: #fff
    .trial-rate-circle
      border: 8px solid #F23B1E
      background: #F23B1E
    .icon_money
      display: none
      left: 118px
      top: -15px
  .trial-rate-circle-green
    margin-left: -75px
    color: #fff
    .trial-rate-circle
      border: 8px solid #37EDB5
      background: #37EDB5
    .icon_money
      display: none
      left: 118px
      top: -15px
  .trial-rate-circle-blue
    margin-left: 105px
    color: #fff
    .trial-rate-circle
      border: 8px solid #49A6F1
      background: #49A6F1
    .icon_money
      display: none
      left: 118px
      top: -15px
  .trial-rate-circle-selected
    display: block
    .trial-rate-circle
      border-width: 10px
      top: 0px
      left: 50%
      width: 130px
      height: 130px
      border-radius: 100%
      margin-left: -75px
    .icon_money
      display: block
      background: url(../../../static/img/v2_icon_money.png) no-repeat
      width: 50px
      height: 36px
      position: absolute
  .trial-rate-per
    position: absolute
    left: 0px
    right: 0px
    text-align: center
    top: 50%
    margin-top: -30px
    height: 30px
    line-height: 30px
    font-size: 12px
  .trial-rate-per-val
    font-size: 22px
    font-weight: bold
  .trial-rate-text
    position: absolute
    left: 0px
    right: 0px
    text-align: center
    top: 50%
    height: 30px
    line-height: 30px
    font-size: 14px
    color: #fff
  .trial-content-sx
    .trial-rate-circle-red
      margin-left: -180px
    .trial-rate-circle-blue
      margin-left: 30px
  .trial-content-dx
    .trial-rate-circle-red
      margin-left: -180px
    .trial-rate-circle-blue
      margin-left: 30px
  .similar-match-table-box
    position: relative
    padding: 24px 30px 30px
    .similar-match-result
      overflow: hidden
      min-height: 32px
      margin: 0px 0px 16px
      background: #f7f8f9
      padding: 14px 30px
      font-size: 14px
      line-height: 32px
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
    .haspay
      position: absolute
      left: 50%
      top: 50%
      margin:-23px 0 0 -78px
      background: url(../../../static/img/btn_purchase_look.png) no-repeat center top
      height: 46px
      width: 156px
      cursor: pointer
  .tags-toast-box
    .ttb-mask
      position: absolute
      position: fixed
      left: 0px
      right: 0px
      top: 0px
      bottom: 0px
      background: rgba(0, 0, 0, 0.3)
      z-index: 1000
    .ttb-toast
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
    .ttb-toast-l2
      min-height: 64px
      margin: -72px 0 0 -300px
    .ttb-toast-l3
      min-height: 96px
      margin: -88px 0 0 -300px
    .ttb-toast-l4
      min-height: 128px
      margin: -104px 0 0 -300px
    .ttb-close
      background: url(../../../static/img/icon_close.png) no-repeat center center
      width: 25px
      height: 25px
      position: absolute
      top: 16px
      right: 16px
      cursor: pointer
    .tags
      min-height: 32px
      line-height: 24px
      .tag
        float: left
        padding: 0 8px
        width: 160px
        text-align: center
        font-size: 12px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        margin-top: 8px
      .tag0
        background: #FFEFEF
        color: #ED686C
      .tag1
        background: #FFF5E4
        color: #E7A050
        margin: 8px 8px 0
      .tag2
        background: #E1F7FC
        color: #46C0F0
  .trial-list-table
    position: relative
</style>