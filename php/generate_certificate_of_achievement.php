<?php
    require("../lib/php/fpdf/fpdf.php");
    require("../lib/php/fpdi/fpdi.php");
    require("./validate.php");

    const ORIENTATION = "L"; 
    const FONT_SIZE = 30;
    const FONT = "Arial";
    const TEMPLATE = "../assets/pdf/certificate_template._pdf";
    const NAME_Y = 92;
    const COURSE_NAME_Y = 122;

    // Validate inputs
    $name = urldecode($_GET['name']);
    $courseName = urldecode($_GET['course']);

    if (!isValidName($name) || !isValidCourse($courseName)){
        return;
    };

    // Load certificate template
    $pdf =& new FPDI();
    $pdf->AddPage(ORIENTATION);
    $pagecount = $pdf->setSourceFile(TEMPLATE);
    $template = $pdf->importPage(1);
    $pdf->useTemplate($template, null, null, 0, 0, true);

    // Set up font details
    $pdf->SetFontSize(FONT_SIZE);
    $pdf->SetFont(FONT);

    // Centre the student name horizontally
    $nameWidth = $pdf->GetStringWidth($name);
    $nameX = ($pdf->w - $nameWidth) / 2;
    $pdf->SetXY($nameX, NAME_Y);
    $pdf->MultiCell(0, 4, $name);

    // Centre the course name horizontally
    $courseNameWidth = $pdf->GetStringWidth($courseName);
    $courseNameX = ($pdf->w - $courseNameWidth) / 2;
    $pdf->SetXY($courseNameX, COURSE_NAME_Y);
    $pdf->MultiCell(0, 4, $courseName);

    // Generate the downloadable certificate
    $filename = "certificate_of_achievement.pdf";
    $pdf->Output();

    // Email a notification to DLN 
    $to = "dlnmovingonup@gmail.com";
    $label = "[GED Prep Lesson Passed]";
    $subject = $label;
    $from = "DLN Moving On Up";
    $body = "Learner: " . $name . "\nLesson: " . $courseName;
    mail($to, $subject, $body, $from);

