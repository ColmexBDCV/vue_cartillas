function field_filter(key) {
    return [
        //"depositor",
        //"title",
        "creator",
        "resource_type",
        "part_of",
        "label",
        "center",
        "date_created",
        "geographic_coverage",
        "subject",
        "temporary_coverage",
        "classification",
        "director",
        "degree_program",
        "languaje"
    ].includes(key);
}

function facet_filter(key) {
    return [
        //"Collections",
        "Resource Type",
        "Creator",
        "Contributor",
        "Center",
        "Director",
        "Editor",
        "Compiler",
        "Commentator",
        "Reviewer",
        "Traslator",
        "Interviewer",
        "Interviewee",
        "Organizer Collective Agent",
        "Photographer",
        "Place Of Publication",
        "Part Of Place",
        "year",
        "Subject Work",
        "Subject Person",
        "Subject Corporate",
        "Subject",
        "Language",
        "Based Near Label",
        "Geographic Coverage",
        "Temporary Coverage",
        "Degree Program",
        "Type Of Illustrations",
        "Contained In",
        "Database",
        //"Generic Type",
        "Type"
    ].includes(key);
}

function article_filter(key){
    return [
        "creator",
        "resource_type",
        //"identifier",
        "related_url",
        "year",
        "volume",
        "number",
        "pages",
        "contained_in",
        //"geographic_coverage",
        "subject",
        "temporary_coverage",
        //"classification",
        "director",
        "degree_program",
        "languaje",
        "dimensions",
        "extension"
    ].includes(key);
}


function remove_solr_sufix(key) {
    key = key.replace("_tesim", "");
    key = key.replace("_ssim", "");
    key = key.replace(" Sim", "");
    key = key.replace("_sim", "");
    return key;
}

function filter_data(datos) {
    for (var i = 0; i < datos.docs.length; i++) {
        Object.keys(datos.docs[i]).forEach(function (key) {
            new_key = remove_solr_sufix(key);

            Object.defineProperty(
                datos.docs[i],
                new_key,
                Object.getOwnPropertyDescriptor(datos.docs[i], key)
            );
            if (key != new_key) delete datos.docs[i][key];
        });
    }

    new_facets = [];

    for (var i = 0; i < datos.facets.length; i++) {
        df = remove_solr_sufix(datos.facets[i]["label"]);
        if (facet_filter(df)) {
            facet = datos.facets[i];
            facet["label"] = df;
            new_facets.push(facet);
        }
    }

    datos.facets = new_facets;

    return datos;
}


function openPDF(url){
    document.getElementById('pdf_iframe').contentWindow.PDFViewerApplication.open(url)
}

function read_pdfid(){
    var url = document.getElementById('pdf_id').value;
    openPDF(url);
}

function copyToClipboard() {        
    element = document.getElementById('clipboard-link').getAttribute("data-clipboard-text");
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(element).select();
    document.execCommand("copy");
    $temp.remove();
    element = document.getElementById('clipboard-link').getAttribute("data-bs-original-title");
    //document.getElementById('clipboard-link').removeAttribute("title");
    document.getElementById('clipboard-link').removeAttribute("data-bs-original-title");
    document.getElementById('clipboard-link').setAttribute("data-bs-original-title","Enlace Copiado");

    $("#clipboard-link").tooltip('show');
    setTimeout(function(){
        $("#clipboard-link").tooltip( 'hide' );
    }, 2000);
    document.getElementById('clipboard-link').removeAttribute("data-bs-original-title");
    //document.getElementById('clipboard-link').setAttribute("title",element);
    document.getElementById('clipboard-link').setAttribute("data-bs-original-title",element);

}