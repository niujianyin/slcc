<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      scrollX: {
        type: Boolean,
        default: false
      },
      startX: {
        type: Number,
        default: 0
      },
      bounce: {
        type: Boolean,
        default: true
      },
      beforeScrollStartRefresh: {
        type: Boolean,
        default: false
      },
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        let self = this

        if (!self.$refs.wrapper) {
          return
        }


        let conf = {
          probeType: self.probeType,
          click: self.click,
          scrollX: self.scrollX,
          startX: self.startX,
          bounce: self.bounce
        }

        if (self.scrollX) {
          conf.eventPassthrough = 'vertical'
        }

        this.scroll = new BScroll(self.$refs.wrapper, conf)

        if (self.beforeScrollStartRefresh) {
          this.scroll.on('beforeScrollStart', () => {
            this.refresh()
        })
        }

        if (self.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            self.$emit('scroll', pos)
        })
        }

        if (self.pullup) {
          self.scroll.on('scrollEnd', () => {
            if (self.scroll.y <= (this.scroll.maxScrollY + 50)) {
            self.$emit('scrollToEnd')
          }
        })
        }

        if (self.beforeScroll) {
          self.scroll.on('beforeScrollStart', () => {
            self.$emit('beforeScroll')
        })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
