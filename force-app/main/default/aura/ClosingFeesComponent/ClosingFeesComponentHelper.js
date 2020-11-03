({
    getAllClosingFees : function(component) {
        var action = component.get("c.getAllReviewingFees");
        console.log("made it");
        action.setParams({ oppId : component.get("v.recordId") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.reviewingFees", response.getReturnValue());
                console.log("From server: " + response.getReturnValue());
                
                
            }
        });
        
        $A.enqueueAction(action);
        
        
    }
})