({
	doInit : function(component, event, helper) {

        var key = component.get("v.key");
        var map = component.get("v.map");
		var householdTitle = '';
        var memberSize = 0;
        var groupId ='';
        
        if(key.includes('true')){
            component.set("v.isPrimaryGroup" , true);
            householdTitle = key.replace('true','');
             component.set("v.householdTitle" , householdTitle);
        }else{
            component.set("v.isPrimaryGroup" , false);
            householdTitle = key.replace('false','');
              component.set("v.householdTitle" , householdTitle);
        }
        
        
        if(key.includes('Household')){
            component.set("v.isHousehold" , true);
        }else if(key.includes('Account')){
            component.set("v.isAccount" , true);
        }else if(key.includes('Contact')){
            component.set("v.isContact" , true);
        }
        
        
        // set the values of map to the value attribute	
        // to get map values in lightning component use "map[key]" syntax. 
		memberSize = map[key].length;
     	component.set("v.collapseToggle", true);
        component.set("v.memberSize", memberSize);
        if(map[key][0] != null){
             groupId = map[key][0].AccountId
        }
       

        component.set("v.groupId" , groupId);
        component.set("v.members" , map[key]);

	},
   
    toggle : function(component, event, helper) {
        var toggleText = component.find("memberWrapper");
        var currentState = component.get("v.collapseToggle");
        component.set("v.collapseToggle", !currentState);
        $A.util.toggleClass(toggleText, "toggle");
        
    },
    
    
        goRecord : function(component, event, helper) {
        var recordId = event.currentTarget.id ;
 		
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": recordId,
          "slideDevName": "related"
        });
        navEvt.fire();
        
        
    }
})