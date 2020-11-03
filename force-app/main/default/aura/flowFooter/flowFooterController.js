({
    doInit : function(component, event, helper) {
        var availableActions = component.get('v.availableActions');
        for (var i = 0; i < availableActions.length; i++) {
            if (availableActions[i] == "PAUSE") {
                component.set("v.canPause", true);
            } else if (availableActions[i] == "BACK") {
                component.set("v.canBack", true);
            } else if (availableActions[i] == "NEXT") {
                component.set("v.canNext", true);
            } else if (availableActions[i] == "FINISH") {
                component.set("v.canFinish", true);
            }
        }
    },
    
    onButtonPressed: function(component, event, helper) {
        var actionClicked = event.getSource().getLocalId();
        var navigate = component.get('v.navigateFlow');
        navigate(actionClicked);
    }
})