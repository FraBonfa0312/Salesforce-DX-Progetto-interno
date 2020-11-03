({
    updateProgramList: function (component, event, helper, multi) {
        let programList = component.get('v.programList');
        programList = JSON.parse(JSON.stringify(programList));
        //debugger
        if (multi == undefined || multi == null) {
            multi = 1;
        }
        for (let i = 0; i < programList.length; i++) {
            if (multi == 12) {
                programList[i].price = programList[i].annualprice;
                programList[i].numOfMonth = 12;
            } else {
                programList[i].price = programList[i].monthlyprice;
                programList[i].numOfMonth = 1;
            }

        }
        component.set("v.programList", programList);
    },

    getProductsCoverages: function (component, event, helper) {

        helper.callServer(
            component,
            "c.getProducts",
            function (response) {
                if (response != null) {
                    let programList = [];
                    // console.log(" >> call server: INS_InsuranceQuoteControoler.getProducts - products ");

                    console.log('== Comparison Data ==');
                    console.log(response);
                    component.set('v.comparisonFeaturesDataFromServer', response.features);
                    component.set('v.comparisonProductsDataFromServer', response.products);

                    for (let i = 0; i < response.products.length; i++) {
                        programList.push({
                            id: response.products[i].Id,
                            name: response.products[i].Name,
                            annualprice: parseFloat(response.products[i].Premium__c),
                            monthlyprice: (parseFloat(response.products[i].Premium__c || 0) / 12).toFixed(2),
                            price: (parseFloat(response.products[i].Premium__c || 0) / 12).toFixed(2),
                            numOfMonth: 12
                        });
                    }

                    component.set('v.programList', programList);
                    console.log("programList");
                    // console.log(programList);

                } else {
                    console.log("response = none");
                }
            }, {
                productFamily: component.get('v.productFamily')
            }
        );
    },





    callServer: function (component, method, callback, params) {
        console.log("master call server..");
        var action = component.get(method);
        if (params) {
            action.setParams(params);
        }

        action.setCallback(this, function (response) {
            var state = response.getState();
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
    },



})