<?php
    require_once("phpFlickr/phpFlickr.php");
    // Create new phpFlickr object
    $f = new phpFlickr("12da91e2fe62e022791c958fdc4ef82c","8ae2a4dd3fef2b6c");
    $f->auth('write');
    $token = $f->auth_checkToken();
    if ($token) {
        header('Location: http://www.pavanratnakar.com/hacks/flickrlove/index.php?flickr=true');
    }
?>