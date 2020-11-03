({
	getScriptFeatures : function(component, event, helper) {
		var recid = component.get("v.ScriptId");
		var endpoint = '/api/orgfeatures?demo_content__c=' + recid; 
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
	},
    getScriptCustomizations : function(component, event, helper) {
		var recid = component.get("v.ScriptId");
		var endpoint = '/api/features?demo_content__c=' + recid; 
        var callout = component.get("c.getCalloutResponseContents");
        callout.setParams({
            endpoint: endpoint
        });
		callout.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                var resp = JSON.parse(response.getReturnValue());
                component.set("v.RelatedCustomizations",resp);
            }else{
                console.log("error");
            }
        });
		$A.enqueueAction(callout); 
	},
    getScriptPersonas : function(component, event, helper) {
		var recid = component.get("v.ScriptId");
		var endpoint = '/api/persona?demo_content__c=' + recid; 
        var callout = component.get("c.getCalloutResponseContents");
        callout.setParams({
            endpoint: endpoint
        });
		callout.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                var resp = JSON.parse(response.getReturnValue());
                component.set("v.RelatedPersonas",resp);
            }else{
                console.log("error");
            }
        });
		$A.enqueueAction(callout); 
	},
    getScriptVideos : function(component, event, helper) {
		var recid = component.get("v.ScriptId");
		var endpoint = '/api/videos?demo_content__c=' + recid; 
        var callout = component.get("c.getCalloutResponseContents");
        callout.setParams({
            endpoint: endpoint
        });
		callout.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                var resp = JSON.parse(response.getReturnValue());
                component.set("v.RelatedVideos",resp);
            }else{
                console.log("error");
            }
        });
		$A.enqueueAction(callout); 
	},
    getScriptLicenses : function(component, event, helper) {
		var recid = component.get("v.recid");
		var endpoint = '/api/licences?demo_content__c=' + recid; 
        var callout = component.get("c.getCalloutResponseContents");
        callout.setParams({
            endpoint: endpoint
        });
		callout.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                var resp = JSON.parse(response.getReturnValue());
                component.set("v.RelatedLicenses",resp);
            }else{
                console.log("error");
            }
        });
		$A.enqueueAction(callout); 
	},
    
})