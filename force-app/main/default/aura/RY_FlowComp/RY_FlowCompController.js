({
    init : function (component) {
        // Find the component whose aura:id is "flowData"
        var flow = component.find("flowData");
        // In that component, start your flow. Reference the flow's Unique Name.
        flow.startFlow("Retail_Banking_Account_Transfer_v2");
    },
   handleStatusChange : function (component, event) {
   if(event.getParam("status") === "FINISHED") {
     var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
               "url": "https://sdodemo-main-16109844f55-163-165100562d8.force.com/cumulusbanking/s/",
               "isredirect": "true"
            });
            urlEvent.fire();
   }
}
})