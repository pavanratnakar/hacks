YUI.add('pavan-flickr-model', function(Y){

    var defaults = {
        query : {
            bbox : 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key={apiKey}&privacy_filter={privacyFilter}&safe_search={safe_search}&has_geo={hasGeo}&bbox={bbox}&per_page={perPage}&accuracy={accuracy}&sort={sort}&radius={radius}&radius_units={radiusUnits}&format=json',
            latlon : 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key={apiKey}&privacy_filter={privacyFilter}&safe_search={safe_search}&has_geo={hasGeo}&lat={lat}&lon={lon}&per_page={perPage}&accuracy={accuracy}&sort={sort}&radius={radius}&radius_units={radiusUnits}&format=json',
            photoInfo : 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key={apiKey}&photo_id={photoId}&format=json',
            text : 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key={apiKey}&privacy_filter={privacyFilter}&safe_search={safe_search}&text={text}&per_page={perPage}&accuracy={accuracy}&sort={sort}&format=json'
        }
    };

    var FlickrModel = function(){
        FlickrModel.superclass.constructor.apply(this, arguments);
    };

    Y.extend(FlickrModel, Y.Model, {
        /**
        * @method queryPhotoInfo
        * @params {hash} options
        * @params {function }callback
        * @return {void}
        */
        queryPhotoInfo: function(options,callback){
            var t = this,
                query = Y.Lang.sub(defaults.query.photoInfo,{
                    photoId : options.photoId,
                    apiKey: 'b9cc47b0b2b841ef4ec10fb9eeb37402'
                });
            Y.jsonp(query,{
                on:{
                    success:function(data){
                        (callback|| function(){})(null, data);
                    },
                    failure:function(err){
                        callback(err);
                    },
                    timeout:function(err){
                        callback(err);
                    }
                }
            });
        },
        /**
        * @method query
        * @params {hash} options
        * @params {function }callback
        * @return {void}
        */
        query: function(options,callback){
            var t = this,
                query = null;

            if(options.geo){
                query = Y.Lang.sub(defaults.query.latlon,{
                    apiKey: 'febe9ecc58779b03d17ec7c0828eca68',
                    lat : options.geo.get('lat'),
                    lon : options.geo.get('lon'),
                    privacyFilter : 1,
                    safe_search : 1,
                    perPage : options.perPage || 10,
                    hasGeo : 1,
                    accuracy : 10,
                    sort : 'interestingness-desc',
                    radiusUnits : "mi",
                    radius : "20"
                });
            } else if(options.text) {
                query = Y.Lang.sub(defaults.query.text,{
                    apiKey: 'febe9ecc58779b03d17ec7c0828eca68',
                    text : options.text,
                    privacyFilter : 1,
                    safe_search : 1,
                    perPage : options.perPage || 10,
                    accuracy : 10,
                    sort : options.sort || 'interestingness-desc'
                });
            } else {
                query = Y.Lang.sub(defaults.query.bbox,{
                    apiKey: 'febe9ecc58779b03d17ec7c0828eca68',
                    bbox : options.bbox,
                    privacyFilter : 1,
                    safe_search : 1,
                    perPage : options.perPage || 10,
                    hasGeo : 1,
                    accuracy : 10,
                    sort : 'interestingness-desc',
                    radiusUnits : "mi",
                    radius : "20"
                });
            }
            Y.jsonp(encodeURI(query)+'&jsoncallback={callback}',callback);
        }
    });

    Y.namespace('pavan.Flickr');
    Y.pavan.Flickr.Model = FlickrModel;

}, '0.0.1',{
    requires:['model','jsonp']
});