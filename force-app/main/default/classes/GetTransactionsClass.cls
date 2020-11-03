public class GetTransactionsClass {
    
    @AuraEnabled
    public static List<FinServ__FinancialAccountTransaction__c> getTransactions(String accId){
        List<FinServ__FinancialAccount__c> fServs = [Select Id from FinServ__FinancialAccount__c where FinServ__PrimaryOwner__c =:accId];
        List<String> fAccounts=new List<String>();
        List<FinServ__FinancialAccountTransaction__c> toBeReturned = new List<FinServ__FinancialAccountTransaction__c>();
        
        for(FinServ__FinancialAccount__c fServ:fServs){
            List<FinServ__FinancialAccountTransaction__c> finTrans = [Select Id, FinServ__FinancialAccount__c, FinServ__PostDate__c, FinServ__TransactionDate__c, FinServ__Description__c, FinServ__Amount__c, FinServ__TransactionId__c, FinServ__IsDisputed__c from FinServ__FinancialAccountTransaction__c where finServ__FinancialAccount__c=:fServ.Id];
            for(FinServ__FinancialAccountTransaction__c finTran:finTrans){
                toBeReturned.add(finTran);
            }
        }
        return toBeReturned;
    }
    
    
}