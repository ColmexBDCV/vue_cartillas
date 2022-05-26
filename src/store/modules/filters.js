export default {
    namespaced: true,
    state: {
        filter: []
    },
    mutations: {
        set_filter(state, {label, val, type}){
            var filtertmp = {'key': label,  'value': val, 'type': type};
            state.filter.push(filtertmp);
        },
        delete_filter(state, {label, val}){
            state.filter = state.filter.filter((el) => {
                return el.key == label && el.value == val ? false : true;
            });
        }
    },
    getters: {
        filter(state){
            return state.filter;
        }
    },
    actions: {
        delete_query({state, rootState, commit, dispatch}, {type, val, label}){
            var params = rootState.principal.url.split("?");
            var urlParams = new URLSearchParams(rootState.principal.url.split('?')[1]);
            var urlParamsTmp = new URLSearchParams(urlParams.toString());
            urlParams.forEach(function(value, key) {
                if(key == 'f['+ type +'][]' && value == val)
                    urlParams.delete('f['+ type +'][]');
            });
            urlParamsTmp.forEach(function(value, key) {
                if(key == 'f['+ type +'][]' && value != val)
                    urlParams.append(key, value)
            });
            commit('principal/set_url', params[0] + "?" + urlParams.toString(), {root: true});
            dispatch('principal/get_data', null,{root: true});
            commit('delete_filter',{label, val});
        },
        delete_query_search({state, rootState, commit, dispatch}, {type, val, label}){
            var params = rootState.principal.url.split("?");
            var urlParams = new URLSearchParams(rootState.principal.url.split('?')[1]);
            var urlParamsTmp = new URLSearchParams(urlParams.toString());
            urlParams.forEach(function(value, key) {
                if(key == 'f['+ type +'][]' && value == val)
                    urlParams.delete('f['+ type +'][]');
            });
            urlParamsTmp.forEach(function(value, key) {
                if(key == 'f['+ type +'][]' && value != val)
                    urlParams.append(key, value)
            });
            commit('principal/set_url', params[0] + "?" + urlParams.toString(), {root: true});
            commit('delete_filter',{label, val});
        }
    }
}