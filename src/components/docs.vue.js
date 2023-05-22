import {field_filter} from '../../functions.js'

export default {
    name: 'docs',
    props: ['docs', 'keyword'],
    template: "#docs",
    data: function(){
        return{
            isMobile: false,
        }
    },
    methods: {
        get_url(){
            return this.$store.getters['principal/base_url']
        },
        check_metadata(metadata, key) {
            if (!field_filter(key))
                return false

            if (typeof metadata == "object")
                if (metadata == null || metadata.length < 1) {
                    return false
                }

            if (typeof metadata === "string")
                if (metadata == "") {
                    return false
                }


            return true
        },
        isObject(o) {
            //console.log("keyword: " + this.keyword);
            return typeof o == "object"
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