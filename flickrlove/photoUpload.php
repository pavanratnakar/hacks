<?php
    session_start();

    $photos = $_REQUEST['photos'];
    $is_public = $_REQUEST['is_public'] == 'on' ? 1 : 0;
    $is_friend = $_REQUEST['is_friend'] == 'on' ? 1 : 0;
    $is_family = $_REQUEST['is_family'] == 'on' ? 1 : 0;
    require_once("phpFlickr/phpFlickr.php");
    // Create new phpFlickr object
    $f = new phpFlickr("12da91e2fe62e022791c958fdc4ef82c","8ae2a4dd3fef2b6c");
    $f->auth('write');
    $photos = explode(',',$photos);
    foreach ($photos as $key=>$value) {
        $content = file_get_contents($value);
        $filename = explode("/",$value);
        $filename = $filename[sizeof($filename)-1];
        $fp = fopen("temp/".$filename, "w");
        fwrite($fp, $content);
        fclose($fp);
        $result = $f->sync_upload("temp/".$filename,'','','',$is_public,$is_friend,$is_family);
        if ($result) {
            unlink("temp/".$filename);
        }
    }
    echo json_encode(array(
        'success'=>'true'
    ));
?>