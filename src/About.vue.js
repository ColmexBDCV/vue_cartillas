import headers from './components/headers.vue.js'
export default{
    name: 'about',
    template: '#about',
    components:{
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