<?php

    echo var_export($_POST, true);

    if (isset($_POST["submit"])) {

        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];
        $subject = $_POST['subject'];
        $human = intval($_POST['human']);
        $from = 'Moving On Up';
        $to = 'dartmouthlearning@gmail.com';
        $label = '[DLN Moving On Up Enquiry] ';
        $subject = $label . $subject;

        $body = "From: $name\n E-Mail: $email\n\n Message:\n $message";

        // Check if name has been entered
        if (!$name) {
            $errName = 'Please enter your name';
        }

        // Check if email has been entered and is valid
        if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errEmail = 'Please enter a valid email address';
        }

        //Check if message has been entered
        if (!$message) {
            $errMessage = 'Please enter your message';
        }

        //Check if simple anti-bot test is correct
        if ($human !== 5) {
            $errHuman = 'Your anti-spam is incorrect';
        }

        // If there are no errors, send the email
        if (!$errName && !$errEmail && !$errMessage && !$errHuman) {

            if (mail ($to, $subject, $body, $from)) {
                $result='<div class="alert alert-success">Thank You! I will be in touch</div>';
            } else {
                $result='<div class="alert alert-danger">Sorry there was an error sending your message. Please try again later</div>';
            }
        }
    }
