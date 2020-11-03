({
    doInit: function(component, event, helper) {
        var icon = component.get("v.icon");
        if(icon== "Mulesoft"){
            component.set("v.iconUrl", "https://sfdc-demo-images-jake.s3.amazonaws.com/MuleSoft_logo_299C.png");
        } else if(icon=="Guidewire"){
            component.set("v.iconUrl", "https://sfdc-demo-images-jake.s3.amazonaws.com/guidewire_logo_new_2color_h_screen.jpg");
        }
    },
    
    runQuote : function(component, event, helper) {
        var state = component.get("v.state");
        var wholeCard = component.find('wholeCard');
        $A.util.addClass(wholeCard, 'slds-theme_shade');
        if(state == "inactive"){
            component.set("v.state", "active");
            $A.util.addClass(wholeCard, 'slds-theme_shade');
        }else{
            component.set("v.state", "inactive");
            $A.util.removeClass(wholeCard, 'slds-theme_shade');
        }
        var spinner = component.find("spinner").getElement();
        var creditDetails = component.find("creditDetails").getElement();
        spinner.style.display = 'block';
        creditDetails.style.display = 'none';
        setTimeout(function() {
            component.set("v.applicationId", "438938549");
            component.set("v.premium", "$1,400 - $1,700");
            //*component.set("v.terms", component.get("v.simpleRecord.Terms__c") + " months");
            component.set("v.coverageRequested", "$497,450");
            //*component.set("v.creditRequested", "$" + component.get("v.simpleRecord.Price__c").toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"));
            component.set("v.coverageLimit", "$500,000");
            component.set("v.productName", "Commercial Property");
            var date = new Date();
            var n = date.toDateString();
            component.set("v.createdDate", n);
            component.set("v.modifiedDate", n);
            spinner.style.display = 'none';
            creditDetails.style.display = 'block';
            component.set("v.buttonLabel", "Save");
        }, 1000);
    },
    
    collapse : function(component) {
        var collapsed = component.get("v.collapsed");			
        if ( collapsed == true){
            component.set("v.collapsed", false);
        }else{
            component.set("v.collapsed", true);
        };
    },
    
    openModal: function(component,event,helper) {
        var cmpTarget = component.find('helpModal');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open');
    },
    
    closeModal: function(component,event,helper){
        var cmpTarget = component.find('helpModal');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
        component.find("recordHandler").reloadRecord();
    },

    resetFunction: function(component, event, helper) {
        alert("it worked!");
    },
})