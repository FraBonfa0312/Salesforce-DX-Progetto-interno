({
    myAction : function(component, event, helper) {                       
        
        var action = component.get("c.getBigTransactions");
        action.setParams({
            "myId": component.get("v.recordId")
        });  
        
        action.setCallback(this, function(data) {
            component.set("v.myOutputs", data.getReturnValue());
            var result = data.getReturnValue();

            result.forEach(function(record){
                if(record.Value_1__c == "Pending"){
                    component.set("v.checkAI", true);
                    component.set("v.transactionAI", record.Transaction_ID__c);
                } 
            });
            
            var checkIfPending = component.get("v.checkAI");
            
            if(checkIfPending){
                var actionAI = component.get("c.isOutOfBand");
                actionAI.setParams({
                    "status": "Pending"                            
                });
                
                actionAI.setCallback(component, function(response) {
                    var resultAI = response.getReturnValue();                        
                    component.set('v.outputInfo', resultAI);
                });
                
                $A.enqueueAction(actionAI);             
            }             
            
        });
        
        var action1 = component.get("c.getLatestTimeStamp");
        action1.setParams({
            "myId": component.get("v.recordId")
        });
        
        action1.setCallback(this, function(data) {
            component.set("v.myLatestDateTime", data.getReturnValue());
        });  
        
        
        $A.enqueueAction(action);
        $A.enqueueAction(action1);
        
        var myCounterStart = component.get("v.myCurrentCounterStart");
        var myCounterEnd = component.get("v.myCurrentCounterEnd");
        myCounterStart = 1;
        myCounterEnd = 5;
        
        component.set("v.myCurrentCounterStart", myCounterStart);
        component.set("v.myCurrentCounterEnd", myCounterEnd);
        
        component.set("v.showMe", false);        
        
    },
    
    getNext : function(component, event, helper) {        

        var action = component.get("c.getBigNext");
        action.setParams({
            "myId": component.get("v.recordId"),
            "myDateProvided": component.get("v.myLatestDateTime")
        });
        
        action.setCallback(this, function(data) {
            component.set("v.myOutputs", data.getReturnValue());
        });        
        
        var action1 = component.get("c.getNextLatestTimeStamp");
        action1.setParams({
            "myId": component.get("v.recordId"),
            "myDateProvided": component.get("v.myLatestDateTime"),
        });
        
        action1.setCallback(this, function(data) {
            component.set("v.myLatestDateTime", data.getReturnValue());
        });
        
        var action2 = component.get("c.addToDateTimeList");
        action2.setParams({
            "myDateProvided": component.get("v.myLatestDateTime"),
            "myDateTimes": component.get("v.myDateTimes")
        });
        
        action2.setCallback(this, function(data) {
            component.set("v.myDateTimes", data.getReturnValue());
        });
        
        $A.enqueueAction(action);
        $A.enqueueAction(action1);    
        $A.enqueueAction(action2);    
        
        component.set("v.showMe", false);
        
        var myCounterStart = component.get("v.myCurrentCounterStart");
        var myCounterEnd = component.get("v.myCurrentCounterEnd");
        myCounterStart = myCounterStart + 5;
        myCounterEnd = myCounterEnd + 5;
        
        component.set("v.myCurrentCounterStart", myCounterStart);
        component.set("v.myCurrentCounterEnd", myCounterEnd);
        component.set("v.showPrevious", true);        
        
    },
    
    getPrior : function(component, event, helper) {                
        
        var newDateTimes = component.get("v.myDateTimes");
        
        var myCounterStart = component.get("v.myCurrentCounterStart");
        var myCounterEnd = component.get("v.myCurrentCounterEnd");
        
        if(newDateTimes.length == 1){
            newDateTimes.pop();
            var restartMe = component.get('c.myAction');
            $A.enqueueAction(restartMe);
            
        } else {
            
            var action = component.get("c.getBigPrior");
            action.setParams({
                "myId": component.get("v.recordId"),
                "myPriorDateTime": newDateTimes[newDateTimes.length - 2]
            });
            
            action.setCallback(this, function(data) {
                component.set("v.myOutputs", data.getReturnValue());
                component.set("v.myLatestDateTime", newDateTimes[newDateTimes.length - 1]);
                newDateTimes.pop();
                component.set("v.myDateTimes", newDateTimes);
                
            });
            
            $A.enqueueAction(action);
        }
        
        component.set("v.showMe", false);
        

        myCounterStart = myCounterStart - 5;
        myCounterEnd = myCounterEnd - 5;
        
        component.set("v.myCurrentCounterStart", myCounterStart);
        component.set("v.myCurrentCounterEnd", myCounterEnd);
                
    },
    
    getInfo : function(component, event, helper) { 

        var myTarget = event.currentTarget;
        var myRow1 = myTarget.getAttribute("data-conId1"); 
        component.set("v.testString1", myRow1);
        var myRow2 = myTarget.getAttribute("data-conId2"); 
        component.set("v.testString2", myRow2);
        var myRow3 = myTarget.getAttribute("data-conId3"); 
        component.set("v.testString3", myRow3);
        var myRow4 = myTarget.getAttribute("data-conId4"); 
        component.set("v.testString4", myRow4);
        var myRow5 = myTarget.getAttribute("data-conId5"); 
        component.set("v.testString5", myRow5);
        var myRow6 = myTarget.getAttribute("data-conId6"); 
        component.set("v.testString6", myRow6);
        var myRow7 = myTarget.getAttribute("data-conId7"); 
        component.set("v.testString7", myRow7);
        var myRow8 = myTarget.getAttribute("data-conId8"); 
        component.set("v.testString8", myRow8);
        
        
        component.set("v.showMe",true);

    },
    
    getClick : function(component, event, helper) { 
        var myRecord = component.get("v.testString7");
        
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/" + myRecord
        });
        urlEvent.fire();
    },
    
    handleMenu: function (component, event, helper) {            

        var myTarget = event.currentTarget;
        var myRow1 = myTarget.getAttribute("data-conId1b"); 
        component.set("v.testString1b", myRow1);
        var myRow9 = myTarget.getAttribute("data-conId9b"); 
        component.set("v.testString9b", myRow9);
        /*
        // Unnecessary for now - but can be re-used for later. Hence commented-out to save typing :)
        var myRow2 = myTarget.getAttribute("data-conId2b"); 
        component.set("v.testString2b", myRow2);
        var myRow3 = myTarget.getAttribute("data-conId3b"); 
        component.set("v.testString3b", myRow3);
        var myRow4 = myTarget.getAttribute("data-conId4b"); 
        component.set("v.testString4b", myRow4);
        var myRow5 = myTarget.getAttribute("data-conId5b"); 
        component.set("v.testString5b", myRow5);
        var myRow6 = myTarget.getAttribute("data-conId6b"); 
        component.set("v.testString6b", myRow6);
        var myRow7 = myTarget.getAttribute("data-conId7b"); 
        component.set("v.testString7b", myRow7);
        var myRow8 = myTarget.getAttribute("data-conId8b"); 
        component.set("v.testString8b", myRow8); 
        */        
        
        var items = [
            { label: "Get Details", value: component.get("v.testString9b") },
            { label: "Resolve", value: "triage" },
            { label: "Route To Billing", value: "billing" }
        ];  
        component.set("v.actions", items);
        
    },
    
    handleSelect: function (cmp, event, helper) {
        
        var selectedMenuItemValue = event.getParam("value"); 

        if((selectedMenuItemValue !== "triage") && (selectedMenuItemValue !== "billing")){
            var navEvt = $A.get("e.force:navigateToSObject");
            navEvt.setParams({
                "recordId": selectedMenuItemValue,
                "slideDevName": "detail"
            });
            navEvt.fire(); 
        }

        if(selectedMenuItemValue == "triage"){
            cmp.set("v.showModal","true"); 
            cmp.set("v.modalHeaderText", "Resolution Request"); 
            var flow = cmp.find("flowData");
            flow.startFlow("Request_Fulfillment");
        }
        
        if(selectedMenuItemValue == "billing"){
            cmp.set("v.showModalBilling","true");    
        }
        
        
        
    },  
    
    toggleVisibility: function (component, event, helper) {
		var myBoolean = component.get("v.displayMenu");
        component.set("v.displayMenu", ! myBoolean);
    },
    
    toggleVisibilityOff: function (component, event, helper) {
        var myBoolean = component.get("v.displayMenu");
        component.set("v.displayMenu", false);
    },
    
    handleBlur: function (component, event, helper) {
        var myBoolean = component.get("v.displayMenu");
        component.set("v.displayMenu", true);
    },
    
    generateData: function (component, event, helper) {
        var action = component.get("c.populate");
        action.setParams({
            "myId": component.get("v.recordId")
        }); 
        $A.enqueueAction(action);
        window.location.reload();        
    },
    
    closeFlowModal : function(component, event, helper) {
        component.set("v.showModal", false);
    },
    
    closeNBAFlowModal : function(component, event, helper) {
        component.set("v.showNBAModal", false);
    },
    
    closeModal : function(component, event, helper) {
        component.set("v.showModalBilling", false);
    },
    
    closeModalOnFinish : function(component, event, helper) {
        if(event.getParam('status') === "FINISHED") {
            component.set("v.showModal", false);
        }
    },
    
    closeNBAModalOnFinish : function(component, event, helper) {
        if(event.getParam('status') === "FINISHED") {
            component.set("v.showNBAModal", false);
            component.set("v.outputInfo", false);
        }
    },

    handleAccept : function(component, event, helper) {
        component.set("v.showModal","true"); 
        component.set("v.modalHeaderText", "Resolution Request"); 
        var flow = component.find("flowData");
        flow.startFlow("Request_Fulfillment");
    },

    handleNBAAccept : function(component, event, helper) {
        component.set("v.showNBAModal","true"); 
        component.set("v.modalNBAHeaderText", "Next Best Action"); 
        component.set("v.allowRetries", false); 
        var flow = component.find("flowNBAData");
        flow.startFlow("Request_Exception");
    },
    
    closeNBA : function(component, event, helper) {
        component.set("v.outputInfo", false);
        component.set("v.allowRetries", false); 
    },
    
    onSort : function(component, event, helper) {
        var myData = component.get("v.myOutputs");
        var myResolved = [];
        var myWarning = [];
        var myIssue = [];
        
        var i;
        for (i = 0; i < myData.length; i++) {
            if(myData[i].Value_2__c == 'Resolved'){
                myResolved.push(myData[i]);
            } else if(myData[i].Value_2__c == 'Warning'){
                myWarning.push(myData[i]);
            } else if (myData[i].Value_2__c == 'Issue'){
                myIssue.push(myData[i]);                
            }
        }
        
        var mySorted = myIssue.concat(myWarning.concat(myResolved));
        component.set("v.myOutputs", mySorted);
    },
    
    expandFurtherDetails : function(component, event, helper) {
        component.set("v.furtherDetailsOpen", true);
    },
    
    hideFurtherDetails : function(component, event, helper) {
        component.set("v.furtherDetailsOpen", false);
    },
    
    deleteCurrentSeeded : function(component, event, helper) {
        var action = component.get("c.deleteCurrent");
        action.setParams({
            "myId": component.get("v.recordId")
        }); 
        $A.enqueueAction(action);
        window.location.reload();        
    },
    
    getScript : function(component, event, helper) {
        window.open('https://sfdc.co/demo-and-info');     
    },
    
    getDiagram : function(component, event, helper) {
        window.open('http://sfdc.co/diagram-and-slides');
    }
    
})