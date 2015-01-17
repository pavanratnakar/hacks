/**
 * @module bpp-gallery-view
 * @requires
*/
YUI.add('bpp-gallery-view',function(Y){

    var defaults = {
        types : ['1-5','2-5']
    };

    var GalleryView = function(config){
        GalleryView.superclass.constructor.apply(this, arguments);
    };

    GalleryView.ATTRS = {
        container : null,
        list : null
    };

    GalleryView.NAME = 'galleryView';
    GalleryView.NS = 'gallery';

    Y.extend(GalleryView, Y.View, {
        eventListeners : [],
        // Specify delegated DOM events to attach to the srpl-business container.
        events:{},
        /**
        * @method showImage
        * @return {void}
        */
        showImage: function(model){
            Y.one('#loading').removeClass('show');
            this.get('container').one('#photo-box-'+model.get('id'))
                .addClass('show');
        },
        /**
        * The initializer function will run when a view is instantiated
        * @method initializer
        * params {hash} config
        * @return {void}
        */
        initializer: function(config){
            var t = this,
                order = [],
                temp = 0;

            t.get('list').on('add',function(e){
                if (temp === 0) {
                    order = generateRandomSumArray(1,defaults.types.length,5);
                }
                var img = new Image();
                img.onload = function(){
                    t.showImage(e.model);
                };
                img.onabort = function(){
                    t.showImage(e.model);
                };
                img.onerror = function(){
                    t.showImage(e.model);
                };
                img.src = e.model.get('thumb');
                t.get('container').append(Y.Lang.sub(Y.one('#bbp-gallery-template').getHTML(), {
                    'id' : e.model.get('id'),
                    'type' : defaults.types[order[temp]-1],
                    'alt' : e.model.get('href'),
                    'src' : e.model.get('thumb'),
                    'href' : e.model.get('href'),
                    'desc' : e.model.get('title')
                }));
                temp++;
                if (temp === order.length) {
                    temp = 0;
                }
            });
        },
        /**
        * @method render
        * @return {void}
        */
        render: function(){
            Y.one('#loading').addClass('show');
            this.get('container').show();
        },
        /**
        * @method destructor
        * @return {void}
        */
        destructor : function(){},
        /**
        * @method clear
        * @return {void}
        */
        clear : function(){}
    });

    Y.namespace('bpp.Gallery');
    Y.bpp.Gallery.View = GalleryView;

}, '@VERSION@',{
    requires:[
        'view'
    ]
});