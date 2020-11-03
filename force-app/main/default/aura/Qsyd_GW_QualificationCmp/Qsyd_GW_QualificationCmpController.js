({
    handleQualificationInit: function (component, event, helper) {
        //		console.log('-------Qualification Information-------');
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