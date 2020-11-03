public class oppToLoan {
    
    @auraEnabled
    public static Loan__c createLoanFromOpp(String idd){
        Opportunity opp=[select Id, CloseDate, Amount, AccountId, Name,Loan__c, OwnerId,StageName from Opportunity where Id =: idd]; 
        Account acc=[select Name from Account where Id =: opp.AccountId]; 
        Loan__c newLoan = new Loan__c();
        Loan__c newLoanRtn = new Loan__c();
        
        newLoan.Product_Type__c = 'Non-Real Estate Loan';
        newLoan.Account__c = opp.AccountId;
        newLoan.Amount_Requested__c = opp.Amount;
        newLoan.First_Payment_Date__c =  date.today() + 60;
        newLoan.Loan_Name__c = acc.Name + ' - ' + opp.Name;
        newLoan.Name= acc.Name + ' - ' + opp.Name;
        newLoan.Stage__c='Qualification / Application';
        newLoan.Loan_officer__c = opp.OwnerId;
        newLoan.Opportunity__c = idd;
        if(opp.CloseDate != null){
            newLoan.Days_Until_Anticipated_Closing__c = opp.CloseDate;
        }

        if(newLoan.Name.Length()> 79){
            newLoan.Name = newLoan.Name.substring(0, 79);
        }
        
        Integer checkLoan = [SELECT count() FROM Loan__c where Name =: newLoan.Name];
        if(checkLoan>0){
            newLoanRtn = [SELECT Id FROM Loan__c where Name =: newLoan.Name][0];
        }else{
            try{
                insert newLoan;
            }Catch(DMLException e){
                system.debug(e);
            }
            newLoanRtn = [SELECT Id FROM Loan__c where Name =: newLoan.Name][0];
        }
        system.debug(newLoanRtn);
        
        opp.Loan__c = newLoanRtn.Id;
        opp.StageName = 'Loan Origination';
        update opp;
        
        return newLoanRtn;
    }

}