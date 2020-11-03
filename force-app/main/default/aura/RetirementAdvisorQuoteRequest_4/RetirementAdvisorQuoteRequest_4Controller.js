({
    handleClick: function(cmp, evt) {
        console.log('here');
        
        if(document.getElementById('div2').style.display == 'block'){
            document.getElementById('div2').style.display = 'none';            
        } else {
            document.getElementById('div2').style.display = 'block';            
            
        }
        
    },
    closeModal:function(component,event,helper){    
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
    },
    openModal: function(component,event,helper) {
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    }
})