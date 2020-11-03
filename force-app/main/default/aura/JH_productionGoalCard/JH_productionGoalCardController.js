({
    doInit : function(component, event, helper) {
    	var type = component.get("v.Type");
        if(type === "Commercial Property") {
			component.set("v.Icon", "https://sfdc-demo-images-jake.s3.amazonaws.com/Condo.png");
        } else if(type === "Commercial Auto") {
			component.set("v.Icon", "https://sfdc-demo-images-jake.s3.amazonaws.com/Collector_Car.png");
        } else if(type === "Business Owners (BoP)") {
        	component.set("v.Icon", "https://sfdc-demo-images-jake.s3.amazonaws.com/Commercial.png");
        } else if(type === "Workers Compensation") {
            component.set("v.Icon", "https://sfdc-demo-images-jake.s3.amazonaws.com/LTC.png");
        }
       
    },
    
	displayEditMenu : function(component, event, helper) {
		var cmpTarget = component.find('EditMenu');
        $A.util.toggleClass(cmpTarget, 'classHidden');
	},
    
    editRecord : function(component, event, helper) {
    //open edit window
    
    var editRecordEvent = $A.get("e.force:editRecord");
    editRecordEvent.setParams({
         "recordId": component.get("v.GoalId")
   		});
    editRecordEvent.fire();
        
    //Hide menu
    var cmpTarget = component.find('EditMenu');
    $A.util.toggleClass(cmpTarget, 'classHidden');
	},
    
    handleSave : function(cmp, event) {
        //alert('Saved');
        //console.log('showToast Intercepted by'+cmp.get("v.GoalId"));
    },
    
        deleteAction : function(component, event, helper) {
	    var action = component.get("c.deleteGoal");
        action.setParams({ goalId : component.get("v.GoalId")});    
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                //component.set("v.AG", response.getReturnValue());
                //console.log(response.getReturnValue());
               // alert(response.getReturnValue()[0].Name); 
                  var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "Goal has been deleted successfully."
                    });
                    toastEvent.fire(); 
                    //Hide menu
                    var cmpTarget = component.find('EditMenu');
                    $A.util.toggleClass(cmpTarget, 'classHidden');
                
                	    
                    
            }
        });
       //console.log(action);
       $A.enqueueAction(action);
        
        
	},
    
    openRecord : function(component) {
        var id = component.get("v.GoalId");
        var navRecordEvent = $A.get("e.force:navigateToSObject");
        navRecordEvent.setParams({
           "recordId": component.get("v.GoalId") 
        });
        navRecordEvent.fire();
        console.log(id);
        
        
    },
    
   
    
    
    
})