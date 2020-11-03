({


    handleRetrieveCommercialInsuranceProducts: function (component, event, helper) {
        component.set('v.showSpinner', true);
        helper.callServer(
            component,
            "c.getProducts",
            function (response) {
                // console.log('products: ' + JSON.stringify(response));
                // console.log();
                component.set('v.commercialINSProductsList', response);
                component.set('v.showSpinner', false);
            }, {
                productFamily: 'Commercial Insurance'
            }
        );
    },

    handleRetrieveProducers: function (component, event, helper) {
        var currentUserId = $A.get("$SObjectType.CurrentUser.Id");
        // console.log(currentUserId);
        component.set('v.showSpinner', true);
        helper.callServer(
            component,
            "c.getProducers",
            function (response) {
                if (response) {
                    let data = JSON.parse(response);
                    // console.log('producer: ' + response);
                    // console.log();
                    component.set('v.producerList', data);
                    if (currentUserId != null) {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].InternalUserId == currentUserId) {
                                component.set('v.selectedProducer', data[i]);
                                break;
                            }
                        }
                    }
                    component.set('v.showSpinner', false);
                }
            }, {

            }
        );

    },

    callServer: function (component, method, callback, params) {
        let action = component.get(method);
        if (params) {
            action.setParams(params);
        }

        action.setCallback(this, function (response) {
            const state = response.getState();
            if (state === "SUCCESS") {
                // pass returned value to callback function
                callback.call(this, response.getReturnValue());
            } else if (state === "ERROR") {
                // generic error handler
                var errors = response.getError();
                if (errors) {
                    console.log("Errors", errors);
                    if (errors[0] && errors[0].message) {
                        throw new Error("Error" + errors[0].message);
                    }
                } else {
                    throw new Error("Unknown Error");
                }
            }
        });

        $A.enqueueAction(action);
    }


})