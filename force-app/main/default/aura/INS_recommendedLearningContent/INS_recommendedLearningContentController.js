({
    addRecommendation : function(component, event, helper) {
       	//var agentName = component.get("v.agentName");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": 'success',
            "title": "Success!",
            "message": "This trail was successfully sent to Frank Levin."
        });
        toastEvent.fire();
        var cmpTarget = component.find("firstRecco");
        //$A.util.addClass(cmpTarget, 'slds-hidden');
    },
    
})