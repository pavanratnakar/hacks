$(function(){
    var timeline = new VMM.Timeline();
    timeline.init('data.json');
    $('#timeline').css({'height':$('#timeline').height()});
});