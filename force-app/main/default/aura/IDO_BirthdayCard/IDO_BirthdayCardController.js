({
	doInit : function(component, event, helper) {
        console.log('populateBday function');
        
        var categories = [
            "Gold",
            "Silver",
            "Bronze",
            "Platnium"
        ];        
        var theLimit = component.get('v.theLimit');
        console.log('theLimit', theLimit);
     
        var action = component.get("c.doBirthdays");
        action.setParams({
            "theLimit" : theLimit
        });
        
        // Configure response handler
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state', state);
            if(state === "SUCCESS") {
                // component.set("v.account", response.getReturnValue());
                console.log('New Birthdays', response.getReturnValue());
                
                var theCons = response.getReturnValue();
                for(var i = 0; i < theCons.length; i++){                   
                    /* Category */
                    if(theCons[i].Account.FinServ__ClientCategory__c){
                        theCons[i].Category__c = theCons[i].Account.FinServ__ClientCategory__c
                    } 
                    else {
                        theCons[i].Category__c = categories[Math.floor(Math.random()*categories.length)];
                    }
                    /* Age */
                    if(theCons[i].FinServ__Age__c){
                        theCons[i].Age__c = theCons[i].FinServ__Age__c +1;
                    }
                    else {
                        //theCons[i].Age__c = 
                        var today = new Date();
                        var thisYear = today.getFullYear();
                    	var birthdate = new Date(theCons[i].Birthdate);
                    	var birthYear = birthdate.getFullYear();
                        theCons[i].Age__c = ( thisYear - birthYear ) +1;
                    }
                }
                
                component.set('v.theContacts', theCons); 
            } else {
                console.log('Problem popping bdays, response state: ' + state);
            }
        });
        $A.enqueueAction(action);   
    }
})