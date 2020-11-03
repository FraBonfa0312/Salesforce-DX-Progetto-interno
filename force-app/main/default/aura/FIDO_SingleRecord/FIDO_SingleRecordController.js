({
    init: function(component, event, helper){
        /* Send Mixpanel Data */
        /*var RecordId = component.get("v.recid");
        var ScreenChoice = component.get("v.ScreenChoice");
        
        var callout = component.get("c.sendFIDOMixpanelEvent");
        callout.setParams({
            GTKIDOPage: ScreenChoice,
            GTKIDORecord: RecordId
        });
        callout.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                var res = JSON.parse(response.getReturnValue()); 
                console.log("Response: " + JSON.stringify(response.getReturnValue()));
            }else{
                console.log("error")
            }
        });
        $A.enqueueAction(callout);*/
    },
	ScreenChoiceChange: function(component, event, helper) {
        component.set("v.recid",'');
    },
})