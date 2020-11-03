({
	getScripts : function(component, event, helper) {
		var recid = component.get("v.recid");
		var endpoint = '/api/content?persona__c=' + recid; 
        var callout = component.get("c.getCalloutResponseContents");
        callout.setParams({
            endpoint: endpoint
        });
		callout.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                var resp = JSON.parse(response.getReturnValue());
                component.set("v.RelatedScripts",resp);
            }else{
                console.log("error");
            }
        });
		$A.enqueueAction(callout); 
	},
})