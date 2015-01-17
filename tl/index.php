<?php
    $query = $_GET['query'];
    if ($query) {
        return;
    }
    $url = 'http://10.66.95.204:8086/getTimeline?query='.$query;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HEADER, false);
    $data = curl_exec($curl);
    curl_close($curl);
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name="author" content="Pavan Ratnakar" />
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <title>Search Timeline - Hack</title>
        <link rel="stylesheet" href="assets/css/timeline.css" />
        <link rel="stylesheet" href="assets/css/styles.css" />
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Dancing+Script|Antic+Slab" />
        <!--[if lt IE 9]>
          <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    </head>
    <body>
        <div id="timeline" class="clearfix"></div>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
        <script type="text/javascript" src="http://cdn.knightlab.com/libs/timeline/latest/js/storyjs-embed.js"></script>
        <script>
            var dataObject = <?php echo json_decode($data); ?>
        </script>
        <script type="text/javascript" src="assets/js/script.js"></script>
    </body>
</html>