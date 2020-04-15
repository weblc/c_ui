<template>
    <transition name="c-message-fade" @after-leave="handleAfterLeave">
        <div :class="['c-message', type ? `c-message-${type}` : '']" v-show="visible">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-success"></use>
            </svg>
            <span>{{ message }}</span>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'message',
    props: [''],
    data() {
        return {
            visible: false,
            message: '',
            duration: 3000,
            type: 'info',
            iconClass: '',
            customClass: '',
            onClose: null,
            showClose: false,
            closed: false,
            verticalOffset: 20,
            timer: null,
            center: false,
        }
    },

    components: {},

    computed: {
        positionStyle() {
            return {
                top: `${this.verticalOffset}px`,
            }
        },
    },
    watch: {
        closed(newVal) {
            if (newVal) {
                this.visible = false
            }
        },
    },
    methods: {
        handleAfterLeave() {
            this.$destroy(true)
            this.$el.parentNode.removeChild(this.$el)
        },

        close() {
            this.closed = true
            if (typeof this.onClose === 'function') {
                this.onClose(this)
            }
        },
        startTimer() {
            if (this.duration > 0) {
                this.timer = setTimeout(() => {
                    if (!this.closed) {
                        this.close()
                    }
                }, this.duration)
            }
        },
        keydown(e) {
            if (e.keyCode === 27) {
                // esc关闭消息
                if (!this.closed) {
                    this.close()
                }
            }
        },
    },
    mounted() {
        this.visible = true
        this.startTimer()
        document.addEventListener('keydown', this.keydown)
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.keydown)
    },
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
