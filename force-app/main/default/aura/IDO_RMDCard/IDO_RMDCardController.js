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
        
        var action = component.get("c.doRMDs");
        action.setParams({
            "theLimit" : theLimit
        });
        
        // Configure response handler
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state', state);
            if(state === "SUCCESS") {
                // component.set("v.account", response.getReturnValue());
                console.log('New RMDs', response.getReturnValue());
                
                var theCons = response.getReturnValue();
                
                for(var i = 0; i < theCons.length; i++){
                   
                    /* Days away config */
                    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                    var today = new Date();
                    var birthdate = new Date(theCons[i].Birthdate);
                    birthdate.setYear(today.getFullYear());
                    // will be 6 months from birthdate
                    var birthdate6 = birthdate;
                    birthdate6.setMonth(birthdate.getMonth() - 6);                  
                    theCons[i].DaysAway__c = Math.round(Math.abs(( today.getTime() - birthdate6.getTime() )/(oneDay)));
                    
                    /* AUM */
                    theCons[i].AUM__c = helper.getRandomInt(550000,1200000);
                    console.log('theCons[i].AUM__c', theCons[i].AUM__c);
                    
                    /* Category */
                    if(theCons[i].Account.FinServ__ClientCategory__c){
                        theCons[i].Category__c = theCons[i].Account.FinServ__ClientCategory__c
                    } 
                    else {
                        theCons[i].Category__c = categories[Math.floor(Math.random()*categories.length)];
                    }
                    // console.log('theCons[i].Category__c', theCons[i].Category__c);
                }
                
                component.set('v.theContacts', theCons); 
                
            } else {
                console.log('Problem popping bdays, response state: ' + state);
            }
        });
        $A.enqueueAction(action);   
    }
})