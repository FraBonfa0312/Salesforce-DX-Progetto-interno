({
    handleDoInIt: function (component, event, helper) {
        var action = component.get("c.getOpportunityAlerts");
        action.setParams({
            parentId: component.get("v.recordId"),
            recordId: component.get("v.recordId"),
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.Alerts", response.getReturnValue());
                //console.log(response.getReturnValue());
                // alert(response.getReturnValue()[0].Name); 
            }
        });
        //console.log(action);
        $A.enqueueAction(action);
    },
})