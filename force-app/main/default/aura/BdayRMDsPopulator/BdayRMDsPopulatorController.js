({
	doInit : function(component, event, helper) {
		// Prepare the action to load account record
        var action = component.get("c.getUsers");

        // Configure response handler
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.users", response.getReturnValue());
            } else {
                console.log('Problem getting users, response state: ' + state);
            }
        });
        $A.enqueueAction(action);
	},
    
    setUserId : function(component, event, helper) {
		// Prepare the action to load account record
        var action = component.get("c.getUsers");
        action.setParams({"accountId": component.get("v.recordId")});

        
        // Configure response handler
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.account", response.getReturnValue());
            } else {
                console.log('Problem getting account, response state: ' + state);
            }
        });
        $A.enqueueAction(action);
	},
    
    
    populateBday : function(component, event, helper) {
        var userId = component.get('v.selectedBdayUser');
        var theLimit = component.get('v.BDayamount');
        // edit theRecType to make dynamic
        var theRecType = 'FSC Person Accounts';
        console.log('selectedBdayUser', userId);
        
        if(userId != null && userId != '') {
            var spinner = component.find("BdaySpinner");
        	$A.util.toggleClass(spinner, "slds-hide");

            var action = component.get("c.doBirthdays");
            action.setParams({
                "userId" : userId,
                "theLimit" : theLimit,
                "theRecType" : theRecType
            });
    
            // Configure response handler
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log('state', state);
                if(state === "SUCCESS") {
                    // component.set("v.account", response.getReturnValue());
                    console.log('New Birthdays', response.getReturnValue());
                } else {
                    console.log('Problem popping bdays, response state: ' + state);
                }
                $A.util.toggleClass(spinner, "slds-hide");
            });
            $A.enqueueAction(action);
        } 
    },
    
    populateRMD : function(component, event, helper) {
        var userId = component.get('v.selectedRMDUser');
        var theLimit = component.get('v.RMDamount');
        var theTreshold = component.get('v.AUMTreshold');
        // edit theRecType to make dynamic
        var theRecType = 'FSC Person Accounts';
        console.log('selectedRMDUser', userId);
        
        if(userId != null && userId != '') {
            var spinner = component.find("RMDSpinner");
        	$A.util.toggleClass(spinner, "slds-hide");

            var action = component.get("c.doRMDs");
            action.setParams({
                "userId" : userId,
                "theLimit" : theLimit,
                "theTreshold" : theTreshold,
                "theRecType" : theRecType
            });
    
            // Configure response handler
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log('state', state);
                if(state === "SUCCESS") {
                    // component.set("v.account", response.getReturnValue());
                    console.log('New Birthdays', response.getReturnValue());
                } else {
                    console.log('Problem popping bdays, response state: ' + state);
                }
                $A.util.toggleClass(spinner, "slds-hide");
            });
            $A.enqueueAction(action);
        } 
    }
})