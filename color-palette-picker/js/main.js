$(document).ready(function() {
    var color, 
        backgound;

    $("body").delegate(".picker", "mouseenter", function(e) {
        var t = $(this).closest('.photo-box');
        color = $(this).css('color');
        background = $(this).css('background-color');
        t.find(".background-match").each(function(){
            $(this).css('background-color',background);
        });
        t.find(".text-match").each(function(){
            $(this).css('color',color);
        });
    });
});