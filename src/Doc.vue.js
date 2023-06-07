import models from './utils/models.js'
import headers from './components/headers.vue.js'
import {article_filter,openPDF, read_pdfid, newCopyClipboard} from '../functions.js'

export default{
    name: 'Doc',
    template: '#docview',
    props: ['id','has_model', 'thumbnail', 'related', 'keyword', 'back_maps'],
    data: function(){
        return {
            url_doc: this.$store.getters['principal/base_url']+'concern/',
            url_file: this.$store.getters['principal/base_url']+'concern/',
            doc: '',
            doc_prop: '',
            tmp_url: '',
            geonames_data: '',
            search_in: "all_fields",
            search: "",
            url_geonames: 'https://secure.geonames.org/getJSON?username=ecisneros&geonameId=',
            pdf_active: this.related != undefined ? true: false,
            url_share: this.$store.getters['principal/share_url'] + '?id=' + this.id + '&has_model=' + this.has_model + '&thumbnail=' + this.thumbnail + '&related=' + this.related,
        }
    },
	components: {
        'headers': headers,
	},
	watch: {
        doc(){
            this.get_coords();
            return this.doc;            
        },
        doc_prop(){
            return this.doc_prop;
        },
        geonames_data(){
            this.init_map();
            return this.geonames_data;
        }
	},
	created: function () {
        //alert(this.back_maps);

        this.url_file = this.url_file + 'parent/' + this.id + '/file_sets/' + this.related + '.json';
        this.url_doc = this.url_doc + models.types[this.has_model] + '/' + this.id + '.json';
        this.get_data();
    },
    /*mounted: function () {
        this.$nextTick(function () {
            alert();
            openPDF(this.related);
        })
    },*/
	methods: {
        async get_coords(){
            var based_near = this.doc.based_near;
            var split_url = based_near[0].id.split("/");
            var id = split_url[split_url.length-2];
            await axios.get(this.url_geonames+id)
                .then(response => {
                    this.geonames_data = response.data
            })
        },
        async get_data() {
            await axios.get(this.url_doc)
                .then(response => {
                    this.doc = response.data
            }),
            await axios.get(this.url_file)
                .then(response => {
                    this.doc_prop = response.data
            })
        },
        filter_key(metadata, key){
            if(!article_filter(key))
                return false;

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
        split_content(m){
            var contents = m.split("--");
            return contents;
        },
        get_url(){
            return this.$store.getters['principal/base_url']
        },
        get_share_url(){
            this.tmp_url = this.url_share.replace("&", "%26");
            return this.tmp_url.replace("#", "%23");
        },
        read_idpdf(){
            read_pdfid();
        },
        copyClipboard () {
            newCopyClipboard();
        },
        init_map(){
            var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
            var mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWNpc25lcm9zIiwiYSI6ImNsZ2I4OGZsNjA0Y2YzbXMxYzQxb3pvaGgifQ.Dw_N62BZTbOynrGXwmLEpQ';
            
            var grayscale = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
	        var streets = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
            var satellite = L.tileLayer(mbUrl, {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

            this.map = L.map('maps', {
                center: [23, -102],
                zoom: 5,
                layers: [satellite]
            });
            var baseLayers = {
                'Grayscale': grayscale,
                'Streets': streets,
                'Satellite': satellite
            };
            var layerControl = L.control.layers(baseLayers).addTo(this.map);
            
            /*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributor',    
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
            }).addTo(this.map);*/

            var marker = L.marker([this.geonames_data.lat, this.geonames_data.lng]).addTo(this.map);
            marker.bindPopup('<a href="./#/search?type=based_near_label_sim&amp;val='+ this.geonames_data.name +'&amp;label=Ubicación">'+this.geonames_data.name + ", " + this.geonames_data.adminName2 + ", " + this.geonames_data.adminName1 + '</a>').openPopup();
        },
	},
}