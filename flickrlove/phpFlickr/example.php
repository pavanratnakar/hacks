<?php
/* Last updated with phpFlickr 1.3.2
 *
 * This example file shows you how to call the 100 most recent public
 * photos.  It parses through them and prints out a link to each of them
 * along with the owner's name.
 *
 * Most of the processing time in this file comes from the 100 calls to
 * flickr.people.getInfo.  Enabling caching will help a whole lot with
 * this as there are many people who post multiple photos at once.
 *
 * Obviously, you'll want to replace the "<api key>" with one provided 
 * by Flickr: http://www.flickr.com/services/api/key.gne
 */

require_once("phpFlickr.php");
// Create new phpFlickr object
$f = new phpFlickr("12da91e2fe62e022791c958fdc4ef82c","8ae2a4dd3fef2b6c");
$f->auth();
$token = $f->auth_checkToken();
 
// Find the NSID of the authenticated user
$nsid = $token['user']['nsid'];
 
// Get the friendly URL of the user's photos
$photos_url = $f->urls_getUserPhotos($nsid);
 
// Get the user's first 36 public photos
$photos = $f->photos_search(array("user_id" => $nsid, "per_page" => 36));
 
// Loop through the photos and output the html
foreach ((array)$photos['photo'] as $photo) {
	echo "<a href=$photos_url$photo[id]>";
	echo "<img border='0' alt='$photo[title]' ".
		"src=" . $f->buildPhotoURL($photo, "Square") . ">";
	echo "</a>";
	$i++;
	// If it reaches the sixth photo, insert a line break
	if ($i % 6 == 0) {
		echo "<br>\n";
	}
}
 
?>
?>