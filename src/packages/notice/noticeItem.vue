<!--
 * @Description: 
 * @Author: Lao_c
 * @Date: 2020-04-15 16:12:28
 -->
<template>
    <transition :name="transitionName" appear>
        <div :class="[prefixCls + '-item']">
            <p>{{ name }}</p>
            <p>李总叼鸡婆</p>
            <p>刘董傻嗨嗨</p>
            <p>大厨憨啾啾</p>
        </div>
    </transition>
</template>

<script>
export default {
    name: '',
    props: {
        prefixCls: {
            type: String,
            default: 'prefixCls',
        },
        duration: {
            type: Number,
            default: 1.5,
        },
        name: {
            type: String,
            required: true,
        },
        onClose: {
            type: Function,
        },
    },
    data() {
        return {
            noticeTimer: null,
        }
    },

    components: {},

    computed: {
        transitionName() {
            return `${this.prefixCls}-move`
        },
    },

    beforeMount() {},

    mounted() {
        if (this.duration !== 0) {
            this.noticeTimer = setTimeout(() => {
                this.close()
            }, this.duration * 1000)
        }
    },

    methods: {
        clearCloseTimer() {
            if (this.closeTimer) {
                clearTimeout(this.closeTimer)
                this.closeTimer = null
            }
        },

        close() {
            this.clearCloseTimer()
            this.onClose()
            this.$parent.close(this.name)
        },
    },

    watch: {},
}
</script>
<style lang="scss" scoped>
@keyframes MoveNoticeIn {
    0% {
        opacity: 0;
        transform-origin: 0 0;
        transform: translateX(100%);
    }
    100% {
        opacity: 1;
        transform-origin: 0 0;
        transform: translateX(0%);
    }
}
@keyframes MoveNoticeOut {
    0% {
        transform-origin: 0 0;
        transform: translateX(0%);
        opacity: 1;
    }
    70% {
        transform-origin: 0 0;
        transform: translateX(100%);
        height: auto;
        opacity: 0;
    }
    100% {
        transform-origin: 0 0;
        transform: translateX(100%);
        height: 0;
        padding: 0;
        margin-bottom: 0;
        opacity: 0;
    }
}
.cui-notice-item {
    border: 1px solid #ccc;
    margin-bottom: 20px;
}
.cui-notice-move-enter-active,
.cui-notice-move-appear {
    opacity: 0;
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
}
.cui-notice-move-enter-active {
    animation-name: MoveNoticeIn;
    animation-play-state: running;
}
.cui-notice-move-leave-active {
    animation-duration: 0.3s;
    animation-name: MoveNoticeOut;
    animation-play-state: running;
}
</style>
