<template>
  <button :class="classes" @click="handleClick">
      <span v-if="showSlot" ref="slot"><slot></slot></span>
  </button>
</template>

<script>
    const prefixCls = 'c-btn'
    export default {
        name: '',
        props: {
            type: {
                validator (value) {
                    return ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'ghost', 'error'].indexOf(value) !== -1
                },
                default: 'default'
            }
        },
        data () {
            return {
                showSlot: true
            }
        },

        components: {},

        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-${this.type}`,
                    {
                        [`${prefixCls}-long`]: this.long,
                        [`${prefixCls}-${this.shape}`]: !!this.shape,
                        [`${prefixCls}-${this.size}`]: this.size !== 'default',
                        [`${prefixCls}-loading`]: this.loading != null && this.loading,
                        [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || !!this.customIcon || this.loading),
                        [`${prefixCls}-ghost`]: this.ghost
                    }
                ]
            }
        },

        beforeMount () {},

        mounted () {
            this.showSlot = this.$slots.default !== undefined
        },

        methods: {
            handleClick (evt) {
                this.$emit('click', evt)
            }
        },

        watch: {}

    }

</script>
<style lang="scss" type="text/scss" scoped>
 @import './index.scss'
</style>
