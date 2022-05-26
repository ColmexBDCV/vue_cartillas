export default{
    name: 'languaje',
    template: '#languaje',
    data(){
        return {

        }
    },
    methods:{
        changeLang(lang){
            this.$i18n.locale = lang;
        }
    },
    computed:{

    },
    watch:{
        
    }
}