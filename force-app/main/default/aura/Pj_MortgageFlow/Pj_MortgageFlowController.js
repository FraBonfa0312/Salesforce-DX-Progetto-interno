({
    new1 : function(component, event, helper) {
        var form = component.find("form");
        $A.util.removeClass(form,"hide");
        var landingpage = component.find("landingpage");
        $A.util.removeClass(landingpage,"slds-backdrop--open");
        $A.util.removeClass(landingpage,"slds-fade-in-open");
		$A.util.addClass(landingpage,"slds-hide");
        var progressbar = component.find("progressbar");
        $A.util.removeClass(progressbar,"hide");
    },
    close1 :function(component,event,helper){
        component.set("v.showPopUp", false);
    },
   doInit: function(component,event,helper){
    var action = component.get("c.getUserName");
    action.setCallback(this, function(response){
        var state = response.getState();
        if (state === "SUCCESS") {
            component.set("v.userName", response.getReturnValue());
            var n = response.getReturnValue();
            console.log('in init mortgage');
            console.log(n);
         }
      });
       $A.enqueueAction(action);
     },
 
 page1to2 : function(component,event,helper){
    var page1 = component.find("page1");
    $A.util.toggleClass(page1,"hide");
    var page2 = component.find("page2");
    $A.util.removeClass(page2,"hide");
    var icon = component.find("companyinformation");
    $A.util.removeClass(icon,"slds-is-active");
    $A.util.addClass(icon,"slds-is-completed");
    var edit2 = component.find("Edit2");
    $A.util.addClass(edit2,"hide");
    var approval2 = component.find("Approval2");
    $A.util.removeClass(approval2,"hide");
    var edit3 = component.find("Edit3");
    $A.util.removeClass(edit3,"hide");
    var progress3 = component.find("progress3");
    $A.util.removeClass(progress3,"slds-progress__marker");
   // var progressbarcolor = component.find("progressbarcolor");
	},
    
    page2to3 : function(component,event,helper){
        var page2 = component.find("page2");
    	$A.util.toggleClass(page2,"hide");
    	var page3 = component.find("page3");
    	$A.util.removeClass(page3,"hide");
        var icon = component.find("ownerinformation");
        $A.util.removeClass(icon,"slds-is-active");
    	$A.util.addClass(icon,"slds-is-completed");
        var edit3 = component.find("Edit3");
    	$A.util.addClass(edit3,"hide");
        var approval3 = component.find("Approval3");
    	$A.util.removeClass(approval3,"hide");
        var edit4 = component.find("Edit4");
    	$A.util.removeClass(edit4,"hide");
    	var progress4 = component.find("progress4");
    	$A.util.removeClass(progress4,"slds-progress__marker");
    },
    page3to4 : function(component,event,helper){
		var page3 = component.find("page3");
    	$A.util.toggleClass(page3,"hide");
    	var page4 = component.find("page4");
    	$A.util.removeClass(page4,"hide");
		var icon = component.find("vendorinformation");
        $A.util.removeClass(icon,"slds-is-active");
    	$A.util.addClass(icon,"slds-is-completed");
        var edit4 = component.find("Edit4");
    	$A.util.addClass(edit4,"hide");
        var approval4 = component.find("Approval4");
    	$A.util.removeClass(approval4,"hide");
        var edit5 = component.find("Edit5");
    	$A.util.removeClass(edit5,"hide");
    	var progress5 = component.find("progress5");
    	$A.util.removeClass(progress5,"slds-progress__marker");        
    },
    page4to5 : function(component,event,helper){
        var page4 = component.find("page4");
    	$A.util.toggleClass(page4,"hide");
    	var page5 = component.find("page5");
    	$A.util.removeClass(page5,"hide");
		var icon = component.find("documents");
        $A.util.removeClass(icon,"slds-is-active");
    	$A.util.addClass(icon,"slds-is-completed");
        var edit5 = component.find("Edit5");
    	$A.util.addClass(edit5,"hide");
        var approval5 = component.find("Approval5");
    	$A.util.removeClass(approval5,"hide");
        var edit6 = component.find("Edit6");
    	$A.util.removeClass(edit6,"hide");
    	var progress6 = component.find("progress6");
    	$A.util.removeClass(progress6,"slds-progress__marker");
    },
    page5to6 : function(component,event,helper){
        var page5 = component.find("page5");
    	$A.util.toggleClass(page5,"hide");
    	var page6 = component.find("page6");
    	$A.util.removeClass(page6,"hide");
		var icon = component.find("DocuSign");
        $A.util.removeClass(icon,"slds-is-active");
    	$A.util.addClass(icon,"slds-is-completed");
        var edit6 = component.find("Edit6");
    	$A.util.addClass(edit6,"hide");
        var approval6 = component.find("Approval6");
    	$A.util.removeClass(approval6,"hide");
        var edit7 = component.find("Edit7");
    	$A.util.removeClass(edit7,"hide");
    	var progress7 = component.find("progress7");
    	$A.util.removeClass(progress7,"slds-progress__marker");
        
    },
    page6to7 : function(component,event,helper){
        var page6 = component.find("page6");
    	$A.util.toggleClass(page6,"hide");
    	var page7 = component.find("page7");
    	$A.util.removeClass(page7,"hide");
		var icon = component.find("DocuSign1");
        $A.util.removeClass(icon,"slds-is-active");
    	$A.util.addClass(icon,"slds-is-completed");
        var edit7 = component.find("Edit7");
    	$A.util.addClass(edit7,"hide");
        var approval7 = component.find("Approval7");
    	$A.util.removeClass(approval7,"hide");
        var approval8 = component.find("Approval8");
    	$A.util.removeClass(approval8,"hide");
    	var progress8 = component.find("progress8");
    	$A.util.removeClass(progress8,"slds-progress__marker");
    },
    application :function(component,event,helper){
        var urlEvent = $A.get("e.force:navigateToURL");
    	urlEvent.setParams({
            "url": "https://sdodemo-main-16109844f55-163e1185eb4.force.com/partnercentral/s/brokeronboardingprocess"
        
        });
    	urlEvent.fire();
    }
})