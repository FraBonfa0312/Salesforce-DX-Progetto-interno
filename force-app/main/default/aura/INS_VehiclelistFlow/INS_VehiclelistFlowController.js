({
    doInit : function(component, event, helper) {
        helper.callServer(
            component,
            "c.getVehicles",
            function (response) {
                component.set("v.vehicles", response);
            },
            { 
                policyId : component.get("v.recordId") 
            }
        );
    },
    handleSelect : function(component, event, helper) {
        const vehicleId = event.getParam('selectedId');
        const assetId = event.getParam('assetId');
        console.log('Event handler: asset Id: ' + assetId);
        component.set('v.selectedVehicleId', vehicleId);
        component.set('v.selectedAssetId', assetId);
       
    }
})