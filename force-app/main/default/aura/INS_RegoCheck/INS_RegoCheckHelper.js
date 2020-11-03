({
	callServer: function(component, method, callback, params) {
		var action = component.get(method);
		if (params) {
			action.setParams(params);
		}
		
		action.setCallback(this,function(response) {
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
	loadCountryOptions : function(cmp) {
		let countryOptions = [
            {'label': 'Demo', 'value': 'Demo'},
			{'label': 'Australia', 'value': 'CheckAustralia'},
			{'label': 'France', 'value': 'CheckFrance'},
			{'label': 'New Zealand', 'value': 'CheckNewZealand'},
			{'label': 'United Kingdom', 'value': 'Check'},
			{'label': 'United States of America', 'value': 'CheckUSA'}
		];

		cmp.set("v.countryOptions", countryOptions);
	},
	assignAttributeValues : function(cmp, regoDetails) {

		let description = regoDetails.Description;
		let imageUrl = regoDetails.ImageUrl;
		let VechileIdentificationNumber = regoDetails.VechileIdentificationNumber;

		cmp.set("v.description", description);
		cmp.set("v.imageUrl", imageUrl);
		cmp.set("v.vehicleIdentificationNumber", VechileIdentificationNumber); // Vehicle has a typo in the response

		if(regoDetails['extended'] != null) {
			// List of fields to retrieve and assign from the 'extended' section of the regoDetails
			let vehicleDetailsList = [
				'bodyDescription',
				'bodyType',
				'capacityUnit',
				'capacityValue',
				'code',
				'cylinders',
				'driveType',
				'engineDescription',
				'family',
				'fuelType',
				'make',
				'model',
				'nvic',
				'series',
				'transmissionType',
				'variant',
				'year'
			];

			vehicleDetailsList.forEach(function(item) {
				//console.log(item + ": " + regoDetails['extended'][item]);
				cmp.set("v." + item, regoDetails['extended'][item]);
			});
		}
		// If the 'extended' section isn't included in the JSON then retrieve using the main nodes
		else {
			cmp.set("v.make", regoDetails['CarMake']['CurrentTextValue']);
			cmp.set("v.model", regoDetails['CarModel']['CurrentTextValue']);
			cmp.set("v.year", regoDetails['RegistrationYear']);
			cmp.set("v.bodyType", regoDatils['BodyStyle']['CurrentTextValue']);
			cmp.set("v.engineDescription", regoDetails['EngineSize']['CurrentTextValue']);
			
		}
	},
	toggleSpinner : function(cmp) {
		var spinner = cmp.find("spinner");
		$A.util.toggleClass(spinner, "slds-hide");
	}
})