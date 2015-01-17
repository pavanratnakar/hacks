/**
 * Create a new pavan-walkthrough view class that extends Y.View
 * @module pavan-walkthrough
 * @requires
    view
*/
YUI.add('pavan-walkthrough-view',function(Y){

    var PavanWalkThroughView = function(){
        PavanWalkThroughView.superclass.constructor.apply(this, arguments);
    };

    // Attributes and static properties for myc-context-menu View.
    PavanWalkThroughView.ATTRS = {
        overlay : {
            valueFn: function(){
                return new Y.Overlay({
                    width:"16em",
                    zIndex:2
                });
            }
        },
        modelList : {
            valueFn: function(){
                return new Y.Pavan.WalkThrough.Model.List();
            }
        },
        features : null
    };

    PavanWalkThroughView.NAME = 'pavanWalkThrough';
    PavanWalkThroughView.NS = 'pavan';

    Y.extend(PavanWalkThroughView, Y.View, {
        // Assign base template that will be used to render view
        template: '',
        events:{},
        eventListeners:[],
        /**
        * @method overlayEvents
        * @return {void}
        */
        overlayEvents : function(){
            var t = this,
                overlayPreviousListener,
                overlayNextListener,
                overlayCloseListener;

            overlayPreviousListener =  t.get('overlay').get('boundingBox').delegate({
                'click' : function(e){
                    t._previous(e);
                }
            },'.previous');
            t.eventListeners.push(overlayPreviousListener);

            overlayNextListener =  t.get('overlay').get('boundingBox').delegate({
                'click' : function(e){
                    t._next(e);
                }
            },'.next');
            t.eventListeners.push(overlayNextListener);

            overlayCloseListener =  t.get('overlay').get('boundingBox').delegate({
                'click' : function(e){
                    t._close(e);
                }
            },'.close');
            t.eventListeners.push(overlayCloseListener);
        },
        /**
        * @method initEvents
        * @return {void}
        */
        initEvents : function(){
            var t = this,
                keydownListener = Y.one('body').on('keydown', function(e){
                switch(e.keyCode) {
                    case 27: // escape key press - for accessibility
                        t._close();
                    break;

                    default:
                      // do noting
                    break;
                }
            });
            t.eventListeners.push(keydownListener);
            t.overlayEvents();
        },
        /**
        * The initializer function will run when a view is instantiated
        * @method initializer
        * params {hash} config
        * @return {void}
        */
        initializer : function(config){
            var t = this;

            t.eventListeners=[];
            t.initEvents();
            t.get('modelList').reset();// reset model list

            Y.Array.each(t.get('features'),function(value,index){
                t.get('modelList').create(value);
            });
        },
        /**
        * @method renderOverlay
        * @return {void}
        */
        renderOverlay : function(e){
            e = e || {};
            if (e.get('container')) {
                var a = Y.WidgetPositionAlign,
                    footerContent = '<ul class="actions clearfix">',
                    index = this.get('modelList').indexOf(e);

                if (index !== 0) {
                    footerContent += '<li><button title="Previous" type="button" class="pure-button-primary pure-button previous f-left">Previous</button></li>';
                }
                if (index !== this.get('modelList').size()-1) {
                    footerContent += '<li><button title="Next" type="button" class="pure-button-primary pure-button next f-left">Next</button></li>';
                }
                footerContent += '</ul>';
                this.get('overlay').setAttrs({
                    headerContent : e.get('title') || 'This is our new feature',
                    bodyContent : '<div class="description">'+e.get('description')+'</div><button title="Close" type="button" class="close noborder">X</button>',
                    footerContent : footerContent,
                    align : {
                        node : e.get('container'),
                        points:[a.TL, a.RC]
                    }
                });
                this.get('overlay').get('boundingBox').set('id',e.get('id'));
                this.get('overlay').render(Y.one(e.container));
            } else {
                Y.log('Error : Div not found');
            }
        },
        /**
        * @method render
        * @return {void}
        */
        render: function(){
            this.renderOverlay(this.get('modelList').item(0));
        },
        /**
        * @method destructor
        * @return {void}
        */
        destructor : function(){
            Y.Array.each(this.eventListeners,function(e,i){
                e.detach();
                e = null;
            });
            this.eventListeners = [];
        },

        // -- Event Handlers -------------------------------------------------------

        /**
        * @method _previous
        * @params {e} e
        * @return {void}
        */
        _previous : function(e){
            var id = e.currentTarget.ancestor('.yui3-overlay').get('id'),
                index = this.get('modelList').indexOf(this.get('modelList').getById(id));

            this.renderOverlay(this.get('modelList').item(index-1));
        },
        /**
        * @method _next
        * @params {e} e
        * @return {void}
        */
        _next : function(e){
            var id = e.currentTarget.ancestor('.yui3-overlay').get('id'),
                index = this.get('modelList').indexOf(this.get('modelList').getById(id));

            this.renderOverlay(this.get('modelList').item(index+1));
        },
        /**
        * @method _close
        * @params {e} e
        * @return {void}
        */
        _close : function(e){
            this.get('overlay').hide();
        }
    });

    Y.namespace('Pavan.WalkThrough');
    Y.Pavan.WalkThrough.View = PavanWalkThroughView;

}, '@VERSION@',{
    requires:['view','overlay','pavan-walkthrough-model-list']
});