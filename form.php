<?php
header ('Content-type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: https://jr-ecotecnologia-joseanu.c9users.io');
//header('Access-Control-Allow-Origin: https://www.jrecotecnologia.com');
//header('Access-Control-Allow-Origin: http://www.jrecotecnologia.com');

require './PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->isSMTP();
$mail->Host = 'rmx11.dizinc.com';
$mail->SMTPAuth = true;
$mail->Username = 'webmaster@jrecotecnologia.com';
$mail->Password = 'okJIuhM6';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->isHTML(true);

if (empty($_POST['_gotcha'])) {
	enviarCorreo($mail, $_POST);
	if( !isset( $_POST['correo'] ) || empty( $_POST['correo'] ) || !filter_var( trim( $_POST['correo'] ), FILTER_VALIDATE_EMAIL ) )
	{
		echo ' ';
	} else {
		//enviarPromocion($mail, $_POST);
	}
} else {
	echo 'SPAM';
}

function enviarCorreo($mailer, $datos) {
	
	$cc = 'contacto@jrecotecnologia.com';
	$nombre = $datos['nombre'];
	$reply = $datos['correo'];
	$titulo = $datos['_subject'];
	$body = '';
	foreach ($datos as $key => $value) {
		if ($key == 'intereses') {
			$body = $body.$key.': ';
			foreach ($value as $key => $value) {
				$body = $body.$value.', ';
			}
			$body = $body.'<br />';
		} elseif (substr( $key, 0, 1 ) !== '_') {
			$body = $body.$key.': '.$value.'<br />';
		}
	}

	$mailer->clearAllRecipients();
	$mailer->setFrom('webmaster@jrecotecnologia.com', 'Sitio Web JR Ecotecnologia');
	$mailer->addAddress('webmaster@jrecotecnologia.com', 'webmaster');
	$mailer->addReplyTo($reply, $nombre);
	$mailer->addCC($cc);

	$mailer->Subject = $titulo;
	$mailer->Body    = $body;
	$mailer->AltBody = $body;

	if(!$mailer->send()) {
		echo 'Error: ' . $mailer->ErrorInfo;
	} else {
		echo 'Gracias por contactarnos. Recibimos tus datos y en breve nos comunicaremos.';
	}
}

function enviarPromocion($mailer, $datos) {
	
	$nombre = $datos['nombre'];
	$correo = $datos['correo'];
	$titulo = 'GRACIAS';
	$body = 'GRACIAS!';

	$mailer->clearAllRecipients();
	$mailer->setFrom('contacto@jrecotecnologia.com', 'JR Ecotecnologia');
	$mailer->addAddress($correo, $nombre);
	$mailer->addReplyTo('contacto@jrecotecnologia.com', 'JR Ecotecnologia');

	$mailer->Subject = $titulo;
	$mailer->Body    = $body;
	$mailer->AltBody = $body;

	if(!$mailer->send()) {
		echo '<br />Error: ' . $mailer->ErrorInfo;
	} else {
		echo '<br />Se envió un código de promoción a tu correo que podrás utilizar en tu compra.';
	}
}
?>