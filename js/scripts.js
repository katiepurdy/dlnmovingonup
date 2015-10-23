// Workaround to keep menu open when navigating down through
// submenus on for touch/mobile devices
$(document).ready( function() {
    $(document).on("touchstart", "li.dropdown-submenu > a", function(){
        $("li.dropdown-submenu").removeClass("active");
        $(this).parent().addClass("active");
        return false;
    });

    // Hide input for "How did you hear about us?"; shown on change below
    $("#contact_form_reset").click(function(){
        $("#contact_how_hear_other").css("visibility", "hidden");
        $("#contact_name").focus();
    });

    // Wire up contact form submission
    $("#contact_form").on("submit", submitContactForm);
    $("#contact_name").focus();

    $("#dln_ged_course_launcher").hide();
    $("#dln_ged_contact_info").on("submit", submitGedContactInfo);

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

// Default image for courses that haven't had a screenshot taken yet
var DEFAULT_COURSE_IMAGE = "/assets/course_images/default.png";

function loadCourse() {
    // Get course specifics
    var params = getSearchParameters();
    var settings = getCourseSettings(params.course);
    var courseUrl = "/courses/" + params.course + "/story.html";

    // Customise the course image and the link to the course
    $("#dln_course_link").attr('href', courseUrl);
    $("#dln_course_image").attr('src', getCourseImageUrl(params.course));

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
    var courseImage = "/assets/course_images/"
                       + course.replace(new RegExp("/", 'g'), "_") 
                       + "_title_screen.png";
    // TODO: Provide a default image if courseImage doesn't exist
    return courseImage;
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

var GED_CERTIFICATE_TITLES = {
    "math/ged_prep/whole_numbers_and_money/lesson_1": "Whole Numbers & Money - Lesson 1",
    "math/ged_prep/whole_numbers_and_money/lesson_2": "Whole Numbers & Money - Lesson 2",
    "math/ged_prep/whole_numbers_and_money/lesson_3": "Whole Numbers & Money - Lesson 3",
    "math/ged_prep/whole_numbers_and_money/lesson_4": "Whole Numbers & Money - Lesson 4",
    "math/ged_prep/whole_numbers_and_money/lesson_5": "Whole Numbers & Money - Lesson 5",
    "math/ged_prep/whole_numbers_and_money/review": "Whole Numbers & Money - Review",
    "math/ged_prep/proportional_reasoning/lesson_1": "Proportional Reasoning - Lesson 1",
    "math/ged_prep/proportional_reasoning/lesson_2": "Proportional Reasoning - Lesson 2",
    "math/ged_prep/proportional_reasoning/lesson_3": "Proportional Reasoning - Lesson 3",
    "math/ged_prep/proportional_reasoning/lesson_4": "Proportional Reasoning - Lesson 4",
    "math/ged_prep/proportional_reasoning/review": "Proportional Reasoning - Review",
    "math/ged_prep/statistics_and_probability/lesson_1": "Statistics & Probability - Lesson 1",
    "math/ged_prep/statistics_and_probability/lesson_2": "Statistics & Probability - Lesson 2",
    "math/ged_prep/statistics_and_probability/lesson_3": "Statistics & Probability - Lesson 3",
    "math/ged_prep/statistics_and_probability/lesson_4": "Statistics & Probability - Lesson 4",
    "math/ged_prep/statistics_and_probability/review": "Statistics & Probability - Review",
    "math/ged_prep/measurement/lesson_1": "Measurement - Lesson 1",
    "math/ged_prep/measurement/lesson_2": "Measurement - Lesson 2",
    "math/ged_prep/measurement/lesson_3": "Measurement - Lesson 3",
    "math/ged_prep/measurement/lesson_4": "Measurement - Lesson 4",
    "math/ged_prep/measurement/review": "Measurement - Review",
    "math/ged_prep/graphs_and_functions/lesson_1": "Graphs & Functions - Lesson 1",
    "math/ged_prep/graphs_and_functions/lesson_2": "Graphs & Functions - Lesson 2",
    "math/ged_prep/graphs_and_functions/lesson_3": "Graphs & Functions - Lesson 3",
    "math/ged_prep/graphs_and_functions/lesson_4": "Graphs & Functions - Lesson 4",
    "math/ged_prep/graphs_and_functions/review": "Graphs & Functions - Review",
    "math/ged_prep/algebra/lesson_1": "Algebra - Lesson 1",
    "math/ged_prep/algebra/lesson_2": "Algebra - Lesson 2",
    "math/ged_prep/algebra/lesson_3": "Algebra - Lesson 3",
    "math/ged_prep/algebra/lesson_4": "Algebra - Lesson 4",
    "math/ged_prep/algebra/review": "Algebra - Review",
    "math/ged_prep/geometry_and_trigonometry/lesson_1": "Geometry & Trigonometry - Lesson 1",
    "math/ged_prep/geometry_and_trigonometry/lesson_2": "Geometry & Trigonometry - Lesson 2",
    "math/ged_prep/geometry_and_trigonometry/lesson_3": "Geometry & Trigonometry - Lesson 3",
    "math/ged_prep/geometry_and_trigonometry/review": "Geometry & Trigonometry - Review",
};

function submitGedContactInfo(e) {
    e.preventDefault();
    var gedName = $("#ged_name").val();
    var urlParams = getSearchParameters();
    var gedCourseId = urlParams['course'];
    var gedCourse = GED_CERTIFICATE_TITLES[gedCourseId];
    var formData = $.param({
       'ged_name': gedName,
       'ged_course': gedCourse,
    });

    $.ajax({
        type: "POST",
        url: "/php/notify_ged_lesson_commencement.php",
        data: formData,
        success: function (data) {
            // Set cookies for later certificate generation; see also 
            // prepareGedCourseCertificate() below
            $.cookie("gedName", gedName);
            $.cookie("gedCourse", gedCourse);
            // Let the user through to the course
            $("#dln_ged_contact_info").hide(); 
            $("#dln_ged_course_launcher").show();
        }
    });
}

function prepareGedCourseCertificate() {
    // Pull certificate details from cookie and pass to cert generator
    var certDetails = $.param({
        'name': $.cookie("gedName"),
        'course': $.cookie("gedCourse")
    });
    window.location.replace('/php/generate_certificate_of_achievement.php?' + certDetails);
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

