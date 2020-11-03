({
    doInit : function(component, event, helper) {
        var pref = window.location.pathname.split('/')[1];
        component.set("v.prefix", pref);
        
        //Check for available actions
        var availableActions = component.get('v.availableActions');
        for (var i = 0; i < availableActions.length; i++) {
            if (availableActions[i] == "NEXT") {
                component.set("v.canNext", true);
            } else if (availableActions[i] == "FINISH") {
                component.set("v.canFinish", true);
            }
        }
    },
    
    handleClick : function(component, event, helper) {
        //Get tile value by button click
        var availableActions = component.get('v.availableActions');
        var tileClickedLabel = event.getSource().get("v.label");
        var tileClickedValue = event.getSource().get("v.value");
        var navigationAction = component.get("v.NavigateAction");
        var canNext = component.get("v.canNext");
        var canFinish = component.get("v.canFinish");
        
        //console.log("Debug: Available Actions: " + availableActions);
        //console.log("Debug: Clicked Tile Label: " + tileClickedLabel + ", Clicked Tile Value: " + tileClickedValue );
        
        //Set value for use in flow
        component.set("v.SelectedTileValue", tileClickedValue);
        
        // Onclick navigation options
        if (navigationAction == 'Next' && canNext ) {
            var navigate = component.get("v.navigateFlow");
            navigate("NEXT");
        } else if (navigationAction == 'Finish' && canFinish) {
            var navigate = component.get("v.navigateFlow");
            navigate("FINISH");
        } else {
            console.log('No onclick navigation option selected and/or navigation option not available');
        }
        
    }
})