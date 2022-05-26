export default {
    namespaced: true,
    state: {
        pagesArray: []
    },
    mutations: {
        set_pagesArray(state, new_array){
            state.pagesArray = new_array;
        }
    },
    getters: {
        pagesArray(state){
            return state.pagesArray;
        }
    },
    actions: {
        next_page({state, rootState, commit, rootCommit, dispatch}, num){
            var params = rootState.principal.url.split("?");

			if(params.length > 1){
				var urlParams = new URLSearchParams(rootState.principal.url.split('?')[1]);

				if(urlParams.has('page')) urlParams.set('page', num) 
				else urlParams.append('page',num);

                commit('principal/set_url', params[0] + "?" + urlParams.toString(), {root: true});
			}else{
				commit('principal/set_url', rootState.principal.url + "?page=" + num, {root: true});
            }            
            
            dispatch('principal/get_data', null, {root: true});
            
            //this.show_pages(num);
        }
    }
}