<?php
$to = $_POST['email']; 
$fio = $_POST['fio'];

$subject = 'Откройте для себя все грани проекта «Времена Года»'; // Тема письма
$message = `Здравствуйте $fio, присылаем Вам подробную презентацию проекта "Времена Года"`; // Основное сообщение

// Путь к файлу
$file = "../Catalog_vremena_goda.pdf";

// Получение содержимого файла
$file_content = chunk_split(base64_encode(file_get_contents($file)));

// Генерация уникального границы для сообщения
$boundary = md5(uniqid(time()));

// Заголовки для email
$headers = "From: sender@example.com\r\n"; 
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Основное сообщение в email
$body = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= "$message\r\n";

// Добавление файла в письмо
$body .= "--$boundary\r\n";
$body .= "Content-Type: application/octet-stream; name=\"" . basename($file) . "\"\r\n";
$body .= "Content-Transfer-Encoding: base64\r\n";
$body .= "Content-Disposition: attachment; filename=\"" . basename($file) . "\"\r\n\r\n";
$body .= "$file_content\r\n";
$body .= "--$boundary--";

// Отправка письма
if (mail($to, $subject, $body, $headers)) {
    echo "Success";
} else {
    echo "error";
}
?>
