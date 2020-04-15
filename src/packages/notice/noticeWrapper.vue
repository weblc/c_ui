<template>
    <div :class="prefixCls" :style="wrapStyles">
        <Item v-for="notice in notices" :key="notice.name" 
        :title="notice.title"
        :date="notice.date"
        :content="notice.content"
        :prefixCls="prefixCls" :duration="notice.duration" :name="notice.name" :onClose="notice.onClose">
        </Item>
    </div>
</template>

<script>
import Item from './noticeItem'

export default {
    name: '',
    props: {
        styles: {
            type: Object,
            default: function() {
                return {
                    top: '65px',
                    left: '50%',
                }
            },
        },
        prefixCls: {
            type: String,
            default: 'prefixCls',
        },
    },
    data() {
        return {
            notices: [],
        }
    },

    components: { Item },

    computed: {
        wrapStyles() {
            let styles = Object.assign({}, this.styles)
            styles['z-index'] = 1010 + this.tIndex
            return styles
        },
    },

    beforeMount() {},

    mounted() {},

    methods: {
        add(notice) {
            let _notice = Object.assign(
                {
                    content: '',
                    duration: 1.5,
                    closable: false,
                },
                notice
            )

            this.notices.push(_notice)
        },
        close(name) {
            console.log(name)
            const notices = this.notices
            for (let i = 0; i < notices.length; i++) {
                if (notices[i].name === name) {
                    this.notices.splice(i, 1)
                    break
                }
            }
        },
        closeAll() {
            this.notices = []
        },
    },
}
</script>
<style lang="scss" scoped>
.cui-notice {
    right: 0;
    top: 24px;
    position: fixed;
    width: 335px;
    margin-right: 24px;
}
</style>
