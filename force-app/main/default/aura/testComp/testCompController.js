({
    
    doInit : function(component, event, helper) {
        console.log(component.get('v.recordId'));
        
        var getDetails=component.get('c.getOpportunityDetails');
        getDetails.setParams({
            'recId':component.get('v.recordId')
        });
        getDetails.setCallback(this, function(response){
            if(response.getState()==='SUCCESS'){
                component.set('v.opportunity',response.getReturnValue());
            }
        });
        $A.enqueueAction(getDetails);
    },
    
    next : function(component, event, helper) {
        var currentTab = component.get("v.selTabId");
       // console.log(currentTab);
        if(currentTab == '1'){
            var amnt_req=component.find('amnt_req').get('v.value');
            var purpose=component.find('purpose').get('v.value');
            var closeDate=component.find('closeDate').get('v.value');
            var createLoan=component.get('c.createALoanRecord');
            createLoan.setParams({
                'closeDate':closeDate, 
                'parentOpp':component.get('v.recordId'), 
                'amnt_req':amnt_req,
                'purpose':purpose
            });
            createLoan.setCallback(this, function(response){
                if(response.getState()==='SUCCESS'){
                    console.log(response.getReturnValue().Id);
                    component.set('v.Loan', response.getReturnValue());
                    component.set('v.createdRecId', response.getReturnValue().Id);
                    var source=event.getSource();
                    source.set('v.label','Continue');
                    component.set("v.selTabId" , '3');   
                }
            });
            $A.enqueueAction(createLoan);
        }
        else if(currentTab == '3'){
            component.set('v.InterestRate','5%');
            component.set('v.Term',60);
            component.set('v.MonthlyPayment',378);
            component.set("v.selTabId" , '7');     
        }else if(currentTab == '7'){
            $A.get("e.force:closeQuickAction").fire();
            var navEvt = $A.get("e.force:navigateToSObject");
            navEvt.setParams({
                "recordId": component.get('v.createdRecId'),
            });
            navEvt.fire();
          
        } 
    },
    
    
})