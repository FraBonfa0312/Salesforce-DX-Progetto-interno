({
    init: function(component, event, helper) {
        
    },
    
    doLearning : function(component, event) {
        var link = component.get("v.linkURL");
        if(!link){
            alert("empty!")
            return;
        }else{
            window.open(link);
        }
    },
    
    
    openModal: function(component,event,helper) {
        component.set('v.isActive', true);
        var cmpTarget = component.find('EDModal');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open');
    },
    
    closeModal: function(component,event,helper){
        component.set('v.isActive', false);
        var cmpTarget = component.find('EDModal');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
        component.find("recordHandler").reloadRecord();
    },
})