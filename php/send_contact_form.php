<?php

    $result = "";

    $name = $_POST['contact_name'];
    $email = $_POST['contact_email'];
    $message = $_POST['contact_message'];
    $subject = $_POST['contact_subject'];
    $how_hear = $_POST['contact_how_hear'];
    $how_hear_other = $_POST['contact_how_hear_other'];
    $url = $_POST['contact_url'];

    $from = 'Moving On Up';
    $to = 'dlnmovingonup@gmail.com';
    $label = '[DLN Moving On Up Enquiry] ';

    $subject = $label . $subject;
    $body = "From: $name\n" .
        "E-Mail: $email\n" .
        "Heard about us via: $how_hear $how_hear_other\n" .
        "Message:\n $message\n";

    // URL is bogus. If it gets filled in, this is spam, since it was hidden 
    // from regular humans by Javascript
    $isSpam = ($url !== "");

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

    //  Report any errors
    if ($errName || $errEmail || $errMessage) {
        $result = "<div class='alert alert-danger'>Please fix the following problems with your submission: <ul>" .
                ($errName ? "<li>$errName</li>" : "") .
                ($errEmail ? "<li>$errEmail</li>" : "") .
                ($errMessage ? "<li>$errMessage</li>" : "") .
                "</ul></div>";
    // Let spammers think that their mail went through
    } else if ($isSpam || mail ($to, $subject, $body, $from)) {
        $result = "<div class='alert alert-success'>Thank you for your message! We will be in touch.</div>";
    } else {
        $result = "<div class='alert alert-danger'>Sorry, there was an error sending your message. Please try again later.</div>";
    }

    print $result;
