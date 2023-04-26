export default{
    name: 'headers',
    template: '#headers',
    props: ['keyword', 'pages', 'search_in', 'filter', 'is_page', 'json_data', 'is_home'],
    data() {
        return {
            search: "",
            lcl_keyword: this.keyword,
            lcl_search: this.search_in,
            lcl_filter: this.filter,
            json_fields: {},
            array_fields: [
                "all_fields",
                "title",
                "creator",
                "contributor",
                "sumary",
                "publisher",
                "year",
                "subject_work",
                "subject_person",
                "corporate_name",
                "subject",
                "geographic_coverage",
                "temporary_coverage",
                "thesis_advisor",
                "degree_program"
            ]
        }
    },
    methods: {
        search_term() {
            var val = this.search;
            this.tmp_keyword = val;
            var params = this.$store.getters['principal/url'].split("?");
            var urlParams = new URLSearchParams(this.$store.getters['principal/url'].split('?')[1]);
            if (val != "" || this.lcl_search == 'advanced') {
                if(this.lcl_search != "todo" & this.lcl_search != undefined){
                    if(this.lcl_search == 'advanced'){
                        for(let key in this.json_fields){
                            urlParams.append(key,this.json_fields[key]);
                        }
                    }else{
                        urlParams.append("op","AND");
                        urlParams.append(this.search_in,val);
                    }                   
                    urlParams.append("search_field","advanced");
                    urlParams.append("commit","Buscar");
                    this.lcl_search = "todo";
                    this.lcl_keyword = "";
                }else{
                    urlParams.delete('op');
                    //urlParams.delete(this.search_in);
                    for(let value in this.array_fields){
                        urlParams.delete(value);
                    }
                    urlParams.delete('commit');
                    urlParams.delete('search_field');
                    if(urlParams.has('q')){
                        //urlParams.set('search_field', 'all_fields');
                        urlParams.set('q', val);
                    } 
                    else {
                        urlParams.append('q',val);
                        urlParams.append('search_field', 'all_fields');
                    }
                }                
                this.$store.commit('principal/set_url', params[0] + "?" + urlParams.toString());
                console.log(this.$store.getters['principal/url']);
                this.$store.dispatch('pages/next_page', 1);
            }else {
                urlParams.delete('op');
                urlParams.delete(this.search_in);
                urlParams.delete('commit');
                urlParams.delete('search_field');
                urlParams.delete('q');
				this.$store.commit('principal/set_url', params[0] + "?" + urlParams.toString());
                //this.$router.push({ path: '/search' });
			}        
            
            this.$store.dispatch('principal/get_data');
            //this.$router.push({ path: '/search' });
		},
        clean_search(){
            this.search = "";
            this.search_term();
        },
        get_search(){
            if(this.is_page === 'true'){
                    this.$router.push('/search?keyword=' + this.search + '&filter=todo' + "&search_in=" + this.lcl_search);
            }else{
                this.search_term();
            }
        },
        reload(event){
            this.clean_search();
        }

    },
    mounted(){
        console.log(this.is_home);
        if(this.lcl_search == 'advanced'){
            var data = JSON.parse(this.json_data);
            this.json_fields = data.data;
            this.search_term();
        }        
        if(this.lcl_keyword){
            this.search = this.keyword;
            this.search_term();
        }
        /*if(this.tmp_keyword){
            this.search = this.tmp_keyword;
            this.search_term();
        }*/
        var options = {
            placement: 'bottom',
            html: true,
            title: "Buscar en:",
            trigger: 'focus',
            //html element
            //content: $("#popover-content")
            content: $('[data-name="popover-content"]')
            //Doing below won't work. Shows title only
            //content: $("#popover-content").html()

        }
        var exampleEl = document.getElementById('btn-advanced');
        var popover = new bootstrap.Popover(exampleEl, options);
        //const popover = bootstrap.Popover.getOrCreateInstance('#btn-advanced'); // Returns a Bootstrap popover instance
        /*const myPopover = document.getElementById('btn-advanced');
        const popover = bootstrap.Popover.getInstance(myPopover); // Returns a Bootstrap popover instance
        // setContent example
        popover.setContent({
            '.popover-header': 'another title',
            '.popover-body': $('[data-name="popover-content"]')
        });
        /*const popover = new bootstrap.Popover('.btn-advanced', {
            placement: 'bottom',
            html: true,
            content: $('[data-name="popover-content"]'),
          });*/
    }
}