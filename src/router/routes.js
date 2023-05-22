import App from '../App.vue.js';
import Doc from '../Doc.vue.js';
import Video from '../Video.vue.js';
import Search from '../Search.vue.js';
import About from '../About.vue.js';
import Collection from '../components/collections.vue.js';
import Personas from '../components/personas.vue.js';
import Maps from '../components/maps.vue.js'
import Advanced from '../components/advanced.vue.js'

var routes = [
  {
    path: '/',
    component: App
  },
  {
    path: '/docs',
    component: Doc,
    props: (route) => ({  id: route.query.id, 
                          has_model: route.query.has_model, 
                          thumbnail: route.query.thumbnail, 
                          related: route.query.related, 
                          keyword: route.query.keyword,
                          back_maps: route.query.back_maps,
                        })
  },
  {
    path: '/videos',
    component: Video
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    props: (route) => ({  keyword: route.query.keyword, 
                          type: route.query.type, 
                          val: route.query.val, 
                          label: route.query.label,
                          search_in: route.query.search_in,
                          filter: route.query.filter,
                          json_data: route.query.json_data 
                        })
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/collections',
    name: 'collections',
    component: Collection
  },
  {
    path: '/personas',
    name: 'personas',
    component: Personas
  },
  {
    path: '/maps',
    name: 'maps',
    component: Maps
  },
  {
    path: '/advanced',
    name: 'advanced',
    component: Advanced
  },
  
]

var router = new VueRouter({
    routes: routes,
    base: '/'
});

export default router;
