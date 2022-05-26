import models from './utils/models.js'
export default{
    name: 'Video',
    template: '#videoview',
    computed: {
		repo(){
			return this.$store.state.principal.repo;
		}		
	},
	created: function () {
		this.get_data();
	},
	methods: {
		get_data() {
			this.$store.dispatch('principal/get_data', this.$store.getters['principal/video_url']);
        },
        get_url(){
            return this.$store.getters['principal/base_url']
        }
	},
}