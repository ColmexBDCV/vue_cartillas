import ENV from '../../../config/.env.js'
import filter_data from '../../../functions.js'

export default {
    namespaced: true,
    state: {
        repo: '',
        base_url: ENV.BASE_URL,
        link_url: ENV.LINK_URL,
        share_url: ENV.SHARE_URL,
        url: ENV.THEMATIC_URL,
        video_url: ENV.VIDEO_URL,
        modalFacets: false,
    },
    mutations: {
        set_repo(state, repo) {
			state.repo = repo;
        },
        set_url(state, url){
            state.url = url;
        },
        set_modalFacets(state, value){
            state.modalFacets = value;
        }
    },
    getters: {
        repo(state){
            return state.repo
        },
        url(state){
            return state.url
        },
        modalFacets(state){
            return state.modalFacets
        },
        base_url(state){
            return state.base_url;
        },
        link_url(state){
            return state.link_url;
        },
        share_url(state){
            return state.share_url;
        },
        video_url(state){
            return state.video_url;
        }
    },
    actions: {
        async get_data({ state, commit },send_url) {
            //console.log(state.url);
            await axios.get(state.url)
               .then(response => {
                   var repository = filter_data(response.data.response);
                   commit('set_repo', repository);
               })
       }
    }
}