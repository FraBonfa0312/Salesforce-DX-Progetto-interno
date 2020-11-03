({
    handleUpdateDefaultVehicleListByOppty: function (component, event, helper) {
        let initVehiclesList = [];
        let oppty = component.get("v.oppty");
        console.log("handleUpdateDefaultVehicleListByOppty..");
        //console.log('opptyObj:' + JSON.stringify(oppty));
        initVehiclesList.push({
            VIN: "1VWAP7A36DC047911",
            year: '2018',
            costNew: 0,
            state: oppty.Account.BillingState,
            deletable: false
        });
        component.set("v.vehiclesList", initVehiclesList);
    },


    initVehicleMakeYearsOptions: function (component, event, helper) {
        console.log('-initVehicleMakeYearsOptions-..');
        let yearOptions = [];
        let currentYear = (new Date()).getFullYear();
        let yearFrom = currentYear - 50;
        for (let i = currentYear; i >= yearFrom; i--) {
            yearOptions.push(i);
        }
        console.log('start from:' + yearFrom + ' to ' + currentYear);
        component.set("v.vehicleYearsOptions", yearOptions);
    },

    saveCurrentVehiclesInput: function (component, event, helper) {
        let vehiclesList = component.get("v.vehiclesList");
        for (let i = 0; i < vehiclesList.length; i++) {
            vehiclesList[i].VIN = document.getElementById("VIN" + i).value;
            vehiclesList[i].state = document.getElementById("STATE" + i).value;
            vehiclesList[i].model = document.getElementById("MODEL" + i).value;
            vehiclesList[i].licensePlate = document.getElementById(
                "LICENSEPLATE" + i
            ).value;
            vehiclesList[i].costNew = document.getElementById("COSTNEW" + i).value;
            if (i != 0) {
                vehiclesList[i].deletable = true;
            }
        }
        //console.log("completed vehiclesList:");
        //console.log(JSON.stringify(vehiclesList));
        component.set("v.vehiclesList", vehiclesList);
    },

    fireEvent: function (component, event, helper, action) {

        let onSelectVehicleCompletionEvt = component.getEvent(
            "onSelectVehicleCompletionEvt"
        );
        
        let vehicles = component.get("v.vehiclesList");
        vehicles.forEach(function(vehicles) {
            vehicles.primaryUse = component.get('v.primaryUse');
        });

        onSelectVehicleCompletionEvt.setParams({
            propertyList: vehicles,
            propertyType: component.get('v.propertyType'),
            action: action
        });
        onSelectVehicleCompletionEvt.fire();
    },

    // Helper
    callServer: function (component, method, callback, params) {
        let action = component.get(method);
        if (params) {
            action.setParams(params);
        }

        action.setCallback(this, function (response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                // pass returned value to callback function
                callback.call(this, response.getReturnValue());
            } else if (state === "ERROR") {
                // generic error handler
                let errors = response.getError();
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
});