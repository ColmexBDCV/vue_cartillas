
import routes from '/wp-content/plugins/wp-vue-bdcv/src/router/routes.js'
import App from '/wp-content/plugins/wp-vue-bdcv/src/App.vue.js'
import Doc from '/wp-content/plugins/wp-vue-bdcv/src/Doc.vue.js'
import Video from '/wp-content/plugins/wp-vue-bdcv/src/Video.vue.js'
import languaje from '/wp-content/plugins/wp-vue-bdcv/src/components/languajes.vue.js'
import { store } from '/wp-content/plugins/wp-vue-bdcv/src/store/store.js'
import { i18n } from '/wp-content/plugins/wp-vue-bdcv/src/plugins/i18n.js'

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.config.debug = false;

var app = new Vue({
	el: '#app',
	store,
	i18n,
	router:routes,
	components: {
		'App': App,
		'Doc': Doc,
		'Video': Video,
		'languaje': languaje	
	}
})
