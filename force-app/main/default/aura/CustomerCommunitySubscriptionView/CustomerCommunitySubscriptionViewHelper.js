({
    // Fetch the subs from the Apex controller
    getSubList: function (component) {
        console.log('In getSubList');
        var action = component.get('c.getSubs');
        // Set up the callback
        action.setCallback(this, function (actionResult) {
            component.set('v.subs', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
    },

    // Generic Navigate to SObject
    viewSub: function (component, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": event.target.id
        });
        navEvt.fire();
    },


})