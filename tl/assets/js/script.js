$(function(){
    var dataObject = {
        "timeline":
        {
            "headline":"Tom Cruise Timeline",
            "type":"default",
            "startDate":"1962,1",
            "text":"<i>Tom Cruise</i>",
            "asset":
            {
                "media":"",
                "credit":"",
                "caption":""
            },
            "date": [
                {
                    "startDate":"1962,1",
                    "headline":"Video",
                    "text":"",
                    "asset":
                    {
                        "media":" https://www.youtube.com/watchv=uE3JMfuPFdQ",
                        "credit":"",
                        "caption":""
                    }
                },
                {
                    "startDate":"1962,6",
                    "headline":"Born on July 3, 1962 in Syracuse, New York",
                    "text":"",
                    "asset":
                    {
                        "media":"http://3.bp.blogspot.com/_29WlDIl0Qbo/TFHO2lAxIsI/AAAAAAAAAxE/LwYl87gx-xs/s1600/Baby+Grace.jpg",
                        "thumbnail":"http://3.bp.blogspot.com/_29WlDIl0Qbo/TFHO2lAxIsI/AAAAAAAAAxE/LwYl87gx-xs/s1600/Baby+Grace.jpg",
                        "credit":"",
                        "caption":""
                    }
                }
            ]
        }
    };
    $.ajax({
        url: "http://www.pureexample.com/backend/ajax_crossdomain.aspx",
        dataType: 'jsonp',
        crossDomain: true,
        data: '',
        success: function(){
            console.log('success');
        },
        error: function(){
            console.log('error');
        }
    });
    createStoryJS({
        type: 'timeline',
        width: '100%',
        height: '100%',
        source:  dataObject,
        embed_id: 'timeline'
    });
});