<template>
  <div id="app">
    <m-header navIdx="3"></m-header>
    <div class="content clearfix" id="content">
      <info></info>
    </div>

    <toast-alert></toast-alert>
    <toast-vip></toast-vip>
  </div>
</template>

<script type="text/ecmascript-6">
  let util = window.util || {}
  let $ = window.$

  import {baseMixin} from 'common/js/mixin'

  import Vue from 'vue'
  import MHeader from 'components/m-header/m-header'
  import Info from 'components/algorithm/info'
  import ToastAlert from 'components/algorithm/toast-alert'
  import ToastVip from 'components/algorithm/toast-vip'

  export default {
    name: 'App',
    mixins: [baseMixin],
    data() {
      return {

      }
    },
    mounted() {
      let self = this
      self.calculate()
    },
    methods: {
      calculate: function() {
        let vd = util.viewData();
        let height = vd.viewHeight - 135 - 240;

        if (height > 0) {
          let $container = $('#content')
          $container.css({'minHeight': height + 'px'})
        }
      }
    },
    components: {
      MHeader,
      Info,
      ToastAlert,
      ToastVip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
</style>
