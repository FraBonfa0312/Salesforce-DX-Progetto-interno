({
    createItem: function (component, event, helper) {
        var contractId = event.target.id;
        var action = component.get("c.fireAmend");

        var toastEvent = $A.get("e.force:showToast");
        var urlEvent = $A.get("e.force:navigateToURL");

        component.set("v.showSpinner", true);

        action.setParams({
            "contractId": contractId
        });

        action.setCallback(this, function (response) {

            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Contract Modification Started");
                console.log(response.getReturnValue());

                setTimeout(function () {
                    component.set("v.showSpinner", false);
                }, 1500);

                toastEvent.setParams({
                    "title": "Success",
                    "message": "Contract Modification Started",
                    "type": "success"
                });
                toastEvent.fire()

                urlEvent.setParams({
                    "url": "/sfdcpage/%2Fapex%2FSBQQ__sb%3F%26id%3D" + response.getReturnValue()
                });

                urlEvent.fire();

            } else {
                console.log("Error Modifying Contract!");

                setTimeout(function () {
                    component.set("v.showSpinner", false);
                }, 1500);

                toastEvent.setParams({
                    "title": "Error",
                    "message": "Error Modifying Contract!",
                    "type": "error"
                });
                toastEvent.fire()

            }
        });
        $A.enqueueAction(action);
    },



    cancelContract: function (component, event, helper) {
        var contractId = event.target.id;
        var action = component.get("c.fireCancel");

        var toastEvent = $A.get("e.force:showToast");
        var urlEvent = $A.get("e.force:navigateToURL");

        component.set("v.showSpinner", true);

        action.setParams({
            "contractId": contractId
        });

        action.setCallback(this, function (response) {

            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Contract Cancellation Started");
                console.log(response.getReturnValue());

                setTimeout(function () {
                    component.set("v.showSpinner", false);
                }, 1500);

                toastEvent.setParams({
                    "title": "Success",
                    "message": "Contract Cancellation Started",
                    "type": "success"
                });
                toastEvent.fire()

                urlEvent.setParams({
                    "url": "/sfdcpage/%2Fapex%2FSBQQ__sb%3F%26id%3D" + response.getReturnValue()
                });

                urlEvent.fire();

            } else {
                console.log("Error Cancelling Contract!");

                setTimeout(function () {
                    component.set("v.showSpinner", false);
                }, 1500);

                toastEvent.setParams({
                    "title": "Error",
                    "message": "Error Cancelling Contract!",
                    "type": "error"
                });
                toastEvent.fire()

            }
        });
        $A.enqueueAction(action);
    },


    // Fetch the contracts from the Apex controller
    getContractList: function (component) {
        console.log('In getContractList');
        var action = component.get('c.getContracts');
        action.setCallback(this, function (actionResult) {
            component.set('v.contracts', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
    },


    // Generic Navigate to SObject
    viewContract: function (component, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": event.target.id
        });
        navEvt.fire();
    },

})