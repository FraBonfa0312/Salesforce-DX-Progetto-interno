({
    doInit : function(component, event, helper) {
        helper.callServer(
            component,
            "c.getVehicle",
            function (response) {
                component.set("v.vehicle", response);
                //helper.onResize(component, helper);
            },
            { 
                vehicleId : component.get("v.recordId") 
            }
        );
    },
    selectPolicy : function(component, event, helper) {
        var selectEvent = component.getEvent('selectVehicleEvent');
        selectEvent.setParams({
            'selectedId' : component.get('v.recordId')
        });
        selectEvent.fire();
    }
})