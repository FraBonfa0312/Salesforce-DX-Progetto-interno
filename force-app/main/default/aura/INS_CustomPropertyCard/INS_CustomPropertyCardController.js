({
    doInit : function(component, event, helper) {
        
        window.setTimeout(
            $A.getCallback(function() {
                helper.callServer(
                    component,
                    "c.getCustomerProperty",
                    function (response) {
                        let spinner = component.find('xSpinner');
                        $A.util.toggleClass(spinner, 'slds-hide');
                        component.set("v.simpleRecord", response);
                    },
                    { 
                        recordId : component.get("v.recordId") 
                    }
                );
            }), 2000);
        
    }
})