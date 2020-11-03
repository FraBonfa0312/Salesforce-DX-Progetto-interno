({
    doInit : function(component, event, helper) {
        helper.setStartDate(component, event, helper);
        helper.getTemplates(component, event, helper);
   },

    handleActionPlanSelection : function(component, event, helper){
        //console.log('handleActionPlanSelection');
        console.log('select template id' + event.srcElement.id + ' ' + event.srcElement.dataset.template);  
        component.set('v.selectedTemplateId', event.srcElement.id);
        component.set('v.actionPlanName', event.srcElement.dataset.template + ' - ' + component.get('v.record.Name'));
    },

    handleCreatePlan : function(component, event, helper){
        helper.createActionPlan(component, event, helper);
    } 
})