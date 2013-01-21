YUI.add('pavan-flickr-view', function(Y){

	var defaults = {
        square : 'http://farm{farm}.staticflickr.com/{server}/{id}_{secret}_q.jpg',
        medium : 'http://farm{farm}.staticflickr.com/{server}/{id}_{secret}_m.jpg',
	    large  : 'http://farm{farm}.staticflickr.com/{server}/{id}_{secret}_z.jpg'
	};

	var FlickrView = function(){
		FlickrView.superclass.constructor.apply(this, arguments);
	};

	Y.extend(FlickrView, Y.View, {
		events:{
			'img.thumb':{
				click: function(e){
					//e.target.getData()['flickr-id'];
				},
				mouseover: function(){
					//e.target.getData()['flickr-id'];
				},
				mouseout: function(){
					//e.target.getData()['flickr-id'];
				}
			}
		},
		initializer: function(config){
			this.get('container').addClass('flickr').addClass('view');
		},
		render: function(data){
			var c = this.get('container'),
				t = this,
                img;

			c.set('innerHTML', '');	// this should point to the holder of the photos			

			if(Y.Lang.isValue(data.photos.photo)){
				Y.each(data.photos.photo, function(r){
					img = Y.Node.create('<a target="_blank" id="photo-'+r.id+'" href="http://www.flickr.com/photos/'+r.owner+'/'+r.id+'/"><img class="thumb" src="" data-flickr-id="' + r.id + '" alt="' + r.title + '"/></a>');
					c.appendChild(img);
					t.loadImageSrc(img.one('img'), t.url('square', r));
				});
			}
			else{
				c.set('innerHTML', 'No results');
			}
		},
		append: function(data){
			var t = this,
                img;

			if(Y.Lang.isValue(data.photos.photo)){
				Y.each(data.photos.photo, function(r){
					if(!Y.one('#photo-'+r.id)){
                        img = Y.Node.create('<a target="_blank" id="photo-'+r.id+'" href="http://www.flickr.com/photos/'+r.owner+'/'+r.id+'/"><img class="thumb" src="" data-flickr-id="' + r.id + '" alt="' + r.title + '"/></a>');
                        t.get('container').prepend(img);
                        t.loadImageSrc(img.one('img'), t.url('square', r));
					}
				});
			}
		},
        url:function(type, data){
            return Y.Lang.sub(defaults[type], data);
        },
		loadImageSrc:function(tag, src, callback){	//callback called with err
			var img = new Image();
			tag && tag.setStyle('opacity',0);

			img.onload = function(){
				if(tag){
					tag.set('src', src);					
					(new Y.Anim({node: tag, to:{opacity: 1}})).run();
					(callback|| function(){})(null);
				}
			};
			img.onerror = function(){
				tag && tag.hide(1000);
				(callback|| function(){})('couldn\'t load image');
			};
			img.src = src;
			return img;
		},
		query: function(options, callback){
			var t = this;
			this.get('model').query(options, function (data){
				if(options.refresh===false){
					t.append(data);
				} else {
					t.render(data);
				}
			});
		}
	});

	Y.namespace('pavan.Flickr');
	Y.pavan.Flickr.View = FlickrView;

}, '0.0.1',{
    requires:['view','pavan-flickr-model', 'anim']
});	