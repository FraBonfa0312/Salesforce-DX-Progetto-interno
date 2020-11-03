({
	fetchMapMarkers: function(component) {
        console.log('fetchMapMarkers: START');     
        let mapMarkersStr = component.get("v.mapMarkersStr");
        console.log('fetchMapMarkers: mapMarkersStr retrieved',mapMarkersStr);
        
        if (mapMarkersStr) {
           component.find('mergeUtil1').merge(
              mapMarkersStr,
              null,
              function(mergeResult,mergeError) {
                console.log('fetchMapMarkers: result from merge');
                if (mergeResult) {
                   console.log('fetchMapMarkers: mergeResult received',mergeResult);
                   let mapResults = JSON.parse(mergeResult) || [];
                   let mapMarkers = component.get('v.mapMarkers') || [];
                   mapMarkers = mapMarkers.concat(mapResults);
                   component.set('v.mapMarkers', mapMarkers);
                   console.log('fetchMapMarkers: mapMarkers init',mapMarkers);
                }
                else {
                   console.error('fetchMapMarkers: triggering merge error notification',JSON.stringify(mergeError));
                   component.find('notifUtil').showNotice({
                      "variant": "error",
                      "header": "Error in merge for '" + component.get("v.title") + "'!",
                      "message": JSON.stringify(mergeError)
                   });
                }
              }
            );
        } else {
            console.warn('fetchMapMarkers: no merge to do');
        }
        console.log('fetchMapMarkers: END');
    },
    fetchOtherLocations : function(component) {
        console.log('fetchOtherLocations: START'); 
        
        let locationQuery = component.get("v.locationQuery");
        console.log('fetchOtherLocations: locationQuery retrieved',locationQuery);
        
        if (locationQuery) {
        component.find('mergeUtil2').merge(
            locationQuery,
            null,
            function(mergeResult,mergeError) {
                console.log('fetchOtherLocations: result from merge');
                if (mergeResult) {
                   console.log('fetchOtherLocations: mergeResult received',mergeResult);
                   
                   component.find('soqlUtil').runQuery(
                       mergeResult,
                       component.get("v.bypassFLS"),
                       component.get("v.bypassSharing"),
                       component.get("v.queryType"),
                       component.get("v.isStorable"),
                       component.get("v.isBackground"),
                       function(queryResult,queryError) {
                           console.log('fetchOtherLocations: result from query');
                           if (queryResult) {
                               console.log('fetchOtherLocations: queryResult received',queryResult);
                               
                               let locationConfig = JSON.parse(component.get("v.locationConfigStr"));
                               console.log('fetchOtherLocations: locationConfig retrieved',locationConfig);
                               
                               let mapMarkers = component.get('v.mapMarkers') || [];
                               console.log('fetchOtherLocations: mapMarkers fetched',mapMarkers);
                               //mapMarkers.push("hello");
                               
                               queryResult.forEach(function(item){
                                   console.log('fetchOtherLocations: processing item',item);
                                   let marker = {"location":{}};
                                   marker.location.City    = item[locationConfig.location.City.field]
                                                           || locationConfig.location.City.value;
                                   console.log('fetchOtherLocations: processing city',marker);
                                   marker.location.Country =  item[locationConfig.location.Country.field]
                                                           || locationConfig.location.Country.value;
                                   console.log('fetchOtherLocations: processing country',marker);
                                   marker.icon             = item[locationConfig.icon.field]
                                                           || locationConfig.icon.value;
                                   console.log('fetchOtherLocations: processing icon',marker);
                                   marker.title            = item[locationConfig.title.field]
                                                           || locationConfig.title.value;
                                   console.log('fetchOtherLocations: processing title',marker);
                                   marker.description      = item[locationConfig.description.field]
                                                           || locationConfig.description.value;
                                   console.log('fetchOtherLocations: processing description',marker);
                                   
                                   console.log('fetchOtherLocations: adding marker',marker);
                                   mapMarkers.push(marker);
                               });
                               console.log('fetchOtherLocations: mapMarkers updated',mapMarkers);
                               
                               component.set('v.mapMarkers',mapMarkers);
                               console.log('fetchOtherLocations: mapMarkers saved');
                           } else {
                               console.error('fetchOtherLocations: triggering query error notification',JSON.stringify(queryError));
                               component.find('notifUtil').showNotice({
                                  "variant": "error",
                                  "header": "Error in query for '" + component.get("v.title") + "'!",
                                  "message": JSON.stringify(queryError)
                               });
                           }
                       }
                   );
                } else {
                   console.error('fetchOtherLocations: triggering merge error notification',JSON.stringify(error));
                   component.find('notifUtil').showNotice({
                      "variant": "error",
                      "header": "Error in merge for '" + component.get("v.title") + "'!",
                      "message": JSON.stringify(mergeError)
                   });
                }
            }
        );
        }
        
        console.log('fetchOtherLocations: END'); 
    }
})