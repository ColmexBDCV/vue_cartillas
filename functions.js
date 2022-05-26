import ENV from './config/.env.js'


export function field_filter(key) {
    return ENV.FIELD_FILTER.includes(key);
}

function facet_filter(key) {
    return ENV.FACET_FILTER.includes(key);
}

export function article_filter(key){
    return ENV.ARTICLE_FILTER.includes(key);
}


function remove_solr_sufix(key) {
    key = key.replace("_tesim", "");
    key = key.replace("_ssim", "");
    key = key.replace(" Sim", "");
    key = key.replace("_sim", "");
    return key;
}

export default function filter_data(datos) {
    if(datos.docs){
        var size = datos.docs.length;
        for (var i = 0; i < size; i++) {
            Object.keys(datos.docs[i]).forEach(function (key) {
                var new_key = remove_solr_sufix(key);
    
                Object.defineProperty(
                    datos.docs[i],
                    new_key,
                    Object.getOwnPropertyDescriptor(datos.docs[i], key)
                );
                if (key != new_key) delete datos.docs[i][key];
            });
        }
    
        var new_facets = [];
    
        for (var i = 0; i < datos.facets.length; i++) {
            var df = remove_solr_sufix(datos.facets[i]["label"]);
            if (facet_filter(df)) {
                var facet = datos.facets[i];
                facet["label"] = df;
                new_facets.push(facet);
            }
        }
    
        datos.facets = new_facets;
    }
    

    return datos;
}


export function openPDF(url){
    document.getElementById('pdf_iframe').contentWindow.PDFViewerApplication.open(url)
}

export function read_pdfid(){
    var url = document.getElementById('pdf_id').value;
    openPDF(url);
}

export function copyToClipboard() {        
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

export function newCopyClipboard(){
    let testingCodeToCopy = document.querySelector('#copyClipboard')
    testingCodeToCopy.setAttribute('type', 'text')
    testingCodeToCopy.select()

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'correctamente' : 'error';
        alert('URL copiada: ' + msg);
    } catch (err) {
        alert('Ocurrio un error al copiar la URL');
    }

    /* unselect the range */
    testingCodeToCopy.setAttribute('type', 'hidden')
    window.getSelection().removeAllRanges()
}
