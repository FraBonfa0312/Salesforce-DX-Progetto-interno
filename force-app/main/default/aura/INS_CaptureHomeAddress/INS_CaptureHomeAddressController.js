({
    doInit : function(component, event, helper) {
        const availableActions = component.get('v.availableActions');
        for (let i = 0; i < availableActions.length; i++) {
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
        // Figure out which action was called
        const actionClicked = event.getSource().getLocalId();
        if (actionClicked === 'NEXT') {
            helper.callServer(
                component,
                "c.getPlacePhoto",
                function (response) {
                    if (response) {
                        const photos = JSON.parse(response);
                        console.log(photos);
                        if (photos.items && photos.items.length > 0) {
                            const item = photos.items[0];
                            console.log(item.link);
                            component.set('v.imageUrl', item.link);
                            
                            // Fire that action
                            let navigate = component.get('v.navigateFlow');
                            navigate('NEXT');
                        }
                    }
                },
                {
                    formattedAddress : component.get('v.formattedAddress')
                }
            );
        } else {
            // Fire that action
            let navigate = component.get('v.navigateFlow');
            navigate(actionClicked);
        }
    }
})