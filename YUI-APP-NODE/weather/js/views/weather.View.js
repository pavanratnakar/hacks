YUI.add('weatherView',function(Y){
    Y.WeatherView = Y.Base.create('weatherView', Y.View, [], {
        weatherIconMap : [
            'storm', 'storm', 'storm', 'lightning', 'lightning', 'snow', 'hail', 'hail',
            'drizzle', 'drizzle', 'rain', 'rain', 'rain', 'snow', 'snow', 'snow', 'snow',
            'hail', 'hail', 'fog', 'fog', 'fog', 'fog', 'wind', 'wind', 'snowflake',
            'cloud', 'cloud_moon', 'cloud_sun', 'cloud_moon', 'cloud_sun', 'moon', 'sun',
            'moon', 'sun', 'hail', 'sun', 'lightning', 'lightning', 'lightning', 'rain',
            'snowflake', 'snowflake', 'snowflake', 'cloud', 'rain', 'snow', 'lightning'
        ],
        initializer : function(e){
            var t = this;

            if (t.get('model').get('code')) {
                Y.io('/hacks/YUI-APP-NODE/weather/js/views/templates/weather.Template',{
                    on:{
                        complete:function(id,response){
                            var weatherTemplate = Y.Handlebars.compile(response.responseText);
                            t.get('container').one('.weather').setContent(weatherTemplate({
                                'code' : t.weatherIconMap[t.get('model').get('code')],
                                'text' : t.get('model').get('text'),
                                'temp' : t.get('model').get('temp')
                            })).addClass('loaded');
                        }
                    }
                });
                Y.io('/hacks/YUI-APP-NODE/weather/js/views/templates/location.Template',{
                    on:{
                        complete:function(id,response){
                            var locationTemplate = Y.Handlebars.compile(response.responseText);
                            t.get('container').one('.location').setContent(locationTemplate({
                                'location' : t.get('model').get('location')
                            }));   
                        }
                    }
                });
            } else {
                Y.io('/hacks/YUI-APP-NODE/weather/js/views/templates/error.Template',{
                    on:{
                        complete:function(id,response){
                            var errorTemplate = Y.Handlebars.compile(response.responseText);
                            t.get('container').one('.weather')
                            .setContent(errorTemplate())
                            .addClass('error');
                        }
                    }
                });
                t.get('container').one('.location')
                .empty()
                .hide();
            }
        },
        render : function(){
            return this;
        }
    });
}, '0.0.1', { requires: ['view','io-base','weatherModel','handlebars','weatherCss']});