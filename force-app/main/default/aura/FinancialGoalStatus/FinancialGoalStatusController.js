({
	doInit : function(component, event, helper) {
        
        console.log('Financial Goal Status doInit', container);
        var recordId = component.get("v.recordId");
        var container = component.find('test-circle').getElement();
        var theGoal;
        var progress;
        var actualVal = 0;
        var targetVal = 0;
        
        var action = component.get("c.getGoal");
        action.setParams({ 
            theId : component.get("v.recordId") 
        });
		action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state', state);
            theGoal = response.getReturnValue();
            if (state === "SUCCESS") {
                console.log('theGoal', theGoal);
                component.set('v.theGoal', theGoal);
                
                if(theGoal.FinServ__ActualValue__c) { 
                	actualVal = theGoal.FinServ__ActualValue__c
                }
                if(theGoal.FinServ__TargetValue__c) { 
                	targetVal = theGoal.FinServ__TargetValue__c
                }
                progress = ( (actualVal / targetVal ) * 100 ).toFixed(0);  

                $(container).circliful({
                    animation: 1,
                    animationStep: 6,
                    foregroundBorderWidth: 5,
                    backgroundBorderWidth: 1,
                    percent: progress,
                    foregroundColor: '#6eb8e3',
                    iconColor: '#3498DB',
                    icon: 'f004',
                    iconSize: '40',
                    iconPosition: 'middle'
                    
                });
                
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(action); 
           
	}
})