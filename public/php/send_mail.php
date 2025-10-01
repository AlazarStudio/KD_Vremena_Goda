<?php
mb_internal_encoding('UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo 'Invalid request method'; exit; }

$fio   = isset($_POST['fio'])   ? trim($_POST['fio'])   : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';

if ($fio === '' || $phone === '') { http_response_code(400); echo 'Заполните ФИО и телефон'; exit; }

$fio   = str_replace(["\r", "\n"], ' ', $fio);
$phone = str_replace(["\r", "\n"], ' ', $phone);

$to = 'yugstroy09gmail.com';

$subject    = 'Заявка на индивидуальную консультацию с сайта ВременаГода';
$subjectEnc = mb_encode_mimeheader($subject, 'UTF-8', 'B', "\r\n");

$bodyText =
    "Новая заявка\n\n" .
    "ФИО: {$fio}\n" .
    "Телефон: {$phone}\n" .
    "—\nОтправлено с формы vremenagoda.online";

// ВАРИАНТ A: если шлёте «от домена» (и настроили SPF/DKIM/DMARC)
$fromEmail = 'no-reply@vremenagoda.online';
$fromName  = 'ВременаГода • Сайт';

// ВАРИАНТ B: если используете msmtp через Mail.ru (и настроили msmtp)
/// $fromEmail = 'ВАШ_ЛОГИН@mail.ru';
/// $fromName  = 'ВременаГода • Сайт';

$fromNameEnc = mb_encode_mimeheader($fromName, 'UTF-8', 'B', "\r\n");

$headers = [];
$headers[] = "From: {$fromNameEnc} <{$fromEmail}>";
$headers[] = "Reply-To: {$fromEmail}";
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "Content-Transfer-Encoding: 8bit";
$headers[] = "Date: " . date('r');
$headers[] = "Message-ID: <" . uniqid('', true) . "@vremenagoda.online>";
$headersStr = implode("\r\n", $headers);

// envelope-from — ОБЯЗАТЕЛЕН
$ok = @mail($to, $subjectEnc, $bodyText, $headersStr, "-f {$fromEmail}");

echo $ok ? 'Success' : (http_response_code(500) && 'Error');
