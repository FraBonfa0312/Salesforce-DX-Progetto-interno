({
    // Fetch the subs from the Apex controller
    getInvList: function (component) {
        console.log('In getInvList');
        var action = component.get('c.getInvoices');
        // Set up the callback
        action.setCallback(this, function (actionResult) {
            component.set('v.invs', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
    },

    // Generic Navigate to SObject
    viewInv: function (component, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": event.target.id
        });
        navEvt.fire();
    },
})