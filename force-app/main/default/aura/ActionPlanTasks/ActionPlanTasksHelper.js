({
	modalHelper : function(component, modal, backdrop, tf) {
        var mdl = component.find(modal).getElement();
        var bkdrp = component.find(backdrop).getElement();
        if(tf){
            $A.util.addClass(mdl, 'slds-fade-in-open');
            $A.util.addClass(bkdrp, 'slds-backdrop_open');
        }else{
            $A.util.removeClass(mdl, 'slds-fade-in-open');
            $A.util.removeClass(bkdrp, 'slds-backdrop_open');
        }
    },
    uncheckRadios : function(component, aId){
        var allRadios = component.find('statusRadio');
        for(var i=0; i<allRadios.length; i++){
            allRadios[i].set('v.checked', false);
        }
    }
})