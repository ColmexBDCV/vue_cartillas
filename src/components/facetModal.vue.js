export default{
    name: 'facetModal',
    template: '#modal-template',
	props:['facet_data','facet_label', 'facet_url'],
	data() { 
		return {
			isPrev: false,
			isNext: false,
			url_next: "",
			url_prev:"",
			data_local: "",
			url_local: ""
		}
	},
	created: function(){
		this.data_local =  this.facet_data;
		this.url_local = this.facet_url;
		//console.log("Modal Facet: " + this.url_local);
		this.check_next();
	},
	methods:{
		modal_facets_close(){
			this.$store.commit('principal/set_modalFacets', false);
		},
		query(value, label){
			this.$emit('query', this.facet_label, value, label);
			this.modal_facets_close();
		},
		consult_page(url_tmp, key){
			axios.get(url_tmp)
				.then(response =>{
					this.resolve_response(response.data.response, key);
            });
		},
		check_next(){
			var params = this.url_local.split("?");
			var urlParams = new URLSearchParams(this.url_local.split("?")[1]);
			
			var page = urlParams.get('facet.page');

			urlParams.set('facet.page', page == 'undefined' ? 2 : Number(page) + 1);
			this.url_next = params[0] + '?' + urlParams.toString();
			this.consult_page(params[0] + '?' + urlParams.toString(),'check_next');
								
		},
		check_prev(){
			var params = this.url_local.split("?");
			var urlParams = new URLSearchParams(this.url_local.split("?")[1]);
			
			var page = urlParams.get('facet.page');

			urlParams.set('facet.page', page == 'undefined' ? 1 : Number(page) - 1);
			this.url_prev = params[0] + '?' + urlParams.toString();
			this.consult_page(params[0] + '?' + urlParams.toString(), 'check_prev');
		},
		next_page(){
			this.url_local = this.url_next;
			this.consult_page(this.url_local, 'next');
		},
		prev_page(){
			this.url_local = this.url_prev;
			this.consult_page(this.url_local, 'prev');
		},
		resolve_response(data, key){
			switch(key){
				case 'check_next': 
					this.isNext = data.facets.items.length > 0 ? true : false;
					break;
				case 'check_prev':
					this.isPrev = data.facets.items.length > 0 && data.facets.offset >= 0? true : false;
					break;
				case 'next':
					this.data_local = data.facets.items;
					this.check_next();
					this.check_prev();
					break;
				case 'prev':
					this.data_local = data.facets.items;
					this.check_next();
					this.check_prev();
					break;
			}
		},		
	},
	computed:{
		label_title(){
			return remove_solr_sufix(this.facet_label);
		}
	},
	watch:{
		isNext(){
			return this.isNext;
		},
		isPrev(){
			return this.isPrev;
		},
		data_local(){
			return this.data_local;
		}
	}

}