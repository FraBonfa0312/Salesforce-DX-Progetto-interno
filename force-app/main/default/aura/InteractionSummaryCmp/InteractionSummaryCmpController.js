({
	doInit : function(component, event, helper) {
        helper.getInteractionSummary(component,helper);
	},
    
    performSearch: function(component, event, helper){
        console.log('Perform Search********');
        helper.doSearch(component,event,helper);
	},
    expandCtrl : function(component, event, helper){
        console.log('inController');
        helper.toggleButtonIcon(component, event, helper);
    },
    openRecordinSubtab : function(component, event, helper){
        helper.openRecinSubtab(component, event, helper);
    },
    createReportRecordCtrl :function(component, event, helper){
        helper.createReportRecord(component, event, helper);
    },
    
    renderEinstein : function(component,event,helper){
        var appEvent = $A.get("e.c:RenderEinstein");
		appEvent.fire();
    }
})