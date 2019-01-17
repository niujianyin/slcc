<template>
  <transition name="fade">
  <div class="relief-wrapper">
    <div class="mask"></div>
    <scroll @scroll="scroll"
            :listen-scroll="listenScroll" :probe-type="probeType" class="relief-content" ref="reliefContent">
      <div class="relief-box">
        <div class="relief-header">《新浪球通专家付费平台-用户使用协议及免责声明》</div>
        <div class="relief-main">
          <p class="relief-p">尊敬的用户，您好，欢迎使用新浪彩通旗下新浪球通专家付费阅读平台！为减少您在使用过程中可能会遇到的疑惑和困扰，请您务必认真阅读以下内容，并在充分理解和同意之后，再开启您的商品体验之旅。</p>
          <p class="relief-p"> 1、新浪球通专家付费阅读平台是基于专家对赛事、球队等方案积累的经验以及从技术角度进行分析从而提供购彩指导的平台。</p>
          <p class="relief-p"> 2、专家付费阅读的所有内容，仅代表专家个人的观点，不代表新浪球通平台的观点，且仅供用户主观参考，不应作为您在彩票等领域投资的客观依据。用户在接受预测服务后，须独立作出投资决策并自行承担风险。</p>
          <p class="relief-p"> 3、请您对自己的各类账号及密码严格保密，勿将个人资产交由其他人管理。因用户个人信息保管不当而导致的风险和损失将由用户自行承担。</p>
          <p class="relief-p"> 4、新浪球通付费阅读平台提供的产品和服务可能会受到各种网络安全和网络故障问题的困扰，诸如黑客攻击、计算机病毒困扰、系统崩溃、网络掉线、网速缓慢、程序漏洞等问题的威胁。对于上述困扰，我们将尽可能的采取相应措施维护您的合法权益。</p>
          <p class="relief-p"> 5、新浪球通付费阅读平台，享有所发布内容的知识产权，未经平台书面许可，用户不得对外传播或许可第三人使用服务的全部内容或部分内容。不得通过非官方技术手段获取内容，否则平台有权单方面解除服务关系并扣罚服务费。同时，平台保留最终诉诸法律、追偿损失的权利。</p>
          <p class="relief-p"> 6、除官方平台外，请勿轻信其他渠道提供的新浪球通付费阅读服务，由此造成的风险和损失将由用户自行承担。</p>
          <p class="relief-p"> 7、新浪球通专家付费阅读平台包括但不限于：足球、篮球等赛事的胜负、让分、大小分、亚盘等预测，用户在使用相应具体服务时，仍需同时遵守该项服务的具体服务协议。</p>
          <p class="relief-p"> 8、必要时，平台有权修改、变更协议内容。变更后的协议及规则自公布时生效。若您在任何修改、变更条款后继续使用平台服务，则视为已充分了解并同意最新协议；若您不同意部分或全部条款，请主动停止使用相关服务。</p>
          <p class="relief-p"> 9、如您已经使用新浪球通专家付费阅读的服务，则视为您本人已同意本协议以及相应的单项服务协议。</p>
          <p class="relief-p"> 感谢您使用新浪球通专家付费阅读平台，请您理性购彩，祝您早中大奖！</p>
        </div>
        <div class="relief-bottom"></div>
      </div>

      <div class="btn-close" @click="_close()"><i class="el-message-box__close el-icon-close"></i></div>
    </scroll>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {baseMixin} from 'common/js/mixin'
  import Scroll from 'base/scroll/scroll'
  import {viewData} from 'common/js/util'

  export default {
    mixins: [baseMixin],
    data() {
      return {
        scrollY: 0
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      let self = this
      self._calculating()
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y
      },
      _close() {
        let self = this
        self.$emit('close')
      },
      _calculating() {
        let self = this
        let rc = self.$refs.reliefContent
        let vd = viewData()
        let height = vd.viewHeight-300

        if(height < 300){ height = 300}

        $(rc.$el).css({'height':  height+ 'px','marginTop': -height/2 + 'px'})
        rc.refresh()
      }
    },
    watch: {
      scrollY(newVal) {
      }
    },
    components: {
      Scroll
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .fade-enter-active, .fade-leave-active
    transition: opacity .3s
  .fade-enter, .fade-leave-to
    opacity: 0
  .relief-wrapper
    overflow: hidden
    .mask
      position: absolute
      position: fixed
      top: 0
      left: 0
      z-index: 1001
      width: 100%
      height: 100%
      background-color: #000
      opacity: .2
    .relief-content
      z-index: 1002
      background-color: #fff
      position: absolute
      top: 50%
      left: 50%
      width: 700px
      padding: 30px
      margin-left: -350px
      margin-top: -250px
      height: 500px
      border-radius: 8px
      overflow: hidden
      .relief-header
        font-size: 16px
        font-weight: 700
        line-height: 40px
        text-align: center
      .relief-main
        padding-top: 20px
        .relief-p
          font-size: 14px
          line-height: 30px
          text-align: justify
      .relief-bottom
        height: 50px
      .btn-close
        position: absolute
        right: 20px
        top: 20px
        width: 30px
        height: 30px
        cursor: pointer
        i
          position: absolute
          left: 50%
          top: 50%
          margin: -5px 0 0 -5px
</style>