<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
if (mail('omotayoalawode@hotmail.com', 'Test Subject', 'Test Message')) {
    echo "Mail sent! Check your inbox/spam.";
} else {
    echo "Mail failed. Check PHP settings.";
}
?>