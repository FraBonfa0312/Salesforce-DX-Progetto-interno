({
    doInit: function (component, event, helper) {
        // Check if the current User is logged in
        var action = component.get('c.isRendered');
        action.setCallback(this, function (result) {
            component.set('v.rendered', result.getReturnValue());
            console.log(result.getReturnValue());
        });
        $A.enqueueAction(action);
        // Fetch the sub list from the Apex controller   
        helper.getSubList(component);
    },

    handleView: function (component, event, helper) {
        // Fetch the sub list from the Apex controller
        helper.viewSub(component, event, helper);
    },

})