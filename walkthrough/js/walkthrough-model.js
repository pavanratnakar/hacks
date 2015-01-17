YUI.add('pavan-walkthrough-model', function(Y){
    var PavanWalkThroughModel = function(){
        PavanWalkThroughModel.superclass.constructor.apply(this, arguments);
    };
    // Attributes and static properties for myc-business model.
    PavanWalkThroughModel.ATTRS = {
        id : null,
        container : null,
        title : null,
        description : null
    };

    PavanWalkThroughModel.NAME = 'pavanWalkThroughModel';

    Y.extend(PavanWalkThroughModel, Y.Model,{
        /**
        * @method initializer
        * params {hash} config
        * @return {void}
        */
        initializer : function(config){
            if (!config.id) {
                this.set('id','overlay-'+config.container.replace('#',''));
            }
        }
    });

    Y.namespace('Pavan.WalkThrough.Model');
    Y.Pavan.WalkThrough.Model = PavanWalkThroughModel;

},'@VERSION@',{requires:['model']});