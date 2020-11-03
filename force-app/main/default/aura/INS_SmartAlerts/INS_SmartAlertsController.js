({
	handleInit : function(component, event, helper) {


        helper.callServer(
            component,
            "c.getSmartAlerts",
            function (response) {
                console.log(response);
                component.set("v.smartAlertList", response);
            },
            { 
                
            }
        );
    },
    
    handleInitWrapper : function(component, event, helper) {
        helper.callServer(
            component,
            "c.getSmartAlertsWrapper",
            function (response) {
                console.log(response);
                component.set("v.smartAlertWapperList", JSON.parse(response));
            },
            { 
                
            }
        );
    },
    
    handleAccountClick : function(component, event, helper){
        let recordId = event.currentTarget.dataset.id;
       
        console.log('handleAccountClick: recordId : ' + recordId);
        helper.openTab(component, event, helper,recordId);
    }
})