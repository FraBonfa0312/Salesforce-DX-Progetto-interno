({
    callServer: function(component, method, callback, params) {
        var action = component.get(method);
        if (params) {
            action.setParams(params);
        }
        
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // pass returned value to callback function
                callback.call(this, response.getReturnValue());
            } else if (state === "ERROR") {
                // generic error handler
                var errors = response.getError();
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

    setStartDate: function(component, event, helper){

        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth()+1;
        var date = today.getDate();
        if(month < 10){
            month = '0'+ month;
        }
        if(date < 10){
            date = '0'+ date;  
        }
        //console.log(year + '-' + month + '-' + date);
        component.set('v.startDate', today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()); 
    },

    getTemplates: function(component, event, helper){
        helper.callServer(
            component,
            "c.getTemplates",
            function (response) {
                component.set("v.templates", response);
                console.log(response);
            },
            {
                recordId: component.get('v.recordId'),
                actionPlanType:  component.get('v.actionPlanType')
            }
        );
    },


    createActionPlan: function(component, event, helper){
       // debugger
       var dateString = component.get('v.startDate');
       //console.log(dateString);
       var date = new Date(dateString);
        helper.callServer(
            component,
            "c.createActionPlan",
            function (response) {
                console.log(response.Id);
                helper.goToObjectDetailPage(component, event, helper, response.Id);
                helper.showToast('Success', 'New action plan has been created!', 'success');
            },
            { 
                planName : component.get('v.actionPlanName'),
                startDate : date,
                targetId : component.get('v.recordId'),
                templateId : component.get('v.selectedTemplateId'),
                ownerId: component.get('v.record.OwnerId')
            }
        );
    },

    goToObjectDetailPage : function(component, event, helper, actionPlanId) {
        var templateId = component.get('v.selectedTemplateId');
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({ 
            "recordId":     actionPlanId, 
            "slideDevName": "detail"
        });
        navEvt.fire();
    },

    showToast : function(title, message, type) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type": type,
            "mode": 'dismissible'
        });
        toastEvent.fire();
       // $A.get('e.force:refreshView').fire();
    }


})