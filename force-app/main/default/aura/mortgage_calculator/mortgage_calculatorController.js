({
    onGroup: function(cmp, evt, helper) {
        let selected = evt.getSource().get("v.label");
        let resultCmp = cmp.find("radioGroupResult");
    },
    
    handleChange: function(cmp, evt, helper) {
        let selected = evt.getSource().get("v.label");
        let resultCmp = cmp.find("radioGroupResult");
    },
    
    clickBtn:function(cmp, evt, helper) {
        console.log('btnClicked');
        let btnClicked = evt.getSource().getLocalId();
        console.log(btnClicked);
        if(btnClicked == 'b1'){
            let cmpDiv1 = cmp.find('11');
            let cmpDiv2 = cmp.find('22');
            $A.util.removeClass(cmpDiv1, 'houseBefore');
            $A.util.removeClass(cmpDiv2, 'appAfter');
            $A.util.addClass(cmpDiv1, 'houseAfter');
            $A.util.addClass(cmpDiv2, 'appBefore');
            
        }else{
            let cmpDiv1 = cmp.find('11');
            let cmpDiv2 = cmp.find('22');
            $A.util.removeClass(cmpDiv1, 'houseAfter');
            $A.util.removeClass(cmpDiv2, 'appBefore');
            $A.util.addClass(cmpDiv1, 'houseBefore');
            $A.util.addClass(cmpDiv2, 'appAfter');
        }
    },
    
    
    nextScreen: function(cmp, evt, helper) {
        
        var whichOne = evt.getSource().getLocalId();
        
        var newStr = whichOne.replace('button', '');
        var newStr2 = newStr - 1;
        var nextScreen = 's'+newStr;
        var currentScreen = 's'+newStr2;
        
        if(nextScreen !='s7'){
            var cDiv = cmp.find(currentScreen);
            var nDiv = cmp.find(nextScreen);
            
            //$A.util.addClass(cDiv, 'slds-hide');
            $A.util.removeClass(nDiv, 'slds-hide');
            setTimeout(function(){
                let offtop = nDiv.getElement().offsetTop,
                    initialHeight = cmp.get('v.heightCheck');
                let down = offtop - initialHeight;
                window.scrollBy(0, down);
                cmp.set('v.heightCheck', nDiv.getElement().offsetTop);
            },300);
            
            console.log(newStr);
        }else{
            let urll = cmp.get("v.urll");
            let eUrl= $A.get("e.force:navigateToURL");
            eUrl.setParams({
                "url": '/'+ urll 
            });
            eUrl.fire();
        }
        
        
    }
    
    
})