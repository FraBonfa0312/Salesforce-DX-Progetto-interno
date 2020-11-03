({
	getFeatureScripts : function(component, event, helper) {
		var recid = component.get("v.featureId");
		var endpoint = '/api/content?demo_org_feature__c=' + recid; 
        var callout = component.get("c.getCalloutResponseContents");
        callout.setParams({
            endpoint: endpoint
        });
		callout.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                var resp = JSON.parse(response.getReturnValue());
                component.set("v.RelatedRecords",resp);
            }else{
                console.log("error");
            }
        });
		$A.enqueueAction(callout); 
	}
})