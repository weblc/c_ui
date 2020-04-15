import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Message from '@/packages/message/index'
import Notice from '@/packages/notice/index'

Vue.prototype.$message = Message
Vue.prototype.$notice = Notice
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
