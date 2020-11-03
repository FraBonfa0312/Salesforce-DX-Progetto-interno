({
    navEvent : function(component, event, helper) {
        var thing = component.get("v.thing");
        var myEvent = $A.get("e.force:navigateToSObject");
        myEvent.setParams({
            "recordId": thing.Id
        });
        myEvent.fire();
    }
})