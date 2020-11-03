({
    getInteractionSummary: function(component,helper){
        var recId = component.get('v.recordId');
        var action = component.get("c.getSummary");
        action.setParams({"accountId" : recId});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(JSON.stringify(response.getReturnValue()));
                component.set("v.summary", response.getReturnValue());
                helper.getInteractionReports(component);
            }
            else {
                console.log("Failed with state: " + state);
            }
            
        });
        $A.enqueueAction(action);

    },
	getInteractionReports : function(component) {
		var summary = component.get('v.summary');
        var action = component.get("c.retrieveInteractionReports");
        console.log('summary****' + summary.Id);
        action.setParams({"summaryId" : summary.Id});
       	action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('hello' + JSON.stringify(response.getReturnValue()));
                component.set("v.reportWrapperList", response.getReturnValue());
            }
            else {
                
            }
            
        });
        $A.enqueueAction(action);
	},
    doSearch:function(component, event, helper){
        var action = component.get("c.searchReports");
        var summary = component.get('v.summary');
        
        console.log('in search*****' + summary.Id);
        action.setParams({"summaryId" : summary.Id,"searchText" : component.get('v.searchText')});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('hello' + response.getReturnValue()); 
               component.set("v.reportWrapperList", response.getReturnValue()); 
            }else{   
               console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
    toggleButtonIcon : function(component, event, helper){
        var currentIdx = event.getSource().get('v.value');
        var iconText = event.getSource().get('v.iconName');
        var allIcons = component.find('toggleIcon');
        
        if(iconText == 'utility:chevronright'){
            event.getSource().set('v.iconName', 'utility:chevrondown');
        }else{
           event.getSource().set('v.iconName', 'utility:chevronright'); 
        }
        var allSections = component.find('detailTr');
        /*for(var i=0; i<allSections.length; i++){
            if(i != currentIdx){
            	$A.util.addClass(allSections[i], 'slds-hide');
            }
        }*/
        var currentSection = allSections[currentIdx];
        $A.util.toggleClass(currentSection, 'slds-hide');
    },
    openRecinSubtab : function(component, event, helper){
        var workspaceAPI = component.find("workspace");
        var recId = event.target.dataset.recordid;
        var dataurl = event.target.dataset.url;
        console.log('hurrah!!' +dataurl);
        if(!dataurl){
            dataurl = '#/sObject/'+recId+'/view';
        }
        workspaceAPI.getEnclosingTabId().then(function(tabId) {
            workspaceAPI.openSubtab({
                parentTabId: tabId,
                url: dataurl,
                focus: true
            });
        });
    },
    createReportRecord : function (component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Interaction_Report__c"
        });
        createRecordEvent.fire();
	}
})