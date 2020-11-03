({
    doInit: function (component, event, helper) {
        // Check if the current User is logged in
        var action = component.get('c.isRendered');
        action.setCallback(this, function (result) {
            component.set('v.rendered', result.getReturnValue());
            console.log(result.getReturnValue());
        });
        $A.enqueueAction(action);

        // Get Contracts for User's Account
        helper.getContractList(component);
    },

    handleClick: function (component, event, helper) {
       	console.log("Modifying...");
        helper.createItem(component, event, helper);
    },


    handleCancel: function (component, event, helper) {
        console.log("Cancelling...");
        helper.cancelContract(component, event, helper);
    },


    handleView: function (component, event, helper) {
        console.log("Navigating to Contract...");
        helper.viewContract(component, event, helper);
    },

})