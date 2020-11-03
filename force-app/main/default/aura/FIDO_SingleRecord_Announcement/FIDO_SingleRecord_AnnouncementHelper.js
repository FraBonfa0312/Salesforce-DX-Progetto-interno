({
	getScripts : function(component, event, helper) {
		var recid = component.get("v.recid");
		var endpoint = '/api/content?demo_announcements__c=' + recid; 
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
    getPartners : function(component, event, helper) {
		var recid = component.get("v.recid");
		var endpoint = '/api/partners?demo_announcements__c=' + recid; 
        var callout = component.get("c.getCalloutResponseContents");
        callout.setParams({
            endpoint: endpoint
        });
		callout.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                var resp = JSON.parse(response.getReturnValue());
                component.set("v.RelatedPartners",resp);
            }else{
                console.log("error");
            }
        });
		$A.enqueueAction(callout); 
	},
    getOrgFeatures : function(component, event, helper) {
		var recid = component.get("v.recid");
		var endpoint = '/api/orgfeatures?demo_announcements__c=' + recid; 
        var callout = component.get("c.getCalloutResponseContents");
        callout.setParams({
            endpoint: endpoint
        });
		callout.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                var resp = JSON.parse(response.getReturnValue());
                component.set("v.RelatedOrgFeatures",resp);
            }else{
                console.log("error");
            }
        });
		$A.enqueueAction(callout); 
	},
    getVideos : function(component, event, helper) {
		var recid = component.get("v.recid");
		var endpoint = '/api/videos?demo_announcements__c=' + recid; 
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
    getCustomizations : function(component, event, helper) {
		var recid = component.get("v.recid");
		var endpoint = '/api/features?demo_announcements__c=' + recid; 
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
})