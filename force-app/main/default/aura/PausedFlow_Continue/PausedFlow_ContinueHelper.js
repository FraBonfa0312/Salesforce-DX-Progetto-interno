({
    getAllUrlParams : function (component, url) {

        console.log('url', url);
        
        // get query string from url (optional) or window
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        
        // we'll store the parameters here
        var obj = {};
     
         // if query string exists
         if (queryString) {
            
            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];
            
            // split our query string into its component parts
            var arr = queryString.split('&');
            
            for (var i=0; i<arr.length; i++) {
                // separate the keys and the values
                var a = arr[i].split('=');
                
                // in case params look like: list[]=thing1&list[]=thing2
                var paramNum = undefined;
                var paramName = a[0].replace(/\[\d*\]/, function(v) {
                    paramNum = v.slice(1,-1);
                    return '';
                });
                
                // set parameter value (use 'true' if empty)
                var paramValue = typeof(a[1])==='undefined' ? true : a[1];
                
                // (optional) keep case consistent
                // paramName = paramName.toLowerCase();
                // paramValue = paramValue.toLowerCase();
                
                // if parameter name already exists
                if (obj[paramName]) {
                    // convert value to array (if still string)
                    if (typeof obj[paramName] === 'string') {
                        obj[paramName] = [obj[paramName]];
                    }
                    // if no array index number specified...
                    if (typeof paramNum === 'undefined') {
                        // put the value on the end of the array
                        obj[paramName].push(paramValue);
                    }
                    // if array index number specified...
                    else {
                        // put the value at that index number
                        obj[paramName][paramNum] = paramValue;
                    }
                }
                // if param name doesn't exist yet, set it
                else {
                    obj[paramName] = paramValue;
                }
            }
        }
        
        return obj;
    },
    
    getTheFlowId : function (component) {
        
        var that = this;
        
        var isConsoleNav = false;
        var theTabURL;
        var focusedTabId;
        var workspaceAPI = component.find("workspace");
        
        workspaceAPI.isConsoleNavigation().then(function(response) {
            isConsoleNav = response;
            console.log('isConsoleNav', isConsoleNav); 
            
            if (isConsoleNav) {
                workspaceAPI.getFocusedTabInfo().then(function(response) {
                    focusedTabId = response.tabId;
                    console.log('focusedTabId', focusedTabId);
                    workspaceAPI.setTabIcon({
                        tabId: focusedTabId,
                        icon: "standard:flow",
                        iconAlt: "Resume Flow"
                    });  
                    // workspaceAPI.closeTab({tabId: focusedTabId});
                    workspaceAPI.getTabURL({
                        tabId: focusedTabId
                    }).then(function(response) {
                        console.log('getTabURL response', response);
                        theTabURL = response;
                        var theParam = that.getAllUrlParams(component, theTabURL).theFlowId;
                        component.set("v.flowID", theParam);
                        var theFlowId = component.get('v.flowID');
                        
                        if( theFlowId ) {
                            console.log('Flow ID set', theFlowId);
                            var flow = component.find("flowData");
                            flow.resumeFlow (theFlowId);
                        }
                        else{
                            console.log('No Flow ID set');
                        }
                        
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
            else {
                var url_string = window.location.href;
                var theParam = that.getAllUrlParams(component, url_string).theFlowId;
                component.set("v.flowID", theParam);
                var theFlowId = component.get('v.flowID');
                
                if( theFlowId ) {
                    console.log('Flow ID set', theFlowId);
                    var flow = component.find("flowData");
                    flow.resumeFlow (theFlowId);
                }
                else{
                    console.log('No Flow ID set');
                }
            }

        })
 
    }
})