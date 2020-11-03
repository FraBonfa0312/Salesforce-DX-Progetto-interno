({
    invoke : function(component, event, helper) {

           var appEvt = $A.get("e.lightning:nextBestActionsRefresh");
           if (!$A.util.isEmpty(component.get("v.myRecordId"))) {
               appEvt.setParam("recordId", component.get("v.myRecordId"));
           }
        	
           	appEvt.fire();

        }
})