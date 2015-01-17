var flickrLove = {
    initEvents : function(){
        var t = this;
        $('#facebook-login').on('click',function(){
            FB.login(function(response) {
                t.updateFacebookDependents(response);
            },{scope: 'user_photos'});
        });
        $("body").delegate(".migrate", "click", function() {
            var photos=[],
                t = $(this),
                form = t.closest('.content-container').children('form'),
                privacy_options = $(this).closest('.content-container').children('form').serialize();

            FB.api(t.attr('id').replace('migrate-','') + "/photos", function(response) {
                for (photo in response.data){
                    photos.push(response.data[photo].source);
                }
                $.ajax({
                    url: "photoUpload.php",
                    type: "POST",
                    dataType: "json",
                    data : 'photos='+photos.join(',')+'&'+privacy_options,
                    cache: true,
                    beforeSend: function() {
                        t.closest('.content-container').html('<div class="alert alert-info">Photo migration in progress. Please check your Flickr account after some time.</div>');
                    },
                    success:function(data) {
                        t.closest('.content-container').html('<div class="alert alert-success">Wolaaaaa...Photo upload process completed. Please check your Flickr account after some time.</div>');
                    },
                    error:function(data) {
                        t.closest('.content-container').html('<div class="alert alert-error">Sorry we are experiencing technical issues. Please try after some time</div>');
                    }
                });
            });
        });
    },
    init : function(){
        this.initEvents();
    },
    updateFacebookDependents : function(response){
        if (response.authResponse) {
            $('#facebook-login').hide();
            FB.api('/me', function(response) {
                $('.user-name').html(response.name);
            });
            //Get a list of all the albums
            FB.api('/me/albums', function (response) {
                console.log(response);
                $('.user-albums-container').show();
                for (album in response.data) {
                    $('#user-albums').append(
                        '<div class="facebook-albums span4">\
                        <h3>'+response.data[album].name+'</h3>\
                        <h4>Privacy Setting : '+response.data[album].privacy+'</h4>\
                        <div class="image-container">\
                            <img src="https://graph.facebook.com/'+response.data[album].cover_photo+'/picture" alt=""/>\
                            <div class="image-container-footer">\
                                <p>Photos : '+response.data[album].count+'</p>\
                            </div>\
                        </div>\
                        <div class="content-container">\
                            <form class="privacy-options facebook-login-required">\
                                <label for="is_public" class="checkbox inline">\
                                    <input type="checkbox" name="is_public" class="is_public"> public\
                                </label>\
                                <label for="is_friend" class="checkbox inline">\
                                    <input type="checkbox" name="is_friend" class="is_friend"> friend\
                                </label>\
                                <label for="is_family" class="checkbox inline">\
                                    <input type="checkbox" name="is_family" class="is_family"> family\
                                </label>\
                            </form>\
                            <p><a class="btn btn-info" target="_blank" href="'+response.data[album].link+'">View Album &raquo;</a></p>\
                            <p class="facebook-login-required"><a id="migrate-'+response.data[album].id+'" class="btn btn-primary migrate" href="javascript:void(0);">Migrate &raquo;</a></p>\
                            </div>\
                        </div>'
                    );
                  // // Find the Profile Picture album
                  // if (response.data[album].name == "Profile Pictures") {
                  //   // Get a list of all photos in that album.
                  //   FB.api(response.data[album].id + "/photos", function(response) {
                  //     //The image link
                  //     image = response.data[0].images[0].source;

                  //   });
                  // }
                }
            });
        } else {
            $('#facebook-login').show();
            //console.log('User cancelled login or did not fully authorize.');
        }
    },
    loadFacebookSDK : function(){
        var t = this;
        window.fbAsyncInit = function() {
            // init the FB JS SDK
            FB.init({
              appId      : '100184653364726',                        // App ID from the app dashboard
              //channelUrl : '//www.pavanratnakar.com/channel.html', // Channel file for x-domain comms
              status     : true,                                 // Check Facebook Login status
              xfbml      : true                                  // Look for social plugins on the page
            });
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    t.updateFacebookDependents(response);
                } else if (response.status === 'not_authorized') {
                    $('#facebook-login').show();
                    // the user is logged in to Facebook, 
                    // but has not authenticated your app
                } else {
                    $('#facebook-login').show();
                    // the user isn't logged in to Facebook.
                }
            });
        };
        // Load the SDK asynchronously
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

};
flickrLove.loadFacebookSDK();
$(document).ready(function(){
    flickrLove.init();
});