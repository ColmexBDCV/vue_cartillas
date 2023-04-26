import headers from './headers.vue.js'

export default{
    name: 'maps',
    template: '#maps',
    components: {
        'headers': headers,
    }, 
    data() {
        return {
            maps: null,
            mapCenter: {lat: 18.854234053791064, lng: -98.94548192051907},
            search_in: "all_fields",
            search: "",
            collection: "todo",
            api_data: '',
            data_markers: [],
            visible: true,
            //markers: L.layerGroup(),
            markers: L.markerClusterGroup({
                spiderfyOnMaxZoom: true,
                showCoverageOnHover: true,
                zoomToBoundsOnClick: false,
                disableClusteringAtZoom: 10,
                maxClusterRadius: 0
            }),
            map: null,
            url_api: 'https://repositorio.colmex.mx/all_coordinates?query=thematic_collection_tesim:%22Cart%C3%ADllas+ind%C3%ADgenas+ILV%22&fields=id,title_tesim,has_model_ssim,thumbnail_path_ss,hasRelatedMediaFragment_ssim',
        }
    },
    watch:{
        api_data(){
            this.get_coords();
            return this.api_data;
        }
    },
    methods:{
        init_map(){
            var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
            var mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWNpc25lcm9zIiwiYSI6ImNsZ2I4OGZsNjA0Y2YzbXMxYzQxb3pvaGgifQ.Dw_N62BZTbOynrGXwmLEpQ';
            
            var satellite = L.tileLayer(mbUrl, {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
            var grayscale = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
	        var streets = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

            this.map = L.map('maps', {
                center: [23, -102],
                zoom: 5,
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: 'topleft'
                },
                layers: [satellite]
            });
            var baseLayers = {
                'Satellite': satellite,
                'Grayscale': grayscale,
                'Streets': streets,                
            };
            var layerControl = L.control.layers(baseLayers).addTo(this.map);
            /*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributor',    
                maxZoom: 16,
                id: 'mapbox/satellite-v9',
                tileSize: 512,
                zoomOffset: -1,
            }).addTo(this.map);*/

            this.get_data();
        },
        set_marker(){
            var marker = L.marker([18.9261, -99.23075]).addTo(this.map);
            /*const markers = new google.maps.Marker({
                position: point,
                map: this.maps
            })*/
        },
        get_coords(){
            /*var markers = L.markerClusterGroup({
                spiderfyOnMaxZoom: true,
                showCoverageOnHover: false,
                zoomToBoundsOnClick: true,
                disableClusteringAtZoom: true
            });*/

            for(var i=0; i < this.api_data.length; i++){
                var elemento = this.api_data[i];                
                var coordinates = elemento.based_near_coordinates_tesim;
                for(var j=0; j < coordinates.length; j++){
                    var json_data = {};
                    var coords = coordinates[j].split('|');
                    var marker = L.marker(new L.LatLng(coords[0], coords[1]));
                    //var marker = L.marker([coords.lat, coords.lng]).addTo(this.map);
                    marker.bindPopup('<a href="#/docs?id='+ elemento.id +'&amp;has_model='+ elemento.has_model_ssim[0] +'&amp;thumbnail='+ elemento.thumbnail_path_ss +'&amp;related='+ elemento.hasRelatedMediaFragment_ssim[0] +'&amp;back_maps=true">' + elemento.title_tesim[0] + '</a>', {
                        closeButton: false
                    }).openPopup();
                    this.markers.addLayer(marker);
                    json_data.name = elemento.title_tesim[0];
                    json_data.id_marker = this.markers.getLayerId(marker);
                    this.data_markers.push(json_data);
                }
            }
            //this.markers.addTo(this.map);
            this.visible= false; 
            this.create_list();
            this.map.addLayer(this.markers);
            /*this.api_data.forEach(function(elemento, indice, array) {
                var coordinates = elemento.coordinates;
                coordinates.forEach(function(coords, indice, array){
                    var marker = L.marker([coords.lat, coords.lng]).addTo(this.map);
                    //marker.bindPopup(elemento.title_tesim).openPopup();
                    //this.set_marker();
                });
            });*/
        },
        show_popup(data) {
            var marker_id = data.id_marker,
            marker = this.markers.getLayer(marker_id);
            //this.map.panTo(marker.getLatLng(), 10);
            this.map.flyTo(marker.getLatLng(), 10, {
                animate: true,
                duration: 2
            });
            setTimeout(() => {
                marker.openPopup();
            }, 2200);
            //marker.fireEvent('click');
            //this.map.flyTo(marker.getBounds().getCenter());
        },
        create_list(){
            var list = document.getElementById('item-list');
            for(var i = 0; i < this.data_markers.length; i++){
                var data = this.data_markers[i];
                var item = document.createElement('li');
                item.classList.add("mapli");
                item.innerHTML = '<a href="#/maps">' + data.name + '</a>';
                item.addEventListener('click', this.show_popup.bind(null, data));
                list.appendChild(item);
            }
        },
        send_data(){
            //this.$router.push({name:'search', params: {'keyword': this.search}});
            this.$router.push('/search?keyword=' + this.search + '&filter=' + this.collection + "&search_in=" + this.search_in);
        },
        async get_data(){
            await axios.get(this.url_api)
                .then(response => {
                    this.api_data = response.data;
            });
        },
        showPopup(idmarker){
            this.map.closePopup(); 
            var marker = $("[tabindex="+idmarker+"]");
            marker.click();
        }
    },
    mounted(){
        this.visible = true; 
        this.init_map();
    },
    computed:{

    }
}