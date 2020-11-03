({
	getTemplates : function(component, event, helper){
		var action = component.get('c.getActionPlanTemplates');
        action.setCallback(this, function(res){
            var state = res.getState();
            if(state === 'SUCCESS'){
                var rVal = res.getReturnValue();
                //console.log(rVal);
                component.set('v.ActionPlanTemplates',rVal);
            }else if(state === 'ERROR'){
                console.log(res.getError()[0]);
            }else{
                console.log(state);
            }
        });
        $A.enqueueAction(action);
	},
    createActPlan : function(component, event, helper){
       	var currentTemplate = component.get('v.currentSelectedTemplate');
        if(!$A.util.isUndefinedOrNull(currentTemplate)){
            var selectedTemplate = component.get('v.ActionPlanTemplates')[currentTemplate];
            helper.spinnerHelper(component, true);
            var action = component.get('c.createActionPlan');
            action.setParams({
                'accountId': component.get('v.recordId'),
                'templateId': selectedTemplate.Id,
                'templateName' : selectedTemplate.Name
            });
            action.setCallback(this, function(res){
                var state = res.getState();
                if(state === 'SUCCESS'){
                    var rVal = res.getReturnValue();
                    var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": rVal
                    });
                    navEvt.fire();
                }else if(state === 'ERROR'){
                    helper.spinnerHelper(component, true);
                    console.log(res.getError()[0]);
                }else{
                    console.log(state);
                }
            });
            $A.enqueueAction(action);
        }else{
            $A.util.addClass(component.find('chooseTemplateMessage').getElement(), 'chooseTemplateMsg');
        }
    },
    templateSelected : function(component, event, helper){
        var curretIdx = parseInt(event.currentTarget.dataset.indexvar);
        component.set('v.currentSelectedTemplate', curretIdx);
    }
})