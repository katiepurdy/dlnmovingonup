<?php
    function isValidName($name){
        return ($name != null && $name != "");
    }

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


