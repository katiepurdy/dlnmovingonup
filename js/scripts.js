// Load header and footer
$(function(){ $("#dln-header").load("header.html") });
$(function(){ $("#dln-footer").load("footer.html") });

function loadCourse() {
    var params = getSearchParameters();
    var course = "/courses/" + params.course + "/story_html5.html";
    var width = (params.width || "normal") + "-width";
    $(".dln-course-iframe").addClass(width); 
    $(".dln-course-iframe").attr('src', course);
}

function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssociativeArray(prmstr) : {};
}

function transformToAssociativeArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

