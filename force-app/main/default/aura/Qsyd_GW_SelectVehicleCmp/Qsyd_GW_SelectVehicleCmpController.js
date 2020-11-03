({
  handleSelectVehicleInit: function(component, event, helper) {
    console.log('-------Select Vehicles------');
    helper.handleUpdateDefaultVehicleListByOppty(component, event, helper);
    helper.initVehicleMakeYearsOptions(component, event, helper);
  },

  handleAddVehicle: function(component, event, helper) {
    console.log("handleAddVehicle..");
    helper.saveCurrentVehiclesInput(component, event, helper);
    var vehiclesList = component.get("v.vehiclesList");
    vehiclesList.push({
      deletable: true,
      VIN: "",
      state: "",
      make: "",
      model: "",
      licensePlate: "",
      costNew: 0
    });
    component.set("v.vehiclesList", vehiclesList);
  },

  handleDeleteVehicle: function(component, event, helper) {
    console.log("handleDeleteVehicle..");
    var vehiclesList = component.get("v.vehiclesList");
    var vehicleIndexString = event.getSource().get("v.name");
    var vehicleIndex = parseInt(vehicleIndexString);
    if (vehicleIndex > -1) {
      vehiclesList.splice(vehicleIndex, 1);
    }
    component.set("v.vehiclesList", vehiclesList);
  },

  handleVINLookup: function(component, event, helper) {
    console.log("--handleVINLookup--");
    //debugger
    var idx = event.target.name;
    console.log("idx:" + idx);
    var inputVINElementId = "VIN" + idx;
    var inputVINElement = document.getElementById(inputVINElementId);
    var inputVINNumber = inputVINElement.value;
    console.log("Lookup VIN Number:" + inputVINNumber);

    helper.callServer(
      component,
      "c.getVINDetails",
      function(response) {
        console.log("###### Server Response ######");
        var resp = JSON.parse(response);
        //console.log(resp);
        if (resp.Message.indexOf("Results returned successfully")> -1) {
          var make,
            model,
            year = "";
          resp.Results.forEach(function(item) {
            if (item.Variable == "Make") {
              // console.log("Make: " + item.Value);
              make = item.Value;
            } else if (item.Variable == "Model") {
              // console.log("Model: " + item.Value);
              model = item.Value;
            } else if (item.Variable == "Model Year") {
              //  console.log("Year: " + item.Value);
              year = item.Value;
            } 
          });
          console.log("Make:" + make);
          console.log("Model:" + model);
          console.log("Year:" + year);
          console.log("Vehicle idx:" + idx);
          var vehiclesList = component.get("v.vehiclesList");
          vehiclesList[idx].VIN = inputVINNumber;
          vehiclesList[idx].make = make;
          vehiclesList[idx].model = model;
          vehiclesList[idx].year = year;
          component.set("v.vehiclesList", vehiclesList);
        } else {
          console.log("Failed to get response");
        }
      },
      {
        input: inputVINNumber
      }
    );
  },
  handleFireEventGoPrevious: function(component, event, helper) {
    console.log("---Select Vehicle: handleFireEvenGoPrevious---..");
    var vehiclesList = component.get("v.vehiclesList");
    for (var i = 0; i < vehiclesList.length; i++) {
      vehiclesList[i].VIN = document.getElementById("VIN" + i).value;
      vehiclesList[i].state = document.getElementById("STATE" + i).value;
      vehiclesList[i].model = document.getElementById("MODEL" + i).value;
      vehiclesList[i].licensePlate = document.getElementById(
        "LICENSEPLATE" + i
      ).value;
      vehiclesList[i].costNew = document.getElementById("COSTNEW" + i).value;
    }
    console.log("completed vehiclesList:");
    console.log(JSON.stringify(vehiclesList));
    component.set("v.vehiclesList", vehiclesList);
    helper.fireEvent(component, event, helper, "PREVIOUS");
  },

  handleFireEventGoNext: function(component, event, helper) {
    console.log("---Select Vehicle: handleFireEvenGoNext---..");
    var vehiclesList = component.get("v.vehiclesList");
    for (var i = 0; i < vehiclesList.length; i++) {
      vehiclesList[i].VIN = document.getElementById("VIN" + i).value;
      vehiclesList[i].state = document.getElementById("STATE" + i).value;
      vehiclesList[i].model = document.getElementById("MODEL" + i).value;
      vehiclesList[i].licensePlate = document.getElementById(
        "LICENSEPLATE" + i
      ).value;
      vehiclesList[i].costNew = document.getElementById("COSTNEW" + i).value;
    }
    console.log("completed vehiclesList:");
    console.log(JSON.stringify(vehiclesList));
    component.set("v.vehiclesList", vehiclesList);
    helper.fireEvent(component, event, helper, "NEXT");
  },

});