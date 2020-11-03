({
    toggleSection: function (component, event, helper) {
        console.log('toggle');
        var iconName = component.get("v.filterIconName");
        if (iconName == 'utility:chevronright') {
            component.set("v.toggleClass", "slds-is-open");
            component.set("v.filterIconName", "utility:switch");
        }
        else {
            component.set("v.toggleClass", "slds-is-close");
            component.set("v.filterIconName", "utility:chevronright");
        }
    }

})