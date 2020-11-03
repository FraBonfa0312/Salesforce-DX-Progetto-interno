({
    onInit : function(component, event, helper) {
        var url = $A.get('$Resource.companyInfo');
        component.set('v.backgroundImageURL', url);
    },

    selectOverview : function(component, event, helper) {
        component.set('v.showOverview', true);
        component.set('v.showIndustry', false);
        component.set('v.showFinancials', false);
        component.set('v.showFamilyTree', false);
    },

    selectIndustry : function(component, event, helper) {
        component.set('v.showOverview', false);
        component.set('v.showIndustry', true);
        component.set('v.showFinancials', false);
        component.set('v.showFamilyTree', false);
    },

    selectFinancials : function(component, event, helper) {
        component.set('v.showOverview', false);
        component.set('v.showIndustry', false);
        component.set('v.showFinancials', true);
        component.set('v.showFamilyTree', false);
    },

    selectFamilyTree : function(component, event, helper) {
        component.set('v.showOverview', false);
        component.set('v.showIndustry', false);
        component.set('v.showFinancials', false);
        component.set('v.showFamilyTree', true);
    }
})