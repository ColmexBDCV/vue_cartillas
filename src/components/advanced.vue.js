import headers from './headers.vue.js'
export default{
    name: 'advanced',
    template: '#advanced',
    components: {
        'headers': headers,
    },
    data() {
        return {
            search: "",
            collection: "todo",
            search_in: "all_fields",
            all_fields: "",
            title: "",
            author: "",
            contributor: "",
            sumary: "",
            publisher: "",
            year: "",
            subject_work: "",
            subject_person: "",
            corporate_name: "",
            subject: "",
            geographic_coverage: "",
            temporary_coverage: "",
            thesis_advisor: "",
            degree_program: "",
            search_type:"OR",
        }
    },
    methods:{
        send_data(){

            //this.$router.push({name:'search', params: {'keyword': this.search}});
            this.$router.push('/search?keyword=' + this.search + '&filter=' + this.collection + "&search_in=" + this.search_in);
        },
        create_json(){
            let json_data = {
                "data":{
                    "all_fields": this.all_fields,
                    "title": this.title,
                    "creator": this.author,
                    "contributor": this.contributor,
                    "description": this.sumary,
                    "publisher": this.publisher,
                    "f[date_created_sim][]": this.year,
                    "subject_work": this.subject_work,
                    "subject_person": this.subject_person,
                    "subject_corporate": this.corporate_name,
                    "subject": this.subject,
                    "geographic_coverage": this.geographic_coverage,
                    "temporary_coverage": this.temporary_coverage,
                    "director": this.thesis_advisor,
                    "degree_program": this.degree_program,
                    "op": this.search_type,
                }                
            }
            return json_data;
        },
        search_advanced(){
            this.$router.push('/search?keyword=' + this.search + '&filter=' + this.collection + "&search_in=advanced&json_data=" + JSON.stringify(this.create_json()));
        }
    }
}