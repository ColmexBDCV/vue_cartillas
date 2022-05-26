
import routes from './router/routes.js'
import App from './App.vue.js'
import Doc from './Doc.vue.js'
import Video from './Video.vue.js'
import Search from './Search.vue.js'
import Maps from './components/maps.vue.js'
import languaje from './components/languajes.vue.js'
import { store } from './store/store.js'
import { i18n } from './plugins/i18n.js'

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
		'Video':Video,
		'Searchs': Search,
		'languaje': languaje,
		'Maps': Maps
	}
})