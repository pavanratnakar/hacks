<?php
require_once('includes/colorsofimage.class.php');
require_once("lib/phpFlickr/phpFlickr.php");
$f = new phpFlickr("12da91e2fe62e022791c958fdc4ef82c");
//$f->enableCache("fs", "/home/pavanrat/public_html/hacks/color-palette-picker/cache/");
$f->enableCache("db", "mysql://pavanrat_pavan:28pepsy1998@localhost/pavanrat_main");
?>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="Pavan Ratnakar, Pavan Ratnkar Applications, Flickr , Color Palette, PURE" />
        <meta name="description" content="Image Color Palette Picker is used to extract a color palette and text color from a given image and build buttons, captions etc" />
        <meta name="author" content="Pavan Ratnakar" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <meta property="og:title" content="Image Color Palette Picker- by Pavan Ratnakar" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Image Color Palette Picker is used to extract a color palette and text color from a given image and build buttons, captions etc" />
        <meta property="og:image" content="http://www.pavanratnakar.com/pavan.jpg" />
        <meta property="og:site_name" content="Pavan Ratnakar Applications" />
        <meta property="og:url" content="http://www.pavanratnakar.com/hacks/color-palette-picker/"/>
        <meta property="fb:admins" content="100000417819011" />
        <title>Image Color Palette Picker- by Pavan Ratnakar</title>
        <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.1.0/pure-min.css" />
        <link rel="stylesheet" href="css/main.css" />
    </head>
    <body>
        <div class="pure-g-r">
            <div class="pure-u-1">
                <div class="header">
                    <h1>Image Color Palette Picker</h1>
                    <h2>Pavan Ratnakar</h2>
                </div>
            </div>
        </div>
        <div class="content pure-g-r">
            <div class="content pure-u-1">
                <div class="pure-g-r">
                <?php
                    // Search for most interesting photos of today
                    $photos_interesting = $f->interestingness_getList(NULL, NULL, NULL, 9, 1);
                    foreach ((array)$photos_interesting['photos']['photo'] as $photo) {
                        $src = $f->buildPhotoURL($photo, "medium");
                        $colors_of_image = new ColorsOfImage($src);
                        $colors = $colors_of_image->getProminentColors();
                        $background_color = $colors_of_image->getBackgroundColor();
                        $text_color = $colors_of_image->color_inverse($background_color);
                        ?>
                        <div class="pure-u-1-3">
                            <div class="photo-box">
                                <a href="<?php echo 'https://www.flickr.com/photos/'.$photo[owner].'/'.$photo[id].''; ?>">
                                    <img alt="<?php echo $photo[title]; ?>" src="<?php echo $src ?>" />
                                </a>
                                <div class="strip background-match text-match" style="background-color:<?php echo $background_color;?>;color:<?php echo $text_color;?>">
                                    <div class="gradiant-container">
                                        <div class="gradiant pure-g-r">
                                            <?php foreach ($colors as $color) : ?>
                                                <div class="picker" style="background-color:<?php echo $color ?>;color:<?php echo $colors_of_image->color_inverse($color); ?>"></div>
                                            <?php endforeach; ?>
                                            <div class="picker" style="background-color:<?php echo $background_color ?>;color:<?php echo $text_color; ?>"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content text-match" style="color:<?php echo $text_color;?>">
                                    <h2><?php echo $photo[title]; ?></h2>
                                </div>
                                <div class="buttons">
                                    <a class="pure-button background-match text-match" style="background-color:<?php echo $background_color;?>;color:<?php echo $text_color;?>">Dummy Button</a>
                                    <a class="pure-button background-match text-match" style="background-color:<?php echo $background_color;?>;color:<?php echo $text_color;?>">Dummy Button</a>
                                    <a class="pure-button background-match text-match" style="background-color:<?php echo $background_color;?>;color:<?php echo $text_color;?>">Dummy Button</a>
                                </div>
                            </div>
                        </div>
                <?php } ?>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.js"></script>
        <script src="js/main.js"></script>
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