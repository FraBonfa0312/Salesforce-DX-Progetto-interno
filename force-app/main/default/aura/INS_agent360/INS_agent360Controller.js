({
    doInit: function(component, event, helper) {
       var pullMargin = component.get("v.pullMargin");
       if(pullMargin == true) {
            var toggleText = component.find("card");
            $A.util.toggleClass(toggleText, "card-pull-margin");
       };
        
       var recents = component.get("v.recentList");  // Array of objects
        recents.push(
            {title: 'New Submission',icon: 'standard:opportunity', subTitle: 'Silva BoP ($23k)', timeStamp: '2 hours ago', jakeId: 'doodad'},
            {title: 'Production Goal Milestone',icon: 'standard:goals', subTitle: 'Commercial Property (50%)', timeStamp: 'Yesterday', recordId: ''},
            {title: 'Campaign Activity',icon: 'standard:campaign', subTitle: 'Distributed Marketing', timeStamp: '3 Days Ago', recordId: ''}
        );
        component.set("v.recentList", recents);
    },  
    
    handleMenuSelect: function(component, event, helper) {
        var selectedMenuItemValue = event.getParam("value");
        if (selectedMenuItemValue == "openMaps"){
            var cmpTarget = component.find('Modalbox');
            var cmpBack = component.find('Modalbackdrop');
            $A.util.addClass(cmpTarget, 'slds-fade-in-open');
            $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
        } else if(selectedMenuItemValue == "agendaBuilder") {
            alert("agenda Builder");
        }
        console.log(selectedMenuItemValue);
    },
    
    closeModal:function(component,event,helper){    
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
        component.find("recordHandler").reloadRecord();
    },
    cancel:function(component,event,helper){    
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
        component.find("recordHandler").reloadRecord();
    },
    openmodal: function(component,event,helper) {
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
    handleRecordUpdated: function(component, event, helper) {
        var eventParams = event.getParams();
        if(eventParams.changeType === "CHANGED") {
            // get the fields that changed for this record
            var changedFields = eventParams.changedFields;
            console.log('Fields that are changed: ' + JSON.stringify(changedFields));            
            // record is changed, so refresh the component (or other component logic)
            // var resultsToast = $A.get("e.force:showToast");
            // resultsToast.setParams({
            //    "title": "Saved",
            //    "message": "The record was updated."
            // });
            // resultsToast.fire();
             component.find("recordHandler").reloadRecord();

        } else if(eventParams.changeType === "LOADED") {
            // record is loaded in the cache
        } else if(eventParams.changeType === "REMOVED") {
            // record is deleted and removed from the cache
        } else if(eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving or deleting the record
        }
    },
    handleSaveRecord: function(component, event, helper) {                
        component.find("recordHandler").saveRecord($A.getCallback(function(saveResult) {
            // NOTE: If you want a specific behavior(an action or UI behavior) when this action is successful 
            // then handle that in a callback (generic logic when record is changed should be handled in recordUpdated event handler)
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                var cmpTarget = component.find('Modalbox');
                var cmpBack = component.find('Modalbackdrop');
                $A.util.removeClass(cmpBack,'slds-backdrop--open');
                $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        }));
    },
    
    navEventTest: function(component, event) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": component.get("v.recentID1"),
            "slideDevName": "related",
             });
        navEvt.fire();
    },
    
    agendaBuilder: function(component, event, helper) {
        alert("opening agenda builder");
    }
    
   /* navigateToDetailsView : function(component) {
		var object = component.get("v.object");
        var myEvent = $A.get("e.force:navigateToSObject");
        myEvent.setParams({
        
            "recordId": object.Id
        });
        myEvent.fire();
	},*/
    
    

    
})