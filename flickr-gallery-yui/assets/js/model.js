/**
 * Review Model
 * @module bpp-gallery-model
*/
YUI.add('bpp-gallery-model', function(Y){
    var Gallery = function(){
        Gallery.superclass.constructor.apply(this, arguments);
    };

    // Attributes and static properties for bpp-gallery model which we are consuming
    Gallery.ATTRS = {};
    Gallery.NAME = 'gallery';

    Y.extend(Gallery, Y.Model,{
        /**
        * @method initializer
        * @return {void}
        */
        initializer: function(e){}
    },{
        /**
        * statics
        * @method validate
        * @return {void}
        */
        validate:function(){}
    });

    Y.namespace('bpp.Gallery');
    Y.bpp.Gallery.Model = Gallery;

},'@VERSION@',{requires:['model']});