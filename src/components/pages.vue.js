export default{
    name: 'pages',
    props: ['pages', 'total'],
    template: "#pages",
    data() {
        return {
            pagesArray: []
        }
    },
    methods: {
        isCurrent: function (index) {
            return index == this.pages.current_page ? 'active' : '';
        },
        show_pages: function (current_page) {
            var start = current_page == 1 ? 1 : (current_page - this.pagesArray[0]) >= 4 ? this.pagesArray[0] + 2 : this.pagesArray[0];
            start = start != 1 && this.pagesArray[0] == current_page ? this.pagesArray[0] - 2 : start;
            var end = this.pages.total_pages >= (start + 10) ? (start + 10) : this.pages.total_pages;
            this.pagesArray = [];
            for (var i = start; i < end; i++) this.pagesArray.push(i);
            this.$store.commit('pages/set_pagesArray', this.pagesArray);
            return this.pagesArray;
        },
        next_page(num){
			this.$store.dispatch('pages/next_page',num);
        }
    },
    watch: {
        total: function(){
            this.show_pages(1)
        }
    },
    computed:{
        get_pages(){
            this.show_pages(this.$store.getters['principal/repo'].pages.current_page);
            return this.pagesArray;
        },
        url(){
            return this.$store.getters['principal/url'];
        }
    },
    mounted(){
        /*this.$root.$on('next_page',(num) => {
            this.next_page(num);
        });*/
    }
}