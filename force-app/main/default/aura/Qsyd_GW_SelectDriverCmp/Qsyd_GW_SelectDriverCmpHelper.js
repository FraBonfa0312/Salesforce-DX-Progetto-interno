({

    handleUpdateDefaultDriverListByOppty: function (component, event, helper) {
        var initDriversList = [];
        var oppty = component.get("v.oppty");
        console.log('handleUpdateDefaultDriverListByOppty..');
        //console.log('opptyObj:' + JSON.stringify(oppty));
        initDriversList.push({
            firstName: oppty.Account.FirstName,
            lastName: oppty.Account.LastName,
            readonly: true,
            deletable: false,
            isPrimary: true,
            dateOfBirth: oppty.Account.PersonBirthdate,
            gender: oppty.Account.FinServ__Gender__pc,
            licenseState: oppty.Account.BillingState,
            licenseNumber: '',
            numOfAccidents: 0,
            numOfViolations: 0
        });
        component.set("v.driversList", initDriversList);
    },

    initYearsOptions: function (component, event, helper) {
        console.log('-initYearsOptions..');
        var yearOptions = [];
        var currentYear = (new Date()).getFullYear();
        var yearFrom = currentYear - 60;
        for (var i = currentYear; i >= yearFrom; i--) {
            yearOptions.push(i);
        }
        console.log('start from:' + yearFrom + ' to ' + currentYear);
        component.set("v.yearsOptions", yearOptions);
    },

    fireEvent: function (component, event, helper, action) {
        var onSelectDriverCompletionEvt = component.getEvent(
            "onSelectDriverCompletionEvt"
        );
        console.log('>>' + action);
        onSelectDriverCompletionEvt.setParams({
            driversList: component.get("v.driversList"),
            action: action
        });
        onSelectDriverCompletionEvt.fire();
    },

    saveCurrentDriversInput: function (component, event, helper) {
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
            if (i != 0) {
                driversList[i].readonly = false;
                driversList[i].deletable = true;
                driversList[i].isPrimary = false;
            }
        }
        //console.log("completed driversList:");
        //console.log(JSON.stringify(driversList));
        component.set("v.driversList", driversList);
    }

});