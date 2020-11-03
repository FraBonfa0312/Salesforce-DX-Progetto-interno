public class ViewingConditionsController {
    
    
    @AuraEnabled
    public static List<Viewing_Condition__c> getAllViewingConditions(Id oppId) {
		List<Viewing_Condition__c> vc = [Select Name, Category__c,Id,Description__c, Condition__c, Prior_to__c, Borrower_Pair__c, Status__c, Status_Date__c, Action__c From Viewing_Condition__c];
   		//double commentCount = [select count() from contentdocumentlink where LinkedEntityId = :vcId]
        
        for (Viewing_Condition__c c : vc) {
            double commCount = [select count() from contentdocumentlink where LinkedEntityId = :c.Id];
            if(commCount > 0 ) {
                c.Comments__c = commCount;
                update c;
            }
        }
        
        return vc;
    } 
    
    @AuraEnabled
    public static List<Reviewing_Fee__c> getAllReviewingFees(id oppId) {
        List<Reviewing_Fee__c> rf = [Select Name, HUD_Line__c, Fee_Description__c, Payee__c, Paid_By__c, Paid_To__c,Amount__c, POC_Broker__c, PAC_Broker__c, Loan_Request__c From Reviewing_Fee__c WHERE Loan_Request__c = :oppId];
        return rf; 
    } 
    
}