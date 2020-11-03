({
    handleCMPolicyInformationInit: function (component, event, helper) {
        let cpList = component.get('v.selectedCPcommercialPropertyList');
        if (cpList == null || cpList.length == 0) {
            cpList.push({
                Street: '717 South Wells Street',
                City: 'Chicago',
                State: 'IL',
                PostalCode: '60607'
            });
        }
        console.log('handleCMPolicyInformationInit: ' + cpList)
    },

    handleToggleBtnClick: function (component, event, helper) {
        var targetAuraId = event.getSource().getLocalId();
        var x = component.find(targetAuraId);
        for (var i = 0; i < x.length; i++) {
            $A.util.removeClass(x[i], 'selectedToggleButtonType');
        }
        $A.util.addClass(event.getSource(), 'selectedToggleButtonType');
    },


})