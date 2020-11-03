({
    getAllViewingConditions : function(component) {
        var action = component.get("c.getAllViewingConditions");
        action.setParams({ oppId : component.get("v.recordId") });
        console.log(component.get("v.recordId"));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.viewingConditions", response.getReturnValue());
                console.log(response.getReturnValue());
                
                
            }
        });
        
        $A.enqueueAction(action);
        
        
    },
    
    toggleHidden : function (component, element){
        //console.log(element);
        element.classList.toggle("hidden");
    },
    toggleExpandAll :function (component){
        console.log("expandAll");
        var elements = document.getElementsByClassName('dropdown');
        for(var i=0;i<elements.length;i++)
        {
            elements[i].classList.toggle('hidden');
        }
        
    }
})