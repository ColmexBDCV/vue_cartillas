import search from './components/search.vue.js'
import facets from './components/facets.vue.js'
import docs from './components/docs.vue.js'
import pages from './components/pages.vue.js'
import helperbar from './components/helperbar.vue.js'
import armados from './components/armados.vue.js'
import headers from './components/headers.vue.js'

export default{
    name: 'App',
    template: '#home',
	data: function(){
		return{
			keyword: '',
			filter: '',
			search_in: ''
		}
	},
	components: {
		'search': search,
		'facets': facets,
		'docs': docs,
		'pages': pages,
		'helperbar': helperbar,
		'armados': armados,
		'headers': headers
	},
	computed: {
		repo(){
			return this.$store.state.principal.repo;
		}		
	},
	created: function () {
		this.get_data();
	},
	methods: {
		get_data() {
			this.$store.dispatch('principal/get_data', this.$store.getters['principal/url']);
		}
	},
}