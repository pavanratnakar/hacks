<?php
session_start();
if ($_GET["flickr"] == 'true') {
    $flickrLogin = true;
}
include_once ('../../min/utils.php');
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Flickr Love - Hack By Pavan Ratnakar</title>
        <!-- REGULAR META PROERTIES -->
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <meta name="keywords" content="Pavan Ratnakar, Pavan Ratnkar Applications, Flickr, Facebook, Migration" />
        <meta name="description" content="Flickr has increased storage space to 1 TB. So what are you waiting for? Take advantage of this simple App which migrates photos from Facebook to Flickr" />
        <meta name="author" content="Pavan Ratnakar" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <!-- END OF REGULAR META PROPERTIES -->
        <!-- OG META TAGS -->
        <meta property="og:title" content="Flickr Love - Hack By Pavan Ratnakar" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="http://www.pavanratnakar.com/pavan.jpg" />
        <meta property="og:description" content="Flickr has increased storage space to 1 TB. So what are you waiting for? Take advantage of this simple App which migrates photos from Facebook to Flickr" />
        <meta property="og:site_name" content="FlickrLove - Pavan Ratnakar Applications" />
        <meta property="og:url" content="http://www.pavanratnakar.com/hacks/flickrlove/">
        <!-- GOOGLE PLUS TAGS -->
        <meta itemprop="name" content="">
        <meta itemprop="description" content="Flickr has increased storage space to 1 TB. So what are you waiting for? Take advantage of this simple App which migrates photos from Facebook to Flickr">
        <meta itemprop="image" content="http://www.pavanratnakar.com/pavan.jpg">
        <!-- END OF GOOGLE PLUS TAGS -->

        <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link type="text/css" rel="stylesheet" media="all" href="<?php echo Minify_getUri('flickrlove_css') ?>"/>
    </head>
    <body class="<?php echo ($flickrLogin == true) ? 'flickr-login' : ''?>">
        <div id="fb-root"></div>
        <div class="container">
            <div class="masthead">
                <h3 class="muted">Flickr Lovee - By Pavan Ratnakar</h3>
            </div>
            <hr>
            <!-- Jumbotron -->
            <div class="jumbotron text-center">
                <h1>Hello! <span class="user-name">Guest</span></h1>
                <p class="lead">
                    Migrate all your albums from Facebook to Flickr
                </p>
                <a id="facebook-login" class="btn btn-large btn-success" href="javascript:void(0);">Login To Facebook</a>
                <a id="flickr-login" class="btn btn-inverse btn-large btn-success" href="flickrLogin.php">Login To Flickr</a>
            </div>
            <div class="user-albums-container" style="display:none;">
                <hr>
                <!-- Example row of columns -->
                <div class="row-fluid">
                    <div class="span12" id="user-albums"></div>
                </div>
            </div>
            <hr>
            <div class="footer">
                <p>&copy; Created by <a href="http://www.pavanratnakar.com" target="_blank">Pavan Ratnakar</a></p>
            </div>
        </div> <!-- /container -->
        <script type="text/javascript" src="<?php echo Minify_getUri('flickrlove_js') ?>"></script>
        <script type="text/javascript">
          var _gaq = _gaq || [];
          _gaq.push(['_setAccount', 'UA-22528464-1']);
          _gaq.push(['_setDomainName', 'pavanratnakar.com']);
          _gaq.push(['_trackPageview']);

          (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
          })();
        </script>
    </body>
</html>