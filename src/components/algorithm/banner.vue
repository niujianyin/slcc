<template>
  <div class="banner">
    <div class="wrap">
      <div class="member-box">
        <template v-if="unMember">
          <div class="member-tips">
            新用户可免费体验 <em class="member-days">3</em> 天
          </div>
          <div class="member-trial" @click="openMember"></div>
        </template>
        <template v-if="trialMember || unMemberHasTrial">
          <div class="member-tips">
            算法选球试用体验期仅剩 <em class="member-days">{{memberDay}}</em> 天
          </div>
          <div class="member-open" @click="openMember"></div>
        </template>
        <template v-if="isMember">
          <div class="member-tips">
            算法选球会员服务剩余 <em class="member-days">{{memberDay}}</em> 天
          </div>
          <div class="member-add" @click="openMember"></div>
        </template>
        <template v-if="unMemberHasMember">
          <div class="member-tips">
            会员服务已到期
          </div>
          <div class="member-add" @click="openMember"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
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
      ...mapGetters([
        'member',  // 0 新用户，1试用 2 试用结束 3 会员 4到期
        'memberDay'
      ])
    },
    created() {
    },
    methods: {
      openMember() {
        let self = this
        self.setVipShow(true)
      },
      ...mapMutations({
        setVipShow: 'SET_VIP_SHOW'
      })
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .banner
    background: url(../../../static/img/banner_algorithm2.png) no-repeat center top #0A1384
    height: 235px
    .wrap
      height: 100%
      overflow: hidden
      text-align: center
      .member-box
        position: absolute
        top: 160px
        display: inline-block
        padding: 0 129px 0 23px
        position: relative
        background: rgba(0, 0, 0, 0.4)
        border-radius: 18px
        .member-tips
          font-size: 12px
          color: #FFFFFF
          height: 35px
          line-height:  30px
          font-family: "PingFang SC"
          vertical-align: top
          .member-days
            overflow: hidden
            font-size: 22px
            font-weight: bold
            padding: 0 10px
        .member-open
          position: absolute
          right: 0px
          top: 0px
          background: url(../../../static/img/btn_member.png) no-repeat center top
          width: 109px
          height: 35px
          cursor: pointer
        .member-add
          position: absolute
          right: 0px
          top: 0px
          background: url(../../../static/img/btn_member_add.png) no-repeat center top
          width: 109px
          height: 35px
          cursor: pointer
        .member-trial
          position: absolute
          right: 0px
          top: 0px
          background: url(../../../static/img/btn_member_trial.png) no-repeat center top
          width: 109px
          height: 35px
          cursor: pointer
          height: 235px
</style>