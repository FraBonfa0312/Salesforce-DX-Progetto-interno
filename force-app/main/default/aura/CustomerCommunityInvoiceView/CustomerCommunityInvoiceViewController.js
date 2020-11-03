({
    doInit: function (component, event, helper) {
        // Check if the user is logged in
        var action = component.get('c.isRendered');
        action.setCallback(this, function (result) {
            component.set('v.rendered', result.getReturnValue());
            console.log(result.getReturnValue());
        });
        $A.enqueueAction(action);

        // Fetch the Invoice list from the Apex controller   
        helper.getInvList(component);
    },

    handleView: function (component, event, helper) {
        // Navigate to the Invoice detail page
        helper.viewInv(component, event, helper);
    },

})