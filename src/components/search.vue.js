export default{
    name: 'search',
    template: '#search',
    props: ['keyword','pages'],
    data() {
        return {
            search: ""
        }
    },
    methods: {
        search_term() {
            var val = this.search;
            tmp_keyword = val;
            var params = this.$store.getters['principal/url'].split("?");
            var urlParams = new URLSearchParams(this.$store.getters['principal/url'].split('?')[1]);

            if (val != "") {        

                if(urlParams.has('q')){
                    //urlParams.set('search_field', 'all_fields');
                    urlParams.set('q', val);
                } 
                else {
                    urlParams.append('q',val);
                    urlParams.append('search_field', 'all_fields');
                }
                
                this.$store.commit('principal/set_url', params[0] + "?" + urlParams.toString());
                this.$store.dispatch('pages/next_page', 1);
            }else {
                urlParams.delete('search_field');
                urlParams.delete('q');
				this.$store.commit('principal/set_url', params[0] + "?" + urlParams.toString());
			}        
            
            this.$store.dispatch('principal/get_data');
            this.$router.push({ path: '/search' });
		}

    },
    mounted(){
        if(this.keyword){
            this.search = this.keyword;
            this.search_term();
        }
        if(tmp_keyword != ""){
            this.search = tmp_keyword;
            this.search_term();
        }
    }
}