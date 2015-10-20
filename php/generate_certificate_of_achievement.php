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
        $validCourseNames = array(
            "Whole Numbers & Money - Lesson 1",
            "Whole Numbers & Money - Lesson 2",
            "Whole Numbers & Money - Lesson 3",
            "Whole Numbers & Money - Lesson 4",
            "Whole Numbers & Money - Lesson 5",
            "Whole Numbers & Money - Review",
            "Proportional Reasoning - Lesson 1",
            "Proportional Reasoning - Lesson 2",
            "Proportional Reasoning - Lesson 3",
            "Proportional Reasoning - Lesson 4",
            "Proportional Reasoning - Review",
            "Statistics & Probability - Lesson 1",
            "Statistics & Probability - Lesson 2",
            "Statistics & Probability - Lesson 3",
            "Statistics & Probability - Lesson 4",
            "Statistics & Probability - Review",
            "Measurement - Lesson 1",
            "Measurement - Lesson 2",
            "Measurement - Lesson 3",
            "Measurement - Lesson 4",
            "Measurement - Review",
            "Graphs & Functions - Lesson 1",
            "Graphs & Functions - Lesson 2",
            "Graphs & Functions - Lesson 3",
            "Graphs & Functions - Lesson 4",
            "Graphs & Functions - Review",
            "Algebra - Lesson 1",
            "Algebra - Lesson 2",
            "Algebra - Lesson 3",
            "Algebra - Lesson 4",
            "Algebra - Review",
            "Geometry & Trigonometry - Lesson 1",
            "Geometry & Trigonometry - Lesson 2",
            "Geometry & Trigonometry - Lesson 3",
            "Geometry & Trigonometry - Review"
        );
        return in_array($course, $validCourseNames);
    }

    function isValidName($name){
        return ($name != null && $name != "");
    }

    // Validate inputs
    $name = urldecode($_GET['name']);
    $email = urldecode($_GET['email']);
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
    $pdf->Output($filename, "D");
    // $pdf->Output();

    /* TODO: Also email the generated certificate to DLN 
    $to = "dlnmovingonup@gmail.com";
    $label = "[Course Completion Certificate] ";
    $subject = $label . $name . " - " . $courseName;
    $from = "DLN Moving On Up";
    // mail($to, $subject, $body, $from); */
