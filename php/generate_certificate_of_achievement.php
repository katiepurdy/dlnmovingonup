<?php
    require("../lib/php/fpdf/fpdf.php");
    require("../lib/php/fpdi/fpdi.php");

    const ORIENTATION = "L"; 
    const FONT_SIZE = 30;
    const FONT = "Arial";
    const TEMPLATE = "../assets/pdf/certificate_template._pdf";
    const NAME_Y = 92;
    const COURSE_NAME_Y = 122;

    function isValidCourse($course){
        // TODO: Populate this array
        $validCourseNames = array("Focusing on Fractions"); 
        return in_array($course, $validCourseNames);
    }

    function isValidName($name){
        return ($name != null && $name != "");
    }

    // Validate inputs
    $name = $_GET['name'];
    $courseName = $_GET['course_name'];

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
    // TODO: Force this to be downloadable: $pdf->Output($filename, "D");
    $pdf->Output();

    /* TODO: Also email the generated certificate to DLN 
    $to = "dlnmovingonup@gmail.com";
    $label = "[Course Completion Certificate] ";
    $subject = $label . $name . " - " . $courseName;
    $from = "DLN Moving On Up";
    // mail($to, $subject, $body, $from); */
