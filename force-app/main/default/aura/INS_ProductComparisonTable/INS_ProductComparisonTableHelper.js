({
    callServer: function(component, method, callback, params) {
        let action = component.get(method);
        if (params) {
            action.setParams(params);
        }
        
        action.setCallback(this,function(response) {
            const state = response.getState();
            if (state === "SUCCESS") {
                // pass returned value to callback function
                callback.call(this, response.getReturnValue());
            } else if (state === "ERROR") {
                // generic error handler
                const errors = response.getError();
                if (errors) {
                    console.log("Errors", errors);
                    if (errors[0] && errors[0].message) {
                        throw new Error("Error" + errors[0].message);
                    }
                } else {
                    throw new Error("Unknown Error");
                }
            }
        });
        
        $A.enqueueAction(action);
    },
    onResize : function(component, event, helper) {
        const comparisonTable = document.getElementById('comparison-table');
        if (comparisonTable) {
            if (comparisonTable.offsetWidth >= 600) {
                component.set('v.mobile', false);
            } else {
                component.set('v.mobile', true);          
            }
        }
    }
})