export default{
    name: 'collection_list',
    template: '#collection-list',
    props: ['collections'],
    data(){
        return{
            object_docs: [],
        }       
    },
    methods:{
        async get_data() {
            var urls = [];
            for(const collection of this.collections){
                urls.push(axios.get(collection.url));
            }

            await Promise.all(urls)
            .then(response => {
                //var repository = filter_data(response.data.response);
                for(const res in response){
                    var collection = this.collections[res];
                    var repository = filter_data(response[res].data.response);
                    collection["docs"] = repository.docs;                    
                }
                //return this.collections;

            });
       },
    },
    computed:{
        collections(){
            return this.collections;
        }
    },
    mounted(){
        this.get_data();
    }
}