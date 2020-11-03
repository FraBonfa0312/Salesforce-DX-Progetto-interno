({
	doInit : function(component, event, helper) {
        
        //Send LC Host as parameter to VF page so VF page can send message to LC; make it all dynamic
        component.set('v.lcHost', window.location.hostname);
        
        var action = component.get('c.getLSMConfig');
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state:', state);
            if (state == "SUCCESS") {
            	component.set('v.lsmConfig',response.getReturnValue());
           	}

        });
        $A.enqueueAction(action);
                      
  		//Add message listener
        window.addEventListener("message", function(event) {
            
         
           if(event.data.clicked) {
               var clickedmarkerid = event.data.marker;
               component.set('v.ServiceTerritoryId', clickedmarkerid);
               
               var mapData = component.get("v.mapData");
               for(var i=0; i<mapData.length; i++) {
                   if(mapData[i].id == clickedmarkerid) {
                       component.set('v.Street', mapData[i].Street);
                       component.set('v.City', mapData[i].City);
                       component.set('v.State', mapData[i].State);
                       component.set('v.PostalCode', mapData[i].PostalCode);
                       component.set('v.Country', mapData[i].Country);
                   }
               }
                var listButtons = document.getElementsByClassName('slds-coordinates__item-action');
                for(var i=0; i<listButtons.length; i++) {
                    listButtons[i].setAttribute('aria-pressed',false);
                }
                var globalId = component.getGlobalId();
                var selectedButton = document.getElementById(globalId+"_"+clickedmarkerid);
                selectedButton.setAttribute('aria-pressed',true);
            }
                        
            // Handle the message
            if(event.data.state == 'LOADED'){
                console.log('Loaded');
                component.set('v.vfHost', event.data.vfHost);
				component.set('v.loaded', true);
            }

        }, false);

		helper.getCurrentGeoLocation(component, helper);        

	},
    buildMapData : function(component, event, helper) {
        if(component.get('v.found')) {
            helper.buildInitialMapData(component, helper, false);
        }
    },
    createMap : function(component, event, helper) {
        if(component.get('v.loaded') && component.get('v.built')) {
            console.log('built');
            helper.sendToVF(component, helper, 'initial');
			component.set('v.showSpinner', false);                
        }

    },
    getCities : function(component, event, helper){
        
        var location = component.get('v.location');
        var lsmConfig = component.get('v.lsmConfig');
        var placeOptions = component.get('v.placeOptions');
        if(lsmConfig != null) {
            if(location.length > 0) {
                var action = component.get('c.getSuggestions');
                action.setParams({ 'input' : location, 'placesKey' : lsmConfig.places, 'options' : placeOptions });
        		action.setCallback(this, function(response){
            		var state = response.getState();
            		console.log('state:', state);
            		if (state == "SUCCESS") {
                		var resp = JSON.parse(response.getReturnValue());	
            			console.log(resp);
            			component.set('v.predictions',resp.predictions);
           	 		} else console.log(response.getReturnValue());
                });
        		$A.enqueueAction(action);            
        	} else {
                component.set('v.noNearbyLocations', false);
            	helper.buildInitialMapData(component, helper, true);
        	}
        }

    },
    getCityDetails : function(component, event, helper){
        
        var selectedItem = event.currentTarget;
        var placeid = selectedItem.dataset.placeid;
        var lsmConfig = component.get('v.lsmConfig');
                
        var action = component.get('c.getPlaceDetails');
        action.setParams({ 'placeId' : placeid, 'placesKey' : lsmConfig.places });
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state:', state);
            if (state == "SUCCESS") {
                var placeDetails = JSON.parse(response.getReturnValue());	
            	console.log(placeDetails);
                console.log(placeDetails.result.geometry.location.lat);
                console.log(placeDetails.result.geometry.location.lng);
                component.set('v.location',placeDetails.result.formatted_address);
                component.set('v.predictions',[]);
                component.set('v.lat', placeDetails.result.geometry.location.lat);
                component.set('v.lng', placeDetails.result.geometry.location.lng);
                helper.buildSortedMapData(component, helper);
            }
        });
        $A.enqueueAction(action);

    },
    selectLocation : function(component, event, helper) {

        var message = {
			            "showInfoWindow" : true,
            			"markerId": event.currentTarget.dataset.markerid 
       	} ;
        
        //Send message to VF
        helper.sendMessage(component, helper, message);
    },
    handleLimitChange : function(component, event, helper) {
        if(component.get('v.loaded') && component.get('v.built') && component.get('v.found')) helper.buildSortedMapData(component, helper);
    }
})