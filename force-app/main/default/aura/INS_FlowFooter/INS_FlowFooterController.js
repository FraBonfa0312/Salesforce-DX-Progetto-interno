({
    init : function(cmp, event, helper) {
        // Figure out which buttons to display
        var availableActions = cmp.get('v.availableActions');
        for (var i = 0; i < availableActions.length; i++) {
            if (availableActions[i] == "PAUSE") {
                cmp.set("v.canPause", true);
            } else if (availableActions[i] == "BACK") {
                cmp.set("v.canBack", true);
            } else if (availableActions[i] == "NEXT") {
                cmp.set("v.canNext", true);
            } else if (availableActions[i] == "FINISH") {
                cmp.set("v.canFinish", true);
            }
        }
    },
    
    onButtonPressed: function(cmp, event, helper) {
        // Figure out which action was called
        const actionClicked = event.getSource().getLocalId();
        // Fire that action
        if (actionClicked == 'FINISH') {
            const actionType = cmp.get('v.finishActionType');
            const actionTarget = cmp.get('v.finishActionTarget');
            switch (actionType) {
                case helper.NAVIGATE_TO_RECORD:
                    let navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        'recordId' : actionTarget
                    });
                    navEvt.fire();
                    break;
                case helper.NAVIGATE_TO_URL:
                    let urlEvent = $A.get("e.force:navigateToURL");
                    urlEvent.setParams({
                        'url' : actionTarget
                    });
                    urlEvent.fire();
                    break;
            }
        } else {
            let navigate = cmp.get('v.navigateFlow');
            navigate(actionClicked);
        }
    }
})