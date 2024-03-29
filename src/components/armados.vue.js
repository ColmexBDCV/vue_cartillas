import mapsVue from "./maps.vue";

export default{
    name: 'armados',
    template: '#mainarmados',
    components: {
        'maps': mapsVue,
    }, 
    props: [],
    data() {
        return {
            search: "",
            collection: "todo",
            search_in: "all_fields",
            show: false,
            isMobile: false,
        }
    },
    methods:{
        send_data(){
            //this.$router.push({name:'search', params: {'keyword': this.search}});
            if(this.collection === "todo"){
                this.$router.push('/search?keyword=' + this.search + '&filter=' + this.collection);
            }else{
                this.$router.push('/search?keyword=' + this.search + '&filter=' + this.collection + "&search_in=" + this.search_in);
            }
        },
        mediasize() {
            this.isMobile = window.matchMedia('(max-width: 768px)').matches
            ? true : false;
            console.log("Mobile: " + this.isMobile);
        }
    },
    mounted(){
        this.mediasize();
    }
}