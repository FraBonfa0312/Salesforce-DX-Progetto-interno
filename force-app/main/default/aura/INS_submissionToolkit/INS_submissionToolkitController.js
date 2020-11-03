({
	doCollapse : function(component, event) {
        var collapsed = component.get("v.collapsed");
        var wholeCard = component.find('wholeCard');
        if ( collapsed == true){
            //component.set("v.collapsed", false);
            $A.util.addClass(wholeCard, 'slds-theme_shade');
        }else{
            //component.set("v.collapsed", true);
            $A.util.removeClass(wholeCard, 'slds-theme_shade');  
            var refreshEvent = $A.get("e.c:INS_toolkitRefreshEvent");
            refreshEvent.fire(); 
        }
    },
    
    quoteEvent : function(component, event) {
        alert('firing an event');
        var myEvent = component.getEvent("uwQuoteEvent");
        myEvent.setParams({ "message": "I am the quote component" });
        myEvent.fire();
        console.log(myEvent);
    },
  
    fireApplicationEventQuote : function(cmp, event) {
        var appEvent = $A.get("e.c:INS_toolkitEvent");
        appEvent.setParams({
            "component": "quote",
            "message" : "I'm a quote event and an application event fired me woooohoo! " +
            "It all happened so fast. Now, I'm everywhere!",
        });
        console.log(appEvent.component);
        appEvent.fire();
    },
    
    fireApplicationEventGuidewire : function(cmp, event,helper) {
        console.log('fireApplicationEventGuidewire..');
        var appEvent = $A.get("e.c:INS_toolkitEvent");
        appEvent.setParams({
            "component": "Guidewire",
            "message" : "Underwriting has approved this application" ,
        });
        //console.log(appEvent.component);        
        appEvent.fire();
        
        var eUrl= $A.get("e.force:navigateToURL");
    eUrl.setParams({
      "url": '/resource/GW_MockPolicy1/loading.html' 
    });
    eUrl.fire();
        
         window.setTimeout(
            $A.getCallback(function () {
               helper.doCloseModal2(cmp);
            }), 500
        );
		
    },
    
    
    docsEvent : function(component, event) {
       	alert("docs event!");  
    },
    
    guidewireEvent : function(component, event) {
       	alert("guidewire event!");  
    },
    
    analyticsEvent : function(component, event) {
       	alert("analytics event!");  
    },
    
    mapEvent : function(component, event) {

    },

    checklistEvent : function(component, event) {
        alert("checklist event!");  
 },

 openModal: function(component,event,helper) {
    var cmpTarget = component.find('theModal');
    var cmpBack = component.find('Modalbackdrop');
    $A.util.addClass(cmpTarget, 'slds-fade-in-open');
    $A.util.addClass(cmpBack, 'slds-backdrop--open');
},

closeModal: function(component,event,helper){
    var cmpTarget = component.find('theModal');
    var cmpBack = component.find('Modalbackdrop');
    $A.util.removeClass(cmpBack,'slds-backdrop--open');
    $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
    component.find("recordHandler").reloadRecord();
},

     openModal2: function(component,event,helper) {
    var cmpTarget = component.find('theModal2');
    var cmpBack = component.find('Modalbackdrop');
    $A.util.addClass(cmpTarget, 'slds-fade-in-open');
    $A.util.addClass(cmpBack, 'slds-backdrop--open');
},

closeModal2: function(component,event,helper){
    var cmpTarget = component.find('theModal2');
    var cmpBack = component.find('Modalbackdrop');
    $A.util.removeClass(cmpBack,'slds-backdrop--open');
    $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
    component.find("recordHandler").reloadRecord();
},

   
   
    
    
    
})