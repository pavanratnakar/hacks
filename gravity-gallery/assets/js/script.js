YUI().use('pavan-flickr-view',function(Y){  
    var flickr = new Y.pavan.Flickr.View({
        model     : new Y.pavan.Flickr.Model(),
        container : '#gallery'
    });
    var height = document.body.clientHeight || document.documentElement.offsetHeight || window.innerHeight,
        width = document.body.clientWidth || document.documentElement.offsetWidth || window.innerWidth,
        verticalPics = Math.round(width/160)-1 || 1;
    flickr.query({
        text : 'Earth',
        perPage : verticalPics*2,
        sort : 'interestingness-desc'
    });
});
$(function(){
    $('#gravityButton').click(function(e){
        e.preventDefault();
        // Turn on the gravity!
        $('body').jGravity({
            target: '#gallery li',
            ignoreClass: 'ignoreMe',
            weight: 25,
            depth: 5,
            drag: true
        });
        // Disabling clicking on the photos (so they can
        // be dragged without redirecting the browser)
        $('#gallery li').click(function(e){
            e.preventDefault()
        });
        // Remove some of the elements as they get in the way
        $('footer, #gravityButton').remove();
    });
});