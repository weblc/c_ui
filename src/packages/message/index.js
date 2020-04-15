import Vue from 'vue'
import Main from './components/index'
let MessageConstructor = Vue.extend(Main)

let instance
let instances = []
let baseIndex = 2088
const Message = function(options) {
    let id = 'message-' + baseIndex++
    options = options || {}
    if (typeof options === 'string') {
        options = {
            message: options,
        }
    }
    let userOnClose = options.onClose
    options.onClose = function() {
        Message.close(id, userOnClose)
    }
    instance = new MessageConstructor({
        data: options,
    })
    instance.id = id
    instance.$mount()
    document.body.appendChild(instance.$el)
    instance.$el.style.zIndex = baseIndex + 1
    instances.push(instance)

    return instance
}

;['success', 'warning', 'info', 'error'].forEach(type => {
    Message[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options,
            }
        }
        options.type = type
        return Message(options)
    }
})

Message.close = function(id, userOnClose) {
    let len = instances.length
    for (let i = 0; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i])
            }
            instances.splice(i, 1)
            break
        }
    }
}

Message.closeAll = function() {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close()
    }
}

export default Message
