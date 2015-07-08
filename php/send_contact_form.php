<?php

    $result = "";

    $name = $_POST['contact_name'];
    $email = $_POST['contact_email'];
    $message = $_POST['contact_message'];
    $subject = $_POST['contact_subject'];
    $human = intval($_POST['contact_antispam']);

    $from = 'Moving On Up';
    $to = 'dartmouthlearning@gmail.com';
    $label = '[DLN Moving On Up Enquiry] ';

    $subject = $label . $subject;
    $body = "From: $name\n E-Mail: $email\n\n Message:\n $message\n";

    // Check if name has been entered
    if (!$name) {
        $errName = 'Please enter your name.';
    }

    // Check if email has been entered and is valid
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errEmail = 'Please enter a valid email address.';
    }

    //Check if message has been entered
    if (!$message) {
        $errMessage = 'Please enter your message.';
    }

    //Check if simple anti-bot test is correct
    if ($human !== 7) {
        $errHuman = 'Your anti-spam is incorrect.';
    }

    //  Report any errors
    if ($errName || $errEmail || $errMessage || $errHuman) {
        $result = "<div class='alert alert-danger'>Please fix the following problems with your submission: <ul>" .
                ($errName ? "<li>$errName</li>" : "") .
                ($errEmail ? "<li>$errEmail</li>" : "") .
                ($errMessage ? "<li>$errMessage</li>" : "") .
                ($errHuman ? "<li>$errHuman</li>" : "") .
            "</ul></div>";
    } else if (mail ($to, $subject, $body, $from)) {
        $result = "<div class='alert alert-success'>Thank you for your message! We will be in touch.</div>";
    } else {
        $result = "<div class='alert alert-danger'>Sorry, there was an error sending your message. Please try again later.</div>";
    }

    print $result;
