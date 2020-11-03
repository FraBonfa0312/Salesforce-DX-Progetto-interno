({
    fadeInsight : function(component,event,helper){
        let insight = component.find('insight');
        $A.util.addClass(insight,'fade');
        window.setTimeout(
            $A.getCallback(function() {
                $A.util.addClass(insight,'hide');
            })
        , 800);
    },
    navigateToRecord : function(component, event, helper){
        let insight = component.get("v.insight");
        let action = component.get('c.getRecordId');
        
        
        
        action.setParams({
            recordName: insight.recordName,
            objectType: insight.objectType
        })
        
        action.setCallback(this, function(res){
            let state = res.getState();
            let recordId = res.getReturnValue();
            
            
            if(recordId == null )
            {
                window.location = 'https://bankingsummer198675309.lightning.force.com/lightning/r/Account/0012X000023Zak3QAQ/view'
                return false;
            }
            
            console.log(state,recordId);
            
            if(state === "ERROR"){
                return false;
            }
            
            if(state === "SUCCESS"){
                //window.location.hash = "/sObject/" + recordId + "/view";
                window.location = '/' + recordId;
                return false;
            }
        })
        
        $A.enqueueAction(action);
    },
    expandInsight : function(component,event,helper){
        var content = component.find('content');
        $A.util.toggleClass(content, 'expand');
    }
})