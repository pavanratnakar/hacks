/**
 * @module bpp-gallery-model-list
 * @requires model-list,bpp-gallery-model
*/
YUI.add('bpp-gallery-model-list', function(Y){

    var GalleryModelList = function(){
        GalleryModelList.superclass.constructor.apply(this, arguments);
    };

    Y.extend(GalleryModelList, Y.ModelList, {
        // This tells the list that it will hold instances of the Gakkery Model class.
        model : Y.bpp.Gallery.Model
    });

    Y.namespace('bpp.Gallery.List');
    Y.bpp.Gallery.Model.List = GalleryModelList;

},'@VERSION@',{requires:['model-list', 'bpp-gallery-model']});