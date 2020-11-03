({
	doInit : function(component, event, helper) {
	},
            
    waiveFee: function (component, event, helper) {
        var flow = component.find("flowData");
        var inputVariables = [
            // you can pass in hard-coded values
            //the variable type must match the type that is set in the flow
            { name : "recordId", type : "String", value: component.get('v.recordId') }, 
                 
            ];
            //pass in the input variables to the startFlow function
        var trgt = component.find('Transactions');
        $A.util.addClass(trgt, 'slds-hide');
        flow.startFlow("Waive_Fees_Package_Clone", inputVariables);
    },
    handleStatusChange : function (component, event) {
       if(event.getParam("status") === "FINISHED") {
			console.log(event.getParam("status"));
                var urlEvent = $A.get("e.force:navigateToSObject");
                urlEvent.setParams({
                   "recordId": component.get('v.recordId'),
                   "isredirect": "true"
                });
                urlEvent.fire();
             }
     }
 	
})