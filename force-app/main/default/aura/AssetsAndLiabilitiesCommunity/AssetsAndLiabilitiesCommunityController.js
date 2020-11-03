/**
 * Created by cxu on 24/10/2016.
 */
({
	doInit : function(cmp, event, helper) {
        var action = cmp.get("c.getAssetsAndLiabilities");

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var items = response.getReturnValue();
                if (items !== null) {
                    cmp.set("v.items", items);
                }
            }
            else if (state === "INCOMPLETE") {
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
	},
	navigateToObject : function(cmp, event, helper) {
         var id = event.target.id;

        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": id
        });
        navEvt.fire();
	}
})