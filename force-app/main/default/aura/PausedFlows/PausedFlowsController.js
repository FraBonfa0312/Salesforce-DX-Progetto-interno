({
	doInit : function(component, event, helper) {
		
        var theFlows;
        var action = component.get("c.getPausedFlows");

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                theFlows = response.getReturnValue();
                console.log("From server," + response.getReturnValue() );
                component.set('v.flowList', response.getReturnValue() );
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
	},
    
    openTabWithSubtab : function(component, event, helper) {
        
        var currentTabId;
        var flowID = event.currentTarget.id
        console.log('flowID', flowID);
        
        var workspaceAPI = component.find("workspace");
        
        workspaceAPI.getEnclosingTabId().then(function(tabId) {
            console.log(tabId);
            currentTabId = tabId;
        }).then(function(response) {
            var resumeURL = '#/n/Resume_Flow?theFlowId='+flowID
            console.log('resumeURL', resumeURL);
            workspaceAPI.openSubtab({
                parentTabId: currentTabId,
                url: resumeURL,
                focus: true
            });   
        })
        .catch(function(error) {
            console.log(error);
        });
        
    }
})