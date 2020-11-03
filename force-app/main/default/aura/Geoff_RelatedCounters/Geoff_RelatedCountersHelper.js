({
    loadCounters : function(component,helper) {
        
            helper.loadQueryCounter(component,1);
                helper.loadQueryCounter(component,2);
                        helper.loadQueryCounter(component,3);

                        helper.loadQueryCounter(component,4);

                        helper.loadQueryCounter(component,5);
        
    },

    loadQueryCounter : function(component,counterNumber) {
        console.log('loadcounters: START');
        
                let queryCounter = component.get("v.queryCounter" + counterNumber);

        console.log('loadcounters: counterConfigStr fetched',queryCounter);
        component.find('mergeUtil').merge(
            queryCounter,
            null,
            function(mergeResult,mergeError) {
                console.log('loadcounters: result from merge');
                if (mergeResult) {
                   console.log('loadcounters: mergeResult received',mergeResult);
                   
                                 
                   

                             console.log('loadcounters: sending soql for counterItem',mergeResult);
                             component.find('soqlUtil').runQuery(
                                 mergeResult,
                                 false,
                                 false,
                                 null,
                                 false,
                                 false,
                                 function(result,error) {
                                     console.log('loadcounters: result from SOQL query for item',mergeResult);                           
                                     if (result) {
                                         console.log('loadcounters: counter received', result[0].expr0);
                                         component.set("v.results" + counterNumber,result[0].expr0);
                                     } else {
                                         console.error('loadcounters: counter SOQL query error',error);
                                         component.find('notifLib').showNotice({
                                            "variant": "error",
                                            "header": "Error in counter SOQL query !",
                                            "message": JSON.stringify(error) + ' for ' + mergeResult
                                         });
                                     }
                                 }
                            );
                       console.log('loadcounters: counterItem processed',mergeResult);
                
                   console.log('loadcounters: counterConfigJson processed');
                } else {
                    console.error('loadcounters: counter merge error',mergeError);
                    component.find('notifLib').showNotice({
                          "variant": "error",
                          "header": "Error in counter SOQL query !",
                          "message": JSON.stringify(mergeError)
                    });
                }
                console.log('loadcounters: counter merge done');
            }
        );
        console.log('loadcounters: END / all soql sent');
	}
})