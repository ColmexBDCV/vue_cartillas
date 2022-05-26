import collection_list from './collection_list.vue.js'
export default{
    name: 'collections',
    template: '#collection',
    props: [],
    components:{
        'collection_list' : collection_list,
    },
    data() {
        return {
            search: "",
            collection: "todo",
            search_in: "all_fields",
            params: this.$store.getters['principal/url'].split("?"),
            urlParams: new URLSearchParams(this.$store.getters['principal/url'].split('?')[1]),
            collections: [],
        }
    },
    methods:{
        send_data(){
            //this.$router.push({name:'search', params: {'keyword': this.search}});
            this.$router.push('/search?keyword=' + this.search + '&filter=' + this.collection + "&search_in=" + this.search_in);
        },
        get_url(facet, facet_name){

            if(this.urlParams.has(facet)){
                this.urlParams.set(facet,facet_name);
            }else{
                this.urlParams.append(facet,facet_name);
            }
            //var data = this.get_data(this.params[0] + "?" + this.urlParams.toString());
            //console.log(data);
            return this.params[0] + "?" + this.urlParams.toString();

        },
        init_data() {            
            this.urlParams.delete('op');
            this.urlParams.delete(this.search_in);
            this.urlParams.delete('commit');
            this.urlParams.delete('search_field');
            this.urlParams.delete('q');
            this.$store.commit('principal/set_url', this.params[0] + "?" + this.urlParams.toString());
			this.$store.dispatch('principal/get_data', this.$store.getters['principal/url']);
		},
        get_facet(){
            var facets = this.$store.state.principal.repo;
            if(facets){
                var colecciones = [];
                for(const facet of facets.facets){
                    if(facet.name == "member_of_collections_ssim"){
                        for(const item of facet.items){
                            var coleccion={};
                            coleccion["nombre"] = item.value;
                            coleccion["url"] = this.get_url(facet.name, item.value);
                            colecciones.push(coleccion);
                        }
                    }
                }
                //console.log(this.collections);
            return colecciones;
            }
        }        
    },
    mounted(){

    },
    computed: {
		repo(){  
            this.get_facet();
            //console.log(arreglo);
			return this.$store.state.principal.repo;
        },
        collection(){
            return this.collection;
        }
	},
    created: function () {
		this.collections = this.init_data();
	},
}