({
    handleCMBuildingInit: function (component, event, helper) {
        component.set('v.showSpinner', true);
        //debugger
        helper.callServer(
            component,
            "c.getExistingCustomerPropertyCommercialProperty",
            function (response) {
                //debugger
                if (response) {
                    let data = JSON.parse(response);
                    component.set('v.existingCPcommercialPropertyList', data);
                    console.log('>>>>   handleRetrieveExsitingCPCommercialProperties');
                    console.log(data);
                    component.set('v.hasExistingProperty', true);
                    component.set('v.showSpinner', false);
                } else {
                    component.set('v.showSpinner', false);
                }
            }, {
                accountId: component.get('v.oppty.AccountId')
            }
        );
    },

    handleAddBuildingClick: function (component, event, helper) {
        console.log('handleAddBuildingClick..');
        helper.gotoNextScreen(component, event, helper);
    },

    handleToggleBtnClick: function (component, event, helper) {
        let currentLocationType = component.get('v.isExistingProperty');
        component.set('v.isExistingProperty', !currentLocationType);
    },

    handleAlarmTypeToggleBtnClick: function (component, event, helper) {
        var targetAuraId = event.getSource().getLocalId();
        var x = component.find(targetAuraId);
        for (var i = 0; i < x.length; i++) {
            $A.util.removeClass(x[i], 'selectedToggleButtonType');
        }
        $A.util.addClass(event.getSource(), 'selectedToggleButtonType');
    },

    handleNext: function (component, event, helper) {
        helper.gotoNextScreen(component, event, helper);
    },

    handleCheckboxClick: function (component, event, helper) {
        $A.util.toggleClass(event.srcElement, "active");
    },

    handleFinish: function (component, event, helper) {
        helper.gotoMasterCmp(component, event, helper);
    },

    handlePrevious: function (component, event, helper) {
        helper.gotoPrevScreen(component, event, helper);

    },

})