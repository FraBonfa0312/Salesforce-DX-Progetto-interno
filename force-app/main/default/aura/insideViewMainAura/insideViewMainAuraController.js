({
    selectCompanyInfo : function(component, event, helper) {
        component.set('v.showCompanyInfo', true);
        component.set('v.showPeople', false);
        component.set('v.showInsights', false);
    },

    selectPeople : function(component, event, helper) {
        component.set('v.showCompanyInfo', false);
        component.set('v.showPeople', true);
        component.set('v.showInsights', false);
    },

    selectInsights : function(component, event, helper) {
        component.set('v.showCompanyInfo', false);
        component.set('v.showPeople', false);
        component.set('v.showInsights', true);
    }
})