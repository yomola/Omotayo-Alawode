<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    $newsletter = isset($_POST['newsletter']) ? "Yes" : "No";

    // Set recipient email (replace with your email)
    $to = "omotayoalawode@hotmail.com";
    
    // Email subject
    $email_subject = "New Contact Form Submission: $subject";
    
    // Email body
    $email_body = "
        Name: $name\n
        Email: $email\n
        Subject: $subject\n
        Message:\n $message\n\n
        Newsletter Subscription: $newsletter
    ";
    
    // Headers
    $headers = "From: $email\r\nReply-To: $email";
    
    // Send email
    $success = mail($to, $email_subject, $email_body, $headers);
    
    // Redirect to a thank-you page or back to the form
    if ($success) {
        header("Location: thank_you.html"); // Create this page
        exit();
    } else {
        echo "Failed to send message. Please try again.";
    }
}
?>