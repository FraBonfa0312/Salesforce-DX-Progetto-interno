({
    doInit : function(component, event, helper) {
        component.set('v.columns', [
            {label: 'Disputed', fieldName: 'FinServ__IsDisputed__c', type: 'boolean'},
            {label: 'EFFECTIVE DATE', fieldName: 'FinServ__TransactionDate__c', type: 'date'},
            {label: 'POST DATE', fieldName: 'FinServ__PostDate__c', type: 'date'},
            {label: 'Description', fieldName: 'FinServ__Description__c', type: 'text'},
            {label: 'Amount', fieldName: 'FinServ__Amount__c', type: 'currency', typeAttributes: { currencyCode: 'USD'}},
            {label: 'TRANSACTION ID', fieldName: 'FinServ__TransactionId__c', type: 'text'}
        ]);
        
        
        
        
        var action = component.get('c.getTransactions');
        
        action.setParams({
            'accId': component.get("v.recordId")
        });
        action.setCallback(this, function(response){
            
            component.set('v.data', response.getReturnValue());
            
        });
        
        $A.enqueueAction(action);
    }
})