({
    doInit : function(component, event, helper) {
        helper.callServer(
            component,
            "c.getPolicies",
            function (response) {
                component.set("v.policies", response);
            },
            { 
                accountId : component.get('v.recordId')
            }
        );
    },
    handleSelect : function(component, event, helper) {
        var policyId = event.getParam('selectedId');
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({ 
            "recordId":     policyId, 
            "slideDevName": "detail"
        });
        navEvt.fire();
    }
})