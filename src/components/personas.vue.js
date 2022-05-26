import headers from './headers.vue.js'
export default{
    name: 'personas',
    template: '#personas',
    components: {
        'headers': headers,
    },
    data() {
        return {
            search: "",
            collection: "todo",
            search_in: "all_fields",
        }
    },
    methods:{
        send_data(){

            //this.$router.push({name:'search', params: {'keyword': this.search}});
            this.$router.push('/search?keyword=' + this.search + '&filter=' + this.collection + "&search_in=" + this.search_in);
        },
    }
}