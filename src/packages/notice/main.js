import Vue from 'vue'
import NoticeWrapper from './noticeWrapper.vue'
let NoticeConstructor = props => {
    return new Vue({
        render(h) {
            return h(NoticeWrapper, {
                props: props,
            })
        },
    })
}

NoticeWrapper.newInstance = function(options) {
    options = options || {}
    const Instance = NoticeConstructor(options)
    const component = Instance.$mount()
    document.body.appendChild(component.$el)

    const mainNoticeWrapper = Instance.$children[0]

    return {
        notice(noticeProps) {
            mainNoticeWrapper.add(noticeProps)
        },
        remove(name) {
            mainNoticeWrapper.remove(name)
        },
    }
}

export default NoticeWrapper
