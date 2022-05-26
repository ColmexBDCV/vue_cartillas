function field_filter(key) {
    return [
        //"depositor",
        "title",
        "resource_type",
        "part_of",
        "label",
        "creator"
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
        "Generic Type",
        "Type"
    ].includes(key);
}

function article_filter(key){
    return [
        "creator",
        "resource_type",
        "identifier",
        "related_url",
        "year",
        "volume",
        "number",
        "pages",
        "contained_in",
        "place_of_publication"].includes(key);
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

$(document).ready(function(){
    $('#TextBoxId').keypress(function(e){
      if(e.keyCode==13)
      $('#linkadd').click();
    });
});