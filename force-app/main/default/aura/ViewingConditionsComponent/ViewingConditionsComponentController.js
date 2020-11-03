({
	doInit : function(component, event, helper) {
        helper.getAllViewingConditions(component);
        //helper.getAllReviewFees(component);
	},
    expand :function(cmp, event, helper) {
        console.log(event);
        var id = event.srcElement.id;
        console.log(id);
        //var cmpTarget = cmp.find('more'+id);
        //console.log(cmpTarget);
        var more = document.getElementById('more'+id);
        helper.toggleHidden(cmp, more);
        //more.addClass(cmpTarget, 'hidden');

	},
    expandAll:function(cmp, event, helper) {
        console.log("expand");
        helper.toggleExpandAll(cmp);
        //more.addClass(cmpTarget, 'hidden');

	},
})