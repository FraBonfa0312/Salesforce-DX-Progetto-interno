({
	
    changeComponent : function(component, event, helper) {
        var thingName = event.getParam("Event Name");
        console.log(thingName);
        component.set("v.thingName", thingName);
        // var componentInfo = component.find("cmpInfo");
        // componentInfo.reloadRecord();
	}, 
    
    handleQuoteEvent : function(component, event, helper) {
        alert("got an event!");
        var updatedCmp = event.getParam("uwComponent");
        component.set("v.thingName", updatedCmp);
    },
    
    handleApplicationEvent : function(cmp, event) {
        var container = cmp.find('jakeContainer');
        $A.util.removeClass(container, 'slds-hidden');    
        var message = event.getParam("message");
        var component = event.getParam("component");
        // set the handler attributes based on event data
        cmp.set("v.messageFromEvent", message);
        cmp.set("v.component", component);
        if(component === 'quote'){
            cmp.set("v.icon","standard:quotes");
            cmp.set("v.title", "Quick Quote");
        }
        var numEventsHandled = parseInt(cmp.get("v.numEvents")) + 1;
        cmp.set("v.numEvents", numEventsHandled);
    },

    handleRefreshEvent: function(component, event) {
        var container = component.find('jakeContainer');
        $A.util.addClass(container, 'slds-hidden');
        //var message = event.getParam("message");
        //var component = event.getParam("component");
        //component.set("v.messageFromEvent", message);
        component.set("v.component", "");
        //component.set("v.icon", " ");
    },

		
})