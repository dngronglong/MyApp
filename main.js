import Vue from 'vue'
import App from './App'

import Global from 'common/global'
import http from 'common/request'
import uView from "uview-ui";

Vue.use(uView);
Vue.config.productionTip = false

Vue.prototype.$Global=Global
Vue.prototype.$http=http

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
