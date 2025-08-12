<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fio = $_POST['fio'];
    $phone = $_POST['phone'];

    $to = 'alimdzhatdoev@mail.ru';
    $subject = "Заявка на индивидуальную консультацию с сайта временагода";
    $message = "ФИО: $fio\nТелефон: $phone";
    $headers = "From: временагода.online";

    if (mail($to, $subject, $message, $headers)) {
        echo "Success";
    } else {
        echo "Error";
    }
} else {
    echo "Invalid request method";
}
?>
