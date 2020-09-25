import Vue from 'vue'
import App from './App'
// import './pluginUse.js';
import store from './store';
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()