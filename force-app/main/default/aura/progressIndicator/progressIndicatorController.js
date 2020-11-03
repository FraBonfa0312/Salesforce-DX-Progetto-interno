({
    init : function(component, event, helper) {
        var progressIndicator = component.find('progressIndicator');
        
        console.log('currentStage', component.get('v.currentStage'));
        console.log('stages', component.get('v.stages'));
        
        var thePrefix = '';
        if(component.get('v.currentStage').indexOf(':') >=0){
            thePrefix = component.get('v.currentStage').split(':')[0];
        }
        
        //console.log('thePrefix', thePrefix);
        
        for (let step of component.get('v.stages')) {
            
            if(thePrefix != ''){
                //console.log('step', step);
                var theNewStep = step.split(' ').join('_');
                //console.log('theNewStep', theNewStep);
                theNewStep = thePrefix + ':' + theNewStep;
            }
            else{
                theNewStep = step;
            }
            
            $A.createComponent(
                "lightning:progressStep",
                {
                    "aura:id": "step_" + step,
                    "label": step,
                    "value": theNewStep
                },
                function(newProgressStep, status, errorMessage){
                    // Add the new step to the progress array
                    if (status === "SUCCESS") {
                        var body = progressIndicator.get("v.body");
                        body.push(newProgressStep);
                        progressIndicator.set("v.body", body);
                    }
                    else if (status === "INCOMPLETE") {
                        // Show offline error
                        console.log("No response from server, or client is offline.")
                    }
                        else if (status === "ERROR") {
                            // Show error message
                            console.log("Error: " + errorMessage);
                        }
                }
            );
        }
    }
})