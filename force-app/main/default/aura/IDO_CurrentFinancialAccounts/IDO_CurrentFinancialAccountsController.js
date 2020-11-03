({
    doInit : function (component, event, helper) {
        helper.showSpinner(component);
        helper.callServer(
            component,
            "c.getRecordTypes",
            function (response) {
                helper.removeSpinner(component);
                console.log('account types');
                console.log(response);
                component.set("v.acocuntTypes", response);
            },
            { 
                recordId : component.get("v.recordId"),
                numberToShow : component.get("v.numberToShow")
            }
        );
    }
})