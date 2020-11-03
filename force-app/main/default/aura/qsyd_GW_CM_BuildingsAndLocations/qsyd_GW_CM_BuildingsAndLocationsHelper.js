({

    gotoNextScreen: function (component, event, helper) {
        let currentStep = component.get('v.currentStep');
        if (currentStep == 2) {
            helper.handleGetSelectedLocationCP(component);
        } else if (currentStep == 3) {
            helper.handleGetSelectedBuildingCP(component);
        }
        currentStep += 1;
        component.set('v.currentStep', currentStep);
    },

    gotoPrevScreen: function (component, event, helper) {
        let currentStep = component.get('v.currentStep');
        currentStep -= 1;
        component.set('v.currentStep', currentStep);
    },


    gotoMasterCmp: function (component, event, helper) {

        let onFromBuildingLocationScreenToMasterEvt = component.getEvent(
                "onFromBuildingLocationScreenToMasterEvt"
            ),
            propertyDetails = component.get('v.selectedCPCommercialProperty'),
            selectedCPCommercialPropertyList = [];
        selectedCPCommercialPropertyList.push(propertyDetails);
        onFromBuildingLocationScreenToMasterEvt.setParams({
            selectedCPCommercialPropertyList: selectedCPCommercialPropertyList
        });
        console.log('onFromBuildingLocationScreenToMasterEvt');
        onFromBuildingLocationScreenToMasterEvt.fire();

    },



    handleGetSelectedLocationCP: function (component) {
        let selectedPropertyRecord = component.get('v.selectedCPCommercialProperty') || {
            Description: 'Commercial building over three stories',
            YearBuilt: 1956,
            FloorCount: 10,
            BuiltUpArea: '108,050'
        };
        let existingLocationCPId = document.getElementById('existingLocationSelect');
        let existingCommercialPropertyList = component.get('v.existingCPcommercialPropertyList');
        let existingCPIdx = 0;
        if (existingLocationCPId != null && existingLocationCPId.value != '') {
            let options = existingLocationCPId.getElementsByTagName('option');
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    existingCPIdx = options[i].dataset.idx;
                    break;
                }
            }
            selectedPropertyRecord = existingCommercialPropertyList[existingCPIdx];
            // debugger
            console.log(selectedPropertyRecord);
            console.log('choose existing location');
        } else {
            let newLocationAddressPickerCmp = component.find('newLocationAddressPicker');
            selectedPropertyRecord.Id = null;
            selectedPropertyRecord.Street = newLocationAddressPickerCmp.get('v.fullStreetAddress');
            selectedPropertyRecord.City = newLocationAddressPickerCmp.get('v.locality');
            selectedPropertyRecord.State = newLocationAddressPickerCmp.get('v.administrative_area_level_1');
            selectedPropertyRecord.PostalCode = newLocationAddressPickerCmp.get('v.postal_code');
            selectedPropertyRecord.Country = newLocationAddressPickerCmp.get('v.country');
            selectedPropertyRecord.INS_Property_Code__c = newLocationAddressPickerCmp.get('v.placeId');
            selectedPropertyRecord.PrimaryOwnerId = component.get('v.oppty.AccountId');
            console.log('choose new location');
        }
        console.log(selectedPropertyRecord);
        component.set('v.selectedCPCommercialProperty', selectedPropertyRecord);
    },

    handleGetSelectedBuildingCP: function (component) {
        let selectedPropertyRecord = component.get('v.selectedCPCommercialProperty');
        selectedPropertyRecord.Description = document.getElementById('step2BuildingDescInput').value;
        selectedPropertyRecord.FloorCount = document.getElementById('step2NoOfStoryInput').value;
        selectedPropertyRecord.YearBuilt = document.getElementById('step2YearBuiltInput').value;
        selectedPropertyRecord.BuiltUpArea = document.getElementById('step2TotalAreaInput').value;
        component.set('v.selectedCPCommercialProperty', selectedPropertyRecord);
        console.log(selectedPropertyRecord);
    },

    callServer: function (component, method, callback, params) {
        // console.log("master call server..");
        let action = component.get(method);
        // debugger;
        if (params) {
            action.setParams(params);
        }

        action.setCallback(this, function (response) {
            //  debugger;
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
    },

})