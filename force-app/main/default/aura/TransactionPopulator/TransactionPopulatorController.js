({
    generateData : function(component, event, helper) {

        
        if((component.get("v.givenId") == null) ||
           (component.get("v.givenVal") == null) ||
           (component.get("v.givenTypeOne") == null)){

            var myListEmpty = [];
            component.set("v.myListVar", myListEmpty);              
            component.set("v.givenId", null);
            component.set("v.givenVal", null);
            component.set("v.givenTypeOne", null);
            component.set("v.givenTypeTwo", null);
            component.set("v.givenTypeThree", null);
            
            component.set("v.myInfo", "Error");  
        } else {
            
            component.set("v.myInfo", "Success"); 
            
            var myList = [];
            
            myList.push(component.get("v.givenTypeOne"));
            
            if((component.get("v.givenTypeTwo") != null)){
                myList.push(component.get("v.givenTypeTwo"));
            } else {
                
            }
            
            if((component.get("v.givenTypeThree") != null)){
                myList.push(component.get("v.givenTypeThree"));
            } else {
                
            }
                        
            component.set("v.myListVar", myList); 
            component.set("v.tempId", component.get("v.givenId"));

            var action = component.get("c.getSetup");
            
            action.setParams({
                "givenId": component.get("v.givenId"),
                "givenVal" : component.get("v.givenVal"),
                "myTypes" : component.get("v.myListVar")
            }); 
            
            action.setCallback(this, function(data) {
                var myListNew = [];                
                
                component.set("v.myListVar", myListNew);              
                component.set("v.givenId", null);
                component.set("v.givenVal", null);
                component.set("v.givenTypeOne", null);
                component.set("v.givenTypeTwo", null);
                component.set("v.givenTypeThree", null);
                
            });
            
            $A.enqueueAction(action);

        }
    },
    
    getClick : function(component, event, helper) { 
        var myRecord = component.get("v.tempId");
        
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/" + myRecord
        });
        urlEvent.fire();
    }
})