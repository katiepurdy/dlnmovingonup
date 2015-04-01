// Workaround to keep menu open when navigating down through
// submenus on for touch/mobile devices 
$(document).ready( function() {
    $(document).on("touchstart", "li.dropdown-submenu > a", function(){
        $("li.dropdown-submenu").removeClass("active");
        $(this).parent().addClass("active");
        return false;
    });
});

// Load header and footer
$(function(){ $("#dln-header").load("header.html") });
$(function(){ $("#dln-footer").load("footer.html") });

// Loaded in getCourseSettings()
var COURSE_SETTINGS = {
    'math/fractions': { 'title': "Fractions" },
    'english/front_yard': { 'title': 'My Front Yard', 'width': 'narrow-width' }
}

// Defaults for unconfigured settings
var DEFAULT_WIDTH = "normal-width";
var DEFAULT_TITLE = "Dartmouth Learning Network: Moving On Up";


function loadCourse() {
    // Get course specifics
    var params = getSearchParameters();
    var settings = getCourseSettings(params.course);
    var courseUrl = "/courses/" + params.course + "/story_html5.html";

    // Load the course in an iframe
    $(".dln-course-iframe").addClass(settings['width']); 
    $(".dln-course-iframe").attr('src', courseUrl);
    $(document).prop("title", settings['title']);
}


function getCourseSettings(course) {
    // Pull course settings (width, title) from COURSE_SETTINGS
    var settings = {};
    for (var candidate in COURSE_SETTINGS) {
        // i.e. if course.startsWith(candidate); see http://stackoverflow.com/questions/646628/how-to-check-if-a-string-startswith-another-string#4579228
        if (course.lastIndexOf(candidate) === 0) {
            settings = COURSE_SETTINGS[candidate];
        }
    }
    settings['title'] = settings['title'] || DEFAULT_TITLE;
    settings['width'] = settings['width'] || DEFAULT_WIDTH;
    return settings;
}


function getSearchParameters() {
    var paramString = window.location.search.substr(1);
    return paramString != null && paramString != "" ? transformToAssociativeArray(paramString) : {};
}


function transformToAssociativeArray(paramString) {
    var params = {};
    var paramArray = paramString.split("&");
    for ( var i = 0; i < paramArray.length; i++) {
        var tempArray = paramArray[i].split("=");
        params[tempArray[0]] = tempArray[1];
    }
    return params;
}
