/**
 * Created by cxu on 24/10/2016.
 */
({
	doInit : function(cmp, event, helper) {
        
        // var action = cmp.get("c.getBankingAccounts");
        var action = cmp.get("c.getFinancialAccounts1");
		action.setParams({
           "recordType": cmp.get("v.finAccRecType")
         });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var accounts = response.getReturnValue();
                console.log(accounts);
                if (accounts !== null) {
                    for (var i = 0; i < accounts.length; i++) {
                        console.log(accounts[i]);
                        if(accounts[i].FinServ__FinancialAccountNumber__c) {
                            var accNum = accounts[i].FinServ__FinancialAccountNumber__c;
                            var temp = accNum.substring(accNum.length - 4, accNum.length);
                            console.log('temp',temp);
                            accounts[i].FinServ__FinancialAccountNumber__c = '****' + temp;
                        }
                        else {
                            accounts[i].FinServ__FinancialAccountNumber__c = '****XXXX';
                        }
                    }
                    cmp.set("v.bankAccounts", accounts);
                }
            }
            else if (state === "INCOMPLETE") {
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
	},
    navigateToObject : function(cmp, event, helper) {
          var id = event.target.id;

         var navEvt = $A.get("e.force:navigateToSObject");
         navEvt.setParams({
           "recordId": id
         });
         navEvt.fire();
    }
})