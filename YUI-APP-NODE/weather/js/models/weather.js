YUI.add('weatherModel',function(Y){
    Y.Weather = Y.Base.create('weather', Y.Model, [],{
        sync: function (action, options, callback) {
            var  t = this,
                condition;

            switch (action) {
                case 'create':
                Y.YQL('select * from weather.forecast where location='+options.woeid, function(r) {
                    r = r || {};
                    if (r.query && r.query.results.channel.item.condition) {
                        condition = r.query.results.channel.item.condition;
                        t.setAttrs({
                            'location' : r.query.results.channel.location,
                            'code' : condition.code,
                            'text' : condition.text,
                            'temp' : condition.temp
                        });
                    }
                    callback(null, r);
                    return;
                });
                case 'read':
                return;

                case 'update':
                return;

                case 'delete':
                return;

                default:
                callback('Invalid action');
          }
      },
        // Provides an implementation for a Model/ModelList's `parse()` method which
        // simply returns the `data` object or array from the response JSON.
        parse: function (res) {
            return res.data;
        }
    },{
        ATTRS:{
            location : null,
            code : null,
            text : null,
            temp : null
        }
    }
    );
}, '0.0.1', { requires: ['model','yql']});