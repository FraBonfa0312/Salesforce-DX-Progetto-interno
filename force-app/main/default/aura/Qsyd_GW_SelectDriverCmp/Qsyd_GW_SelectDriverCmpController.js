({
    handleSelectDriverInit: function (component, event, helper) {
        //   console.log('-------Select Drivers------');
        helper.handleUpdateDefaultDriverListByOppty(component, event, helper);
        helper.initYearsOptions(component, event, helper);
    },

    handleUpdateCounter: function (component, event, helper) {
        //    console.log("handleUpdateCounter..");
        var counterElementId = event.srcElement.dataset.idx;
        var currentElement = document.getElementById(counterElementId);
        var currentValue = parseInt(currentElement.value);
        switch (event.srcElement.dataset.action) {
            case "increment":
                currentValue++;
                break;
            case "decrement":
                if (currentValue > 0) {
                    currentValue--;
                }
                break;
        }
        currentElement.value = currentValue;
    },

    handleAddDriver: function (component, event, helper) {
        //    console.log("handleAddDriver..");
        helper.saveCurrentDriversInput(component, event, helper);
        var driversList = component.get("v.driversList");
        driversList.push({
            firstName: '',
            lastName: '',
            readonly: false,
            deletable: true,
            isPrimary: false,
            gender: '',
            licenseState: '',
            dateOfBirth: '',
            numOfAccidents: 0,
            numOfViolations: 0
        });
        component.set("v.driversList", driversList);
    },

    handleDeleteDriver: function (component, event, helper) {
        //    console.log("handleDeleteDriver..");
        var driversList = component.get("v.driversList");
        var driverIndexString = event.getSource().get("v.name");
        var driverIndex = parseInt(driverIndexString);
        if (driverIndex > -1) {
            driversList.splice(driverIndex, 1);
        }
        component.set("v.driversList", driversList);
    },

    handleFireEventGoPrevious: function (component, event, helper) {
        //    console.log("---Select Driver: handleFireEvenGoPrevious---..");
        var driversList = component.get("v.driversList");
        for (var i = 0; i < driversList.length; i++) {
            driversList[i].firstName = document.getElementById("FIRSTNAME" + i).value;
            driversList[i].lastName = document.getElementById("LASTNAME" + i).value;
            driversList[i].gender = document.getElementById("GENDER" + i).value;
            driversList[i].licenseState = document.getElementById("LICENSESTATE" + i).value;
            driversList[i].dateOfBirth = document.getElementById("DOB" + i).value;
            driversList[i].yearLicensed = document.getElementById("YEARLICENSED" + i).value;
            driversList[i].licenseNumber = document.getElementById("LICENSENUMBER" + i).value;
            driversList[i].numOfAccidents = document.getElementById("a" + i).value;
            driversList[i].numOfViolations = document.getElementById("v" + i).value;
        }
        //   console.log("completed driversList:");
        console.log(JSON.stringify(driversList));
        component.set("v.driversList", driversList);
        helper.fireEvent(component, event, helper, "PREVIOUS");

    },

    handleFireEventGoNext: function (component, event, helper) {
        //    console.log("---Select Driver: handleFireEvenGoNext---..");
        var driversList = component.get("v.driversList");
        for (var i = 0; i < driversList.length; i++) {
            driversList[i].firstName = document.getElementById("FIRSTNAME" + i).value;
            driversList[i].lastName = document.getElementById("LASTNAME" + i).value;
            driversList[i].gender = document.getElementById("GENDER" + i).value;
            driversList[i].licenseState = document.getElementById("LICENSESTATE" + i).value;
            driversList[i].dateOfBirth = document.getElementById("DOB" + i).value;
            driversList[i].yearLicensed = document.getElementById("YEARLICENSED" + i).value;
            driversList[i].licenseNumber = document.getElementById("LICENSENUMBER" + i).value;
            driversList[i].numOfAccidents = document.getElementById("a" + i).value;
            driversList[i].numOfViolations = document.getElementById("v" + i).value;
        }
        // console.log("completed driversList:");
        // console.log(JSON.stringify(driversList));
        component.set("v.driversList", driversList);
        helper.fireEvent(component, event, helper, "NEXT");

    }
});