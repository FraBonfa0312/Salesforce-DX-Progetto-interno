Global class DE_CreateLoanRecord {
    
    @AuraEnabled
    public static Loan__c createALoanRecord(Date closeDate, String parentOpp, Double amnt_req, String purpose){
        Opportunity opp=[select Id, CloseDate, Amount, AccountId, Name,Loan__c, OwnerId,StageName from Opportunity where Id =: parentOpp]; 
        Account acc=[select Name from Account where Id =: opp.AccountId]; 
        Loan__c newLoan = new Loan__c();
        newLoan.Name=acc.Name + ' - ' + opp.Name;
        newLoan.Opportunity__c =parentOpp;
        newLoan.Loan_Name__c = acc.Name + ' - ' + opp.Name;
        if(opp.CloseDate != null){
            newLoan.Days_Until_Anticipated_Closing__c = opp.CloseDate;
        }
        newLoan.Stage__c='Qualification / Application';
        newLoan.Account__c = opp.AccountId;
        
        newLoan.Amount_Requested__c = amnt_req;
        newLoan.Projected_Close_Date__c=closeDate;
        newLoan.Loan_Purpose__c=purpose;
        newLoan.Loan_officer__c=opp.OwnerId;
        newLoan.First_Payment_Date__c=Date.Today().addDays(60);
        newLoan.Product_Type__c='Auto Loan';
        insert newLoan;
        
        opp.Loan__c = newLoan.Id;
        opp.StageName = 'Decisioning';
        update opp;
        
        
        
        return newLoan;
    }
    
    @AuraEnabled
    public static Opportunity getOpportunityDetails(String recId){
        return [SELECT Id, Amount, Account.Name, Type__c, type, Contact_Street__c, Employer__c, Employment_Type__c, Monthly_Income__c, Amount_Requested__c, CloseDate, Employment_Start_Date__c FROM Opportunity where Id=:recId];
    }
    
}