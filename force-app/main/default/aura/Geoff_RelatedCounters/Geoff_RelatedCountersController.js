({
	doInit : function(component, event, helper) {
        
        console.log('doInitKPI: loading KPIdefinition');
               

                helper.loadCounters(component, helper);

    
        console.log('doInitKPI: END');
	},
    
    refreshKPIs : function (component, event, helper) {
        console.log('refreshKPIs: START');
            
        helper.loadCounters(component, helper);
        
        console.log('refreshKPIs: END');
    }
})