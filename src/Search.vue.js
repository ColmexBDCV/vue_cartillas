import search from './components/search.vue.js'
import facets from './components/facets.vue.js'
import docs from './components/docs.vue.js'
import pages from './components/pages.vue.js'
import helperbar from './components/helperbar.vue.js'
import headers from './components/headers.vue.js'

export default{
    name: 'Searchs',
    template: '#searchview',
	props: ['keyword', 'type', 'val', 'label', 'search_in', 'filter', 'json_data'],
	components: {
		'facets': facets,
		'docs': docs,
		'pages': pages,
		'helperbar': helperbar,
		'headers': headers,
	},
	data: function(){
		return{

		} 
	},
	computed: {
		repo(){
			return this.$store.state.principal.repo;
		},
		total_count(){
			return this.repo.pages;
		}
	},
	created: function () {
		//this.get_data();
	},
	methods: {
		get_data() {
			//alert("Search");
			this.$store.dispatch('principal/get_data', this.$store.getters['principal/url']);
		}
	},
}