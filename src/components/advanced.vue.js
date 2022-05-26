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
        }
    },
    methods:{
        send_data(){

            //this.$router.push({name:'search', params: {'keyword': this.search}});
            this.$router.push('/search?keyword=' + this.search + '&filter=' + this.collection + "&search_in=" + this.search_in);
        },
    }
}