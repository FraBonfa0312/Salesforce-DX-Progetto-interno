({
    loadRecords : function(component, event, helper) {
	    var action = component.get("c.getGoals");
        action.setParams({ parentId : component.get("v.recordId")});    
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.AG", response.getReturnValue());
                //console.log(response.getReturnValue());
               // alert(response.getReturnValue()[0].Name); 
            }
        });
       //console.log(action);
       $A.enqueueAction(action);
        
        
	},
    
    createRecord : function (component, event, helper) {
    var createRecordEvent = $A.get("e.force:createRecord");
    createRecordEvent.setParams({
        "entityApiName": "Account_Goal__c",
        "inContextOfRecordId" : component.get("v.recordId"),
        "navigationLocation" : "RELATED_LIST", //allow not to be redirected to newly created record
        "defaultFieldValues" : {
         "Account__c" : component.get("v.recordId")   
        }
    });
    createRecordEvent.fire();
	},
    
    testAction : function (component, event, helper){
        alert("test");
    }
    
})