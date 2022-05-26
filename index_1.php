<body class="body-special">
    <div id="app" class="container">
            <router-view></router-view>
        <!--<div class="header">
			<img src="/js/vue/src/assets/logo-inst.svg" class="logo-props"></img>
			<languaje></languaje>
		</div>-->
    </div>
    <!--<div w3-include-html="js/vue/src/templates/home.html">
	</div>-->
    <div w3-include-html="/wp-content/plugins/wp-vue-bdcv/src/templates/docview.html"></div>
    <div w3-include-html="/wp-content/plugins/wp-vue-bdcv/src/templates/videoview.html">
    </div>
    <template id="languaje">
        <div class="btn-group" style="float: right; display: inline; width: 30%; margin: 20px 0;">
            <button style="float: right;" class="btn dropdown-toggle btn-languaje" type="button" id="dropdownMenuButton"
                data-toggle="dropdown">
                {{$t(this.$i18n.locale)}} <span class="caret caret-white"></span>
            </button>
            <ul class="dropdown-menu" role="menu">
                <li><a href="#" @click="changeLang('sp')">{{$t('spanish')}}</a>
                </li>
                <li><a href="#" @click="changeLang('en')">{{$t('english')}}</a></li>
            </ul>
        </div>
    </template>
    <template id="home">
        <div class="d-flex">
            <!--<div class="row">-->
            <div class="p-4">
                <!--<facets :facets="repo.facets" :params="this.params">
					</facets>-->
            </div>
            <div class="p-4 show-all">
                <search></search>
                <!--<helperbar :pages="repo.pages" ref="pagination" :total="repo.total_pages"></helperbar>
					<docs :docs="repo.docs"></docs>
					<pages :pages="repo.pages" ref="pagination" :total="repo.total_pages"></pages>-->
            </div>
            <!--</div>-->
        </div>
    </template>
    <template id="searchview">
        <div class="row">
            <div class="col-3 col-normal">
                <facets :facets="repo.facets" :type="this.type" :val="this.val" :label="this.label" :params="this.params">
                </facets>
            </div>
           <div class="col-2 col-menu">
                <facets :facets="repo.facets" :type="this.type" :val="this.val" :label="this.label" :params="this.params">
                </facets>
            </div>
            <div class="col-1 col-comodin"></div>
            <div class="col-8 show-all">
                <search :keyword="keyword" :pages="repo.pages"></search>
                <helperbar :pages="repo.pages" ref="pagination" :total="repo.total_pages"></helperbar>
                <docs :docs="repo.docs" ></docs>
                <pages :pages="repo.pages" ref="pagination" :total="repo.total_pages"></pages>
            </div>

        </div>
    </template>
    <template id="docs">
        <div class="docs_view container" style="">
            <div class="row" v-for="doc in docs">
                <router-link
                    :to="{path: 'docs', query: {id: doc.id, has_model: doc.has_model, thumbnail: doc.thumbnail_path_ss, related: doc.hasRelatedMediaFragment, keyword: keyword}}">
                    <h3> {{ doc.title[0] }} </h3>
                </router-link>
                <!--<div class="bd-highlight">-->
                    <div class="col-md-3">
                        <router-link
                        :to="{path: 'docs', query: {id: doc.id, has_model: doc.has_model, thumbnail: doc.thumbnail_path_ss, related: doc.hasRelatedMediaFragment, keyword: keyword}}">
                            <img class="img-responsive" :src="get_url() + doc.thumbnail_path_ss ">
                        </router-link>
                    </div>
                    <div class="col-md-8 justify-content-md-center">
                        <table class="table table-docs">
                            <tbody>
                                <tr v-for="(metadata, key, index) in doc" v-if="check_metadata(metadata, key)">
                                    <td class="td-tittle" style="text-align: right;">
                                        {{ $t(key) }}
                                    </td>
                                    <td v-if="isObject(metadata)" style="text-align: left;">
                                        <p v-for="m in metadata">
                                            {{ m }}
                                        </p>
                                    </td>
                                    <td v-else style="text-align: left;">
                                        <p>
                                            {{ metadata }}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                <!--</div>-->
            </div>
        </div>
    </template>
    <template id="pages">
        <div id="pages-div">
            <nav aria-label="Paginas disponibles" style="text-align: center;">
                <ul class="pagination">
                    <li class="page-item" v-if="pages.current_page != 1">
                        <a class="page-link" @click="next_page(pages.prev_page)" href="#">{{$t('previous')}}</a>
                    </li>
                    <li class="page-item disabled" v-if="pages.current_page == 1">
                        <span class="page-link">{{$t('previous')}}</span>
                    </li>
                    <li class="page-item" :class="isCurrent((1))" v-if="pages.current_page > 4"><a class="page-link"
                            @click="next_page(1)" href="#">1</a></li>
                    <li class="page-item disabled" v-if="pages.current_page > 4">
                        <span class="page-link">...</span>
                    </li>
                    <li class="page-item" :class="isCurrent((page))" v-for="(page,index) in get_pages">
                        <a class="page-link" @click="next_page(page)" href="#">{{ page }}</a>
                    </li>
                    <li class="page-item disabled" v-if="pages.total_pages - pagesArray[pagesArray.length-1] > 9">
                        <span class="page-link">...</span>
                    </li>
                    <li class="page-item" :class="pages.current_page == pages.total_pages ? 'active' : ''"><a
                            class="page-link" @click="next_page(pages.total_pages)" href="#">{{pages.total_pages}}</a>
                    </li>
                    <li class="page-item" v-if="pages.current_page < pages.total_pages">
                        <a class="page-link" @click="next_page(pages.next_page)" href="#">{{$t('next')}}</a>
                    </li>
                    <li class="page-item disabled" v-if="pages.current_page == pages.total_pages">
                        <span class="page-link">{{$t('next')}}</span>
                    </li>
                </ul>
            </nav>
        </div>
    </template>
    <template id="helperbar">
        <div>
            <div style="margin-top: 10px;" v-if="filters.length > 0">
                <label>{{$t('filters')}}: </label>
                <span class="btn-group appliedFilter constraint filter filter-resource_type_sim"
                    v-for="filter in filters">
                    <span class="constraint-value btn btn-sm btn-default btn-disabled">
                        <span class="filterName">{{filter.key}} > </span>
                        <span class="filterValue" :title="filter.value">{{filter.value}}</span>
                        <!--<a class="btn btn-default btn-sm remove dropdown-toggle" href="#" @click="delete_query(filter.type, filter.value, filter.key)" :title="$t('remove') + ':' + filter.value"><span class="glyphicon glyphicon-remove"></span><span class="sr-only">Remove </span></a>-->
                        <i class="fa fa-times-circle fa-lg close" aria-hidden="true" @click="delete_query(filter.type, filter.value, filter.key)"></i>
                        <!--<button id="close-filter" type="button" class="close" aria-label="Close"
                            @click="delete_query(filter.type, filter.value, filter.key)">
                            <span aria-hidden="true">&times;</span>
                        </button>-->
                    </span>
                </span>
                <a class="remove-all" href="#" @click="delete_all()">Quitar filtros</a>
            </div>
            <div style="width: 96%;display: flow-root;">
                <div class="btn-group paginator-top">
                    <nav aria-label="Paginas disponibles" style="text-align: left; display: inline">
                        <ul class="pagination">
                            <li class="page-item" v-if="pages.current_page != 1">
                                <a class="page-link" @click="next_page(pages.prev_page)" href="#">
                                    <<&nbsp;{{$t('previous')}} </a>
                            </li>
                            <li class="page-item disabled" v-if="pages.current_page == 1">
                                <span class="page-link">
                                    <<&nbsp;{{$t('previous')}} </span>
                            </li>
                            <li class="page-item">
                                <span class="page-link">|&nbsp;{{pages.offset_value + 1}} -
                                    {{(pages.offset_value + paginas) < pages.total_count ? (pages.offset_value + paginas) : pages.total_count }}
                                    de
                                    {{pages.total_count}}&nbsp;|
                                </span>
                            </li>
                            <li class="page-item" v-if="pages.current_page < pages.total_pages">
                                <a class="page-link" @click="next_page(pages.next_page)"
                                    href="#">{{$t('next')}}&nbsp;>></a>
                            </li>
                            <li class="page-item disabled" v-if="pages.current_page == pages.total_pages">
                                <span class="page-link">{{$t('next')}}&nbsp;>></span>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="dropdown order-by">
                    <a style="float: right;" class="btn dropdown-toggle btn-per_pagina"
                    href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenu">
                        {{paginas}} {{$t('per_page')}}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                        <li><a class="dropdown-item" href="#" @click="per_pages(10)">10</a></li>
                        <li><a class="dropdown-item" href="#" @click="per_pages(20)">20</a></li>
                        <li><a class="dropdown-item" href="#" @click="per_pages(50)">50</a></li>
                        <li><a class="dropdown-item" href="#" @click="per_pages(100)">100</a></li>
                    </ul>
                </div>
                <div class="dropdown order-by">
                    <a style="float: right;" class="btn  dropdown-toggle btn-per_pagina"
                        href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenu">
                            {{$t('order_by')}} {{ order }}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                        <li><a class="dropdown-item" href="#"
                                @click="order_by('score desc, system_create_dtsi desc', 'Relevancia')">Relevancia</a>
                        </li>
                        <li><a class="dropdown-item" href="#" @click="order_by('date_created_sim desc', 'Año Desc')">Año Desc</a></li>
                        <li><a class="dropdown-item" href="#" @click="order_by('date_created_sim asc', 'Año Asc')">Año Asc</a></li>
                        <li><a class="dropdown-item" href="#" @click="order_by('title_sim asc', 'Titulo [A-Z]')">Titulo [A-Z]</a></li>
                        <li><a class="dropdown-item" href="#" @click="order_by('title_sim desc','Titulo [Z-A]')">Titulo [Z-A]</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </template>
    <template id="search">
        <div class="input-group">
            <div v-if="search != ''" style="margin-bottom: 20px">La busqueda <strong>"{{search}}"</strong> arrojó <strong>"{{pages.total_count}}"</strong> resultados</div>
            <form class="search-form">
                <input type="text" class="form-control search-input" :placeholder="$t('search_term')"
                    v-model="search" name="lname"/>
                <span class="input-group-btn">
                    <button type="button" class="btn btn-search" @click="search_term">
                        <span class="glyphicon glyphicon-search"></span> {{$t('go')}}
                    </button>
                </span>
            </form>
        </div>
    </template>
    <script type="text/template" id="facetas">
        <nav class="navbar navbar-expand-lg navbar-light menu-facetas">
            <div class="">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <div id="facet-accordion">
                                <div v-if="facet.items.length > 0" v-for="(facet, index) in facets" class="accordion" id="accordionFacet">
                                    <!--<div class="card-header">-->
                                        <div class="acordion-item ">
                                            <h2 class="acordion-header" :id="'heading' + index">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#facets-'+index" aria-expanded="true" :aria-controls="'facets-'+index">
                                                    {{$t(facet.label.toLowerCase())}}
                                                </button>
                                                <!--<a data-toggle="collapse" :href="'#facets-'+index">
                                                    <span class="glyphicon glyphicon-tag"></span>{{$t(facet.label.toLowerCase())}}</a>-->
                                            </h2>
                                        
                                            <div :id="'facets-'+index" class="accordion-collapse collapse show" :aria-labelledby="'heading' + index" data-parent="#accordionFacet">
                                                <div class="accordion-body">
                                                    <ul class="list-group">
                                                        <li v-for="item in facet.items.slice(0, 5)" class="list-group-item">
                                                            <span v-if="compare_params(facet.name, item.value)" class="facet-label">
                                                                <span class="selected" @click="delete_query(facet.name, item.value, $t(facet.label.toLowerCase()))">
                                                                <i class="fa fa-check-square-o fa-lg close" title="Quitar filtro" aria-hidden="true"></i>{{item.label}}</span>
                                                                <!--<a class="remove" @click="delete_query(facet.name, item.value, $t(facet.label.toLowerCase()))">
                                                                    <span class="glyphicon glyphicon-remove"></span>
                                                                    <span class="sr-only">[remove]</span>
                                                                </a>-->
                                                                <!--<button type="button" class="close" aria-label="Close" @click="delete_query(facet.name, item.value, $t(facet.label.toLowerCase()))">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>-->
                                                            </span>
                                                            <span v-else class="facet-label">
                                                                <a @click="query(facet.name,item.value, $t(facet.label.toLowerCase()))">
                                                                <i class="fa fa-square-o fa-lg close" title="" aria-hidden="true"></i>{{item.label}}</a>
                                                            </span>
                                                        </li>
                                                        <li class="list-group-item facet-label" v-if="facet.items.length > 5  ">
                                                            <a class="more_facets_link" @click="get_data_facet(facet.name)">{{$t('more')}} <span
                                                                    class="sr-only"></span> »</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <facetModal v-if="showModal" @query="query" :facet_url="facet_url" :facet_data="facet_data"
                                    :facet_label="facet_label"></facetModal>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>        
	</script>
    <script type="text/template" id="modal-template">
        <transition name="modal">
				<div class="modal-mask">
					<div class="modal-wrapper">
						<div class="modal-container">
							<div class="modal-header">
								<slot name="header">
									{{$t(label_title)}}
								</slot>
							</div>
			
							<div class="modal-body">
								<slot name="body">
									<ul class="list-group">
										<li v-for="item in data_local" class="list-item-modal">
											<span class="facet-label">
												<a @click="query(item.value)">{{item.value}}</a>
											</span>
										</li>
									</ul>
								</slot>
							</div>
			
							<div class="modal-footer">
								<slot name="footer">
									<nav aria-label="Paginas disponibles" style="text-align: left;">
										<ul class="pagination pagination-modal">
											<li class="page-item" v-if="isPrev">
												<a class="page-link" @click="prev_page()" href="#">{{$t('previous')}}</a>
											</li>
											<li class="page-item disabled" v-else>
												<span class="page-link">{{$t('previous')}}</span>
											</li>
											<li class="page-item" v-if="isNext">
												<a class="page-link" @click="next_page()" href="#">{{$t('next')}}</a>
											</li>
											<li class="page-item disabled" v-else>
												<span class="page-link">{{$t('next')}}</span>
											</li>
										</ul>
									</nav>
									<button type="button" class="btn btn-modal" @click="modal_facets_close()"
										data-dismiss="modal">{{$t('close')}}</button>
								</slot>
							</div>
						</div>
					</div>
				</div>
				</div>
			</transition>
	</script>

</body>

<script>
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    if(urlParams.get('lname')){
        window.location = "https://rddm.mx/busqueda/#/search?keyword=" + urlParams.get('lname');
    }

    var tmp_keyword="";
    if(tmp_keyword){
        window.location = "https://rddm.mx/busqueda/#/search?keyword=" + tmp_keyword;
    }
</script>

<link rel="stylesheet" type="text/css" href="/wp-content/plugins/wp-vue-bdcv/css/style.css">
<!--<link rel="stylesheet" type="text/css" href="/public/js/vue/src/assets/style.css">-->
<script type="text/javascript" src="https://www.w3schools.com/lib/w3data.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/8.14.1/vue-i18n.js"></script>
<!--<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script>-->
<!-- DEVELOPMENT MODE -->
<!--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>-->
<!-- PRODUCTION MODE -->
<!-- Latest compiled and minified CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vuex/3.1.1/vuex.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.1.3/vue-router.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js">
</script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.6.347/build/pdf.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.6.347/web/pdf_viewer.js"></script>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
</script>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
<!--</script>-->
<!--<script type="text/javascript"
    src="https://stackpath.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>-->
<!--<script type="text/javascript"
    src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>-->

<script>
w3IncludeHTML();
</script>
<script type="text/javascript" src="/wp-content/plugins/wp-vue-bdcv/functions.js"></script>
<script type="module" src="/wp-content/plugins/wp-vue-bdcv/main.js"></script>