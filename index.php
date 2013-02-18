<?php
ini_set('display_errors',1); 
error_reporting(E_ALL);

/*Index file makes nomon HUNGRY*/
//Load Dependencies
//Get Moneyn
$SUBDOMAIN = array_shift(explode(".",$_SERVER['HTTP_HOST']));
#FORCE HTTPS
if((!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "") && $SUBDOMAIN != "dev") {
    $redirect = "https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    header("Location: $redirect");
}elseif ($SUBDOMAIN == "dev") {
	#This is the dev server... Deal with it...
}

require_once('smart.php');

/*
1. Start
2. Price
3. Allergies
*/
_generate('header');

if(isset($_REQUEST['q'])){
	$q = explode('/', $_REQUEST['q']);
}else{
	$q[0] = 'index';
}

if (file_exists('templates/' . $q[0] . '.html')) {
	_generate($q[0]);
}else{
	header("Status: 404 Not Found");
	_generate('404');
}

_generate('footer');

//Output page to screen!
_renderPage();
?>