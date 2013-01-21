// NO OTHER MODULES allowed to be loaded, unless necessary for demo purpose
YUI().use('pavan-flickr-view',function(Y){	
	var flickr = new Y.pavan.Flickr.View({
		model     : new Y.pavan.Flickr.Model(),
		container : '#container'
	});

    var height = document.body.clientHeight || document.documentElement.offsetHeight || window.innerHeight,
        width = document.body.clientWidth || document.documentElement.offsetWidth || window.innerWidth,
        verticalPics = Math.round(width/160)-1 || 1,
        horizontalPics = (Math.round(height/160)-1) || 3;

	flickr.query({
		text : 'Endeavor Shuttle NASA',
		perPage : verticalPics*horizontalPics,
		sort : 'date-posted-desc'
	});

	setInterval(function(e){
		flickr.query({
			text : 'Endeavor Shuttle NASA',
			perPage : 10,
			refresh : false,
			sort : 'date-posted-desc'
		});
	}, '5000');
});