<template>
    <div @mouseenter="handleShowPopper" @mouseleave="handleClosePopper" :class="[prefixCls]">
        <div :class="[prefixCls]" ref="reference">
            <slot></slot>
        </div>
        <transition name="fade">
            <div
                :class="[prefixCls + '-popper', prefixCls + '-' + theme]"
                ref="popper"
                v-show="!disabled && (visible || always)"
                :style="dropStyles"
                :data-transfer="transfer"
                @mouseenter="handleShowPopper"
                @mouseleave="handleClosePopper"
                v-transfer-dom
            >
                <div :class="[prefixCls + '-content']">
                    <div :class="[prefixCls + '-arrow']"></div>
                    <div :class="innerClasses">
                        <slot name="content">{{ content }}</slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Popper from '@/mixins/popper'
import TransferDom from '@/directives/transfer-dom'
import { transferIndex, transferIncrease } from '@/utils/transfer-queue'
export default {
    name: '',
    directives: {
        TransferDom,
    },
    props: {
        placement: {
            validator(value) {
                return (
                    [
                        'top',
                        'top-start',
                        'top-end',
                        'bottom',
                        'bottom-start',
                        'bottom-end',
                        'left',
                        'left-start',
                        'left-end',
                        'right',
                        'right-start',
                        'right-end',
                    ].indexOf(value) !== -1
                )
            },
            default: 'bottom',
        },
        delay: {
            type: Number,
            default: 100,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        always: {
            type: Boolean,
            default: false,
        },
        transfer: {
            type: Boolean,
            default: false,
        },
        content: {
            type: [String, Number],
            default: '',
        },
        theme: {
            validator(value) {
                return ['dark', 'light'].indexOf(value) !== -1
            },
            default: 'dark',
        },
    },
    mixins: [Popper],
    data() {
        return {
            prefixCls: 'c-tooltip',
            tIndex: this.handleGetIndex(),
        }
    },

    components: {},

    computed: {
        dropStyles() {
            let styles = {}
            if (this.transfer) styles['z-index'] = 1060 + this.tIndex
            return styles
        },
        innerClasses() {
            return [
                `${this.prefixCls}-inner`,
                {
                    [`${this.prefixCls}-inner-with-width`]: !!this.maxWidth,
                },
            ]
        },
    },

    beforeMount() {},

    mounted() {
        if (this.always) {
            this.updatePopper()
        }
    },

    methods: {
        handleShowPopper() {
            if (this.timeout) clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.visible = true
            }, this.delay)
            this.tIndex = this.handleGetIndex()
        },
        handleClosePopper() {
            if (this.timeout) {
                clearTimeout(this.timeout)
                if (!this.controlled) {
                    this.timeout = setTimeout(() => {
                        this.visible = false
                    }, 100)
                }
            }
        },
        handleGetIndex() {
            transferIncrease()
            return transferIndex
        },
    },

    watch: {},
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
