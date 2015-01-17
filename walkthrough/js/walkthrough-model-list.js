YUI.add('pavan-walkthrough-model-list', function(Y){

    var PavanWalkThroughModelList = function(){
        PavanWalkThroughModelList.superclass.constructor.apply(this, arguments);
    };

    Y.extend(PavanWalkThroughModelList, Y.ModelList, {
        // This tells the list that it will hold instances of the ListingModel class.
        model : Y.Pavan.WalkThrough.Model
    });

    Y.namespace('Pavan.WalkThrough.Model.List');
    Y.Pavan.WalkThrough.Model.List = PavanWalkThroughModelList;

},'@VERSION@',{requires:['model-list', 'pavan-walkthrough-model']});