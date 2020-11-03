({
	spinnerHelper : function(component, tf){
        var spinner = component.find('spinner');
        if(tf){
            $A.util.removeClass(spinner,'slds-hide');
        }else{
            $A.util.addClass(spinner,'slds-hide');
        }
    }
})