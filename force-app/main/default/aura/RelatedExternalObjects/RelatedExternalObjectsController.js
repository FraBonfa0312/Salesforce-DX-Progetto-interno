({
	myAction : function(component, event, helper) {
        var actionAccountActions = component.get("c.myExtAccountActions");
        actionAccountActions.setCallback(this, function(data) {
            component.set("v.myExternalAccountActions", data.getReturnValue());
        });  
        $A.enqueueAction(actionAccountActions);

        var actionTransactions = component.get("c.myExtTransactions");
        actionTransactions.setCallback(this, function(data) {
            component.set("v.myExternalTransactions", data.getReturnValue());
        });  
        $A.enqueueAction(actionTransactions);
        
        var actionClaims = component.get("c.myExtClaims");
        actionClaims.setCallback(this, function(data) {
            component.set("v.myExternalClaims", data.getReturnValue());
        });  
        $A.enqueueAction(actionClaims);

	},
    
    goToExternal : function(component, event, helper) {
        var myTarget = event.currentTarget;
        var myRowID = myTarget.getAttribute("data-conId123"); 
        
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/" + myRowID
        });
        urlEvent.fire();
    }
})