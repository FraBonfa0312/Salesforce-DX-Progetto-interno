({
    openModal: function (component, event, helper) {
        var cmpTarget = component.find('ABModal');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open');
    },

    closeModal: function (component, event, helper) {
        component.set("v.currentStep", "1");
        component.set("v.buttonLabel", "Start");
        var cmpTarget = component.find('ABModal');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack, 'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
        component.find("recordHandler").reloadRecord();
    },

    doClick: function (component, event, helper) {
        //alert("alerting!");
        var getCurrentStep = component.get("v.currentStep");
        if (getCurrentStep == "1") {
            component.set("v.currentStep", "2");
            var findButton = component.find('backBtn');
            $A.util.removeClass(findButton, 'slds-hidden');
            component.set("v.buttonLabel", "Next");
        } else if (getCurrentStep == "2") {
            component.set("v.currentStep", "3");
        } else if (getCurrentStep == "3") {
            component.set("v.currentStep", "4");
            component.set("v.buttonLabel", "Finish");
        } else if (getCurrentStep == "4") {
            var a = component.get('c.closeModal');
            $A.enqueueAction(a);
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Success!",
                "message": "Dang, that's a pretty sweet agenda.",
                "type": "success"
            });
            toastEvent.fire();
        }
    },

    doClickBack: function (component, event, helper) {
        var getCurrentStep = component.get("v.currentStep");
        if (getCurrentStep == "2") {
            component.set("v.currentStep", "1");
            var findButton = component.find('backBtn');
            $A.util.addClass(findButton, 'slds-hidden');
            component.set("v.buttonLabel", "Start");
        } else if (getCurrentStep == "3") {
            component.set("v.currentStep", "2");
        } else if (getCurrentStep == "4") {
            component.set("v.currentStep", "3");
            component.set("v.buttonLabel", "Next");
        }
    }

})