
import init from './modules/init.js'
import pages from './modules/pages.js'
import filters from './modules/filters.js'

export const store = new Vuex.Store({
	modules: {
        principal: init,
        pages: pages,
        filters: filters
    }
  })