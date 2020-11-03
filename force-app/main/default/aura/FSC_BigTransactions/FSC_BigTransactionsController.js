({
    myAction : function(component, event, helper) {
        var action = component.get("c.getBigTransactions");
        action.setParams({
            "myId": component.get("v.recordId")
        });        
        
        action.setCallback(this, function(data) {
            component.set("v.myOutputs", data.getReturnValue());
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
        
        //TODO: Finish this for "Prior" Button (Change from Full "Rewind" to Prior 5 transactions)			                
        
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
    }
    
})