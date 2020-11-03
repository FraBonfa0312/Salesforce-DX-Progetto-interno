({
    doInit : function(component, event, helper) {
        helper.initFlowActions(component);
        const selected = component.get('v.selected');
        
        if (!selected || selected.length == 0) {
            // TODO: Move to the next screen?
            //let navigate = component.get('v.navigateFlow');
            //navigate('NEXT');
        } else {
            console.log(selected[0]);
            const items = selected[0].split(';');
            helper.callServer(
                component,
                "c.createCustomerProperties",
                function (response) {
                    console.log(response);
                    if (response) {
                        let propertyIdList = [];
                        response.forEach(function(item) {
                            item.images = [];
                            propertyIdList.push(item.Id);
                            //item.Description = item.Description.replace('_', ' ');
                        });
                        component.set('v.propertyIdList', propertyIdList.join(','));
                    }
                    component.set('v.items', response);
                    console.log(response);
                },
                {
                    accountId : component.get('v.accountId'),
                    itemNames : items
                }
            );
        }
    },
    handleUploadFinished : function(component, event, helper) {
        const uploadedFiles = event.getParam("files");
        const itemName = event.getSource().get('v.name');
        let items = component.get('v.items');
        items.forEach(function(item) {
            if (item.Id === itemName) {
                item.images.push(uploadedFiles);
            }
        });
        component.set('v.items', items);
    },
    handleChange : function(component, event, helper) {
        const id    = event.getSource().get('v.name');
        const price = event.getSource().get('v.value');
        console.log(id);
        console.log(price);
        helper.callServer(
            component,
            "c.updateCustomerPropertyPrice",
            function (response) {
                
            },
            {
                propoertyId : id,
                price : price
            }
        );
    },
    onButtonPressed: function(component, event, helper) {
        // Figure out which action was called
        const actionClicked = event.getSource().getLocalId();
        console.log(JSON.stringify(component.get('v.items')));
        if (actionClicked === 'NEXT') {
            helper.callServer(
                component,
                "c.updateCustomerProperties",
                function (response) {
                    // Fire that action
                    let navigate = component.get('v.navigateFlow');
                    navigate(actionClicked);
                },
                {
                    itemsJSON : JSON.stringify(component.get('v.items'))
                }
            );
        } else {
            // Fire that action
            let navigate = component.get('v.navigateFlow');
            navigate(actionClicked);
        }
    }
})