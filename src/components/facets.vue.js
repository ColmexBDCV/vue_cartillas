import facetModal from './facetModal.vue.js'
import filter_data from '../../functions.js'

export default {
    name: "facets",
    props: ["facets", "params", "type", "val", "label"],
    template: "#facetas",
    components:{
        'facetModal': facetModal
    },
    data: function(){
        return {
            facet_data: "",
		    facet_label: "",
		    facet_sort: "index",
		    acet_page: 1
        }
    },
    methods: {
        query(type, val, label) {
            var params = this.$store.getters['principal/url'].split("?");
            var urlParams = new URLSearchParams(this.$store.getters['principal/url'].split('?')[1]);
            if(!urlParams.has('f['+ type +'][]')){
                urlParams.set('f['+ type +'][]', val);
            } 
            else urlParams.append('f['+ type +'][]', val);

            this.$store.commit('principal/set_url', params[0] + "?" + urlParams.toString());
            //console.log("URL_FINAL_FACETS: " + this.$store.getters['principal/url']);
            this.get_data();
            this.$store.commit('filters/set_filter', {label, val, type});
		},
        delete_query: function (type, val, label) {
            this.$store.dispatch('filters/delete_query', {type, val, label});
		},
        get_data_facet(val) {
            this.facet_label = val
            //console.log("Facet URL: " + this.facet_url)
			axios.get(this.facet_url)
				.then(response => {

					this.facet_data = response.data.response.facets.items
					this.facet_page = response.data.response.facets.facet_page
					this.facet_sort = response.data.response.facets.sort
					this.$store.commit('principal/set_modalFacets', true);
                });
        },
        compare_params: function (type, val) {
            var response = false
            var urlParams = new URLSearchParams(this.$store.getters['principal/url'].split('?')[1]);
            urlParams.forEach(function(value, key) {
                if(key == 'f['+ type +'][]' && value == val)
                response = true;
            });

			return response
        },
        async get_data() {
            //alert("Facet");
            var tmp_url = this.$store.getters['principal/url'];
            await axios.get(tmp_url)
               .then(response => {
                   var repository = filter_data(response.data.response);
                   this.$store.commit('principal/set_repo', repository);
               });
       }   
    },
    computed:{
        facet_url() {
            var urlParams = new URLSearchParams(this.$store.getters['principal/url'].split('?')[1]);
            return this.$store.getters['principal/base_url'] + "catalog/facet/" + (this.facet_label == '' ? 'resource_type_sim': this.facet_label) + ".json?facet.page=" + this.facet_page + "&facet.sort=" + (this.facet_sort == 'index' ? 1 : this.facet_sort) + "&" + urlParams
        },
        showModal(){
			return this.$store.state.principal.modalFacets;
        },
        test_url(){
            return this.$store.getters['principal/base_url'];
        }
    },
    watch:{
        facet_label(){
            return this.facet_label
        }
    },
    mounted(){
        if(this.type){
            this.$store.commit('principal/set_repo', '');
            this.$store.getters['filters/filter'].forEach((data) => {
                var type = data.type;
                var val = data.value;
                var label = data.key;
                this.$store.dispatch('filters/delete_query_search', {type, val, label});
            });
            new Promise(resolve => setTimeout(this.query(this.type, this.val, this.label), 4000));
        }else{
            this.$store.dispatch('principal/get_data', this.$store.getters['principal/url']);
        }
    }
};