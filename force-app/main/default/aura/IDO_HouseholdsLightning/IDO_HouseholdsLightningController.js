({
    doInit : function(component, event, helper) {

        var action = component.get("c.getThisAccount");
        action.setParams({
             "recordId": component.get("v.recordId")
        });
        
        action.setCallback(this, function(response) {
            var data = action.getReturnValue();
            // Set the component attributes using values returned by the API call
            component.set("v.thisAccount", data);
        });
        // Invoke the service
        $A.enqueueAction(action);
            
            
        var groupAction = component.get('c.getGroups');
             groupAction.setParams({
            	 "recordId": component.get("v.recordId")
       		 });
        groupAction.setCallback(this, function(response) {
            //store response state 
            var state = response.getState();
            if (state === "SUCCESS") {
                // create a empty array for store map keys 
                var arrayOfMapKeys = [];
                // store the response of apex controller (return map)     
                var StoreResponse = response.getReturnValue();
              
                // set the store response[map] to component attribute, which name is map and type is map.   
                component.set('v.fullMap', StoreResponse);
 
                for (var singlekey in StoreResponse) {
                    arrayOfMapKeys.push(singlekey);
                }
                
               	
                // Set the all list of keys on component attribute, which name is lstKey and type is list.     
                component.set('v.lstKey', arrayOfMapKeys);
            }
        });
        // enqueue the Action   
        $A.enqueueAction(groupAction);

    },
    
    
    fetchGroupMap: function(component, event, helper) {
        //call apex class method 
        var groupAction = component.get('c.getGroups');
             groupAction.setParams({
            	 "recordId": component.get("v.recordId")
       		 });
        groupAction.setCallback(this, function(response) {
            //store response state 
            var state = response.getState();
            if (state === "SUCCESS") {
                // create a empty array for store map keys 
                var arrayOfMapKeys = [];
                // store the response of apex controller (return map)     
                var StoreResponse = response.getReturnValue();
               
                // set the store response[map] to component attribute, which name is map and type is map.   
                component.set('v.fullMap', StoreResponse);
 
                for (var singlekey in StoreResponse) {
                    arrayOfMapKeys.push(singlekey);
                }
                
              
                // Set the all list of keys on component attribute, which name is lstKey and type is list.     
                component.set('v.lstKey', arrayOfMapKeys);
            }
        });
        // enqueue the Action   
        $A.enqueueAction(groupAction);
    },
})