<?php
    require("../lib/php/fpdf/fpdf.php");
    require("../lib/php/fpdi/fpdi.php");
    require("./validate.php");

    // Validate inputs
    $name = urldecode($_POST['ged_name']);
    $courseName = urldecode($_POST['ged_course']);

    if (!isValidName($name) || !isValidCourse($courseName)){
        http_response_code(400);
    };

    // Email a notification to DLN 
    $to = "dlnmovingonup@gmail.com";
    $label = "[GED Prep Lesson Started]";
    $subject = $label;
    $from = "DLN Moving On Up";
    $body = "Learner: " . $name . "\nLesson: " . $courseName;
    mail($to, $subject, $body, $from);

