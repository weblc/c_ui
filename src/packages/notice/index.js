import Notice from './main'

const prefixCls = 'cui-notice'
let noticeItemKey = 'cui_notice_'
let top = '24px'
let defaultDuration = 3.5
let name = 1
let noticeWrapper
const notice = (type, options) => {
    const onClose = options.onClose || function() {}
    const title = options.title || 'title'
    const date = options.date || ''
    const content = options.content || ''
    let nameKey = options.name || `${noticeItemKey}${name}`

    name++
    noticeWrapper =
        noticeWrapper ||
        Notice.newInstance({
            prefixCls: prefixCls,
            styles: {
                top: top,
                right: 0,
            },
            ...options,
        })
    noticeWrapper.notice({
        type: 'normal',
        duration: defaultDuration,
        name: nameKey,
        onClose: onClose,
        title:title,
        date:date,
        content:content,
    })
}

export default {
    open(options) {
        return notice('normal', options)
    },
}
