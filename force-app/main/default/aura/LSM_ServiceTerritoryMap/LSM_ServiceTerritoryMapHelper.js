({
    getCurrentGeoLocation: function(component, helper) {

        var options = { timeout: 5000 };
        function success(position) {
                 var lat = position.coords.latitude;
                 var lng = position.coords.longitude;
                 component.set('v.currentLat', lat);
                 component.set('v.currentLng', lng);
                 component.set('v.found', true);
        }
        function error(err) {
            component.set('v.found', true);
        }
        if (navigator.geolocation) {
            
            navigator.geolocation.getCurrentPosition(success, error, options);
            
        } else {
            error('Geo Location is not supported');
            component.set('v.found', true);
        }
        
    },    
    buildInitialMapData: function(component, helper, refresh) {
        var action = component.get('c.getAllTerritories');
        action.setParams({
            'WorkTypeGroupId':component.get('v.WorkTypeGroupId'),
            'WorkTypeId':component.get('v.WorkTypeId'),
            'CurrentLat':component.get('v.currentLat'),
            'CurrentLng':component.get('v.currentLng')
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state:', state);
            if (state == "SUCCESS") {
                var territories = response.getReturnValue();
                if(territories.length > 0){

                    var mapData = Array();
                    for(var i=0; i<territories.length; i++){
                        mapData.push({
                            "lat":parseFloat(territories[i].Latitude), 
                            "lng":parseFloat(territories[i].Longitude),
                            "id":territories[i].Id, 
                            "markerText":territories[i].Name, 
                            "Street":territories[i].Street, 
                            "City":territories[i].City, 
                            "State":territories[i].State,
                            "PostalCode":territories[i].PostalCode,
                            "Country":territories[i].Country
                        })
                    }
                    
                    component.set('v.mapData', mapData);
                    component.set('v.territories', territories);
                    component.set('v.built', true);
                    
                    if(refresh) helper.sendToVF(component, helper, 'refresh');
                    
                }
            }

        });
        $A.enqueueAction(action);
        
    },
    buildSortedMapData: function(component, helper) {

		var lat = component.get('v.lat');
		var lng = component.get('v.lng');
		console.log(lat+','+lng);        
        var action = component.get('c.getSortedTerritories');
        action.setParams({ 'WorkTypeGroupId':component.get('v.WorkTypeGroupId'),
                           'WorkTypeId':component.get('v.WorkTypeId'),
                           'radius':component.get('v.radius'),
                           'unit':component.get('v.UOM'),
                           'lat':lat,
                           'lng':lng
                         });
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state:', state);
            if (state == "SUCCESS") {
                var territories = response.getReturnValue();
                if(territories.length > 0){

                    var mapData = Array();
                    for(var i=0; i<territories.length; i++){
                        mapData.push({
                            "lat":parseFloat(territories[i].Latitude), 
                            "lng":parseFloat(territories[i].Longitude),
                            "id":territories[i].Id, 
                            "markerText":territories[i].Name, 
                            "Street":territories[i].Street, 
                            "City":territories[i].City, 
                            "State":territories[i].State,
                            "PostalCode":territories[i].PostalCode,
                            "Country":territories[i].Country
                        })
                    }
                    component.set('v.noNearbyLocations', false);
                    component.set('v.mapData', mapData);
                    component.set('v.territories', territories);
                    
                    helper.sendToVF(component, helper, 'refresh');
                } else {
                    component.set('v.noNearbyLocations', true);
                    helper.buildInitialMapData(component, helper, true);
                }
            }

        });
        $A.enqueueAction(action);

        
    },
    sendToVF : function(component, helper, mapstate) {
        
        //Prepare message in the format required in VF page
        var message = {
			            "loadGoogleMap" : mapstate,
            			"mapData": component.get('v.mapData'), 
            			"mapOptions": component.get('v.mapOptions')
        		} ;
        
        //Send message to VF
        helper.sendMessage(component, helper, message);
    },
    sendMessage: function(component, helper, message){
        //Send message to VF
        message.origin = window.location.hostname;
        var vfFrame = component.find("vfFrame");
        if(vfFrame != null) var vfWindow = vfFrame.getElement().contentWindow;
        vfWindow.postMessage(message, component.get("v.vfHost")); 
    }
})