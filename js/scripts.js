// Workaround to keep menu open when navigating down through
// submenus on for touch/mobile devices
$(document).ready( function() {
    $(document).on("touchstart", "li.dropdown-submenu > a", function(){
        $("li.dropdown-submenu").removeClass("active");
        $(this).parent().addClass("active");
        return false;
    });

    // Horrific fix for setting the background colour in the content iframe
    $(".dln-course-iframe").load(function(){
        $(".dln-course-iframe").contents().find("body").css('background-color', '#eee');
    });

    // Hide input for "How did you hear about us?"; shown on change below
    $("#contact_form_reset").click(function(){
        $("#contact_how_hear_other").css("visibility", "hidden");
        $("#contact_name").focus();
    });

    // Wire up contact form submission
    $("#contact_form").on("submit", submitContactForm);
    $("#contact_name").focus();

    // Hide bogus "URL" field on contact form (used for antispam, see PHP)
    $("#contact_url").hide();
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
    var courseUrl = "/courses/" + params.course + "/story.html";

    // Customise the course image and the link to the course
    $("#dln_course_link").attr('href', courseUrl);
    $("#dln_course_image").attr('src', getCourseImageUrl());

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


function getCourseImageUrl(course) { 
    // TODO: return a different image based on the course name
    return '/assets/course_image_default.png';
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

function submitContactForm(e) {
    e.preventDefault();
    var formData = $('#contact_form').serialize();
    $.ajax({
        type: "POST",
        url: "/php/send_contact_form.php",
        data: formData,
        success: function (result) {
            $("#contact_result").html(result);
        }
    });
}

// Show/hide "Other" input box on contact form 
$("#contact_how_hear").change(function(){
    var isOther = $("#contact_how_hear").val().valueOf() == "Other";
    var visibility = isOther ? "visible" : "hidden";
    $("#contact_how_hear_other").css("visibility", visibility);
    if (isOther){
        $("#contact_how_hear_other").focus();
    }
});

